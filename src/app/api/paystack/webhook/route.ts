import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { drizzle_db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-paystack-signature');

        // Verify the webhook signature
        const hash = crypto
            .createHmac('sha512', PAYSTACK_SECRET_KEY)
            .update(body)
            .digest('hex');

        if (hash !== signature) {
            console.error('Invalid webhook signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const event = JSON.parse(body);
        console.log('Paystack webhook event:', event.event);

        // Handle subscription creation
        if (event.event === 'subscription.create') {
            const customerEmail = event.data.customer.email;
            const subscriptionCode = event.data.subscription_code;
            const plan = event.data.plan.name.toLowerCase().includes('monthly') ? 'monthly' : 'yearly';

            // Calculate expiration date (30 days for monthly)
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + (plan === 'monthly' ? 30 : 365));

            // Update user in database
            await drizzle_db.update(users)
                .set({
                    proStatus: true,
                    subscriptionReference: subscriptionCode,
                    subscriptionPlan: plan,
                    subscriptionStatus: 'active',
                    subscriptionExpiresAt: expiresAt,
                })
                .where(eq(users.email, customerEmail));

            console.log(`Subscription activated for ${customerEmail}`);
        }

        // Handle subscription renewal
        if (event.event === 'charge.success' && event.data.plan) {
            const customerEmail = event.data.customer.email;
            const plan = event.data.plan.name.toLowerCase().includes('monthly') ? 'monthly' : 'yearly';

            // Extend expiration date
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + (plan === 'monthly' ? 30 : 365));

            await drizzle_db.update(users)
                .set({
                    proStatus: true,
                    subscriptionStatus: 'active',
                    subscriptionExpiresAt: expiresAt,
                })
                .where(eq(users.email, customerEmail));

            console.log(`Subscription renewed for ${customerEmail}`);
        }

        // Handle subscription cancellation
        if (event.event === 'subscription.disable') {
            const customerEmail = event.data.customer.email;

            await drizzle_db.update(users)
                .set({
                    proStatus: false,
                    subscriptionStatus: 'cancelled',
                })
                .where(eq(users.email, customerEmail));

            console.log(`Subscription cancelled for ${customerEmail}`);
        }

        // Handle payment failure
        if (event.event === 'invoice.payment_failed') {
            const customerEmail = event.data.customer.email;

            await drizzle_db.update(users)
                .set({
                    subscriptionStatus: 'failed',
                })
                .where(eq(users.email, customerEmail));

            console.log(`Payment failed for ${customerEmail}`);
            // TODO: Send email notification to user
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

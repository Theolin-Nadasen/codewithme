import { NextApiRequest, NextApiResponse } from 'next';
import { drizzle_db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const [user] = await drizzle_db
      .select({
        id: users.id,
        name: users.name,
        image: users.image,
        proStatus: users.proStatus,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { drizzle_db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { getUser } from '@/lib/auth';

// Validate social URLs
const validators = {
  githubUrl: (url: string) => !url || url.startsWith('https://github.com/'),
  twitterUrl: (url: string) => !url || url.startsWith('https://x.com/') || url.startsWith('https://twitter.com/'),
  linkedinUrl: (url: string) => !url || url.startsWith('https://linkedin.com/in/') || url.startsWith('https://www.linkedin.com/in/'),
  youtubeUrl: (url: string) => !url || url.startsWith('https://youtube.com/@') || url.startsWith('https://www.youtube.com/@'),
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const currentUser = await getUser();

    // Check authentication
    if (!currentUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check ownership
    if (currentUser.id !== id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { githubUrl, twitterUrl, linkedinUrl, youtubeUrl } = body;

    // Validate URLs
    const errors: string[] = [];
    
    if (githubUrl && !validators.githubUrl(githubUrl)) {
      errors.push('Invalid GitHub URL');
    }
    if (twitterUrl && !validators.twitterUrl(twitterUrl)) {
      errors.push('Invalid X/Twitter URL');
    }
    if (linkedinUrl && !validators.linkedinUrl(linkedinUrl)) {
      errors.push('Invalid LinkedIn URL');
    }
    if (youtubeUrl && !validators.youtubeUrl(youtubeUrl)) {
      errors.push('Invalid YouTube URL');
    }

    if (errors.length > 0) {
      return NextResponse.json({ message: errors.join(', ') }, { status: 400 });
    }

    // Update user
    await drizzle_db.update(users).set({
      githubUrl: githubUrl || null,
      twitterUrl: twitterUrl || null,
      linkedinUrl: linkedinUrl || null,
      youtubeUrl: youtubeUrl || null,
    }).where(eq(users.id, id));

    return NextResponse.json({ message: 'Social links updated successfully' });
  } catch (error) {
    console.error('Error updating social links:', error);
    return NextResponse.json(
      { message: 'Failed to update social links' },
      { status: 500 }
    );
  }
}

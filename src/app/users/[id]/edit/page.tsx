'use server';

import { drizzle_db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

import { getUser } from '@/lib/auth';
import SocialLinksForm from '@/components/social_links_form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProfilePage({ params }: PageProps) {
  const { id } = await params;
  const currentUser = await getUser();

  if (!id) {
    notFound();
  }

  // Check if user is logged in and owns this profile
  if (!currentUser || currentUser.id !== id) {
    redirect(`/users/${id}`);
  }

  const user = await drizzle_db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) {
    notFound();
  }

  const initialData = {
    githubUrl: user.githubUrl,
    twitterUrl: user.twitterUrl,
    linkedinUrl: user.linkedinUrl,
    youtubeUrl: user.youtubeUrl,
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/users/${id}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Edit Social Links</h1>
          <p className="text-gray-400 mt-2">
            Add or update your social media profiles. These will be displayed on your public profile.
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
          <SocialLinksForm userId={id} initialData={initialData} />
        </div>
      </div>
    </main>
  );
}

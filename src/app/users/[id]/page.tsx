'use server';

import { drizzle_db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const user = await drizzle_db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info Section */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />

          {/* Avatar */}
          <div className="relative z-10">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || 'User'}
                className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 text-gray-400" />
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left z-10 space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {user.name || 'Anonymous User'}
              </h1>
              {/* Rank Icon */}
              <div className="flex items-center justify-center bg-yellow-500/20 p-2 rounded-full border border-yellow-500/50" title={`Rank: ${user.rank}`}>
                <FaCrown className="text-yellow-400 w-5 h-5" />
                <span className="ml-1 text-yellow-400 font-bold text-sm">{user.rank}</span>
              </div>
            </div>

            {/* Pro Badge */}
            {user.proStatus && (
              <div className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                <MdVerified className="w-4 h-4" />
                <span>Pro Member</span>
              </div>
            )}
          </div>
        </div>

        {/* Projects Section (Coming Soon) */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl font-bold text-gray-300">Projects</h2>
            <div className="inline-block p-4 rounded-xl bg-gray-800/80 border border-gray-600 backdrop-blur-sm">
              <p className="text-green-400 font-mono text-lg animate-pulse">
                &lt;Coming Soon /&gt;
              </p>
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              Showcase your coding projects here. We are building a space for you to share your work with the community.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

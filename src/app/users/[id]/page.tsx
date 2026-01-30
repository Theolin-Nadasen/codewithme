'use server';

import { drizzle_db } from '@/lib/db';
import { users, userCompletedChallenges } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { FaCrown, FaUserCircle, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdVerified, MdEdit, MdShare, MdContentCopy } from 'react-icons/md';
import Link from 'next/link';

import { getUser } from '@/lib/auth';
import { getUserProjects } from '@/actions/projects';
import ProjectManager from '@/components/project_manager';
import PageTutorial from '@/components/page_tutorial';
import ShareProfile from '@/components/share_profile';
import UserStats from '@/components/user_stats';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;
  const currentUser = await getUser();

  if (!id) {
    notFound();
  }

  let user;
  try {
    user = await drizzle_db.query.users.findFirst({
      where: eq(users.id, id),
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    // Fallback: try without the new columns
    user = await drizzle_db.execute(
      `SELECT id, name, email, "emailVerified", image, rank, pro_status, daily_api_uses, "lastApiUseDate", role FROM "user" WHERE id = '${id}' LIMIT 1`
    ).then((res: any) => res[0]);
  }

  if (!user) {
    notFound();
  }

  const projects = await getUserProjects(id);
  const isOwner = currentUser?.id === id;

  let isAdmin = false;
  if (currentUser) {
    try {
      const dbCurrentUser = await drizzle_db.query.users.findFirst({
        where: eq(users.id, currentUser.id),
      });
      isAdmin = dbCurrentUser?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }

  const canEdit = isOwner || isAdmin;

  let limit = 1;
  if (user.role === 'admin') limit = Infinity;
  else if (user.proStatus) limit = 3;

  const canAddMore = projects.length < limit;

  // Get completed challenges count
  let challengesCount = 0;
  try {
    const completedChallenges = await drizzle_db.query.userCompletedChallenges.findMany({
      where: eq(userCompletedChallenges.userId, id),
    });
    challengesCount = completedChallenges.length;
  } catch (error) {
    console.error('Error fetching challenges:', error);
  }

  // Social links data - safely handle missing columns
  const socialLinks = [
    { name: 'GitHub', url: (user as any).githubUrl || (user as any).github_url, icon: FaGithub, color: 'hover:text-white' },
    { name: 'X', url: (user as any).twitterUrl || (user as any).twitter_url, icon: FaXTwitter, color: 'hover:text-white' },
    { name: 'LinkedIn', url: (user as any).linkedinUrl || (user as any).linkedin_url, icon: FaLinkedin, color: 'hover:text-blue-400' },
    { name: 'YouTube', url: (user as any).youtubeUrl || (user as any).youtube_url, icon: FaYoutube, color: 'hover:text-red-400' },
  ].filter(link => link.url);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <PageTutorial tutorialId="profile" delay={1500} />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Info Section */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
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
              <div className="flex items-center justify-center bg-yellow-500/20 p-2 rounded-full border border-yellow-500/50" title={`Rank: ${user.rank}`}>
                <FaCrown className="text-yellow-400 w-5 h-5" />
                <span className="ml-1 text-yellow-400 font-bold text-sm">{user.rank}</span>
              </div>
            </div>

            {user.proStatus && (
              <div className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                <MdVerified className="w-4 h-4" />
                <span>Pro Member</span>
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 transition-colors ${social.color}`}
                      title={social.name}
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Edit Button (Only for owner) */}
          {isOwner && (
            <div className="absolute top-4 right-4 z-10">
              <Link
                href={`/users/${id}/edit`}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <MdEdit className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <UserStats 
          challengesCount={challengesCount} 
          projectsCount={projects.length} 
          rank={user.rank}
          isPro={user.proStatus}
        />

        {/* Projects Section */}
        <div id="project-manager" className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden">
          <ProjectManager projects={projects} isOwner={canEdit} canAddMore={canAddMore} />
        </div>

        {/* Share Section */}
        <ShareProfile userId={id} userName={user.name || 'Anonymous'} />
      </div>
    </main>
  );
}

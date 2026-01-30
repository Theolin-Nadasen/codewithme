'use client';

import { FaTrophy, FaFolder, FaCrown, FaGem } from 'react-icons/fa';

interface UserStatsProps {
  challengesCount: number;
  projectsCount: number;
  rank: number;
  isPro: boolean;
}

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function UserStats({ challengesCount, projectsCount, rank, isPro }: UserStatsProps) {
  const stats: StatItem[] = [
    {
      icon: FaTrophy,
      label: 'Challenges Solved',
      value: challengesCount,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    {
      icon: FaFolder,
      label: 'Projects',
      value: projectsCount,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      icon: FaCrown,
      label: 'Rank',
      value: rank,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
  ];

  if (isPro) {
    stats.push({
      icon: FaGem,
      label: 'Status',
      value: 'Pro',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-6 text-center`}
          >
            <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

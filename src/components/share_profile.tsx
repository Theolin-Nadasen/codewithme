'use client';

import { useState } from 'react';
import { MdContentCopy, MdShare, MdCheck } from 'react-icons/md';
import { FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { SiX } from 'react-icons/si';

interface ShareProfileProps {
  userId: string;
  userName: string;
}

export default function ShareProfile({ userId, userName }: ShareProfileProps) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `https://codewithme.co.za/users/${userId}`;
  const shareText = `Check out ${userName}'s coding profile on Code With Me!`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <MdShare className="w-6 h-6 text-green-400" />
        Share Profile
      </h2>

      <div className="space-y-4">
        {/* Copy Link */}
        <div className="flex gap-2">
          <input
            type="text"
            value={profileUrl}
            readOnly
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300"
          />
          <button
            onClick={handleCopy}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            {copied ? <MdCheck className="w-5 h-5" /> : <MdContentCopy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Social Share Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleShareX}
            className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaXTwitter className="w-5 h-5" />
            Share on X
          </button>
          <button
            onClick={handleShareLinkedIn}
            className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaLinkedin className="w-5 h-5" />
            Share on LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}

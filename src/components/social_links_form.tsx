'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdSave, MdError } from 'react-icons/md';

interface SocialLinksFormProps {
  userId: string;
  initialData: {
    githubUrl: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
    youtubeUrl: string | null;
  };
}

const socialPlatforms = [
  {
    name: 'GitHub',
    key: 'githubUrl' as const,
    icon: FaGithub,
    placeholder: 'https://github.com/username',
    validate: (url: string) => url.startsWith('https://github.com/'),
    errorMessage: 'Must start with https://github.com/',
  },
  {
    name: 'X (Twitter)',
    key: 'twitterUrl' as const,
    icon: FaXTwitter,
    placeholder: 'https://x.com/username',
    validate: (url: string) => url.startsWith('https://x.com/') || url.startsWith('https://twitter.com/'),
    errorMessage: 'Must start with https://x.com/ or https://twitter.com/',
  },
  {
    name: 'LinkedIn',
    key: 'linkedinUrl' as const,
    icon: FaLinkedin,
    placeholder: 'https://linkedin.com/in/username',
    validate: (url: string) => url.startsWith('https://linkedin.com/in/') || url.startsWith('https://www.linkedin.com/in/'),
    errorMessage: 'Must start with https://linkedin.com/in/',
  },
  {
    name: 'YouTube',
    key: 'youtubeUrl' as const,
    icon: FaYoutube,
    placeholder: 'https://youtube.com/@username',
    validate: (url: string) => url.startsWith('https://youtube.com/@') || url.startsWith('https://www.youtube.com/@'),
    errorMessage: 'Must start with https://youtube.com/@',
  },
];

export default function SocialLinksForm({ userId, initialData }: SocialLinksFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    githubUrl: initialData.githubUrl || '',
    twitterUrl: initialData.twitterUrl || '',
    linkedinUrl: initialData.linkedinUrl || '',
    youtubeUrl: initialData.youtubeUrl || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error when user types
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    socialPlatforms.forEach((platform) => {
      const value = formData[platform.key];
      if (value && !platform.validate(value)) {
        newErrors[platform.key] = platform.errorMessage;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`/api/users/${userId}/social-links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push(`/users/${userId}`);
        router.refresh();
      } else {
        const data = await res.json();
        setSaveError(data.message || 'Failed to save social links');
      }
    } catch (error) {
      setSaveError('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saveError && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2">
          <MdError className="w-5 h-5" />
          {saveError}
        </div>
      )}

      {socialPlatforms.map((platform) => {
        const Icon = platform.icon;
        const value = formData[platform.key];
        const error = errors[platform.key];

        return (
          <div key={platform.key} className="space-y-2">
            <label className="flex items-center gap-2 text-white font-medium">
              <Icon className="w-5 h-5" />
              {platform.name}
            </label>
            <input
              type="url"
              value={value}
              onChange={(e) => handleChange(platform.key, e.target.value)}
              placeholder={platform.placeholder}
              className={`w-full bg-gray-900 border ${
                error ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors`}
            />
            {error && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <MdError className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <MdSave className="w-5 h-5" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
  id: string;
  name: string | null;
  image: string | null;
  proStatus: boolean;
  role: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const userId = params?.id; // Use optional chaining here

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || typeof userId !== 'string') {
      setError('Invalid User ID provided.');
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('User not found.');
          } else {
            setError('Failed to fetch user data.');
          }
          setUserData(null);
        } else {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('An unexpected error occurred.');
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Loading User Profile...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-red-500">{error}</h1>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">No user data available.</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        {userData.name || 'User'} Profile
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md text-center">
        {/* Generic User Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-24 h-24 rounded-full mx-auto mb-4 text-gray-400 border-2 border-gray-300 p-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
          <span className="font-semibold">Name:</span> {userData.name || 'N/A'}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
          <span className="font-semibold">Pro Status:</span> {userData.proStatus ? 'Active' : 'Inactive'}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-200">
          <span className="font-semibold">Role:</span> {userData.role}
        </p>
      </div>
    </main>
  );
}

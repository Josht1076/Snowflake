'use client';

/**
 * User menu component
 * Shows user info and sign out button
 */

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">{user.email}</span>
      <button
        onClick={handleSignOut}
        className="text-sm text-gray-600 hover:text-gray-900 underline"
      >
        Sign Out
      </button>
    </div>
  );
}

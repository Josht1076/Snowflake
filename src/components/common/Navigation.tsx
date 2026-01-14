'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  showBackToProjects?: boolean;
}

export default function Navigation({ showBackToProjects = true }: NavigationProps) {
  const pathname = usePathname();
  
  // Don't show navigation on home page or login page
  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  return (
    <nav className="border-b border-gray-800 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Back to Projects */}
          {showBackToProjects && (
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm font-medium">Your Projects</span>
            </Link>
          )}

          {/* Center: App Name (optional, can be hidden on mobile) */}
          <div className="hidden sm:block flex-1 text-center">
            <Link
              href="/"
              className="text-lg font-semibold text-primary-500 hover:text-primary-400 transition-colors"
            >
              Snowflake Novel Planner
            </Link>
          </div>

          {/* Right: Spacer for alignment */}
          <div className="flex-1 sm:hidden" />
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AutosaveIndicator from '@/components/common/AutosaveIndicator';

interface NavigationProps {
  showBackToProjects?: boolean;
  projectId?: string;
  isSaving?: boolean;
  onOpenSettings?: () => void;
}

export default function Navigation({
  showBackToProjects = true,
  projectId,
  isSaving = false,
  onOpenSettings,
}: NavigationProps) {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  const isStructure = pathname === '/structure';
  const isRevision = pathname === '/revision';

  return (
    <nav className="border-b border-gray-800 bg-gray-900" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {showBackToProjects && (
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors shrink-0"
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

          <div className="hidden sm:block flex-1 text-center">
            <Link
              href="/"
              className="text-lg font-semibold text-primary-500 hover:text-primary-400 transition-colors"
            >
              Snowflake Novel Planner
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {isStructure && <AutosaveIndicator isSaving={isSaving} />}
            {isStructure && projectId && onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="text-sm text-gray-300 hover:text-white transition-colors min-h-[44px] flex items-center"
              >
                Settings
              </button>
            )}
            {isStructure && projectId && (
              <Link
                href={`/revision?project=${projectId}`}
                className="text-sm text-gray-300 hover:text-white transition-colors min-h-[44px] flex items-center"
              >
                Revision
              </Link>
            )}
            {isRevision && projectId && (
              <Link
                href={`/structure?project=${projectId}`}
                className="text-sm text-gray-300 hover:text-white transition-colors min-h-[44px] flex items-center"
              >
                Structure
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

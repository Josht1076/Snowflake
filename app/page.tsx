'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllProjects } from '@/utils/storage';
import { Project } from '@/types/project';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import ImportButton from '@/components/common/ImportButton';
import ExportButton from '@/components/common/ExportButton';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      loadProjects();
    }
  }, [user, authLoading, router]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const allProjects = await getAllProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="page-container">
        <div className="page-content">
          <div className="flex items-center justify-center min-h-[50dvh]">
            <p>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-content">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="page-heading !mb-0">Snowflake Novel Planner</h1>
          {user && (
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <span className="text-sm text-gray-400 truncate max-w-[200px] sm:max-w-xs">
                {user.email}
              </span>
              <button
                onClick={async () => {
                  try {
                    await signOut();
                    router.push('/login');
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
                className="text-sm text-gray-400 hover:text-white active:text-white underline min-h-[44px] flex items-center"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
          <Link href="/discovery" className="btn-primary-action text-center">
            New Project
          </Link>
          <ImportButton onImported={() => loadProjects()} />
        </div>

        {projects.length > 0 && (
          <div>
            <h2 className="page-section-heading">Your Projects</h2>
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Link href={`/structure?project=${project.id}`} className="flex-1">
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-meta">
                        Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/revision?project=${project.id}`}
                        className="btn-secondary-action text-sm"
                      >
                        Revision
                      </Link>
                      <ExportButton project={project} compact />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && !loading && (
          <div className="empty-state">
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        )}
      </div>
    </main>
  );
}

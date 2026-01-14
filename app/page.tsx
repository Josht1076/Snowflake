'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllProjects } from '@/utils/storage';
import { Project } from '@/types/project';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    // Load projects when authenticated
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
          <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-content">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-heading">Snowflake Novel Planner</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={async () => {
                  try {
                    await signOut();
                    router.push('/login');
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <Link
            href="/discovery"
            className="btn-primary-action"
          >
            New Project
          </Link>
        </div>

        {projects.length > 0 && (
          <div>
            <h2 className="page-section-heading">Your Projects</h2>
            <div className="grid gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/structure?project=${project.id}`}
                  className="project-card"
                >
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-meta">
                    Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                </Link>
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


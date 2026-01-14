'use client';

import { useEffect, useState, Suspense } from 'react';
import { getProject } from '@/utils/storage';
import { Project } from '@/types/project';
import HealthCheck from '@/components/revision/HealthCheck';
import Navigation from '@/components/common/Navigation';

export const dynamic = 'force-dynamic';

function RevisionContent() {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      const id =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('project')
          : null;
      setProjectId(id);

      if (id) {
        const loaded = await getProject(id);
        setProject(loaded);
      }
      setLoading(false);
    };

    loadProject();
  }, []);

  if (loading) {
    return (
      <main className="loading-container">
        <div className="loading-content max-w-4xl">Loading...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="error-container">
        <div className="error-content max-w-4xl">
          <p>Project not found. Please create a new project.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navigation />
      <main className="page-container">
        <div className="page-content max-w-4xl">
          <h1 className="page-heading-light">Revision Mode</h1>
          <p className="text-body mb-6">
            A lightweight "story health check" for your project.
          </p>
          <HealthCheck project={project} />
        </div>
      </main>
    </>
  );
}

export default function RevisionPage() {
  return (
    <Suspense fallback={<main className="loading-container"><div className="loading-content max-w-4xl">Loading...</div></main>}>
      <RevisionContent />
    </Suspense>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProject } from '@/utils/storage';
import { Project } from '@/types/project';
import HealthCheck from '@/components/revision/HealthCheck';

export default function RevisionPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      const loaded = getProject(projectId);
      setProject(loaded);
    }
    setLoading(false);
  }, [projectId]);

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
    <main className="page-container">
      <div className="page-content max-w-4xl">
        <h1 className="page-heading-light">Revision Mode</h1>
        <p className="text-body mb-6">
          A lightweight "story health check" for your project.
        </p>
        <HealthCheck project={project} />
      </div>
    </main>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProject } from '@/utils/storage';
import { Project } from '@/types/project';
import Layout from '@/components/structure/Layout';

export default function StructurePage() {
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
        <div className="loading-content">Loading...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="error-container">
        <div className="error-content">
          <p>Project not found. Please create a new project.</p>
        </div>
      </main>
    );
  }

  return <Layout project={project} onProjectUpdate={setProject} />;
}


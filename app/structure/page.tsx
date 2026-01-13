'use client';

import { useEffect, useState, Suspense } from 'react';
import { getProject } from '@/utils/storage';
import { Project } from '@/types/project';
import Layout from '@/components/structure/Layout';

export const dynamic = 'force-dynamic';

function StructureContent() {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('project')
        : null;
    setProjectId(id);

    if (id) {
      const loaded = getProject(id);
      setProject(loaded);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className='loading-container'>
        <div className='loading-content'>Loading...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className='error-container'>
        <div className='error-content'>
          <p>Project not found. Please create a new project.</p>
        </div>
      </main>
    );
  }

  return <Layout project={project} onProjectUpdate={setProject} />;
}

export default function StructurePage() {
  return (
    <Suspense fallback={<main className='loading-container'><div className='loading-content'>Loading...</div></main>}>
      <StructureContent />
    </Suspense>
  );
}

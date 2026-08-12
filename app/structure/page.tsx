'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import { getProject } from '@/utils/storage';
import { Project } from '@/types/project';
import Layout from '@/components/structure/Layout';
import { useDebouncedSave } from '@/hooks/useDebouncedSave';

export const dynamic = 'force-dynamic';

function StructureContent() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { isSaving, scheduleSave } = useDebouncedSave();

  useEffect(() => {
    const loadProject = async () => {
      const id =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('project')
          : null;

      if (id) {
        const loaded = await getProject(id);
        setProject(loaded);
      }
      setLoading(false);
    };

    loadProject();
  }, []);

  const handleProjectUpdate = useCallback(
    (updatedProject: Project) => {
      setProject(updatedProject);
      scheduleSave(updatedProject);
    },
    [scheduleSave]
  );

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

  return (
    <Layout
      project={project}
      onProjectUpdate={handleProjectUpdate}
      isSaving={isSaving}
    />
  );
}

export default function StructurePage() {
  return (
    <Suspense fallback={<main className="loading-container"><div className="loading-content">Loading...</div></main>}>
      <StructureContent />
    </Suspense>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllProjects } from '@/utils/storage';
import { Project } from '@/types/project';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  return (
    <main className="page-container">
      <div className="page-content">
        <h1 className="page-heading">Snowflake Novel Planner</h1>
        
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

        {projects.length === 0 && (
          <div className="empty-state">
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        )}
      </div>
    </main>
  );
}


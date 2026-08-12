'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { deleteProject, duplicateProject, saveProject } from '@/utils/storage';
import ExportButton from '@/components/common/ExportButton';

interface ProjectCardProps {
  project: Project;
  onUpdated: () => void;
}

export default function ProjectCard({ project, onUpdated }: ProjectCardProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [isBusy, setIsBusy] = useState(false);

  const handleRename = async () => {
    const trimmed = title.trim();
    if (!trimmed || trimmed === project.title) {
      setIsRenaming(false);
      setTitle(project.title);
      return;
    }

    setIsBusy(true);
    try {
      await saveProject({ ...project, title: trimmed });
      setIsRenaming(false);
      onUpdated();
    } catch (error) {
      console.error('Error renaming project:', error);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDuplicate = async () => {
    setIsBusy(true);
    try {
      const copy = duplicateProject(project);
      await saveProject(copy);
      onUpdated();
    } catch (error) {
      console.error('Error duplicating project:', error);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;

    setIsBusy(true);
    try {
      await deleteProject(project.id);
      onUpdated();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="project-card">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          {isRenaming ? (
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename();
                  if (e.key === 'Escape') {
                    setIsRenaming(false);
                    setTitle(project.title);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleRename}
                disabled={isBusy}
                className="btn-primary-action text-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRenaming(false);
                  setTitle(project.title);
                }}
                className="btn-secondary-action text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <Link href={`/structure?project=${project.id}`} className="flex-1">
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-meta">
                Last updated: {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/structure?project=${project.id}`}
            className="btn-primary-action text-sm"
          >
            Open
          </Link>
          <Link
            href={`/revision?project=${project.id}`}
            className="btn-secondary-action text-sm"
          >
            Revision
          </Link>
          <ExportButton project={project} compact />
          <button
            type="button"
            onClick={() => setIsRenaming(true)}
            disabled={isBusy || isRenaming}
            className="btn-secondary-action text-sm"
          >
            Rename
          </button>
          <button
            type="button"
            onClick={handleDuplicate}
            disabled={isBusy}
            className="btn-secondary-action text-sm"
          >
            Duplicate
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isBusy}
            className="btn-danger text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

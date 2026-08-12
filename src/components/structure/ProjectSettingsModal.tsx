'use client';

import { useEffect } from 'react';
import { Project } from '@/types/project';
import ProjectIdentityForm from '@/components/common/ProjectIdentityForm';

interface ProjectSettingsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export default function ProjectSettingsModal({
  project,
  isOpen,
  onClose,
  onSave,
}: ProjectSettingsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-settings-title"
        className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto bg-gray-900 border border-gray-800 rounded-xl shadow-xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="project-settings-title" className="text-heading-1">
              Project Settings
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="btn-close min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close settings"
            >
              ✕
            </button>
          </div>
          <p className="text-body mb-6">
            Update your project title, genre, and STC archetype selections. Tips and guidance will reflect these choices.
          </p>
          <ProjectIdentityForm
            project={project}
            showTitle
            submitLabel="Save Settings"
            onSubmit={(values) => {
              onSave({
                ...project,
                title: values.title,
                primaryGenreId: values.primaryGenreId,
                secondaryGenreIds: values.secondaryGenreIds,
                primaryStcId: values.primaryStcId,
                secondaryStcId: values.secondaryStcId,
              });
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}

'use client';

import { Project } from '@/types/project';
import { downloadProject } from '@/utils/export';

interface ExportButtonProps {
  project: Project;
  compact?: boolean;
}

export default function ExportButton({ project, compact = false }: ExportButtonProps) {
  const handleExport = () => {
    downloadProject(project);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className={compact ? 'btn-secondary-action text-sm' : 'btn-secondary-action'}
    >
      Export
    </button>
  );
}

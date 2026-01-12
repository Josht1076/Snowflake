'use client';

import { Project } from '@/types/project';
import { downloadProject } from '@/utils/export';

interface ExportButtonProps {
  project: Project;
}

export default function ExportButton({ project }: ExportButtonProps) {
  const handleExport = () => {
    downloadProject(project);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
    >
      Export Project
    </button>
  );
}


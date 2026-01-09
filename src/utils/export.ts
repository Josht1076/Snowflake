/**
 * JSON export functionality
 */

import { Project } from '@/types/project';

/**
 * Export project as JSON
 */
export function exportProject(project: Project): string {
  return JSON.stringify(project, null, 2);
}

/**
 * Download project as JSON file
 */
export function downloadProject(project: Project, filename?: string): void {
  const json = exportProject(project);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `${project.title.replace(/\s+/g, '-')}-export.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


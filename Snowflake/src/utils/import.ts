/**
 * JSON import with validation
 */

import { Project } from '@/types/project';
import { migrateProject, validateProject } from './migration';

/**
 * Import project from JSON string
 */
export function importProject(jsonString: string): Project | null {
  try {
    const data = JSON.parse(jsonString);
    const migrated = migrateProject(data);
    
    if (!validateProject(migrated)) {
      console.error('Invalid project structure');
      return null;
    }

    return migrated;
  } catch (error) {
    console.error('Error importing project:', error);
    return null;
  }
}

/**
 * Import project from file
 */
export async function importProjectFromFile(file: File): Promise<Project | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const project = importProject(text);
      resolve(project);
    };
    reader.onerror = () => {
      console.error('Error reading file');
      resolve(null);
    };
    reader.readAsText(file);
  });
}


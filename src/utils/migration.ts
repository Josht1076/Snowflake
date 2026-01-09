/**
 * Project schema migration logic
 * Handles version upgrades for project data
 */

import { Project } from '@/types/project';

/**
 * Migrate project to current schema version
 * Currently all projects start at v1, but this hook is ready for future migrations
 */
export function migrateProject(projectData: any): Project {
  // Ensure schemaVersion exists
  if (!projectData.schemaVersion) {
    projectData.schemaVersion = 1;
  }

  // Future migrations would go here:
  // if (projectData.schemaVersion === 1) {
  //   // Upgrade to v2
  //   projectData.schemaVersion = 2;
  // }

  return projectData as Project;
}

/**
 * Validate project structure
 */
export function validateProject(project: Project): boolean {
  if (!project.id || !project.title) {
    return false;
  }
  if (typeof project.schemaVersion !== 'number') {
    return false;
  }
  if (!project.snowflakeContent || !project.stcContent || !project.scenes) {
    return false;
  }
  return true;
}


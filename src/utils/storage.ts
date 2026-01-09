/**
 * LocalStorage/IndexedDB wrapper with migration
 * Handles project persistence
 */

import { Project } from '@/types/project';
import { migrateProject, validateProject } from './migration';

const STORAGE_KEY = 'snowflake-projects';
const CURRENT_PROJECT_KEY = 'snowflake-current-project';

/**
 * Get all projects from storage
 */
export function getAllProjects(): Project[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const projects = JSON.parse(stored) as any[];
    return projects.map((p) => migrateProject(p)).filter(validateProject);
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

/**
 * Save a project to storage
 */
export function saveProject(project: Project): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const projects = getAllProjects();
    const index = projects.findIndex((p) => p.id === project.id);

    // Update existing or add new
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }

    // Update timestamp
    project.updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving project:', error);
  }
}

/**
 * Get a project by ID
 */
export function getProject(id: string): Project | null {
  const projects = getAllProjects();
  return projects.find((p) => p.id === id) || null;
}

/**
 * Delete a project
 */
export function deleteProject(id: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const projects = getAllProjects();
    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting project:', error);
  }
}

/**
 * Get current project ID
 */
export function getCurrentProjectId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(CURRENT_PROJECT_KEY);
}

/**
 * Set current project ID
 */
export function setCurrentProjectId(id: string | null): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (id) {
    localStorage.setItem(CURRENT_PROJECT_KEY, id);
  } else {
    localStorage.removeItem(CURRENT_PROJECT_KEY);
  }
}

/**
 * Create a new project with default structure
 */
export function createNewProject(title: string): Project {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    id: `project-${Date.now()}`,
    title,
    createdAt: now,
    updatedAt: now,
    primaryGenreId: null,
    secondaryGenreIds: [],
    primaryStcId: null,
    secondaryStcId: null,
    snowflakeContent: {},
    stcContent: {},
    scenes: [],
  };
}


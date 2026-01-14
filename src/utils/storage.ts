/**
 * Storage wrapper with Supabase and localStorage fallback
 * Handles project persistence with automatic sync
 */

import { Project } from '@/types/project';
import { migrateProject, validateProject } from './migration';
import * as supabaseStorage from './supabaseStorage';
import { createClient } from '@/lib/supabase/client';

const STORAGE_KEY = 'snowflake-projects';
const CURRENT_PROJECT_KEY = 'snowflake-current-project';

/**
 * Check if user is authenticated
 */
async function isAuthenticated(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return !!user;
  } catch (error) {
    return false;
  }
}

/**
 * Get all projects from storage (Supabase if authenticated, localStorage otherwise)
 */
export async function getAllProjects(): Promise<Project[]> {
  if (typeof window === 'undefined') {
    return [];
  }

  // Try Supabase first if authenticated
  if (await isAuthenticated()) {
    try {
      return await supabaseStorage.getAllProjects();
    } catch (error) {
      console.error('Error loading from Supabase, falling back to localStorage:', error);
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
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
 * Save a project to storage (Supabase if authenticated, localStorage otherwise)
 */
export async function saveProject(project: Project): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  // Update timestamp
  project.updatedAt = new Date().toISOString();

  // Try Supabase first if authenticated
  if (await isAuthenticated()) {
    try {
      await supabaseStorage.saveProject(project);
      // Also save to localStorage as backup
      await saveToLocalStorage(project);
      return;
    } catch (error) {
      console.error('Error saving to Supabase, falling back to localStorage:', error);
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  await saveToLocalStorage(project);
}

/**
 * Helper to save to localStorage
 */
async function saveToLocalStorage(project: Project): Promise<void> {
  try {
    const projects = await getAllProjectsFromLocalStorage();
    const index = projects.findIndex((p) => p.id === project.id);

    // Update existing or add new
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving project to localStorage:', error);
  }
}

/**
 * Helper to get all projects from localStorage
 */
function getAllProjectsFromLocalStorage(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const projects = JSON.parse(stored) as any[];
    return projects.map((p) => migrateProject(p)).filter(validateProject);
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    return [];
  }
}

/**
 * Get a project by ID
 */
export async function getProject(id: string): Promise<Project | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  // Try Supabase first if authenticated
  if (await isAuthenticated()) {
    try {
      const project = await supabaseStorage.getProject(id);
      if (project) {
        return project;
      }
    } catch (error) {
      console.error('Error loading from Supabase, falling back to localStorage:', error);
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  const projects = getAllProjectsFromLocalStorage();
  return projects.find((p) => p.id === id) || null;
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  // Try Supabase first if authenticated
  if (await isAuthenticated()) {
    try {
      await supabaseStorage.deleteProject(id);
      // Also delete from localStorage
      await deleteFromLocalStorage(id);
      return;
    } catch (error) {
      console.error('Error deleting from Supabase, falling back to localStorage:', error);
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  await deleteFromLocalStorage(id);
}

/**
 * Helper to delete from localStorage
 */
async function deleteFromLocalStorage(id: string): Promise<void> {
  try {
    const projects = getAllProjectsFromLocalStorage();
    const filtered = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting project from localStorage:', error);
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
    id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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


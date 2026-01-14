/**
 * Supabase storage implementation
 * Handles project persistence in Supabase database
 */

import { createClient } from '@/lib/supabase/client';
import { Project } from '@/types/project';
import { migrateProject, validateProject } from './migration';

interface SupabaseProject {
  id: string;
  user_id: string;
  title: string;
  schema_version: number;
  primary_genre_id: string | null;
  secondary_genre_ids: string[];
  primary_stc_id: string | null;
  secondary_stc_id: string | null;
  snowflake_content: Record<string, any>;
  stc_content: Record<string, any>;
  scenes: any[];
  quiz_result_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert Project to Supabase format
 */
function projectToSupabase(project: Project, userId: string): Omit<SupabaseProject, 'id' | 'created_at' | 'updated_at'> {
  return {
    user_id: userId,
    title: project.title,
    schema_version: project.schemaVersion,
    primary_genre_id: project.primaryGenreId,
    secondary_genre_ids: project.secondaryGenreIds,
    primary_stc_id: project.primaryStcId,
    secondary_stc_id: project.secondaryStcId,
    snowflake_content: project.snowflakeContent,
    stc_content: project.stcContent,
    scenes: project.scenes,
    quiz_result_id: project.quizResultId,
  };
}

/**
 * Convert Supabase format to Project
 */
function supabaseToProject(row: SupabaseProject): Project {
  return {
    schemaVersion: row.schema_version,
    id: row.id,
    title: row.title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    primaryGenreId: row.primary_genre_id,
    secondaryGenreIds: row.secondary_genre_ids || [],
    primaryStcId: row.primary_stc_id,
    secondaryStcId: row.secondary_stc_id,
    snowflakeContent: row.snowflake_content || {},
    stcContent: row.stc_content || {},
    scenes: row.scenes || [],
    quizResultId: row.quiz_result_id,
  };
}

/**
 * Get all projects for the current user
 */
export async function getAllProjects(): Promise<Project[]> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error loading projects from Supabase:', error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data
    .map((row) => {
      try {
        const project = supabaseToProject(row as SupabaseProject);
        return migrateProject(project);
      } catch (error) {
        console.error('Error migrating project:', error);
        return null;
      }
    })
    .filter((p): p is Project => p !== null && validateProject(p));
}

/**
 * Save a project to Supabase
 */
export async function saveProject(project: Project): Promise<void> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Update timestamp
  const updatedProject = {
    ...project,
    updatedAt: new Date().toISOString(),
  };

  const supabaseData = projectToSupabase(updatedProject, user.id);

  const { error } = await supabase
    .from('projects')
    .upsert({
      id: project.id,
      ...supabaseData,
    }, {
      onConflict: 'id',
    });

  if (error) {
    console.error('Error saving project to Supabase:', error);
    throw error;
  }
}

/**
 * Get a project by ID
 */
export async function getProject(id: string): Promise<Project | null> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error loading project from Supabase:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  try {
    const project = supabaseToProject(data as SupabaseProject);
    return migrateProject(project);
  } catch (error) {
    console.error('Error migrating project:', error);
    return null;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting project from Supabase:', error);
    throw error;
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

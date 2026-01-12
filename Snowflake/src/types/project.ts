/**
 * Project schema with versioning
 * Core data model for novel planning projects
 */

export interface Project {
  schemaVersion: number; // Start with 1
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

  primaryGenreId: string | null;
  secondaryGenreIds: string[];

  primaryStcId: string | null;
  secondaryStcId: string | null;

  // Snowflake-focused content
  snowflakeContent: Record<string, SnowflakeStepContent>; // keyed by step id

  // STC beat notes
  stcContent: Record<string, StcBeatContent>;

  // Scene planning
  scenes: SceneCard[];

  // For quiz audit/history if needed
  quizResultId?: string;
}

export interface SnowflakeStepContent {
  stepId: string;
  text: string;
  status: 'not_started' | 'in_progress' | 'complete';
}

export interface StcBeatContent {
  beatId: string;
  text: string;
  status: 'not_started' | 'in_progress' | 'complete';
}

export interface SceneCard {
  id: string;
  title: string;
  briefPurpose: string;
  relatedSnowflakeStepId?: string; // usually Step 7–8
  relatedStcBeatId?: string;
}


/**
 * Framework abstraction layer
 * Allows modular addition of different planning frameworks
 */

export type FrameworkId = 'snowflake' | 'stc';

export interface Framework {
  id: FrameworkId;
  name: string;
  steps: FrameworkStep[];
}

export interface FrameworkStep {
  id: string; // e.g. 'sf_step_1', 'stc_opening_image'
  frameworkId: FrameworkId;
  title: string;
  description: string;
  order: number;
  group?: string; // e.g. "Act I"
}

export interface FrameworkMapping {
  snowflakeStepId: string;
  stcBeatIds: string[];
}


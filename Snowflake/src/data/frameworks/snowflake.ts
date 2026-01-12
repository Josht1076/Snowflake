/**
 * Snowflake Method framework definition
 * Steps 1-8 as the primary structure
 */

import { Framework, FrameworkStep } from '@/types/framework';

export const snowflakeFramework: Framework = {
  id: 'snowflake',
  name: 'Snowflake Method',
  steps: [
    {
      id: 'sf_step_1',
      frameworkId: 'snowflake',
      title: 'One-Sentence Summary',
      description: 'Write a one-sentence summary of your novel (≤15 words, no character names).',
      order: 1,
    },
    {
      id: 'sf_step_2',
      frameworkId: 'snowflake',
      title: 'One-Paragraph Summary',
      description: 'Expand the sentence into a paragraph: setup, 3 major disasters (each a quarter of the book), and ending.',
      order: 2,
    },
    {
      id: 'sf_step_3',
      frameworkId: 'snowflake',
      title: 'Character Summaries',
      description: 'For each major character: one-page sheet with name, one-sentence storyline, motivation, goal, conflict, epiphany, 1-paragraph storyline.',
      order: 3,
    },
    {
      id: 'sf_step_4',
      frameworkId: 'snowflake',
      title: 'One-Page Plot Synopsis',
      description: 'Expand each sentence of Step 2\'s paragraph into a paragraph (ending in disasters, except last).',
      order: 4,
    },
    {
      id: 'sf_step_5',
      frameworkId: 'snowflake',
      title: 'Extended Character Synopses',
      description: 'One-page description for each major character, half-page for others, from their POV.',
      order: 5,
    },
    {
      id: 'sf_step_6',
      frameworkId: 'snowflake',
      title: 'Four-Page Plot Synopsis',
      description: 'Expand the 1-page synopsis to 4 pages (each paragraph → 1 page).',
      order: 6,
    },
    {
      id: 'sf_step_7',
      frameworkId: 'snowflake',
      title: 'Full Character Charts',
      description: 'Detailed character charts: bio, history, motivation, goals, and especially how they change by the end.',
      order: 7,
    },
    {
      id: 'sf_step_8',
      frameworkId: 'snowflake',
      title: 'Scene List',
      description: 'Convert the 4-page synopsis into a scene list: one line per scene, with at least POV character + scene description, then group into chapters.',
      order: 8,
    },
  ],
};

export const snowflakeSteps: FrameworkStep[] = snowflakeFramework.steps;


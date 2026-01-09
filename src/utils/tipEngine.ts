/**
 * Tip resolution logic
 * Filters tips based on step, genre, and STC archetype
 */

import { Tip, getTipsForContext } from '@/data/tips';
import { Project } from '@/types/project';

/**
 * Get tips for a project and step
 */
export function getTipsForStep(project: Project, stepId: string): {
  primary: Tip[];
  secondary: Tip[];
} {
  const primaryTips = getTipsForContext(
    stepId,
    project.primaryGenreId,
    project.secondaryGenreIds,
    project.primaryStcId,
    project.secondaryStcId
  );

  const secondaryTips = project.secondaryGenreIds.length > 0
    ? getTipsForContext(
        stepId,
        null,
        project.secondaryGenreIds,
        project.primaryStcId,
        project.secondaryStcId
      ).filter((tip) =>
        tip.appliesToGenres?.some((g) => project.secondaryGenreIds.includes(g))
      )
    : [];

  return {
    primary: primaryTips,
    secondary: secondaryTips,
  };
}


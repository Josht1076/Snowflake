/**
 * Priority rules for next step suggestion
 */

import { Project } from '@/types/project';
import { snowflakeSteps } from '@/data/frameworks/snowflake';
import { stcBeats } from '@/data/frameworks/stc';

export interface NextStepSuggestion {
  type: 'snowflake' | 'stc' | 'scene';
  id: string;
  title: string;
  reason: string;
}

/**
 * Get the next recommended step
 */
export function getNextStepSuggestion(project: Project): NextStepSuggestion | null {
  // Find next incomplete Snowflake step
  for (const step of snowflakeSteps) {
    const content = project.snowflakeContent[step.id];
    if (!content || content.status !== 'complete') {
      return {
        type: 'snowflake',
        id: step.id,
        title: step.title,
        reason: 'Next incomplete Snowflake step',
      };
    }
  }

  // Check key STC beats
  const keyBeats = ['stc_opening_image', 'stc_catalyst', 'stc_midpoint', 'stc_all_is_lost', 'stc_finale'];
  for (const beatId of keyBeats) {
    const content = project.stcContent[beatId];
    if (!content || !content.text.trim()) {
      const beat = stcBeats.find((b) => b.id === beatId);
      return {
        type: 'stc',
        id: beatId,
        title: beat?.title || beatId,
        reason: 'Key STC beat needs content',
      };
    }
  }

  // Check for unlinked scenes
  const unlinkedScenes = project.scenes.filter(
    (s) => !s.relatedSnowflakeStepId && !s.relatedStcBeatId
  );
  if (unlinkedScenes.length > 0) {
    return {
      type: 'scene',
      id: unlinkedScenes[0].id,
      title: unlinkedScenes[0].title,
      reason: 'Scene needs to be linked to a step or beat',
    };
  }

  return null;
}


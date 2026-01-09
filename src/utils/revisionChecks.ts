/**
 * Rule-based validation logic for revision mode
 */

import { Project } from '@/types/project';
import { snowflakeSteps } from '@/data/frameworks/snowflake';
import { stcBeats } from '@/data/frameworks/stc';

export interface RevisionCheck {
  status: 'pass' | 'warning' | 'fail';
  message: string;
  details?: string;
}

/**
 * Run all revision checks on a project
 */
export function runRevisionChecks(project: Project): RevisionCheck[] {
  const checks: RevisionCheck[] = [];

  // Check Snowflake Steps 1-3 completion
  const steps1to3 = snowflakeSteps.slice(0, 3);
  steps1to3.forEach((step) => {
    const content = project.snowflakeContent[step.id];
    if (!content || content.status !== 'complete') {
      checks.push({
        status: 'warning',
        message: `${step.title} is not complete`,
        details: 'Steps 1-3 should be filled in before moving forward.',
      });
    }
  });

  // Check key STC beats have content
  const keyBeats = ['stc_opening_image', 'stc_catalyst', 'stc_midpoint', 'stc_all_is_lost', 'stc_finale'];
  keyBeats.forEach((beatId) => {
    const content = project.stcContent[beatId];
    if (!content || !content.text.trim()) {
      const beat = stcBeats.find((b) => b.id === beatId);
      checks.push({
        status: 'warning',
        message: `Key beat "${beat?.title || beatId}" has no content`,
        details: 'Consider adding content for this important story beat.',
      });
    }
  });

  // Check scene linkage
  if (project.scenes.length > 0) {
    const unlinkedScenes = project.scenes.filter(
      (s) => !s.relatedSnowflakeStepId && !s.relatedStcBeatId
    );
    if (unlinkedScenes.length > 0) {
      checks.push({
        status: 'warning',
        message: `${unlinkedScenes.length} scene(s) are not linked to steps or beats`,
        details: 'Consider linking scenes to Snowflake steps or STC beats for better organization.',
      });
    }
  }

  // Simple keyword consistency check (Step 1 logline vs Finale)
  const step1Content = project.snowflakeContent['sf_step_1'];
  const finaleContent = project.stcContent['stc_finale'];
  if (step1Content?.text && finaleContent?.text) {
    const step1Words = new Set(
      step1Content.text.toLowerCase().split(/\s+/).filter((w) => w.length > 3)
    );
    const finaleWords = new Set(
      finaleContent.text.toLowerCase().split(/\s+/).filter((w) => w.length > 3)
    );
    const commonWords = Array.from(step1Words).filter((w) => finaleWords.has(w));
    if (commonWords.length === 0) {
      checks.push({
        status: 'warning',
        message: 'Step 1 logline and Finale beat share no major common words',
        details: 'This might indicate a disconnect between your opening concept and ending.',
      });
    }
  }

  // If all checks pass, add a success message
  if (checks.length === 0) {
    checks.push({
      status: 'pass',
      message: 'All health checks passed!',
      details: 'Your project structure looks good.',
    });
  }

  return checks;
}


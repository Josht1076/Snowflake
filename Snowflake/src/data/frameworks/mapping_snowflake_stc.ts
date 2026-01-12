/**
 * Mapping between Snowflake steps and STC beats
 * Used to show relevant beats in Snowflake step editors
 */

import { FrameworkMapping } from '@/types/framework';

export const snowflakeStcMapping: FrameworkMapping[] = [
  {
    snowflakeStepId: 'sf_step_1',
    stcBeatIds: ['stc_opening_image', 'stc_theme_stated', 'stc_final_image'],
  },
  {
    snowflakeStepId: 'sf_step_2',
    stcBeatIds: [
      'stc_setup',
      'stc_catalyst',
      'stc_break_into_two',
      'stc_midpoint',
      'stc_all_is_lost',
      'stc_finale',
    ],
  },
  {
    snowflakeStepId: 'sf_step_3',
    stcBeatIds: ['stc_setup', 'stc_b_story', 'stc_midpoint', 'stc_all_is_lost', 'stc_finale'],
  },
  {
    snowflakeStepId: 'sf_step_4',
    stcBeatIds: [
      'stc_setup',
      'stc_catalyst',
      'stc_break_into_two',
      'stc_fun_and_games',
      'stc_midpoint',
      'stc_bad_guys_close_in',
      'stc_all_is_lost',
      'stc_finale',
    ],
  },
  {
    snowflakeStepId: 'sf_step_5',
    stcBeatIds: ['stc_setup', 'stc_b_story', 'stc_midpoint', 'stc_all_is_lost'],
  },
  {
    snowflakeStepId: 'sf_step_6',
    stcBeatIds: [
      'stc_setup',
      'stc_catalyst',
      'stc_break_into_two',
      'stc_fun_and_games',
      'stc_midpoint',
      'stc_bad_guys_close_in',
      'stc_all_is_lost',
      'stc_dark_night_of_the_soul',
      'stc_break_into_three',
      'stc_finale',
    ],
  },
  {
    snowflakeStepId: 'sf_step_7',
    stcBeatIds: [
      'stc_setup',
      'stc_b_story',
      'stc_midpoint',
      'stc_all_is_lost',
      'stc_finale',
    ],
  },
  {
    snowflakeStepId: 'sf_step_8',
    stcBeatIds: [
      'stc_opening_image',
      'stc_setup',
      'stc_catalyst',
      'stc_break_into_two',
      'stc_fun_and_games',
      'stc_midpoint',
      'stc_bad_guys_close_in',
      'stc_all_is_lost',
      'stc_break_into_three',
      'stc_finale',
      'stc_final_image',
    ],
  },
];

/**
 * Get STC beat IDs for a given Snowflake step
 */
export function getStcBeatsForSnowflakeStep(snowflakeStepId: string): string[] {
  const mapping = snowflakeStcMapping.find((m) => m.snowflakeStepId === snowflakeStepId);
  return mapping?.stcBeatIds || [];
}

/**
 * Get Snowflake step IDs for a given STC beat
 */
export function getSnowflakeStepsForStcBeat(stcBeatId: string): string[] {
  return snowflakeStcMapping
    .filter((m) => m.stcBeatIds.includes(stcBeatId))
    .map((m) => m.snowflakeStepId);
}


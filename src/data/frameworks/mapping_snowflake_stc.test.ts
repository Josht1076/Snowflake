import { describe, expect, it } from 'vitest';
import { stcBeats } from '@/data/frameworks/stc';
import {
  getSnowflakeStepsForStcBeat,
  snowflakeStcMapping,
} from '@/data/frameworks/mapping_snowflake_stc';

describe('snowflakeStcMapping', () => {
  it('maps every STC beat to at least one Snowflake step', () => {
    const unmapped = stcBeats
      .map((beat) => beat.id)
      .filter((beatId) => getSnowflakeStepsForStcBeat(beatId).length === 0);

    expect(unmapped).toEqual([]);
  });

  it('includes stc_debate in Act I progression steps', () => {
    const stepsWithDebate = snowflakeStcMapping
      .filter((mapping) => mapping.stcBeatIds.includes('stc_debate'))
      .map((mapping) => mapping.snowflakeStepId);

    expect(stepsWithDebate.length).toBeGreaterThan(0);
    expect(stepsWithDebate).toContain('sf_step_2');
  });
});

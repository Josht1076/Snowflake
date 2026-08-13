import { describe, expect, it } from 'vitest';
import { SceneCard } from '@/types/project';
import { getScenesForSnowflakeStep, getScenesForStcBeat } from '@/utils/sceneLinks';

const scenes: SceneCard[] = [
  {
    id: 'scene-a',
    title: 'Scene A',
    briefPurpose: 'Opening',
    relatedSnowflakeStepId: 'sf_step_1',
    relatedStcBeatId: 'stc_opening_image',
  },
  {
    id: 'scene-b',
    title: 'Scene B',
    briefPurpose: 'Catalyst moment',
    relatedSnowflakeStepId: 'sf_step_2',
    relatedStcBeatId: 'stc_catalyst',
  },
  {
    id: 'scene-c',
    title: 'Scene C',
    briefPurpose: 'Unlinked',
  },
];

describe('sceneLinks', () => {
  it('returns scenes linked to a Snowflake step', () => {
    expect(getScenesForSnowflakeStep(scenes, 'sf_step_1').map((s) => s.id)).toEqual(['scene-a']);
    expect(getScenesForSnowflakeStep(scenes, 'sf_step_8')).toEqual([]);
  });

  it('returns scenes linked to an STC beat', () => {
    expect(getScenesForStcBeat(scenes, 'stc_opening_image').map((s) => s.id)).toEqual(['scene-a']);
    expect(getScenesForStcBeat(scenes, 'stc_finale')).toEqual([]);
  });
});

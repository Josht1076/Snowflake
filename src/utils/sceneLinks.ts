import { SceneCard } from '@/types/project';

export function getScenesForSnowflakeStep(
  scenes: SceneCard[],
  stepId: string
): SceneCard[] {
  return scenes.filter((scene) => scene.relatedSnowflakeStepId === stepId);
}

export function getScenesForStcBeat(scenes: SceneCard[], beatId: string): SceneCard[] {
  return scenes.filter((scene) => scene.relatedStcBeatId === beatId);
}

'use client';

import { SceneCard } from '@/types/project';

interface SceneCardProps {
  scene: SceneCard;
  isSelected: boolean;
  onClick: () => void;
}

export default function SceneCardComponent({ scene, isSelected, onClick }: SceneCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-colors ${
        isSelected ? 'card-selected' : 'card-interactive'
      }`}
    >
      <div className="font-medium">{scene.title}</div>
      {scene.briefPurpose && (
        <div className="text-body-sm mt-1">{scene.briefPurpose}</div>
      )}
    </button>
  );
}


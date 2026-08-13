'use client';

import { useState } from 'react';
import { SceneCard } from '@/types/project';

interface LinkedScenesPanelProps {
  scenes: SceneCard[];
  panelId: string;
  onSceneSelect: (sceneId: string) => void;
}

export default function LinkedScenesPanel({
  scenes,
  panelId,
  onSceneSelect,
}: LinkedScenesPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentId = `${panelId}-linked-scenes`;

  if (scenes.length === 0) {
    return null;
  }

  return (
    <div className="card-blue mt-6 p-4">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 text-left min-h-[44px]"
        aria-expanded={!isCollapsed}
        aria-controls={contentId}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <h3 className="text-heading-3">
          Linked scenes
          <span className="ml-2 text-body-sm text-gray-400">({scenes.length})</span>
        </h3>
        <span className="text-gray-400 text-lg shrink-0" aria-hidden="true">
          {isCollapsed ? '▶' : '▼'}
        </span>
      </button>

      {!isCollapsed && (
        <ul id={contentId} className="mt-3 space-y-2">
          {scenes.map((scene) => (
            <li key={scene.id}>
              <button
                type="button"
                onClick={() => onSceneSelect(scene.id)}
                className="w-full text-left p-3 rounded-lg border border-[var(--card-border)] bg-gray-900/50 hover:bg-gray-800 hover:border-primary/40 transition-colors min-h-[44px]"
              >
                <span className="font-medium text-white">{scene.title}</span>
                {scene.briefPurpose && (
                  <p className="text-body-sm mt-1 text-gray-400 line-clamp-2">
                    {scene.briefPurpose}
                  </p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

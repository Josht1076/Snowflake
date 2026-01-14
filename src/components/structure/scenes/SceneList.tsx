'use client';

import { Project, SceneCard } from '@/types/project';
import { useState, useEffect } from 'react';
import SceneCardComponent from './SceneCard';
import SceneEditor from './SceneEditor';

interface SceneListProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
  initialSelectedSceneId?: string | null;
}

export default function SceneList({ project, onProjectUpdate, initialSelectedSceneId }: SceneListProps) {
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(initialSelectedSceneId || null);
  const [showEditor, setShowEditor] = useState(false);

  // Update selected scene when initialSelectedSceneId changes
  useEffect(() => {
    if (initialSelectedSceneId) {
      setSelectedSceneId(initialSelectedSceneId);
      setShowEditor(true);
    }
  }, [initialSelectedSceneId]);

  const selectedScene = selectedSceneId
    ? project.scenes.find((s) => s.id === selectedSceneId)
    : null;

  const handleCreateScene = () => {
    const newScene: SceneCard = {
      id: `scene-${Date.now()}`,
      title: 'New Scene',
      briefPurpose: '',
    };
    const updated = {
      ...project,
      scenes: [...project.scenes, newScene],
    };
    onProjectUpdate(updated);
    setSelectedSceneId(newScene.id);
    setShowEditor(true);
  };

  const handleUpdateScene = (updatedScene: SceneCard) => {
    const updated = {
      ...project,
      scenes: project.scenes.map((s) => (s.id === updatedScene.id ? updatedScene : s)),
    };
    onProjectUpdate(updated);
  };

  const handleDeleteScene = (sceneId: string) => {
    const updated = {
      ...project,
      scenes: project.scenes.filter((s) => s.id !== sceneId),
    };
    onProjectUpdate(updated);
    if (selectedSceneId === sceneId) {
      setSelectedSceneId(null);
      setShowEditor(false);
    }
  };

  return (
    <div className="scene-list-container">
      <div className="scene-list-sidebar">
        <div className="mb-4">
          <button
            onClick={handleCreateScene}
            className="w-full btn-primary-action"
          >
            + New Scene
          </button>
        </div>
        <div className="item-spacing">
          {project.scenes.map((scene) => (
            <SceneCardComponent
              key={scene.id}
              scene={scene}
              isSelected={selectedSceneId === scene.id}
              onClick={() => {
                setSelectedSceneId(scene.id);
                setShowEditor(true);
              }}
            />
          ))}
        </div>
      </div>
      <div className="scene-list-content">
        {showEditor && selectedScene ? (
          <SceneEditor
            scene={selectedScene}
            onUpdate={handleUpdateScene}
            onDelete={handleDeleteScene}
            onClose={() => {
              setShowEditor(false);
              setSelectedSceneId(null);
            }}
          />
        ) : (
          <div className="scene-list-empty">
            {project.scenes.length === 0
              ? 'No scenes yet. Create your first scene!'
              : 'Select a scene to edit'}
          </div>
        )}
      </div>
    </div>
  );
}


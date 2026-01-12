'use client';

import { useState, useEffect } from 'react';
import { SceneCard } from '@/types/project';

interface SceneEditorProps {
  scene: SceneCard;
  onUpdate: (scene: SceneCard) => void;
  onDelete: (sceneId: string) => void;
  onClose: () => void;
}

export default function SceneEditor({ scene, onUpdate, onDelete, onClose }: SceneEditorProps) {
  const [title, setTitle] = useState(scene.title);
  const [briefPurpose, setBriefPurpose] = useState(scene.briefPurpose);
  const [relatedSnowflakeStepId, setRelatedSnowflakeStepId] = useState(
    scene.relatedSnowflakeStepId || ''
  );
  const [relatedStcBeatId, setRelatedStcBeatId] = useState(scene.relatedStcBeatId || '');

  useEffect(() => {
    setTitle(scene.title);
    setBriefPurpose(scene.briefPurpose);
    setRelatedSnowflakeStepId(scene.relatedSnowflakeStepId || '');
    setRelatedStcBeatId(scene.relatedStcBeatId || '');
  }, [scene]);

  const handleSave = () => {
    const updated: SceneCard = {
      ...scene,
      title,
      briefPurpose,
      relatedSnowflakeStepId: relatedSnowflakeStepId || undefined,
      relatedStcBeatId: relatedStcBeatId || undefined,
    };
    onUpdate(updated);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this scene?')) {
      onDelete(scene.id);
    }
  };

  return (
    <div className="section-spacing">
      <div className="flex justify-between items-center">
        <h2 className="text-heading-1">Edit Scene</h2>
        <button
          onClick={onClose}
          className="btn-close"
        >
          ✕
        </button>
      </div>

      <div>
        <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Brief Purpose</label>
        <textarea
          value={briefPurpose}
          onChange={(e) => setBriefPurpose(e.target.value)}
          className="form-textarea"
          rows={4}
          placeholder="Why does this scene exist?"
        />
      </div>

      <div>
        <label className="form-label">Related Snowflake Step (Optional)</label>
        <input
          type="text"
          value={relatedSnowflakeStepId}
          onChange={(e) => setRelatedSnowflakeStepId(e.target.value)}
          className="form-input"
          placeholder="e.g. sf_step_7"
        />
      </div>

      <div>
        <label className="form-label">Related STC Beat (Optional)</label>
        <input
          type="text"
          value={relatedStcBeatId}
          onChange={(e) => setRelatedStcBeatId(e.target.value)}
          className="form-input"
          placeholder="e.g. stc_midpoint"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="btn-primary-action"
        >
          Save Scene
        </button>
        <button
          onClick={handleDelete}
          className="btn-danger"
        >
          Delete Scene
        </button>
      </div>
    </div>
  );
}


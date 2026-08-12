'use client';

import { useState, useEffect } from 'react';
import { SceneCard } from '@/types/project';
import { snowflakeSteps } from '@/data/frameworks/snowflake';
import { stcBeats } from '@/data/frameworks/stc';

interface SceneEditorProps {
  scene: SceneCard;
  onUpdate: (scene: SceneCard) => void;
  onDelete: (sceneId: string) => void;
  onClose: () => void;
  showBackOnMobile?: boolean;
}

export default function SceneEditor({ scene, onUpdate, onDelete, onClose, showBackOnMobile }: SceneEditorProps) {
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

  const saveScene = (
    overrides: Partial<{
      title: string;
      briefPurpose: string;
      relatedSnowflakeStepId: string;
      relatedStcBeatId: string;
    }> = {}
  ) => {
    const nextTitle = overrides.title ?? title;
    const nextPurpose = overrides.briefPurpose ?? briefPurpose;
    const nextStepId = overrides.relatedSnowflakeStepId ?? relatedSnowflakeStepId;
    const nextBeatId = overrides.relatedStcBeatId ?? relatedStcBeatId;

    onUpdate({
      ...scene,
      title: nextTitle,
      briefPurpose: nextPurpose,
      relatedSnowflakeStepId: nextStepId || undefined,
      relatedStcBeatId: nextBeatId || undefined,
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this scene?')) {
      onDelete(scene.id);
    }
  };

  return (
    <div className="section-spacing">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {showBackOnMobile && (
            <button
              onClick={onClose}
              className="md:hidden flex items-center gap-1 text-gray-400 hover:text-white active:text-white transition-colors min-h-[44px] min-w-[44px] -ml-2"
              aria-label="Back to scene list"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h2 className="text-heading-1 truncate">Edit Scene</h2>
        </div>
        <button
          onClick={onClose}
          className="btn-close min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close editor"
        >
          ✕
        </button>
      </div>

      <div>
        <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            saveScene({ title: e.target.value });
          }}
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Brief Purpose</label>
        <textarea
          value={briefPurpose}
          onChange={(e) => {
            setBriefPurpose(e.target.value);
            saveScene({ briefPurpose: e.target.value });
          }}
          className="form-textarea"
          rows={4}
          placeholder="Why does this scene exist?"
        />
      </div>

      <div>
        <label htmlFor="related-snowflake-step" className="form-label">
          Related Snowflake Step (Optional)
        </label>
        <select
          id="related-snowflake-step"
          value={relatedSnowflakeStepId}
          onChange={(e) => {
            setRelatedSnowflakeStepId(e.target.value);
            saveScene({ relatedSnowflakeStepId: e.target.value });
          }}
          className="form-select"
        >
          <option value="">None</option>
          {snowflakeSteps.map((step) => (
            <option key={step.id} value={step.id}>
              {step.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="related-stc-beat" className="form-label">
          Related STC Beat (Optional)
        </label>
        <select
          id="related-stc-beat"
          value={relatedStcBeatId}
          onChange={(e) => {
            setRelatedStcBeatId(e.target.value);
            saveScene({ relatedStcBeatId: e.target.value });
          }}
          className="form-select"
        >
          <option value="">None</option>
          {stcBeats.map((beat) => (
            <option key={beat.id} value={beat.id}>
              {beat.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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

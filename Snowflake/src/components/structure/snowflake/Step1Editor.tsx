'use client';

import { useState, useEffect } from 'react';
import { Project, SnowflakeStepContent } from '@/types/project';
import { getStcBeatsForSnowflakeStep } from '@/data/frameworks/mapping_snowflake_stc';

interface Step1EditorProps {
  project: Project;
  content: SnowflakeStepContent;
  onUpdate: (text: string, status: 'not_started' | 'in_progress' | 'complete') => void;
}

export default function Step1Editor({ project, content, onUpdate }: Step1EditorProps) {
  const [text, setText] = useState(content.text);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [text]);

  const handleChange = (newText: string) => {
    setText(newText);
    const status = newText.trim() ? 'in_progress' : 'not_started';
    onUpdate(newText, status);
  };

  const handleComplete = () => {
    onUpdate(text, 'complete');
  };

  const relevantBeats = getStcBeatsForSnowflakeStep('sf_step_1');

  return (
    <div className="section-spacing">
      <div>
        <h2 className="text-heading-1 mb-2">Step 1: One-Sentence Summary</h2>
        <p className="text-body mb-4">
          Write a one-sentence summary of your novel (≤15 words, no character names).
        </p>
      </div>

      <div>
        <label className="form-label">
          One-Sentence Summary
          <span className={`ml-2 ${wordCount > 15 ? 'text-error' : 'text-body'}`}>
            ({wordCount} words)
          </span>
        </label>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          className="form-textarea"
          placeholder="A reluctant princess must protect her city from a rising cosmic threat."
          rows={3}
        />
        {wordCount > 15 && (
          <p className="text-error mt-1">
            Try to keep it under 15 words for a stronger logline.
          </p>
        )}
      </div>

      {relevantBeats.length > 0 && (
        <div className="card-blue">
          <h3 className="text-heading-3 mb-2">Related STC Beats</h3>
          <ul className="list-item list-spacing">
            {relevantBeats.map((beatId) => (
              <li key={beatId}>• {beatId.replace('stc_', '').replace(/_/g, ' ')}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleComplete}
          disabled={!text.trim()}
          className="btn-success"
        >
          Mark Complete
        </button>
        <div className="flex items-center space-x-2">
          <div className={
            content.status === 'complete' ? 'status-complete' :
            content.status === 'in_progress' ? 'status-in-progress' :
            'status-not-started'
          } />
          <span className="text-body-sm capitalize">{content.status.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { FrameworkStep } from '@/types/framework';
import { SnowflakeStepContent } from '@/types/project';

interface GenericStepEditorProps {
  step: FrameworkStep;
  content: SnowflakeStepContent;
  onUpdate: (text: string, status: 'not_started' | 'in_progress' | 'complete') => void;
}

export default function GenericStepEditor({
  step,
  content,
  onUpdate,
}: GenericStepEditorProps) {
  const [text, setText] = useState(content.text);

  const handleChange = (newText: string) => {
    setText(newText);
    const status = newText.trim() ? 'in_progress' : 'not_started';
    onUpdate(newText, status);
  };

  const handleComplete = () => {
    onUpdate(text, 'complete');
  };

  return (
    <div className="section-spacing">
      <div>
        <h2 className="text-heading-1 mb-2">{step.title}</h2>
        <p className="text-body mb-4">{step.description}</p>
      </div>

      <div>
        <label className="form-label">
          Content
        </label>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          className="form-textarea"
          placeholder="Write your content here..."
          rows={16}
        />
      </div>

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


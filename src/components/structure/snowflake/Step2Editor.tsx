'use client';

import { useState } from 'react';
import { Project, SnowflakeStepContent } from '@/types/project';

interface Step2EditorProps {
  project: Project;
  content: SnowflakeStepContent;
  onUpdate: (text: string, status: 'not_started' | 'in_progress' | 'complete') => void;
}

export default function Step2Editor({ project, content, onUpdate }: Step2EditorProps) {
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
        <h2 className="text-heading-1 mb-2">Step 2: One-Paragraph Summary</h2>
        <p className="text-body mb-4">
          Expand the sentence into a paragraph: setup, 3 major disasters (each a quarter of the book), and ending.
        </p>
      </div>

      <div>
        <label className="form-label">
          Paragraph Summary
        </label>
        <textarea
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          className="form-textarea"
          placeholder="Write a paragraph covering the setup, three major disasters, and the ending..."
          rows={8}
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


'use client';

import { useState, useEffect } from 'react';
import { Project, StcBeatContent } from '@/types/project';
import { FrameworkStep } from '@/types/framework';

interface StcBeatEditorProps {
  project: Project;
  beat: FrameworkStep;
  onProjectUpdate: (project: Project) => void;
}

export default function StcBeatEditor({ project, beat, onProjectUpdate }: StcBeatEditorProps) {
  const existing = project.stcContent[beat.id];
  const [text, setText] = useState(existing?.text || '');
  const [status, setStatus] = useState<StcBeatContent['status']>(existing?.status || 'not_started');

  useEffect(() => {
    const content = project.stcContent[beat.id];
    setText(content?.text || '');
    setStatus(content?.status || 'not_started');
  }, [beat.id, project.stcContent]);

  const updateContent = (nextText: string, nextStatus: StcBeatContent['status']) => {
    setText(nextText);
    setStatus(nextStatus);

    onProjectUpdate({
      ...project,
      stcContent: {
        ...project.stcContent,
        [beat.id]: {
          beatId: beat.id,
          text: nextText,
          status: nextStatus,
        },
      },
    });
  };

  const handleTextChange = (nextText: string) => {
    const nextStatus = nextText.trim()
      ? status === 'complete'
        ? 'complete'
        : 'in_progress'
      : 'not_started';
    updateContent(nextText, nextStatus);
  };

  const handleComplete = () => {
    if (text.trim()) {
      updateContent(text, 'complete');
    }
  };

  return (
    <div className="section-spacing">
      <div>
        <h2 className="text-heading-1 mb-2">{beat.title}</h2>
        <p className="text-body mb-1">{beat.group}</p>
        <p className="text-body mb-4">{beat.description}</p>
      </div>

      <div>
        <label className="form-label">Beat Summary</label>
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="form-textarea"
          rows={6}
          placeholder="How does this beat appear in your story?"
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
          <div
            className={
              status === 'complete'
                ? 'status-complete'
                : status === 'in_progress'
                ? 'status-in-progress'
                : 'status-not-started'
            }
          />
          <span className="text-body-sm capitalize">{status.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { createNewProject, saveProject } from '@/utils/storage';
import { Project } from '@/types/project';

interface NewProjectFormProps {
  onComplete: (project: Project) => void;
  onRequestQuiz: () => void;
}

export default function NewProjectForm({ onComplete, onRequestQuiz }: NewProjectFormProps) {
  const [title, setTitle] = useState('');
  const [logline, setLogline] = useState('');
  const [idea, setIdea] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const project = createNewProject(title);
    
    // Seed Step 1 with initial content
    project.snowflakeContent['sf_step_1'] = {
      stepId: 'sf_step_1',
      text: logline || idea || '',
      status: logline || idea ? 'in_progress' : 'not_started',
    };

    await saveProject(project);
    onComplete(project);
  };

  return (
    <form onSubmit={handleSubmit} className="section-spacing">
      <div>
        <label htmlFor="title" className="form-label text-white">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          placeholder="Enter your novel title"
          required
        />
      </div>

      <div>
        <label htmlFor="logline" className="form-label text-white">
          Working Logline (Optional)
        </label>
        <textarea
          id="logline"
          value={logline}
          onChange={(e) => setLogline(e.target.value)}
          className="form-textarea"
          placeholder="A one-sentence summary of your story"
          rows={2}
        />
      </div>

      <div>
        <label htmlFor="idea" className="form-label text-white">
          One-Sentence Idea Dump (Optional)
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="form-textarea"
          placeholder="Your initial story idea"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="btn-primary-action"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onRequestQuiz}
          className="btn-secondary-action"
        >
          Take Genre Quiz
        </button>
      </div>
    </form>
  );
}


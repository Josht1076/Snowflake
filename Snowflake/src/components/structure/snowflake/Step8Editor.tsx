'use client';

import { useMemo, useState } from 'react';
import { Project, SceneCard, SnowflakeStepContent } from '@/types/project';

interface Step8EditorProps {
  project: Project;
  content: SnowflakeStepContent;
  onUpdate: (text: string, status: 'not_started' | 'in_progress' | 'complete') => void;
  onProjectUpdate: (project: Project) => void;
}

function parseSceneLine(line: string, fallbackIndex: number): Pick<SceneCard, 'title' | 'briefPurpose'> {
  const separators = [' - ', ': '];
  for (const sep of separators) {
    const pos = line.indexOf(sep);
    if (pos > 0) {
      const title = line.slice(0, pos).trim() || `Scene ${fallbackIndex}`;
      const briefPurpose = line.slice(pos + sep.length).trim();
      return { title, briefPurpose };
    }
  }
  return {
    title: line.trim() || `Scene ${fallbackIndex}`,
    briefPurpose: '',
  };
}

export default function Step8Editor({
  project,
  content,
  onUpdate,
  onProjectUpdate,
}: Step8EditorProps) {
  const existingScenesCount = project.scenes ? project.scenes.length : 0;
  const [sceneLines, setSceneLines] = useState(content.text || '');

  const step6Text = project.snowflakeContent['sf_step_6']?.text || '';

  const nonEmptyLines = useMemo(
    () => sceneLines.split('\n').map((l) => l.trim()).filter(Boolean),
    [sceneLines]
  );

  const handleChange = (value: string) => {
    setSceneLines(value);
    const status = value.trim() ? 'in_progress' : 'not_started';
    onUpdate(value, status);
  };

  const handleCreateScenes = () => {
    if (nonEmptyLines.length === 0) return;

    const timestamp = Date.now();
    const newScenes: SceneCard[] = nonEmptyLines.map((line, idx) => {
      const { title, briefPurpose } = parseSceneLine(line, idx + 1);
      return {
        id: `scene-${timestamp}-${idx}`,
        title,
        briefPurpose,
      };
    });

    const updatedProject: Project = {
      ...project,
      scenes: [...(project.scenes || []), ...newScenes],
    };

    onProjectUpdate(updatedProject);
  };

  const handleComplete = () => {
    onUpdate(sceneLines, 'complete');
  };

  const statusLabel = content.status.replace('_', ' ');

  return (
    <div className="section-spacing">
      <div className="mb-4">
        <h2 className="text-heading-1 mb-2">Step 8: Scene List</h2>
        <p className="text-body">
          Split view: left shows your 4-page synopsis from Step 6; right lets you paste one line per scene to generate multiple cards at once.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-4 h-full">
          <h3 className="text-heading-3 mb-3">Reference: Four-Page Synopsis (Step 6)</h3>
          {step6Text.trim() ? (
            <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 overflow-auto max-h-[70vh] whitespace-pre-wrap text-body-sm leading-relaxed">
              {step6Text}
            </div>
          ) : (
            <div className="empty-state">
              <p>Add your four-page synopsis in Step 6 to reference it here.</p>
            </div>
          )}
        </div>

        <div className="card p-4 space-y-4 h-full">
          <div>
            <label className="form-label">Scene lines (one per scene)</label>
            <textarea
              value={sceneLines}
              onChange={(e) => handleChange(e.target.value)}
              className="form-textarea"
              rows={16}
              placeholder={`Example:\nOpening - Protagonist loses the race\nAftermath - Mentor pushes for a new plan\nReversal - Antagonist seizes the advantage`}
            />
            <p className="text-body-sm text-muted mt-2">
              We will create one scene card per non-empty line. Use "Title - purpose" or just a title.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCreateScenes}
              disabled={nonEmptyLines.length === 0}
              className="btn-primary-action"
            >
              Create {nonEmptyLines.length || ''} Scene{nonEmptyLines.length === 1 ? '' : 's'}
            </button>
            <button
              onClick={handleComplete}
              disabled={!sceneLines.trim()}
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
              <span className="text-body-sm capitalize">{statusLabel}</span>
            </div>
          </div>

          <div className="text-body-sm text-muted">
            Existing scenes: {existingScenesCount}. New scenes will be appended; you can further edit or reorder them in the Scenes tab.
          </div>
        </div>
      </div>
    </div>
  );
}

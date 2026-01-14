'use client';

import { Project } from '@/types/project';
import { snowflakeSteps } from '@/data/frameworks/snowflake';
import { saveProject } from '@/utils/storage';
import Step1Editor from './Step1Editor';
import Step2Editor from './Step2Editor';
import Step3Editor from './Step3Editor';
import Step5Editor from './Step5Editor';
import Step7Editor from './Step7Editor';
import Step8Editor from './Step8Editor';
import GenericStepEditor from './GenericStepEditor';

interface StepEditorProps {
  project: Project;
  stepId: string;
  onProjectUpdate: (project: Project) => void;
}

export default function StepEditor({ project, stepId, onProjectUpdate }: StepEditorProps) {
  const step = snowflakeSteps.find((s) => s.id === stepId);
  if (!step) return null;

  const content = project.snowflakeContent[stepId] || {
    stepId,
    text: '',
    status: 'not_started' as const,
  };

  const handleUpdate = async (text: string, status: 'not_started' | 'in_progress' | 'complete') => {
    const updated = {
      ...project,
      snowflakeContent: {
        ...project.snowflakeContent,
        [stepId]: {
          stepId,
          text,
          status,
        },
      },
    };
    await saveProject(updated);
    onProjectUpdate(updated);
  };

  // Render specialized editors for Steps 1-3, 5, 7
  if (stepId === 'sf_step_1') {
    return <Step1Editor project={project} content={content} onUpdate={handleUpdate} />;
  }
  if (stepId === 'sf_step_2') {
    return <Step2Editor project={project} content={content} onUpdate={handleUpdate} />;
  }
  if (stepId === 'sf_step_3') {
    return <Step3Editor project={project} content={content} onUpdate={handleUpdate} />;
  }
  if (stepId === 'sf_step_5') {
    return <Step5Editor project={project} content={content} onUpdate={handleUpdate} />;
  }
  if (stepId === 'sf_step_7') {
    return <Step7Editor project={project} content={content} onUpdate={handleUpdate} />;
  }
  if (stepId === 'sf_step_8') {
    return (
      <Step8Editor
        project={project}
        content={content}
        onUpdate={handleUpdate}
        onProjectUpdate={onProjectUpdate}
      />
    );
  }

  // Generic editor for Steps 4 and 6
  return (
    <GenericStepEditor
      step={step}
      content={content}
      onUpdate={handleUpdate}
    />
  );
}


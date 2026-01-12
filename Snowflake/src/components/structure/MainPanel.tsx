'use client';

import { Project } from '@/types/project';
import StepEditor from './snowflake/StepEditor';
import SceneList from './scenes/SceneList';

interface MainPanelProps {
  project: Project;
  selectedStep: string | null;
  selectedTab: 'snowflake' | 'scenes';
  onProjectUpdate: (project: Project) => void;
}

export default function MainPanel({
  project,
  selectedStep,
  selectedTab,
  onProjectUpdate,
}: MainPanelProps) {
  if (selectedTab === 'scenes') {
    return (
      <div className="full-height">
        <SceneList project={project} onProjectUpdate={onProjectUpdate} />
      </div>
    );
  }

  if (!selectedStep) {
    return (
      <div className="content-padding">
        <h2 className="text-heading-1 mb-4">Select a Step</h2>
        <p className="text-body">Choose a Snowflake step from the sidebar to begin.</p>
      </div>
    );
  }

  return (
    <div className="content-padding">
      <StepEditor
        project={project}
        stepId={selectedStep}
        onProjectUpdate={onProjectUpdate}
      />
    </div>
  );
}


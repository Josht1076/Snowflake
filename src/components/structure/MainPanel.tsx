'use client';

import { Project } from '@/types/project';
import StepEditor from './snowflake/StepEditor';
import SceneList from './scenes/SceneList';
import SmartNextButton from './SmartNextButton';

interface MainPanelProps {
  project: Project;
  selectedStep: string | null;
  selectedTab: 'snowflake' | 'scenes';
  onProjectUpdate: (project: Project) => void;
  onNavigate: (type: 'snowflake' | 'stc' | 'scene', id: string) => void;
  selectedSceneId?: string | null;
}

export default function MainPanel({
  project,
  selectedStep,
  selectedTab,
  onProjectUpdate,
  onNavigate,
  selectedSceneId,
}: MainPanelProps) {
  if (selectedTab === 'scenes') {
    return (
      <div className="full-height">
        <SceneList 
          project={project} 
          onProjectUpdate={onProjectUpdate}
          initialSelectedSceneId={selectedSceneId}
        />
      </div>
    );
  }

  if (!selectedStep) {
    return (
      <div className="content-padding">
        <h2 className="text-heading-1 mb-4">Select a Step</h2>
        <p className="text-body mb-6">Choose a Snowflake step from the sidebar to begin.</p>
        <SmartNextButton project={project} onNavigate={onNavigate} />
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
      <div className="mt-6">
        <SmartNextButton project={project} onNavigate={onNavigate} />
      </div>
    </div>
  );
}


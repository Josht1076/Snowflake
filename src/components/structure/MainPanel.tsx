'use client';

import { Project } from '@/types/project';
import { stcBeats } from '@/data/frameworks/stc';
import StepEditor from './snowflake/StepEditor';
import SceneList from './scenes/SceneList';
import StcBeatEditor from './stc/StcBeatEditor';
import SmartNextButton from './SmartNextButton';
import LinkedScenesPanel from './LinkedScenesPanel';
import { SidebarTab } from './Sidebar';
import { getScenesForSnowflakeStep, getScenesForStcBeat } from '@/utils/sceneLinks';

interface MainPanelProps {
  project: Project;
  selectedStep: string | null;
  selectedTab: SidebarTab;
  selectedBeatId: string | null;
  onProjectUpdate: (project: Project) => void;
  onNavigate: (type: 'snowflake' | 'stc' | 'scene', id: string) => void;
  selectedSceneId?: string | null;
}

export default function MainPanel({
  project,
  selectedStep,
  selectedTab,
  selectedBeatId,
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

  if (selectedTab === 'stc') {
    if (!selectedBeatId) {
      return (
        <div className="content-padding">
          <h2 className="text-heading-1 mb-4">Select a Beat</h2>
          <p className="text-body mb-6">Choose a Save the Cat beat from the sidebar to add notes.</p>
          <SmartNextButton project={project} onNavigate={onNavigate} />
        </div>
      );
    }

    const beat = stcBeats.find((item) => item.id === selectedBeatId);
    if (!beat) return null;

    return (
      <div className="content-padding">
        <StcBeatEditor
          project={project}
          beat={beat}
          onProjectUpdate={onProjectUpdate}
        />
        <LinkedScenesPanel
          panelId={`stc-${selectedBeatId}`}
          scenes={getScenesForStcBeat(project.scenes, selectedBeatId)}
          onSceneSelect={(sceneId) => onNavigate('scene', sceneId)}
        />
        <div className="mt-6">
          <SmartNextButton project={project} onNavigate={onNavigate} />
        </div>
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
      <LinkedScenesPanel
        panelId={`snowflake-${selectedStep}`}
        scenes={getScenesForSnowflakeStep(project.scenes, selectedStep)}
        onSceneSelect={(sceneId) => onNavigate('scene', sceneId)}
      />
      <div className="mt-6">
        <SmartNextButton project={project} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

'use client';

import { Project } from '@/types/project';
import { snowflakeSteps } from '@/data/frameworks/snowflake';
import { stcBeats } from '@/data/frameworks/stc';

export type SidebarTab = 'snowflake' | 'scenes' | 'stc';

interface SidebarProps {
  project: Project;
  selectedTab: SidebarTab;
  selectedStep: string | null;
  selectedBeatId: string | null;
  selectedSceneId: string | null;
  onTabChange: (tab: SidebarTab) => void;
  onStepSelect: (stepId: string) => void;
  onBeatSelect: (beatId: string) => void;
  onSceneSelect: (sceneId: string) => void;
}

export default function Sidebar({
  project,
  selectedTab,
  selectedStep,
  selectedBeatId,
  selectedSceneId,
  onTabChange,
  onStepSelect,
  onBeatSelect,
  onSceneSelect,
}: SidebarProps) {
  const getStepStatus = (stepId: string) => {
    const content = project.snowflakeContent[stepId];
    return content?.status || 'not_started';
  };

  const getBeatStatus = (beatId: string) => {
    const content = project.stcContent[beatId];
    return content?.status || 'not_started';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'status-complete';
      case 'in_progress':
        return 'status-in-progress';
      default:
        return 'status-not-started';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="sidebar-padding border-b">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Structure navigation">
          <button
            role="tab"
            aria-selected={selectedTab === 'snowflake'}
            onClick={() => onTabChange('snowflake')}
            className={selectedTab === 'snowflake' ? 'btn-tab-active' : 'btn-tab-inactive'}
          >
            Snowflake
          </button>
          <button
            role="tab"
            aria-selected={selectedTab === 'stc'}
            onClick={() => onTabChange('stc')}
            className={selectedTab === 'stc' ? 'btn-tab-active' : 'btn-tab-inactive'}
          >
            STC
          </button>
          <button
            role="tab"
            aria-selected={selectedTab === 'scenes'}
            onClick={() => onTabChange('scenes')}
            className={selectedTab === 'scenes' ? 'btn-tab-active' : 'btn-tab-inactive'}
          >
            Scenes
          </button>
        </div>
      </div>

      <div className="scrollable-container sidebar-padding">
        {selectedTab === 'snowflake' && (
          <div className="item-spacing">
            {snowflakeSteps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => onStepSelect(step.id)}
                  className={`w-full text-left p-3 min-h-[44px] rounded-lg transition-colors ${
                    selectedStep === step.id
                      ? 'card-selected'
                      : 'card-interactive'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={getStatusColor(status)} />
                    <div className="flex-1">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-body-sm">{step.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {selectedTab === 'stc' && (
          <div className="item-spacing">
            {stcBeats.map((beat) => {
              const status = getBeatStatus(beat.id);
              return (
                <button
                  key={beat.id}
                  onClick={() => onBeatSelect(beat.id)}
                  className={`w-full text-left p-3 min-h-[44px] rounded-lg transition-colors ${
                    selectedBeatId === beat.id
                      ? 'card-selected'
                      : 'card-interactive'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={getStatusColor(status)} />
                    <div className="flex-1">
                      <div className="font-medium">{beat.title}</div>
                      <div className="text-body-sm">{beat.group}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {selectedTab === 'scenes' && (
          <div className="item-spacing">
            {project.scenes.length === 0 ? (
              <p className="text-muted">No scenes yet. Create your first scene!</p>
            ) : (
              project.scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => onSceneSelect(scene.id)}
                  className={`w-full text-left p-3 min-h-[44px] rounded-lg transition-colors ${
                    selectedSceneId === scene.id
                      ? 'card-selected'
                      : 'card-interactive'
                  }`}
                >
                  <div className="font-medium text-sm">{scene.title}</div>
                  <div className="text-body-sm mt-1">{scene.briefPurpose}</div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

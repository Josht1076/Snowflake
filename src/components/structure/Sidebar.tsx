'use client';

import { Project } from '@/types/project';
import { snowflakeSteps } from '@/data/frameworks/snowflake';

interface SidebarProps {
  project: Project;
  selectedTab: 'snowflake' | 'scenes';
  selectedStep: string | null;
  onTabChange: (tab: 'snowflake' | 'scenes') => void;
  onStepSelect: (stepId: string) => void;
}

export default function Sidebar({
  project,
  selectedTab,
  selectedStep,
  onTabChange,
  onStepSelect,
}: SidebarProps) {
  const getStepStatus = (stepId: string) => {
    const content = project.snowflakeContent[stepId];
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
        <div className="flex space-x-2">
          <button
            onClick={() => onTabChange('snowflake')}
            className={selectedTab === 'snowflake' ? 'btn-tab-active' : 'btn-tab-inactive'}
          >
            Snowflake
          </button>
          <button
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
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
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

        {selectedTab === 'scenes' && (
          <div className="item-spacing">
            {project.scenes.length === 0 ? (
              <p className="text-muted">No scenes yet. Create your first scene!</p>
            ) : (
              project.scenes.map((scene) => (
                <div
                  key={scene.id}
                  className="card-interactive"
                >
                  <div className="font-medium text-sm">{scene.title}</div>
                  <div className="text-body-sm mt-1">{scene.briefPurpose}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}


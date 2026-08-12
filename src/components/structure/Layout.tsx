'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import Sidebar, { SidebarTab } from './Sidebar';
import MainPanel from './MainPanel';
import TipsPanel from './TipsPanel';
import MobileDrawer from './MobileDrawer';
import Navigation from '@/components/common/Navigation';
import ProjectSettingsModal from './ProjectSettingsModal';

interface LayoutProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
  isSaving?: boolean;
}

export default function Layout({ project, onProjectUpdate, isSaving = false }: LayoutProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<SidebarTab>('snowflake');
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [selectedBeatId, setSelectedBeatId] = useState<string | null>(null);
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as SidebarTab | null;
    const step = params.get('step');
    const beat = params.get('beat');
    const scene = params.get('scene');

    if (tab === 'scenes' || tab === 'stc' || tab === 'snowflake') {
      setSelectedTab(tab);
    }
    if (step) {
      setSelectedTab('snowflake');
      setSelectedStep(step);
    }
    if (beat) {
      setSelectedTab('stc');
      setSelectedBeatId(beat);
    }
    if (scene) {
      setSelectedTab('scenes');
      setSelectedSceneId(scene);
    }
  }, []);

  const handleNavigate = (type: 'snowflake' | 'stc' | 'scene', id: string) => {
    if (type === 'snowflake') {
      setSelectedTab('snowflake');
      setSelectedStep(id);
      setSelectedSceneId(null);
      setSelectedBeatId(null);
      setMobileLeftOpen(false);
    } else if (type === 'scene') {
      setSelectedTab('scenes');
      setSelectedSceneId(id);
      setSelectedStep(null);
      setSelectedBeatId(null);
      setMobileLeftOpen(false);
    } else if (type === 'stc') {
      setSelectedTab('stc');
      setSelectedBeatId(id);
      setSelectedStep(null);
      setSelectedSceneId(null);
      setMobileLeftOpen(false);
    }
  };

  const sidebarProps = {
    project,
    selectedTab,
    selectedStep,
    selectedBeatId,
    selectedSceneId,
    onTabChange: setSelectedTab,
    onStepSelect: (stepId: string) => {
      setSelectedStep(stepId);
      setSelectedBeatId(null);
      setSelectedSceneId(null);
      setMobileLeftOpen(false);
    },
    onBeatSelect: (beatId: string) => {
      setSelectedBeatId(beatId);
      setSelectedStep(null);
      setSelectedSceneId(null);
      setMobileLeftOpen(false);
    },
    onSceneSelect: (sceneId: string) => {
      setSelectedSceneId(sceneId);
      setSelectedStep(null);
      setSelectedBeatId(null);
      setMobileLeftOpen(false);
    },
  };

  return (
    <div className="layout-container">
      <Navigation
        projectId={project.id}
        isSaving={isSaving}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <div className="md:hidden flex items-center justify-between p-2 border-b border-gray-800 bg-gray-900">
        <button
          onClick={() => setMobileLeftOpen(true)}
          className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-gray-800 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600 transition-colors"
          aria-label="Open steps menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>Menu</span>
        </button>
        <button
          onClick={() => setMobileRightOpen(true)}
          className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-gray-800 text-white rounded-lg hover:bg-gray-700 active:bg-gray-600 transition-colors"
          aria-label="Open tips menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Tips</span>
        </button>
      </div>

      <div className="layout-main">
        <div className="layout-sidebar hidden md:block">
          <Sidebar {...sidebarProps} />
        </div>

        <MobileDrawer
          isOpen={mobileLeftOpen}
          onClose={() => setMobileLeftOpen(false)}
          side="left"
        >
          <Sidebar {...sidebarProps} />
        </MobileDrawer>

        <div id="main-content" className="layout-content" tabIndex={-1}>
          <MainPanel
            project={project}
            selectedStep={selectedStep}
            selectedTab={selectedTab}
            selectedBeatId={selectedBeatId}
            onProjectUpdate={onProjectUpdate}
            onNavigate={handleNavigate}
            selectedSceneId={selectedSceneId}
          />
        </div>

        <div className="layout-panel hidden md:flex">
          <TipsPanel
            project={project}
            selectedStep={selectedStep}
            selectedTab={selectedTab}
            selectedSceneId={selectedSceneId}
          />
        </div>

        <MobileDrawer
          isOpen={mobileRightOpen}
          onClose={() => setMobileRightOpen(false)}
          side="right"
        >
          <TipsPanel
            project={project}
            selectedStep={selectedStep}
            selectedTab={selectedTab}
            selectedSceneId={selectedSceneId}
          />
        </MobileDrawer>
      </div>

      <ProjectSettingsModal
        project={project}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSave={onProjectUpdate}
      />
    </div>
  );
}

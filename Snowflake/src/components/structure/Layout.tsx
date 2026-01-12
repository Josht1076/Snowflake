'use client';

import { useState } from 'react';
import { Project } from '@/types/project';
import TimelineRibbon from './TimelineRibbon';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import TipsPanel from './TipsPanel';

interface LayoutProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
}

export default function Layout({ project, onProjectUpdate }: LayoutProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'snowflake' | 'scenes'>('snowflake');

  return (
    <div className="layout-container">
      {/* Top: Timeline Ribbon */}
      <div className="border-b border-gray-800 bg-black">
        <TimelineRibbon project={project} />
      </div>

      {/* Main Content Area */}
      <div className="layout-main">
        {/* Left Sidebar */}
        <div className="layout-sidebar">
          <Sidebar
            project={project}
            selectedTab={selectedTab}
            selectedStep={selectedStep}
            onTabChange={setSelectedTab}
            onStepSelect={setSelectedStep}
          />
        </div>

        {/* Center: Main Panel */}
        <div className="layout-content">
          <MainPanel
            project={project}
            selectedStep={selectedStep}
            selectedTab={selectedTab}
            onProjectUpdate={onProjectUpdate}
          />
        </div>

        {/* Right Sidebar: Tips */}
        <div className="layout-panel">
          <TipsPanel
            project={project}
            selectedStep={selectedStep}
          />
        </div>
      </div>
    </div>
  );
}


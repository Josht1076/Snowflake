'use client';

import { useState } from 'react';
import { Project } from '@/types/project';
import TimelineRibbon from './TimelineRibbon';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import TipsPanel from './TipsPanel';
import MobileDrawer from './MobileDrawer';
import Navigation from '@/components/common/Navigation';

interface LayoutProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
}

export default function Layout({ project, onProjectUpdate }: LayoutProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'snowflake' | 'scenes'>('snowflake');
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);

  const handleNavigate = (type: 'snowflake' | 'stc' | 'scene', id: string) => {
    if (type === 'snowflake') {
      setSelectedTab('snowflake');
      setSelectedStep(id);
      setSelectedSceneId(null);
      setMobileLeftOpen(false);
    } else if (type === 'scene') {
      setSelectedTab('scenes');
      setSelectedSceneId(id);
      setSelectedStep(null);
      setMobileLeftOpen(false);
    } else if (type === 'stc') {
      // STC beats are not directly editable yet, but we can show a message
      // or switch to scenes tab if needed
      setSelectedTab('snowflake');
      setSelectedStep(null);
      setSelectedSceneId(null);
      setMobileLeftOpen(false);
    }
  };

  return (
    <div className="layout-container">
      {/* Navigation */}
      <Navigation />
      
      {/* Top: Timeline Ribbon */}
      <div className="border-b border-gray-800 bg-black">
        <TimelineRibbon project={project} />
      </div>

      {/* Mobile Toggle Buttons */}
      <div className="md:hidden flex items-center justify-between p-2 border-b border-gray-800 bg-gray-900">
        <button
          onClick={() => setMobileLeftOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          aria-label="Open steps menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>Steps</span>
        </button>
        <button
          onClick={() => setMobileRightOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          aria-label="Open tips menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Tips</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="layout-main">
        {/* Left Sidebar - Desktop */}
        <div className="layout-sidebar hidden md:block">
          <Sidebar
            project={project}
            selectedTab={selectedTab}
            selectedStep={selectedStep}
            onTabChange={setSelectedTab}
            onStepSelect={(stepId) => {
              setSelectedStep(stepId);
              setMobileLeftOpen(false);
            }}
          />
        </div>

        {/* Left Sidebar - Mobile Drawer */}
        <MobileDrawer
          isOpen={mobileLeftOpen}
          onClose={() => setMobileLeftOpen(false)}
          side="left"
        >
          <Sidebar
            project={project}
            selectedTab={selectedTab}
            selectedStep={selectedStep}
            onTabChange={setSelectedTab}
            onStepSelect={(stepId) => {
              setSelectedStep(stepId);
              setMobileLeftOpen(false);
            }}
          />
        </MobileDrawer>

        {/* Center: Main Panel */}
        <div className="layout-content">
          <MainPanel
            project={project}
            selectedStep={selectedStep}
            selectedTab={selectedTab}
            onProjectUpdate={onProjectUpdate}
            onNavigate={handleNavigate}
            selectedSceneId={selectedSceneId}
          />
        </div>

        {/* Right Sidebar: Tips - Desktop */}
        <div className="layout-panel hidden md:flex">
          <TipsPanel
            project={project}
            selectedStep={selectedStep}
          />
        </div>

        {/* Right Sidebar: Tips - Mobile Drawer */}
        <MobileDrawer
          isOpen={mobileRightOpen}
          onClose={() => setMobileRightOpen(false)}
          side="right"
        >
          <TipsPanel
            project={project}
            selectedStep={selectedStep}
          />
        </MobileDrawer>
      </div>
    </div>
  );
}


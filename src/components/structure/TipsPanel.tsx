'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types/project';
import { getGenreById } from '@/data/genres';
import { getTipsForStep } from '@/utils/tipEngine';

interface TipsPanelProps {
  project: Project;
  selectedStep: string | null;
}

export default function TipsPanel({ project, selectedStep }: TipsPanelProps) {
  const [collapsedPanels, setCollapsedPanels] = useState<Set<string>>(new Set());
  const primaryGenre = useMemo(() => 
    project.primaryGenreId ? getGenreById(project.primaryGenreId) : null,
    [project.primaryGenreId]
  );
  
  const tips = useMemo(() => 
    selectedStep ? getTipsForStep(project, selectedStep) : { primary: [], secondary: [] },
    [project, selectedStep, project.snowflakeContent]
  );

  // Get character count from Step 3
  const characterCount = useMemo(() => {
    const step3Content = project.snowflakeContent['sf_step_3'];
    if (!step3Content?.text?.trim()) return 0;
    try {
      const parsed = JSON.parse(step3Content.text);
      if (Array.isArray(parsed)) {
        return parsed.length;
      }
    } catch {
      return 0;
    }
    return 0;
  }, [project.snowflakeContent]);

  const togglePanel = (panelId: string) => {
    setCollapsedPanels(prev => {
      const next = new Set(prev);
      if (next.has(panelId)) {
        next.delete(panelId);
      } else {
        next.add(panelId);
      }
      return next;
    });
  };

  return (
    <div className="scrollable-container sidebar-padding">
      <h3 className="text-heading-2 mb-4">Tips & Notes</h3>

      {selectedStep && (
        <div className="space-y-4">
          {tips.primary.length > 0 && (() => {
            const panelId = 'step-tips';
            const isCollapsed = collapsedPanels.has(panelId);
            return (
              <div className="card-blue">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePanel(panelId)}>
                  <h4 className="text-heading-3">Step Tips</h4>
                  <button
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePanel(panelId);
                    }}
                  >
                    <span className="text-lg">
                      {isCollapsed ? '▶' : '▼'}
                    </span>
                  </button>
                </div>
                {!isCollapsed && (
                  <div className="space-y-3 mt-3">
                    {tips.primary.map((tip) => (
                      <div key={tip.id}>
                        <p className="text-heading-3 text-sm">{tip.title}</p>
                        <p className="text-body-sm mt-1">{tip.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {primaryGenre && (() => {
            const panelId = 'genre';
            const isCollapsed = collapsedPanels.has(panelId);
            return (
              <div className="card-green">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePanel(panelId)}>
                  <h4 className="text-heading-3">Genre: {primaryGenre.name}</h4>
                  <button
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePanel(panelId);
                    }}
                  >
                    <span className="text-lg">
                      {isCollapsed ? '▶' : '▼'}
                    </span>
                  </button>
                </div>
                {!isCollapsed && (
                  <div className="mt-3">
                    <p className="text-body-sm mb-2">{primaryGenre.description}</p>
                    <p className="text-body">
                      <strong>Focus:</strong> {primaryGenre.focusAreas.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {tips.secondary.length > 0 && (() => {
            const panelId = 'alternate-angle';
            const isCollapsed = collapsedPanels.has(panelId);
            return (
              <div className="card-yellow">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePanel(panelId)}>
                  <h4 className="text-heading-3">Alternate Angle</h4>
                  <button
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePanel(panelId);
                    }}
                  >
                    <span className="text-lg">
                      {isCollapsed ? '▶' : '▼'}
                    </span>
                  </button>
                </div>
                {!isCollapsed && (
                  <div className="item-spacing mt-3">
                    {tips.secondary.map((tip) => (
                      <div key={tip.id}>
                        <p className="text-heading-3 text-sm">{tip.title}</p>
                        <p className="text-body-sm mt-1">{tip.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {selectedStep === 'sf_step_3' && characterCount > 0 && (() => {
            const panelId = 'characters';
            const isCollapsed = collapsedPanels.has(panelId);
            return (
              <div className="card">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePanel(panelId)}>
                  <h4 className="text-heading-3">Characters</h4>
                  <button
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePanel(panelId);
                    }}
                  >
                    <span className="text-lg">
                      {isCollapsed ? '▶' : '▼'}
                    </span>
                  </button>
                </div>
                {!isCollapsed && (
                  <p className="text-body-sm mt-3">
                    You have {characterCount} {characterCount === 1 ? 'character' : 'characters'} defined in Step 3.
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {!selectedStep && (
        <p className="text-body">Select a step to see tips and guidance.</p>
      )}
    </div>
  );
}


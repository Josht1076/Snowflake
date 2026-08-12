'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types/project';
import { getGenreById } from '@/data/genres';
import { getStcArchetypeById } from '@/data/stcArchetypes';
import { getTipsForStep } from '@/utils/tipEngine';
import { getStcBeatsForSnowflakeStep } from '@/data/frameworks/mapping_snowflake_stc';
import { stcBeats } from '@/data/frameworks/stc';
import { SidebarTab } from './Sidebar';

interface TipsPanelProps {
  project: Project;
  selectedStep: string | null;
  selectedTab: SidebarTab;
  selectedSceneId: string | null;
}

export default function TipsPanel({
  project,
  selectedStep,
  selectedTab,
  selectedSceneId,
}: TipsPanelProps) {
  const [collapsedPanels, setCollapsedPanels] = useState<Set<string>>(new Set());
  const primaryGenre = useMemo(
    () => (project.primaryGenreId ? getGenreById(project.primaryGenreId) : null),
    [project.primaryGenreId]
  );
  const primaryArchetype = useMemo(
    () => (project.primaryStcId ? getStcArchetypeById(project.primaryStcId) : null),
    [project.primaryStcId]
  );

  const tips = useMemo(
    () => (selectedStep ? getTipsForStep(project, selectedStep) : { primary: [], secondary: [] }),
    [project, selectedStep, project.snowflakeContent]
  );

  const relatedStcBeats = useMemo(() => {
    if (!selectedStep) return [];
    return getStcBeatsForSnowflakeStep(selectedStep)
      .map((beatId) => stcBeats.find((beat) => beat.id === beatId))
      .filter((beat): beat is NonNullable<typeof beat> => beat !== undefined);
  }, [selectedStep]);

  const selectedScene = useMemo(
    () => (selectedSceneId ? project.scenes.find((scene) => scene.id === selectedSceneId) : null),
    [project.scenes, selectedSceneId]
  );

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
    setCollapsedPanels((prev) => {
      const next = new Set(prev);
      if (next.has(panelId)) {
        next.delete(panelId);
      } else {
        next.add(panelId);
      }
      return next;
    });
  };

  const renderCollapsibleCard = (
    panelId: string,
    title: string,
    className: string,
    children: React.ReactNode
  ) => {
    const isCollapsed = collapsedPanels.has(panelId);
    return (
      <div className={className}>
        <div className="flex items-center justify-between cursor-pointer" onClick={() => togglePanel(panelId)}>
          <h4 className="text-heading-3">{title}</h4>
          <button
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            aria-expanded={!isCollapsed}
            onClick={(e) => {
              e.stopPropagation();
              togglePanel(panelId);
            }}
          >
            <span className="text-lg">{isCollapsed ? '▶' : '▼'}</span>
          </button>
        </div>
        {!isCollapsed && children}
      </div>
    );
  };

  return (
    <div className="scrollable-container sidebar-padding">
      <h3 className="text-heading-2 mb-4">Tips & Notes</h3>

      {selectedTab === 'scenes' && (
        <div className="space-y-4">
          {renderCollapsibleCard(
            'scene-planning',
            'Scene Planning',
            'card-blue',
            <div className="mt-3 space-y-2 text-body-sm">
              <p>Each scene should have a clear purpose — what changes by the end of it?</p>
              <p>Link scenes to Snowflake steps or STC beats to keep your outline organized.</p>
              {selectedScene ? (
                <p className="text-muted">
                  Editing: <strong>{selectedScene.title}</strong>
                </p>
              ) : (
                <p className="text-muted">Select a scene to edit its details.</p>
              )}
            </div>
          )}

          {primaryGenre &&
            renderCollapsibleCard(
              'genre',
              `Genre: ${primaryGenre.name}`,
              'card-green',
              <div className="mt-3">
                <p className="text-body-sm mb-2">{primaryGenre.description}</p>
                <p className="text-body">
                  <strong>Focus:</strong> {primaryGenre.focusAreas.join(', ')}
                </p>
              </div>
            )}
        </div>
      )}

      {selectedTab !== 'scenes' && selectedStep && (
        <div className="space-y-4">
          {relatedStcBeats.length > 0 &&
            renderCollapsibleCard(
              'related-stc-beats',
              'Related STC Beats',
              'card-blue',
              <ul className="list-item list-spacing mt-3">
                {relatedStcBeats.map((beat) => (
                  <li key={beat.id}>
                    <span className="text-heading-3 text-sm">{beat.title}</span>
                    <p className="text-body-sm mt-1">{beat.description}</p>
                  </li>
                ))}
              </ul>
            )}

          {tips.primary.length > 0 &&
            renderCollapsibleCard(
              'step-tips',
              'Step Tips',
              'card-blue',
              <div className="space-y-3 mt-3">
                {tips.primary.map((tip) => (
                  <div key={tip.id}>
                    <p className="text-heading-3 text-sm">{tip.title}</p>
                    <p className="text-body-sm mt-1">{tip.body}</p>
                  </div>
                ))}
              </div>
            )}

          {primaryGenre &&
            renderCollapsibleCard(
              'genre',
              `Genre: ${primaryGenre.name}`,
              'card-green',
              <div className="mt-3">
                <p className="text-body-sm mb-2">{primaryGenre.description}</p>
                <p className="text-body">
                  <strong>Focus:</strong> {primaryGenre.focusAreas.join(', ')}
                </p>
              </div>
            )}

          {primaryArchetype &&
            renderCollapsibleCard(
              'archetype',
              `Archetype: ${primaryArchetype.name}`,
              'card',
              <p className="text-body-sm mt-3">{primaryArchetype.description}</p>
            )}

          {tips.secondary.length > 0 &&
            renderCollapsibleCard(
              'alternate-angle',
              'Alternate Angle',
              'card-yellow',
              <div className="item-spacing mt-3">
                {tips.secondary.map((tip) => (
                  <div key={tip.id}>
                    <p className="text-heading-3 text-sm">{tip.title}</p>
                    <p className="text-body-sm mt-1">{tip.body}</p>
                  </div>
                ))}
              </div>
            )}

          {selectedStep === 'sf_step_3' &&
            characterCount > 0 &&
            renderCollapsibleCard(
              'characters',
              'Characters',
              'card',
              <p className="text-body-sm mt-3">
                You have {characterCount} {characterCount === 1 ? 'character' : 'characters'} defined in Step 3.
              </p>
            )}
        </div>
      )}

      {selectedTab === 'stc' && (
        <div className="space-y-4">
          {renderCollapsibleCard(
            'stc-guidance',
            'STC Beat Notes',
            'card-blue',
            <div className="mt-3 space-y-2 text-body-sm">
              <p>Each beat is a story milestone. Keep notes brief — this is planning, not drafting.</p>
              <p>Key beats to prioritize: Opening Image, Catalyst, Midpoint, All Is Lost, and Finale.</p>
            </div>
          )}
          {primaryArchetype &&
            renderCollapsibleCard(
              'archetype',
              `Archetype: ${primaryArchetype.name}`,
              'card',
              <p className="text-body-sm mt-3">{primaryArchetype.description}</p>
            )}
        </div>
      )}

      {selectedTab === 'snowflake' && !selectedStep && (
        <p className="text-body">Select a step to see tips and guidance.</p>
      )}
    </div>
  );
}

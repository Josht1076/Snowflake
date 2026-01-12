'use client';

import { useState, useEffect } from 'react';
import { Project, SnowflakeStepContent } from '@/types/project';
import { getStcBeatsForSnowflakeStep } from '@/data/frameworks/mapping_snowflake_stc';

interface CharacterSummary {
  id: string;
  name: string;
  oneSentenceStoryline: string;
  motivation: string;
  goal: string;
  conflict: string;
  epiphany: string;
  paragraphStoryline: string;
}

interface ExtendedSynopsis {
  [characterId: string]: string;
}

interface Step5EditorProps {
  project: Project;
  content: SnowflakeStepContent;
  onUpdate: (text: string, status: 'not_started' | 'in_progress' | 'complete') => void;
}

export default function Step5Editor({ project, content, onUpdate }: Step5EditorProps) {
  // Parse characters from Step 3
  const parseStep3Characters = (): CharacterSummary[] => {
    const step3Content = project.snowflakeContent['sf_step_3'];
    if (!step3Content?.text?.trim()) return [];
    try {
      const parsed = JSON.parse(step3Content.text);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // If it's not valid JSON, return empty
    }
    return [];
  };

  // Parse extended synopses from Step 5 content
  const parseSynopses = (text: string): ExtendedSynopsis => {
    if (!text.trim()) return {};
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    } catch {
      // If it's not valid JSON, return empty
    }
    return {};
  };

  const characters = parseStep3Characters();
  const [synopses, setSynopses] = useState<ExtendedSynopsis>(() => 
    parseSynopses(content.text)
  );
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());
  const [openReferenceId, setOpenReferenceId] = useState<string | null>(null);

  // Update parent when synopses change
  useEffect(() => {
    const jsonText = JSON.stringify(synopses);
    const hasContent = Object.values(synopses).some(s => s.trim());
    const status = hasContent ? 'in_progress' : 'not_started';
    onUpdate(jsonText, status);
  }, [synopses, onUpdate]);

  const updateSynopsis = (characterId: string, value: string) => {
    setSynopses(prev => ({
      ...prev,
      [characterId]: value,
    }));
  };

  const toggleCollapse = (id: string) => {
    setCollapsedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleReference = (id: string) => {
    setOpenReferenceId(prev => prev === id ? null : id);
  };

  const handleComplete = () => {
    const jsonText = JSON.stringify(synopses);
    onUpdate(jsonText, 'complete');
  };

  const hasContent = Object.values(synopses).some(s => s.trim());

  const relevantBeats = getStcBeatsForSnowflakeStep('sf_step_5');

  return (
    <div className="section-spacing">
      <div>
        <h2 className="text-heading-1 mb-2">Step 5: Extended Character Synopses</h2>
        <p className="text-body mb-4">
          One-page description for each major character, half-page for others, from their POV.
        </p>
      </div>

      {characters.length === 0 && (
        <div className="empty-state mb-6">
          <p>No characters found. Please add characters in Step 3 first.</p>
        </div>
      )}

      <div className="space-y-8">
        {characters.map((character, index) => {
          const isCollapsed = collapsedCards.has(character.id);
          const characterTitle = character.name.trim() 
            ? character.name
            : `Character ${index + 1}`;
          const synopsis = synopses[character.id] || '';
          
          const isReferenceOpen = openReferenceId === character.id;
          
          return (
            <div key={character.id} className="card p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleCollapse(character.id)}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                  >
                    <span className="text-lg">
                      {isCollapsed ? '▶' : '▼'}
                    </span>
                  </button>
                  <h3 
                    className="text-heading-2 cursor-pointer flex-1"
                    onClick={() => toggleCollapse(character.id)}
                  >
                    {characterTitle}
                  </h3>
                </div>
                <button
                  onClick={() => toggleReference(character.id)}
                  className="btn-secondary-action text-sm"
                  aria-label="Show Step 3 reference"
                >
                  {isReferenceOpen ? 'Hide' : 'Show'} Reference
                </button>
              </div>

              {isReferenceOpen && (
                <div className="mt-4 mb-4 p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <h4 className="text-heading-3 mb-5 text-primary-500">Step 3 Reference</h4>
                  <div className="space-y-5">
                    {character.name.trim() && (
                      <div className="pb-3 border-b border-gray-800">
                        <label className="form-label text-sm mb-2 block">Character Name</label>
                        <p className="text-body">{character.name}</p>
                      </div>
                    )}
                    {character.oneSentenceStoryline.trim() && (
                      <div className="pb-3 border-b border-gray-800">
                        <label className="form-label text-sm mb-2 block">One-Sentence Storyline</label>
                        <p className="text-body">{character.oneSentenceStoryline}</p>
                      </div>
                    )}
                    {character.motivation.trim() && (
                      <div className="pb-3 border-b border-gray-800">
                        <label className="form-label text-sm mb-2 block">Motivation</label>
                        <p className="text-body">{character.motivation}</p>
                      </div>
                    )}
                    {character.goal.trim() && (
                      <div className="pb-3 border-b border-gray-800">
                        <label className="form-label text-sm mb-2 block">Goal</label>
                        <p className="text-body">{character.goal}</p>
                      </div>
                    )}
                    {character.conflict.trim() && (
                      <div className="pb-3 border-b border-gray-800">
                        <label className="form-label text-sm mb-2 block">Conflict</label>
                        <p className="text-body">{character.conflict}</p>
                      </div>
                    )}
                    {character.epiphany.trim() && (
                      <div className="pb-3 border-b border-gray-800">
                        <label className="form-label text-sm mb-2 block">Epiphany</label>
                        <p className="text-body">{character.epiphany}</p>
                      </div>
                    )}
                    {character.paragraphStoryline.trim() && (
                      <div>
                        <label className="form-label text-sm mb-2 block">One-Paragraph Storyline</label>
                        <p className="text-body whitespace-pre-wrap">{character.paragraphStoryline}</p>
                      </div>
                    )}
                    {!character.name.trim() && 
                     !character.oneSentenceStoryline.trim() && 
                     !character.motivation.trim() && 
                     !character.goal.trim() && 
                     !character.conflict.trim() && 
                     !character.epiphany.trim() && 
                     !character.paragraphStoryline.trim() && (
                      <p className="text-body text-gray-400 italic">No Step 3 information available for this character.</p>
                    )}
                  </div>
                </div>
              )}

              {!isCollapsed && (
                <div className="mt-4">
                  <label className="form-label">
                    Extended Synopsis (from character's POV)
                  </label>
                  <textarea
                    value={synopsis}
                    onChange={(e) => updateSynopsis(character.id, e.target.value)}
                    className="form-textarea"
                    placeholder="Write a one-page description from this character's point of view..."
                    rows={12}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {relevantBeats.length > 0 && (
        <div className="card-blue mt-6">
          <h3 className="text-heading-3 mb-2">Related STC Beats</h3>
          <ul className="list-item list-spacing">
            {relevantBeats.map((beatId) => (
              <li key={beatId}>• {beatId.replace('stc_', '').replace(/_/g, ' ')}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleComplete}
          disabled={!hasContent}
          className="btn-success"
        >
          Mark Complete
        </button>
        <div className="flex items-center space-x-2">
          <div className={
            content.status === 'complete' ? 'status-complete' :
            content.status === 'in_progress' ? 'status-in-progress' :
            'status-not-started'
          } />
          <span className="text-body-sm capitalize">{content.status.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );
}

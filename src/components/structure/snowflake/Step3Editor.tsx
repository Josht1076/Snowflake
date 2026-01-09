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

interface Step3EditorProps {
  project: Project;
  content: SnowflakeStepContent;
  onUpdate: (text: string, status: 'not_started' | 'in_progress' | 'complete') => void;
}

export default function Step3Editor({ project, content, onUpdate }: Step3EditorProps) {
  // Parse existing content or initialize with empty array
  const parseCharacters = (text: string): CharacterSummary[] => {
    if (!text.trim()) return [];
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // If it's not valid JSON, treat as legacy format and return empty
    }
    return [];
  };

  const [characters, setCharacters] = useState<CharacterSummary[]>(() => 
    parseCharacters(content.text)
  );
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());

  // Update parent when characters change
  useEffect(() => {
    const jsonText = JSON.stringify(characters);
    const hasContent = characters.some(c => 
      c.name.trim() || 
      c.oneSentenceStoryline.trim() || 
      c.motivation.trim() || 
      c.goal.trim() || 
      c.conflict.trim() || 
      c.epiphany.trim() || 
      c.paragraphStoryline.trim()
    );
    const status = hasContent ? 'in_progress' : 'not_started';
    onUpdate(jsonText, status);
  }, [characters, onUpdate]);

  const addCharacter = () => {
    const newCharacter: CharacterSummary = {
      id: `char-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      name: '',
      oneSentenceStoryline: '',
      motivation: '',
      goal: '',
      conflict: '',
      epiphany: '',
      paragraphStoryline: '',
    };
    setCharacters([...characters, newCharacter]);
  };

  const removeCharacter = (id: string) => {
    setCharacters(characters.filter(c => c.id !== id));
    setCollapsedCards(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
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

  const updateCharacter = (id: string, field: keyof CharacterSummary, value: string) => {
    setCharacters(characters.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleComplete = () => {
    const jsonText = JSON.stringify(characters);
    onUpdate(jsonText, 'complete');
  };

  const hasContent = characters.some(c => 
    c.name.trim() || 
    c.oneSentenceStoryline.trim() || 
    c.motivation.trim() || 
    c.goal.trim() || 
    c.conflict.trim() || 
    c.epiphany.trim() || 
    c.paragraphStoryline.trim()
  );

  const relevantBeats = getStcBeatsForSnowflakeStep('sf_step_3');

  return (
    <div className="section-spacing">
      <div>
        <h2 className="text-heading-1 mb-2">Step 3: Character Summaries</h2>
        <p className="text-body mb-4">
          For each major character: one-page sheet with name, one-sentence storyline, motivation, goal, conflict, epiphany, 1-paragraph storyline.
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={addCharacter}
          className="btn-primary-action"
        >
          + Add Character
        </button>
      </div>

      {characters.length === 0 && (
        <div className="empty-state mb-6">
          <p>No characters yet. Click "Add Character" to get started!</p>
        </div>
      )}

      <div className="space-y-8">
        {characters.map((character, index) => {
          const isCollapsed = collapsedCards.has(character.id);
          const characterTitle = character.name.trim() 
            ? character.name
            : `Character ${index + 1}`;
          
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
                  onClick={() => removeCharacter(character.id)}
                  className="btn-danger"
                >
                  Remove
                </button>
              </div>

              {!isCollapsed && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="form-label">
                      Character Name
                    </label>
                    <input
                      type="text"
                      value={character.name}
                      onChange={(e) => updateCharacter(character.id, 'name', e.target.value)}
                      className="form-input"
                      placeholder="Enter character name..."
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      One-Sentence Storyline
                    </label>
                    <textarea
                      value={character.oneSentenceStoryline}
                      onChange={(e) => updateCharacter(character.id, 'oneSentenceStoryline', e.target.value)}
                      className="form-textarea"
                      placeholder="A one-sentence summary of this character's storyline..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Motivation
                    </label>
                    <textarea
                      value={character.motivation}
                      onChange={(e) => updateCharacter(character.id, 'motivation', e.target.value)}
                      className="form-textarea"
                      placeholder="What drives this character?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Goal
                    </label>
                    <textarea
                      value={character.goal}
                      onChange={(e) => updateCharacter(character.id, 'goal', e.target.value)}
                      className="form-textarea"
                      placeholder="What does this character want to achieve?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Conflict
                    </label>
                    <textarea
                      value={character.conflict}
                      onChange={(e) => updateCharacter(character.id, 'conflict', e.target.value)}
                      className="form-textarea"
                      placeholder="What obstacles or conflicts does this character face?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      Epiphany
                    </label>
                    <textarea
                      value={character.epiphany}
                      onChange={(e) => updateCharacter(character.id, 'epiphany', e.target.value)}
                      className="form-textarea"
                      placeholder="What realization or transformation does this character experience?"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      One-Paragraph Storyline
                    </label>
                    <textarea
                      value={character.paragraphStoryline}
                      onChange={(e) => updateCharacter(character.id, 'paragraphStoryline', e.target.value)}
                      className="form-textarea"
                      placeholder="A paragraph-length summary of this character's storyline..."
                      rows={4}
                    />
                  </div>
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


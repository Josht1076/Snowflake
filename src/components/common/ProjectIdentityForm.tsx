'use client';

import { useState, useEffect } from 'react';
import { genres, getGenreById } from '@/data/genres';
import { stcArchetypes, getStcArchetypeById } from '@/data/stcArchetypes';
import { Project } from '@/types/project';

export interface ProjectIdentityValues {
  title: string;
  primaryGenreId: string | null;
  secondaryGenreIds: string[];
  primaryStcId: string | null;
  secondaryStcId: string | null;
}

interface ProjectIdentityFormProps {
  project: Project;
  showTitle?: boolean;
  onSubmit: (values: ProjectIdentityValues) => void;
  submitLabel?: string;
  secondaryAction?: {
    label: string;
    onClick: (values: ProjectIdentityValues) => void;
    disabled?: boolean;
  };
}

export default function ProjectIdentityForm({
  project,
  showTitle = false,
  onSubmit,
  submitLabel = 'Save',
  secondaryAction,
}: ProjectIdentityFormProps) {
  const [title, setTitle] = useState(project.title);
  const [primaryGenreId, setPrimaryGenreId] = useState(project.primaryGenreId || '');
  const [secondaryGenreIds, setSecondaryGenreIds] = useState<string[]>(project.secondaryGenreIds || []);
  const [primaryStcId, setPrimaryStcId] = useState(project.primaryStcId || '');
  const [secondaryStcId, setSecondaryStcId] = useState(project.secondaryStcId || '');

  useEffect(() => {
    setTitle(project.title);
    setPrimaryGenreId(project.primaryGenreId || '');
    setSecondaryGenreIds(project.secondaryGenreIds || []);
    setPrimaryStcId(project.primaryStcId || '');
    setSecondaryStcId(project.secondaryStcId || '');
  }, [project]);

  const getValues = (): ProjectIdentityValues => ({
    title: title.trim() || project.title,
    primaryGenreId: primaryGenreId || null,
    secondaryGenreIds,
    primaryStcId: primaryStcId || null,
    secondaryStcId: secondaryStcId || null,
  });

  const toggleSecondaryGenre = (genreId: string) => {
    if (secondaryGenreIds.includes(genreId)) {
      setSecondaryGenreIds(secondaryGenreIds.filter((id) => id !== genreId));
    } else {
      setSecondaryGenreIds([...secondaryGenreIds, genreId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(getValues());
  };

  return (
    <form onSubmit={handleSubmit} className="section-spacing">
      {showTitle && (
        <div>
          <label htmlFor="project-title" className="form-label">
            Project Title
          </label>
          <input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="primary-genre" className="form-label">
          Primary Genre *
        </label>
        <select
          id="primary-genre"
          value={primaryGenreId}
          onChange={(e) => setPrimaryGenreId(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Select a genre...</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        {primaryGenreId && (
          <p className="mt-2 text-body-sm">{getGenreById(primaryGenreId)?.description}</p>
        )}
      </div>

      <div>
        <span className="form-label">Secondary Genres (Optional)</span>
        <div className="item-spacing">
          {genres
            .filter((g) => g.id !== primaryGenreId)
            .map((genre) => (
              <label key={genre.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={secondaryGenreIds.includes(genre.id)}
                  onChange={() => toggleSecondaryGenre(genre.id)}
                  className="rounded"
                />
                <span>{genre.name}</span>
              </label>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="primary-stc" className="form-label">
          Primary STC Archetype (Optional)
        </label>
        <select
          id="primary-stc"
          value={primaryStcId}
          onChange={(e) => setPrimaryStcId(e.target.value)}
          className="form-select"
        >
          <option value="">Select an archetype...</option>
          {stcArchetypes.map((archetype) => (
            <option key={archetype.id} value={archetype.id}>
              {archetype.name}
            </option>
          ))}
        </select>
        {primaryStcId && (
          <p className="mt-2 text-body-sm">{getStcArchetypeById(primaryStcId)?.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="secondary-stc" className="form-label">
          Secondary STC Archetype (Optional)
        </label>
        <select
          id="secondary-stc"
          value={secondaryStcId}
          onChange={(e) => setSecondaryStcId(e.target.value)}
          className="form-select"
        >
          <option value="">Select an archetype...</option>
          {stcArchetypes
            .filter((archetype) => archetype.id !== primaryStcId)
            .map((archetype) => (
              <option key={archetype.id} value={archetype.id}>
                {archetype.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button type="submit" className="btn-primary-action">
          {submitLabel}
        </button>
        {secondaryAction && (
          <button
            type="button"
            onClick={() => secondaryAction.onClick(getValues())}
            disabled={secondaryAction.disabled}
            className="btn-secondary-action disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </form>
  );
}

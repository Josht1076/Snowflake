'use client';

import { useState } from 'react';
import { genres, getGenreById } from '@/data/genres';
import { stcArchetypes, getStcArchetypeById } from '@/data/stcArchetypes';
import { Project } from '@/types/project';

interface GenreSelectorProps {
  project: Project;
  onSelect: (
    primaryGenreId: string | null,
    secondaryGenreIds: string[],
    primaryStcId: string | null,
    secondaryStcId: string | null
  ) => void;
  onSkipQuiz: () => void;
}

export default function GenreSelector({ project, onSelect, onSkipQuiz }: GenreSelectorProps) {
  const [primaryGenreId, setPrimaryGenreId] = useState<string>(project.primaryGenreId || '');
  const [secondaryGenreIds, setSecondaryGenreIds] = useState<string[]>(project.secondaryGenreIds || []);
  const [primaryStcId, setPrimaryStcId] = useState<string>(project.primaryStcId || '');
  const [secondaryStcId, setSecondaryStcId] = useState<string>(project.secondaryStcId || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelect(
      primaryGenreId || null,
      secondaryGenreIds,
      primaryStcId || null,
      secondaryStcId || null
    );
  };

  const handleSkip = () => {
    if (!primaryGenreId) return;
    onSelect(
      primaryGenreId || null,
      secondaryGenreIds,
      primaryStcId || null,
      secondaryStcId || null
    );
    onSkipQuiz();
  };

  const toggleSecondary = (genreId: string) => {
    if (secondaryGenreIds.includes(genreId)) {
      setSecondaryGenreIds(secondaryGenreIds.filter((id) => id !== genreId));
    } else {
      setSecondaryGenreIds([...secondaryGenreIds, genreId]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="section-spacing">
      <div>
        <h2 className="text-heading-1 mb-4 text-white">Select Your Genre</h2>
        <p className="text-body mb-6">
          Choose your primary genre and optional STC archetype. These shape the tips and guidance you will see while planning.
        </p>
      </div>

      <div>
        <label htmlFor="primary-genre" className="form-label text-white">
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
          <p className="mt-2 text-body-sm">
            {getGenreById(primaryGenreId)?.description}
          </p>
        )}
      </div>

      <div>
        <label className="form-label text-white">Secondary Genres (Optional)</label>
        <div className="item-spacing">
          {genres
            .filter((g) => g.id !== primaryGenreId)
            .map((genre) => (
              <label key={genre.id} className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={secondaryGenreIds.includes(genre.id)}
                  onChange={() => toggleSecondary(genre.id)}
                  className="rounded"
                />
                <span>{genre.name}</span>
              </label>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="primary-stc" className="form-label text-white">
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
          <p className="mt-2 text-body-sm">
            {getStcArchetypeById(primaryStcId)?.description}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="secondary-stc" className="form-label text-white">
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
          Continue
        </button>
        <button
          type="button"
          onClick={handleSkip}
          disabled={!primaryGenreId}
          className="btn-secondary-action disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Skip to Planning
        </button>
      </div>
    </form>
  );
}

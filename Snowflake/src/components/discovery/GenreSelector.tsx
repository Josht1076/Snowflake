'use client';

import { useState } from 'react';
import { genres, getGenreById } from '@/data/genres';
import { Project } from '@/types/project';

interface GenreSelectorProps {
  project: Project;
  onSelect: (primaryGenreId: string | null, secondaryGenreIds: string[]) => void;
  onSkipQuiz: () => void;
}

export default function GenreSelector({ project, onSelect, onSkipQuiz }: GenreSelectorProps) {
  const [primaryGenreId, setPrimaryGenreId] = useState<string>(project.primaryGenreId || '');
  const [secondaryGenreIds, setSecondaryGenreIds] = useState<string[]>(project.secondaryGenreIds || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelect(primaryGenreId || null, secondaryGenreIds);
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
          Choose your primary genre. You can also select secondary genres if your story blends multiple types.
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
        <label className="form-label text-white">
          Secondary Genres (Optional)
        </label>
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

      <div className="flex gap-4">
        <button
          type="submit"
          className="btn-primary-action"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onSkipQuiz}
          className="btn-secondary-action"
        >
          Skip to Planning
        </button>
      </div>
    </form>
  );
}


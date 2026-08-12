'use client';

import { getGenreById } from '@/data/genres';
import { getStcArchetypeById } from '@/data/stcArchetypes';

interface QuizResultsProps {
  result: {
    primaryGenreId: string | null;
    secondaryGenreId: string | null;
    tertiaryGenreId: string | null;
    primaryStcId: string | null;
    secondaryStcId: string | null;
  };
  onConfirm: (
    primaryGenreId: string | null,
    secondaryGenreIds: string[],
    primaryStcId: string | null,
    secondaryStcId: string | null
  ) => void;
  onEdit: () => void;
}

export default function QuizResults({ result, onConfirm, onEdit }: QuizResultsProps) {
  const {
    primaryGenreId,
    secondaryGenreId,
    tertiaryGenreId,
    primaryStcId,
    secondaryStcId,
  } = result;

  const primaryGenre = primaryGenreId ? getGenreById(primaryGenreId) : null;
  const secondaryGenre = secondaryGenreId ? getGenreById(secondaryGenreId) : null;
  const tertiaryGenre = tertiaryGenreId ? getGenreById(tertiaryGenreId) : null;
  const primaryArchetype = primaryStcId ? getStcArchetypeById(primaryStcId) : null;
  const secondaryArchetype = secondaryStcId ? getStcArchetypeById(secondaryStcId) : null;

  const handleConfirm = () => {
    const secondaryIds = [secondaryGenreId, tertiaryGenreId].filter(Boolean) as string[];
    onConfirm(primaryGenreId, secondaryIds, primaryStcId, secondaryStcId);
  };

  return (
    <div className="quiz-results-container">
      <div>
        <h2 className="text-heading-1 mb-2 text-white">Quiz Results</h2>
        <p className="text-body mb-4">
          Use this as a confirmation, adjust manually if needed.
        </p>
      </div>

      <div className="space-y-4">
        {primaryGenre && (
          <div className="quiz-result-primary">
            <h3 className="quiz-result-title">Primary Genre</h3>
            <p className="quiz-result-name">{primaryGenre.name}</p>
            <p className="quiz-result-description">{primaryGenre.description}</p>
          </div>
        )}

        {secondaryGenre && (
          <div className="quiz-result-secondary">
            <h3 className="quiz-result-title">Secondary Genre</h3>
            <p className="quiz-result-name">{secondaryGenre.name}</p>
            <p className="quiz-result-description">{secondaryGenre.description}</p>
          </div>
        )}

        {tertiaryGenre && (
          <div className="quiz-result-tertiary">
            <h3 className="quiz-result-title">Tertiary Genre</h3>
            <p className="quiz-result-name">{tertiaryGenre.name}</p>
            <p className="quiz-result-description">{tertiaryGenre.description}</p>
          </div>
        )}

        {primaryArchetype && (
          <div className="quiz-result-primary">
            <h3 className="quiz-result-title">Primary STC Archetype</h3>
            <p className="quiz-result-name">{primaryArchetype.name}</p>
            <p className="quiz-result-description">{primaryArchetype.description}</p>
          </div>
        )}

        {secondaryArchetype && (
          <div className="quiz-result-secondary">
            <h3 className="quiz-result-title">Secondary STC Archetype</h3>
            <p className="quiz-result-name">{secondaryArchetype.name}</p>
            <p className="quiz-result-description">{secondaryArchetype.description}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button onClick={handleConfirm} className="btn-primary-action">
          Use These Results
        </button>
        <button onClick={onEdit} className="btn-secondary-action">
          Edit Manually
        </button>
      </div>
    </div>
  );
}

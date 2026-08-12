'use client';

import { useState } from 'react';
import { Project } from '@/types/project';
import { module1 } from '@/data/quiz/module1';
import QuizModule from './QuizModule';
import QuizResults from './QuizResults';
import { scoreModule1Genres, scoreModule1Archetypes } from '@/utils/quizScoring';

interface QuizFlowProps {
  project: Project;
  onComplete: (
    primaryGenreId: string | null,
    secondaryGenreIds: string[],
    primaryStcId: string | null,
    secondaryStcId: string | null
  ) => void;
  onSkip: () => void;
  onEditManually?: (result: {
    primaryGenreId: string | null;
    secondaryGenreId: string | null;
    tertiaryGenreId: string | null;
    primaryStcId: string | null;
    secondaryStcId: string | null;
  }) => void;
}

export default function QuizFlow({ project, onComplete, onSkip, onEditManually }: QuizFlowProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    primaryGenreId: string | null;
    secondaryGenreId: string | null;
    tertiaryGenreId: string | null;
    genreScores: Record<string, number>;
    primaryStcId: string | null;
    secondaryStcId: string | null;
    archetypeScores: Record<string, number>;
  } | null>(null);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleModule1Complete = () => {
    const genreResult = scoreModule1Genres(module1, answers);
    const archetypeResult = scoreModule1Archetypes(module1, answers);
    setQuizResult({
      primaryGenreId: genreResult.primaryGenreId,
      secondaryGenreId: genreResult.secondaryGenreId,
      tertiaryGenreId: genreResult.tertiaryGenreId,
      genreScores: genreResult.scores,
      primaryStcId: archetypeResult.primaryStcId,
      secondaryStcId: archetypeResult.secondaryStcId,
      archetypeScores: archetypeResult.scores,
    });
    setShowResults(true);
  };

  const handleConfirmResults = (
    primaryGenreId: string | null,
    secondaryGenreIds: string[],
    primaryStcId: string | null,
    secondaryStcId: string | null
  ) => {
    onComplete(primaryGenreId, secondaryGenreIds, primaryStcId, secondaryStcId);
  };

  const handleEditManually = () => {
    setShowResults(false);
    if (quizResult) {
      onEditManually?.({
        primaryGenreId: quizResult.primaryGenreId,
        secondaryGenreId: quizResult.secondaryGenreId,
        tertiaryGenreId: quizResult.tertiaryGenreId,
        primaryStcId: quizResult.primaryStcId,
        secondaryStcId: quizResult.secondaryStcId,
      });
    }
  };

  const allAnswered = module1.questions.every((q) => answers[q.id]);

  return (
    <div className="section-spacing">
      {!showResults ? (
        <>
          <QuizModule module={module1} answers={answers} onAnswer={handleAnswer} />
          <div className="flex gap-4">
            <button
              onClick={handleModule1Complete}
              disabled={!allAnswered}
              className="btn-primary-action disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              Complete Quiz
            </button>
            <button onClick={onSkip} className="btn-secondary-action">
              Skip Quiz
            </button>
          </div>
        </>
      ) : quizResult ? (
        <QuizResults
          result={quizResult}
          onConfirm={handleConfirmResults}
          onEdit={handleEditManually}
        />
      ) : null}
    </div>
  );
}

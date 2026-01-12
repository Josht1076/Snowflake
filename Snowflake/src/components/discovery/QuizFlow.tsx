'use client';

import { useState } from 'react';
import { Project } from '@/types/project';
import { module1 } from '@/data/quiz/module1';
import QuizModule from './QuizModule';
import QuizResults from './QuizResults';
import { scoreModule1Genres } from '@/utils/quizScoring';

interface QuizFlowProps {
  project: Project;
  onComplete: (primaryGenreId: string | null, secondaryGenreIds: string[]) => void;
  onSkip: () => void;
}

export default function QuizFlow({ project, onComplete, onSkip }: QuizFlowProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [module1Result, setModule1Result] = useState<{
    primaryGenreId: string | null;
    secondaryGenreId: string | null;
    tertiaryGenreId: string | null;
    scores: Record<string, number>;
  } | null>(null);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleModule1Complete = () => {
    const result = scoreModule1Genres(module1, answers);
    setModule1Result(result);
    setShowResults(true);
  };

  const handleConfirmResults = (primaryGenreId: string | null, secondaryGenreIds: string[]) => {
    onComplete(primaryGenreId, secondaryGenreIds);
  };

  const handleEditManually = () => {
    setShowResults(false);
    // Could navigate to genre selector here
  };

  const allAnswered = module1.questions.every((q) => answers[q.id]);

  return (
    <div className="section-spacing">
      {!showResults ? (
        <>
          <QuizModule
            module={module1}
            answers={answers}
            onAnswer={handleAnswer}
          />
          <div className="flex gap-4">
            <button
              onClick={handleModule1Complete}
              disabled={!allAnswered}
              className="btn-primary-action disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              Complete Quiz
            </button>
            <button
              onClick={onSkip}
              className="btn-secondary-action"
            >
              Skip Quiz
            </button>
          </div>
        </>
      ) : module1Result ? (
        <QuizResults
          module1Result={module1Result}
          onConfirm={handleConfirmResults}
          onEdit={handleEditManually}
        />
      ) : null}
    </div>
  );
}


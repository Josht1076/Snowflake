/**
 * Quiz state management hook
 */

import { useState } from 'react';
import { QuizModule } from '@/data/quiz/module1';

export function useQuiz(module: QuizModule) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const setAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const clearAnswers = () => {
    setAnswers({});
  };

  const isComplete = module.questions.every((q) => answers[q.id]);

  return {
    answers,
    setAnswer,
    clearAnswers,
    isComplete,
  };
}


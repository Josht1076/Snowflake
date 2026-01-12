'use client';

import { QuizModule as QuizModuleType, QuizQuestion } from '@/data/quiz/module1';

interface QuizModuleProps {
  module: QuizModuleType;
  answers: Record<number, string>;
  onAnswer: (questionId: number, answer: string) => void;
}

export default function QuizModule({ module, answers, onAnswer }: QuizModuleProps) {
  const handleAnswer = (questionId: number, answerKey: string) => {
    onAnswer(questionId, answerKey);
  };

  return (
    <div className="quiz-module-container">
      <div>
        <h2 className="text-heading-1 mb-2 text-white">{module.module}</h2>
        <p className="text-body">{module.description}</p>
      </div>

      <div className="space-y-8">
        {module.questions.map((question) => (
          <div key={question.id} className="quiz-question-container">
            <h3 className="text-heading-3 mb-4 text-white">
              {question.id}. {question.question}
            </h3>
            <div className="item-spacing">
              {Object.entries(question.answers).map(([key, text]) => (
                <label
                  key={key}
                  className={answers[question.id] === key ? 'quiz-answer-selected' : 'quiz-answer-unselected'}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={key}
                    checked={answers[question.id] === key}
                    onChange={() => handleAnswer(question.id, key)}
                    className="mt-1"
                  />
                  <span className="flex-1">
                    <span className="font-medium mr-2">{key}.</span>
                    {text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


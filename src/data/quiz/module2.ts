/**
 * Module 2: Plot Structure & Story Shape
 * 5 questions to determine structural pattern
 */

import { QuizModule } from './module1';

export const module2: QuizModule = {
  module: 'Plot Structure',
  description: 'Determines the overarching plot shape and structural pattern.',
  scoring: {
    type: 'structures',
    mapping: {
      A: ['Hero\'s Journey'],
      B: ['Four-Act Structure'],
      C: ['Investigation Loop'],
      D: ['Episodic Adventure'],
      E: ['War/Heist Structure'],
    },
  },
  questions: [
    {
      id: 1,
      question: 'How does your protagonist primarily move through the story?',
      answers: {
        A: 'They transform through trials and mentorship',
        B: 'A clear midpoint shift divides the story cleanly',
        C: 'They follow a trail of clues or unanswered questions',
        D: 'They move from encounter to encounter in loosely connected episodes',
        E: 'They execute a plan, operation, or campaign',
      },
    },
    {
      id: 2,
      question: 'How does your story reveal information?',
      answers: {
        A: 'Through mythic beats of departure and return',
        B: 'Through rising tension and set-piece sequences each act',
        C: 'Through discoveries that reframe everything',
        D: 'Through consistent new challenges or environments',
        E: 'Through tactical decisions and strategy shifts',
      },
    },
    {
      id: 3,
      question: 'What best describes your midpoint?',
      answers: {
        A: 'A major revelation of purpose or destiny',
        B: 'A turn that intensifies the conflict dramatically',
        C: 'A breakthrough in the central mystery',
        D: 'A new location or major shift in the adventure',
        E: 'A reversal or failure that changes the plan',
      },
    },
    {
      id: 4,
      question: 'What type of ending does your structure aim for?',
      answers: {
        A: 'Return as a changed person',
        B: 'Triumphant final confrontation',
        C: 'Truth exposed and understood',
        D: 'Conclusion of a long wandering path',
        E: 'Success or failure of a major operation',
      },
    },
    {
      id: 5,
      question: 'What keeps your story moving?',
      answers: {
        A: 'Inner growth paired with external trials',
        B: 'Escalating conflict and act breaks',
        C: 'Uncovering hidden information',
        D: 'Constant exploration and novelty',
        E: 'Progress toward a defined mission goal',
      },
    },
  ],
};


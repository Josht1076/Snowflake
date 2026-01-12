/**
 * Module 3: Subplots
 * 5 questions to identify secondary plot arcs
 */

import { QuizModule } from './module1';

export const module3: QuizModule = {
  module: 'Subplots',
  description: 'Identifies the story\'s dominant secondary plot arcs.',
  scoring: {
    type: 'subplots',
    mapping: {
      A: ['Romance Subplot'],
      B: ['Rivalry Subplot'],
      C: ['Mystery Subplot'],
      D: ['Healing/Trauma Subplot'],
      E: ['Mentor/Student Subplot'],
    },
  },
  questions: [
    {
      id: 1,
      question: 'Which subplot adds the most emotional weight?',
      answers: {
        A: 'A growing romantic tension',
        B: 'A rivalry or competition',
        C: 'A hidden truth or secret investigation',
        D: 'A character healing emotionally',
        E: 'A mentoring relationship evolving',
      },
    },
    {
      id: 2,
      question: 'Which subplot escalates in Act 2?',
      answers: {
        A: 'A deepening bond',
        B: 'A clash of goals or personalities',
        C: 'A new clue or revelation',
        D: 'A breakdown or moment of vulnerability',
        E: 'A shift in mentor/student dynamic',
      },
    },
    {
      id: 3,
      question: 'Which subplot complicates the climax?',
      answers: {
        A: 'Confession or romantic choice',
        B: 'Final confrontation with a rival',
        C: 'Truth emerges at last',
        D: 'Emotional breakthrough',
        E: 'Mentor\'s test or role reversal',
      },
    },
    {
      id: 4,
      question: 'Which subplot drives character growth?',
      answers: {
        A: 'Acceptance of love or intimacy',
        B: 'Learning from conflict with an equal',
        C: 'Solving a personal or external mystery',
        D: 'Overcoming past trauma',
        E: 'Gaining wisdom from a guide',
      },
    },
    {
      id: 5,
      question: 'Which subplot your readers will talk about most?',
      answers: {
        A: 'Romantic beats',
        B: 'Competitions or rivalries',
        C: 'Twists and reveals',
        D: 'Emotional catharsis',
        E: 'Mentorship or chosen-family dynamics',
      },
    },
  ],
};


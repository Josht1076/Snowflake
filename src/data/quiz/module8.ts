/**
 * Module 8: Theme & Moral Arc
 * 5 questions to identify deeper themes
 */

import { QuizModule } from './module1';

export const module8: QuizModule = {
  module: 'Theme & Moral Arc',
  description: 'Identifies the deeper themes and moral questions of the story.',
  scoring: {
    type: 'themes',
    mapping: {
      A: ['Theme:Power-vs-Corruption'],
      B: ['Theme:Knowledge-vs-Ignorance'],
      C: ['Theme:Fate-vs-FreeWill'],
      D: ['Theme:Love-vs-Fear'],
      E: ['Theme:Freedom-vs-Control'],
    },
  },
  questions: [
    {
      id: 1,
      question: 'Which theme best matches your story?',
      answers: {
        A: 'Power vs. corruption',
        B: 'Knowledge vs. ignorance',
        C: 'Fate vs. free will',
        D: 'Love vs. fear',
        E: 'Freedom vs. control',
      },
    },
    {
      id: 2,
      question: 'What lesson does the protagonist learn?',
      answers: {
        A: 'True power requires restraint',
        B: 'Truth changes everything',
        C: 'Destiny is a choice',
        D: 'Vulnerability leads to healing',
        E: 'Identity requires resistance',
      },
    },
    {
      id: 3,
      question: 'What moral tension shapes the plot?',
      answers: {
        A: 'Strength vs. responsibility',
        B: 'Curiosity vs. danger',
        C: 'Prophecy vs. independence',
        D: 'Pain vs. acceptance',
        E: 'Duty vs. rebellion',
      },
    },
    {
      id: 4,
      question: 'What philosophical question lingers?',
      answers: {
        A: 'How far should power go?',
        B: 'What truths define reality?',
        C: 'Is destiny binding?',
        D: 'What defines emotional wholeness?',
        E: 'Who decides right and wrong?',
      },
    },
    {
      id: 5,
      question: 'Which theme your readers will feel strongest?',
      answers: {
        A: 'Power\'s consequences',
        B: 'Hidden truths unveiling',
        C: 'Wrestling with destiny',
        D: 'Healing through connection',
        E: 'Standing against the system',
      },
    },
  ],
};


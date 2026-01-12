/**
 * Module 4: World & Setting
 * 5 questions to identify worldbuilding category
 */

import { QuizModule } from './module1';

export const module4: QuizModule = {
  module: 'World & Setting',
  description: 'Identifies major worldbuilding category and environment rules.',
  scoring: {
    type: 'world',
    mapping: {
      A: ['Secondary-World Fantasy'],
      B: ['Urban/Hidden-World Fantasy'],
      C: ['Science Fiction / Futuristic'],
      D: ['Historical or Mythic Fantasy'],
      E: ['Contemporary with Subtle Magic'],
    },
  },
  questions: [
    {
      id: 1,
      question: 'Which world best describes your setting?',
      answers: {
        A: 'Entirely invented world with its own cultures',
        B: 'A version of Earth with magical/supernatural layers',
        C: 'Far-future or high-technology civilization',
        D: 'Historical or low-tech world with fantastical elements',
        E: 'Contemporary world with hidden or subtle magic',
      },
    },
    {
      id: 2,
      question: 'How present is magic or technology?',
      answers: {
        A: 'Highly integrated into every part of society',
        B: 'Existing but hidden or limited',
        C: 'Highly advanced science or cosmic tech',
        D: 'Ancient, sacred, or tradition-bound',
        E: 'Rare, mysterious, or only known to few',
      },
    },
    {
      id: 3,
      question: 'What defines the world\'s mood?',
      answers: {
        A: 'Epic and sweeping',
        B: 'Mystical and mysterious',
        C: 'Scientific, futuristic, or sleek',
        D: 'Historical or mythic',
        E: 'Grounded with subtle wonder',
      },
    },
    {
      id: 4,
      question: 'What limits your world?',
      answers: {
        A: 'Geopolitical boundaries and cultures',
        B: 'Supernatural laws or secret societies',
        C: 'Technology, physics, or cosmic rules',
        D: 'Tradition, religion, or legacy',
        E: 'Modern norms and hidden rules',
      },
    },
    {
      id: 5,
      question: 'What drives exploration in your world?',
      answers: {
        A: 'Geography and ancient civilizations',
        B: 'Magical anomalies or hidden realms',
        C: 'Space travel or scientific discovery',
        D: 'Lore of the past or mythical artifacts',
        E: 'Unseen magic beneath everyday life',
      },
    },
  ],
};


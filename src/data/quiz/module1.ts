/**
 * Module 1: Core Story Engine
 * 20 questions to determine primary and secondary genres
 */

export type QuizScoring =
  | {
      type: 'style';
      mapping: Record<string, Record<string, string[]>>;
    }
  | {
      type: string;
      mapping: Record<string, string[]>;
    };

export interface QuizModule {
  module: string;
  description: string;
  scoring: QuizScoring;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: Record<string, string>;
}

export const module1: QuizModule = {
  module: 'Core Story Engine',
  description: '20-question diagnostic quiz to determine the story\'s primary engine and genre.',
  scoring: {
    type: 'genres',
    mapping: {
      A: ['Encroaching Doom', 'Thrust-Into-Chaos Survivor'],
      B: ['Transformative Quest', 'Buried Truth'],
      C: ['Power With a Price', 'Burdened Prodigy'],
      D: ['Inner Metamorphosis', 'Emergent Hero'],
      E: ['Converging Destinies', 'Defying the Order'],
    },
  },
  questions: [
    {
      id: 1,
      question: 'What primarily drives your story forward?',
      answers: {
        A: 'A looming threat or sudden crisis',
        B: 'A journey across worlds or uncovering secrets',
        C: 'A powerful ability, artifact, or destiny',
        D: 'A deep emotional change or personal growth',
        E: 'A key relationship or conflict with a group/system',
      },
    },
    {
      id: 2,
      question: 'What event kicks the story into motion?',
      answers: {
        A: 'Something dangerous begins or arrives',
        B: 'The protagonist sets out or finds a mysterious clue',
        C: 'The protagonist discovers power or is chosen',
        D: 'A personal upheaval or emotional turning point',
        E: 'Meeting someone important or entering a system/order',
      },
    },
    {
      id: 3,
      question: 'What is the main type of conflict?',
      answers: {
        A: 'Escaping, stopping, or surviving danger',
        B: 'Navigating unknown lands or solving mysteries',
        C: 'Controlling or paying the price for power',
        D: 'Healing, maturing, or overcoming internal barriers',
        E: 'Fixing a relationship or resisting authority',
      },
    },
    {
      id: 4,
      question: 'What kinds of obstacles dominate the plot?',
      answers: {
        A: 'Threats, attacks, or disasters',
        B: 'Travel, riddles, clues, or new environments',
        C: 'Power backlash, prophecies, or dangerous abilities',
        D: 'Grief, insecurity, or identity struggles',
        E: 'Social rules, rivalries, factions, or partnerships',
      },
    },
    {
      id: 5,
      question: 'How does your protagonist change?',
      answers: {
        A: 'Learns courage under escalating danger',
        B: 'Gains wisdom through discovery',
        C: 'Accepts responsibility for power or destiny',
        D: 'Heals emotionally or embraces authenticity',
        E: 'Deepens a relationship or stands against a system',
      },
    },
    {
      id: 6,
      question: 'What shape best describes your story world?',
      answers: {
        A: 'A threat or crisis spreads across it',
        B: 'A vast world with secrets or varied locales',
        C: 'A realm defined by mythic powers or structured magic/tech',
        D: 'An intimate, character-driven environment',
        E: 'A world of institutions, alliances, or social systems',
      },
    },
    {
      id: 7,
      question: 'What emotional tone defines the story?',
      answers: {
        A: 'Dread or high tension',
        B: 'Wonder or curiosity',
        C: 'Awe or temptation',
        D: 'Sorrow or hope',
        E: 'Passion, conflict, or rebellion',
      },
    },
    {
      id: 8,
      question: 'What are the stakes really about?',
      answers: {
        A: 'Survival or preventing catastrophe',
        B: 'Completing the journey or solving the mystery',
        C: 'Managing or mastering power',
        D: 'Emotional renewal or self-acceptance',
        E: 'Saving a relationship or resisting control',
      },
    },
    {
      id: 9,
      question: 'What is your story\'s biggest unknown?',
      answers: {
        A: 'How to stop or escape the danger',
        B: 'The truth behind the world or a hidden mystery',
        C: 'The limits or consequences of the protagonist\'s power',
        D: 'What the protagonist truly feels or becomes',
        E: 'Who can be trusted or what the system requires',
      },
    },
    {
      id: 10,
      question: 'What shapes your midpoint twist?',
      answers: {
        A: 'The threat evolves or intensifies',
        B: 'A discovery redefines the journey',
        C: 'Power backfires or destiny deepens',
        D: 'An emotional breakdown or breakthrough',
        E: 'A betrayal, rupture, or institutional reveal',
      },
    },
    {
      id: 11,
      question: 'How would you describe your protagonist?',
      answers: {
        A: 'Unprepared but brave under pressure',
        B: 'Curious, adaptable, and always learning',
        C: 'Powerful, chosen, or uniquely gifted',
        D: 'Sensitive, wounded, or quietly capable',
        E: 'Defined by relationships or societal role',
      },
    },
    {
      id: 12,
      question: 'What scares your protagonist most?',
      answers: {
        A: 'Losing loved ones to danger',
        B: 'The unknown or what lies beyond',
        C: 'Misusing or losing control of their power',
        D: 'Being emotionally vulnerable or seen',
        E: 'Disappointing someone or facing authority',
      },
    },
    {
      id: 13,
      question: 'What motivates them the most?',
      answers: {
        A: 'Protecting others from harm',
        B: 'Curiosity and knowledge',
        C: 'Mastery of power or fulfilling destiny',
        D: 'Healing or finding inner peace',
        E: 'Loyalty, justice, or connection',
      },
    },
    {
      id: 14,
      question: 'What is your protagonist\'s greatest flaw?',
      answers: {
        A: 'Fear or denial of danger',
        B: 'Naivety or lack of direction',
        C: 'Arrogance or fear of their own power',
        D: 'Emotional repression or self-doubt',
        E: 'People-pleasing or defiance',
      },
    },
    {
      id: 15,
      question: 'What kind of arc do they experience?',
      answers: {
        A: 'Survival to leadership',
        B: 'Ignorance to wisdom',
        C: 'Burden to acceptance',
        D: 'Hurt to healed',
        E: 'Conflicted to connected',
      },
    },
    {
      id: 16,
      question: 'What describes your midpoint setting?',
      answers: {
        A: 'A battlefield or crisis zone',
        B: 'A new location or key discovery',
        C: 'A sanctuary, temple, lab, or training space',
        D: 'A quiet, introspective moment',
        E: 'A council, court, faction base, or confrontation',
      },
    },
    {
      id: 17,
      question: 'What pushes your protagonist into Act 3?',
      answers: {
        A: 'The threat hits home',
        B: 'A revelation clarifies everything',
        C: 'Loss of control over power',
        D: 'A broken emotional bond',
        E: 'Outrage at an injustice',
      },
    },
    {
      id: 18,
      question: 'What is your story climax built around?',
      answers: {
        A: 'Stopping the threat',
        B: 'Solving the puzzle or finishing the journey',
        C: 'A showdown tied to power or destiny',
        D: 'Emotional resolution',
        E: 'Overthrowing or changing a relationship/system',
      },
    },
    {
      id: 19,
      question: 'What shape is your ending?',
      answers: {
        A: 'Survival and safety restored',
        B: 'Journey ends with new understanding',
        C: 'Power is mastered or released',
        D: 'Emotional peace or growth',
        E: 'Unity, partnership, or righteous rebellion',
      },
    },
    {
      id: 20,
      question: 'Which central theme resonates most with your story?',
      answers: {
        A: 'Courage in the face of danger',
        B: 'The world is bigger than we knew',
        C: 'Power always has a cost',
        D: 'Healing requires truth',
        E: 'Connection shapes destiny',
      },
    },
  ],
};


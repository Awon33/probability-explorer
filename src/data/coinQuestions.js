export const coinQuestions = [
  // --- EASY QUESTIONS ---
  {
    id: 1,
    difficulty: 'easy',
    question: "You flip a coin. How many possible outcomes are there?",
    options: ["1 (Only Heads)", "2 (Heads or Tails)", "3 (Heads, Tails, Edge)"],
    correctAnswer: 1,
    hint: "Count the sides of the coin.",
    explanation: "Correct! There are exactly 2 sides: Heads and Tails."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "Is it possible to roll a '3' with a coin?",
    options: ["Yes", "No"],
    correctAnswer: 1,
    hint: "Coins only have Heads and Tails.",
    explanation: "Right. Coins don't have numbers like dice do."
  },

  // --- MEDIUM QUESTIONS ---
  {
    id: 3,
    difficulty: 'medium',
    question: "You just flipped Heads. What is the chance the NEXT flip is Heads?",
    options: ["50% (1/2)", "25% (1/4)", "100%"],
    correctAnswer: 0,
    hint: "Does the coin remember the last flip?",
    explanation: "Correct! The coin has no memory. Every flip is 50/50."
  },
  {
    id: 4,
    difficulty: 'medium',
    question: "Which sequence is more likely?",
    options: ["H-H-H-H", "H-T-H-T", "Both are equally likely"],
    correctAnswer: 2,
    hint: "Since every flip is random, is any specific pattern special?",
    explanation: "Spot on! Any specific pattern has the exact same math behind it."
  },

  // --- HARD QUESTIONS ---
  {
    id: 5,
    difficulty: 'hard',
    question: "If you flip a coin 2 times, what is the chance of getting TWO Heads (H-H)?",
    options: ["50% (1/2)", "25% (1/4)", "10% (1/10)"],
    correctAnswer: 1,
    hint: "Flip 1 is 1/2. Flip 2 is 1/2. Multiply them.",
    explanation: "Genius! 1/2 x 1/2 = 1/4. There are 4 outcomes: HH, HT, TH, TT."
  },
  {
    id: 6,
    difficulty: 'hard',
    question: "If probability is 50%, why did we get 7 Heads in 10 flips?",
    options: ["The coin is broken", "Probability predicts long-term, not short-term", "I am just lucky"],
    correctAnswer: 1,
    hint: "Probability works best with huge numbers (like 1,000 flips).",
    explanation: "Exactly. In small games, randomness looks messy. Over time, it evens out."
  }
];
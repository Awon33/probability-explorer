export const spinnerQuestions = [
  // --- EASY ---
  {
    id: 1,
    difficulty: 'easy',
    question: "This spinner has 4 equal sections. What is the chance of Red?",
    options: ["25% (1 in 4)", "50% (1 in 2)", "10%"],
    correctAnswer: 0,
    hint: "It is one color out of four total.",
    explanation: "Correct! 1/4 is 25%."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "If you spin 100 times, will you get Red exactly 25 times?",
    options: ["Yes, exactly", "Roughly 25, but not exactly"],
    correctAnswer: 1,
    hint: "Is probability exact or an estimate?",
    explanation: "Right. It is an average. You might get 24 or 26."
  },

  // --- MEDIUM ---
  {
    id: 3,
    difficulty: 'medium',
    question: "You just landed on Red 3 times. What is likely next?",
    options: ["Blue", "Red", "All colors are equally likely"],
    correctAnswer: 2,
    hint: "The spinner doesn't know what happened before.",
    explanation: "Correct! Previous spins don't change the odds."
  },
  {
    id: 4,
    difficulty: 'medium',
    question: "What is the chance of NOT getting Red?",
    options: ["25% (1 in 4)", "75% (3 in 4)", "50%"],
    correctAnswer: 1,
    hint: "Count the sections that are NOT Red (Blue, Yellow, Green).",
    explanation: "Exactly! There are 3 non-red sections, so 3 out of 4 (75%)."
  },

  // --- HARD ---
  {
    id: 5,
    difficulty: 'hard',
    question: "If you spin twice, what is the chance of getting Red BOTH times?",
    options: ["1/4 (25%)", "1/8", "1/16 (about 6%)"],
    correctAnswer: 2,
    hint: "Multiply the chances: 1/4 x 1/4.",
    explanation: "Genius! 1/4 times 1/4 equals 1/16."
  },
  {
    id: 6,
    difficulty: 'hard',
    question: "Which event is impossible on this spinner?",
    options: ["Landing on Green", "Landing on Purple", "Landing on Red twice"],
    correctAnswer: 1,
    hint: "Look at the colors on the wheel.",
    explanation: "Correct! There is no Purple section."
  }
];
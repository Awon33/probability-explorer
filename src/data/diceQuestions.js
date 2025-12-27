export const diceQuestions = [
  // --- EASY ---
  {
    id: 1,
    difficulty: 'easy',
    question: "You roll a standard 6-sided die. What is the chance of getting a '6'?",
    options: ["1 out of 6", "1 out of 2", "50%"],
    correctAnswer: 0,
    hint: "How many faces does the die have?",
    explanation: "Correct! One specific number is always a 1 in 6 chance."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "Is it possible to roll a '7' on a single standard die?",
    options: ["Yes", "No", "Maybe"],
    correctAnswer: 1,
    hint: "Look at the numbers on the cube. Do you see a 7?",
    explanation: "Right! The numbers only go from 1 to 6."
  },
  
  // --- MEDIUM ---
  {
    id: 3,
    difficulty: 'medium',
    question: "Which result is MORE likely?",
    options: ["Rolling a 1", "Rolling a 6", "Both are equally likely"],
    correctAnswer: 2,
    hint: "Are the faces different sizes? No.",
    explanation: "Correct! Unless the die is weighted, every number has the same probability."
  },
  {
    id: 4,
    difficulty: 'medium',
    question: "You rolled a '4' three times in a row! What is likely to happen next?",
    options: ["A '4' again", "Anything but a '4'", "It is still random (1 in 6)"],
    correctAnswer: 2,
    hint: "The die does not have a brain or memory.",
    explanation: "Excellent. Previous rolls do not change the probability of the next roll."
  },

  // --- HARD ---
  {
    id: 5,
    difficulty: 'hard',
    question: "What are the chances of rolling an EVEN number (2, 4, 6)?",
    options: ["1 out of 6", "3 out of 6 (50%)", "2 out of 6"],
    correctAnswer: 1,
    hint: "Count the even numbers: 2, 4, 6. That is 3 numbers total.",
    explanation: "Correct! 3 even numbers out of 6 total faces = 3/6, which simplifies to 50%."
  },
  {
    id: 6,
    difficulty: 'hard',
    question: "If you roll two dice, getting a total of 12 (6+6) is...",
    options: ["Very likely", "Impossible", "Very unlikely (1 in 36)"],
    correctAnswer: 2,
    hint: "You need specific numbers on BOTH dice at the same time.",
    explanation: "Right! You need a 6 on die #1 AND a 6 on die #2. That is hard to do!"
  }
];
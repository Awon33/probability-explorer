# ProbX

A gamified React application designed to teach secondary school students the fundamentals of probability through interactive visual experiments.

## Features

* **Zero-Login Access:** Students can start learning immediately.
* **Visual Experiments:**
    * **Coin Toss:** 3D animated coin for 50/50 probability.
    * **Dice Roll:** 3D rotating cube for 1/6 probability.
    * **Spinner:** Colored wheel for simple events (1/4 probability).
* **Adaptive Learning:** The game adjusts difficulty (Easy/Medium/Hard) based on the student's performance.
* **Progress Tracking:** LocalStorage saves mastery levels (Stars) automatically.
* **Hint System:** Built-in support for difficult questions.

## Tech Stack

* **Framework:** React (Vite)
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **Styling:** CSS3 (Animations, 3D Transforms, Conic Gradients)
* **Storage:** Browser LocalStorage (No Backend required)

## How to Run Locally

1.  **Clone the repository** (or unzip the folder):
    ```bash
    git clone https://github.com/Awon33/probability-explorer.git
    cd probability-explorer
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Go to `http://localhost:5173`

## Project Structure

```text
src/
├── components/      # Reusable UI (Coin, Dice, Modal, Layout)
├── data/            # Question banks with difficulty tags
├── pages/           # Main Screens (Menu, Game Logic, Progress)
├── App.jsx          # Routing Configuration
└── main.jsx         # Entry Point

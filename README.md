# AI Search-Tree Visualizer: Minimax & Alpha-Beta Showcase (MERN)

This is a full-stack web application designed to demonstrate and compare how search algorithms function. By playing Tic Tac Toe, you can observe the real-time performance of **Minimax** and **Alpha-Beta Pruning**.

## Live Demo - [Click here to try it out now.](https://tic-tac-toe-frontend-swart.vercel.app/home)

## Project Objective

The goal of this project is to visualize adversarial search. It provides a practical look at how an AI evaluates game states and optimizes its decision-making process.

### Minimax Algorithm

- Explores all possible moves for perfect play.
- Builds a full game tree recursively with scores.
- Accurate but costly as board size grows.

### Alpha-Beta Pruning

- Optimized: Skips branches that can’t improve results.
- Efficient: Same accuracy as Minimax with fewer evaluations.
- Faster: Reduces processing power needed.

---

## AI Performance Metrics

This application tracks and displays the following metrics to show the efficiency of each algorithm:

- **Nodes Visited:** A live counter showing the total number of board states the AI analyzed. This highlights how much the AI processed.
- **Branches Pruned:** A metric for Alpha-Beta that counts how many potential moves were skipped to save time.
- **Algorithm Visualizer:** A real-time console that logs heuristic scores and decision paths as the AI "thinks."

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion.
- **Backend:** Node.js, Express.js.
- **Database:** Vercel Edge Config for persistent score tracking.
- **Logic:** Custom recursive implementations of search algorithms in JavaScript.

---

## Project Structure

```text
AI-Search-Tree-Visualizer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AlgoVisualizer.jsx  # Logs the search tree process
│   │   ├── utils/
│   │   │   ├── minimax.jsx         # Logic + Node counter
│   │   │   └── alphabeta.jsx       # Logic + Pruning counter
│   │   └── pages/
└── backend/
    └─ scores.js               # API for persistent leaderboards

```

---

## How to Explore

1. Launch the app and navigate to **Single Player**.
2. Select **Minimax** and play; check the **Nodes Visited** in the sidebar.
3. Press the "Show Algorithm Visualization" button to see text based logs.
4. Restart and select **Alpha-Beta Pruning**.
5. Compare the **Nodes Visited** count and observe the **Branches Pruned** metric to see the computational savings in real-time.

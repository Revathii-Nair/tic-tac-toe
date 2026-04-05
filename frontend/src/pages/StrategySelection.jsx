import React from "react";
import { useNavigate } from "react-router-dom";

export default function StrategySelection() {
  const navigate = useNavigate();

  const handleChoice = (engineType) => {
    navigate(`/game/ai?engine=${engineType}`);
  };

  return (
    <div style={styles.container}>
      <h1>Select AI Difficulty</h1>
      <div style={styles.buttonGroup}>
        <button onClick={() => handleChoice("minimax")}>Standard Minimax</button>
        <button onClick={() => handleChoice("alphabeta")}>Optimized Alpha-Beta</button>
      </div>
    </div>
  );
}

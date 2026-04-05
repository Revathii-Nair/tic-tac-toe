import React, { createContext, useContext, useState, useEffect } from "react";

const defaultScores = { player1: { wins: 0, losses: 0, draws: 0 }, player2: { wins: 0, losses: 0, draws: 0 }, ai: { wins: 0, losses: 0, draws: 0 } };

const ScoreContext = createContext(null);

// Make sure this port matches what your backend server.js is running on!
const BACKEND_URL = "http://localhost:5001/api/scores";

export function ScoreProvider({ children }) {
  const [scores, setScores] = useState(defaultScores);

  // 1. Fetch the scores from the JSON file when the app starts
  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setScores(data))
      .catch((err) => console.error("Failed to load scores from backend:", err));
  }, []);

  // 2. Update the local UI, AND tell the backend to update the JSON file
  function updateScore(player, type) {
    // Update frontend immediately so the UI feels fast
    setScores((prev) => ({ ...prev, [player]: { ...prev[player], [type]: prev[player][type] + 1 } }));

    // Send the update to the backend API
    fetch(`${BACKEND_URL}/update`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ player: player, stat: type }) }).catch((err) =>
      console.error("Failed to update backend:", err),
    );
  }

  // 3. Reset the scores on both the frontend and backend
  function resetScores() {
    setScores(defaultScores);
    fetch(`${BACKEND_URL}/reset`, { method: "POST" }).catch((err) => console.error("Failed to reset backend:", err));
  }

  return <ScoreContext.Provider value={{ scores, updateScore, resetScores }}>{children}</ScoreContext.Provider>;
}

export function useScores() {
  return useContext(ScoreContext);
}

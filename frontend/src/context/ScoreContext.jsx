import React, { createContext, useContext, useState, useEffect } from "react";

const defaultScores = { player1: { wins: 0, losses: 0, draws: 0 }, player2: { wins: 0, losses: 0, draws: 0 }, ai: { wins: 0, losses: 0, draws: 0 } };

const ScoreContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_APP_API;

export function ScoreProvider({ children }) {
  const [scores, setScores] = useState(defaultScores);

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setScores(data))
      .catch((err) => console.error("Failed to load scores from backend:", err));
  }, []);

  async function updateScore(player, type) {
    try {
      const res = await fetch(`${BACKEND_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player, stat: type }),
      });
      if (!res.ok) throw new Error("Failed to update backend");
      const data = await res.json();
      setScores(data);
    } catch (err) {
      console.error("Failed to update backend:", err);
    }
  }

  async function resetScores() {
    try {
      const res = await fetch(`${BACKEND_URL}/reset`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to reset backend");
      const data = await res.json();
      setScores(data);
    } catch (err) {
      console.error("Failed to reset backend:", err);
    }
  }

  return <ScoreContext.Provider value={{ scores, updateScore, resetScores }}>{children}</ScoreContext.Provider>;
}

export function useScores() {
  return useContext(ScoreContext);
}

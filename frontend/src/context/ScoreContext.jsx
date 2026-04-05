import React, { createContext, useContext, useState } from 'react';

const defaultScores = {
  player1: { wins: 0, losses: 0, draws: 0 },
  player2: { wins: 0, losses: 0, draws: 0 },
  ai:      { wins: 0, losses: 0, draws: 0 },
};

const ScoreContext = createContext(null);

export function ScoreProvider({ children }) {
  const [scores, setScores] = useState(defaultScores);

  function updateScore(player, type) {
    setScores(prev => ({
      ...prev,
      [player]: {
        ...prev[player],
        [type]: prev[player][type] + 1,
      }
    }));
  }

  function resetScores() {
    setScores(defaultScores);
  }

  return (
    <ScoreContext.Provider value={{ scores, updateScore, resetScores }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScores() {
  return useContext(ScoreContext);
}
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GRIDS = [{ size: 3, label: "3 × 3", winMsg: "3 in a row to win", desc: "Classic Tic Tac Toe.", badge: "Classic", accent: "var(--success)", glow: "rgba(0,229,160,0.30)", icon: "⚡" }];

const AI_STRATEGIES = [
  { engine: "minimax", label: "Minimax", icon: "🌳", badge: "Standard", accent: "var(--accent)", glow: "var(--accent-glow)", desc: "Full game tree search for best move.", tag: "Full search" },
  { engine: "alphabeta", label: "Alpha-Beta", icon: "⚡", badge: "Optimized", accent: "var(--cyan)", glow: "var(--cyan-glow)", desc: "Minimax with pruning for faster play.", tag: "Pruned search" },
];

function StrategyCard({ s, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hover ? s.accent : "var(--border)"}`,
        borderRadius: 16,
        padding: 24,
        width: 240,
        textAlign: "center",
        cursor: "pointer",
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "0.3s",
        boxShadow: hover ? `0 10px 30px ${s.glow}` : "none",
      }}
    >
      <div style={{ fontSize: "2.5rem" }}>{s.icon}</div>
      <h3>{s.label}</h3>
      <p style={{ fontSize: "0.85rem", color: "var(--text2)" }}>{s.desc}</p>
      <div style={{ color: s.accent, fontWeight: "bold" }}>{s.tag}</div>
    </div>
  );
}

function GridCard({ g, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hover ? g.accent : "var(--border)"}`,
        borderRadius: 16,
        padding: 20,
        width: 200,
        textAlign: "center",
        cursor: "pointer",
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "0.3s",
      }}
    >
      <div style={{ fontSize: "2rem" }}>{g.icon}</div>
      <h3>{g.label}</h3>
      <p style={{ fontSize: "0.8rem", color: "var(--text2)" }}>{g.desc}</p>
      <div style={{ color: g.accent, fontWeight: "bold" }}>{g.winMsg}</div>
    </div>
  );
}

export default function GridSelect() {
  const { mode } = useParams();
  const navigate = useNavigate();

  const isAi = mode === "ai";

  // AI mode navigation
  const handleStrategyPick = (engine) => {
    navigate(`/game/ai?engine=${engine}`);
  };

  // Friend mode navigation
  const handleGridPick = (size) => {
    navigate(`/game/${mode}/${size}`);
  };

  return (
    <div className="page" style={{ textAlign: "center", gap: 30 }}>
      {isAi ? (
        <>
          <h1 style={{ fontFamily: "Orbitron, monospace" }}>Choose AI Engine</h1>
          <p style={{ color: "var(--text2)" }}>Select how smart your opponent should be</p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {AI_STRATEGIES.map((s) => (
              <StrategyCard key={s.engine} s={s} onClick={() => handleStrategyPick(s.engine)} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 style={{ fontFamily: "Orbitron, monospace" }}>Select Grid Size</h1>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 30 }}>
            {GRIDS.map((g) => (
              <GridCard key={g.size} g={g} onClick={() => handleGridPick(g.size)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

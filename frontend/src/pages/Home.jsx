import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScores } from "../context/ScoreContext.jsx";

function DecorBoard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        width: 90,
        height: 90,
        position: "relative",
        border: "2px solid var(--border-hi)",
        borderRadius: 10,
        overflow: "hidden",
        animation: "float 3s ease-in-out infinite",
      }}
    >
      <div style={{ position: "absolute", left: "33%", top: 0, bottom: 0, width: 2, background: "var(--border-hi)" }} />
      <div style={{ position: "absolute", left: "66%", top: 0, bottom: 0, width: 2, background: "var(--border-hi)" }} />
      <div style={{ position: "absolute", top: "33%", left: 0, right: 0, height: 2, background: "var(--border-hi)" }} />
      <div style={{ position: "absolute", top: "66%", left: 0, right: 0, height: 2, background: "var(--border-hi)" }} />

      {/* X top-left */}
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "Orbitron, monospace",
            fontWeight: 900,
            color: "var(--x-col)",
            textShadow: "0 0 18px var(--x-glow)",
            fontSize: "1.3rem",
          }}
        >
          X
        </span>
      </div>
      <div />
      <div />
      <div />
      {/* O center */}
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "Orbitron, monospace",
            fontWeight: 900,
            color: "var(--o-col)",
            textShadow: "0 0 18px var(--o-glow)",
            fontSize: "1.5rem",
          }}
        >
          O
        </span>
      </div>
      <div />
      <div />
      <div />
      {/* X bottom-right */}
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "Orbitron, monospace",
            fontWeight: 900,
            color: "var(--x-col)",
            textShadow: "0 0 18px var(--x-glow)",
            fontSize: "1.3rem",
          }}
        >
          X
        </span>
      </div>
    </div>
  );
}

function ModeCard({ icon, title, desc, badge, accentVar, glowVar, onClick, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hov ? `var(${accentVar})` : "var(--border)"}`,
        borderRadius: "var(--radius-l)",
        padding: "34px 28px",
        width: 280,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 13,
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        boxShadow: hov ? `0 14px 44px var(${glowVar}), 0 0 0 1px var(${accentVar})` : "var(--shadow-m)",
        transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        animation: `fadeUp 0.55s ease ${delay}s both`,
      }}
    >
      <div style={{ fontSize: "2.8rem", filter: hov ? `drop-shadow(0 0 12px var(${glowVar}))` : "none", transition: "filter 0.3s" }}>{icon}</div>
      <span
        style={{
          fontSize: "0.62rem",
          fontWeight: 800,
          letterSpacing: "1.4px",
          padding: "3px 10px",
          borderRadius: 20,
          textTransform: "uppercase",
          color: `var(${accentVar})`,
          border: `1px solid var(${accentVar})`,
          background: `color-mix(in srgb, var(${accentVar}) 12%, transparent)`,
        }}
      >
        {badge}
      </span>
      <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "1.05rem", fontWeight: 700, marginTop: 4, color: hov ? `var(${accentVar})` : "var(--text)", transition: "color 0.25s" }}>{title}</h2>
      <p style={{ color: "var(--text2)", fontSize: "0.84rem", lineHeight: 1.6 }}>{desc}</p>
      <div
        style={{
          background: `var(${accentVar})`,
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.85rem",
          padding: "9px 22px",
          borderRadius: 30,
          marginTop: 6,
          letterSpacing: "0.4px",
          boxShadow: `0 3px 14px var(${glowVar})`,
        }}
      >
        Play Now →
      </div>
    </div>
  );
}

function Stat({ label, val, col }) {
  return (
    <div style={{ textAlign: "center", minWidth: 65 }}>
      <div style={{ fontFamily: "Orbitron, monospace", fontSize: "1.7rem", fontWeight: 700, color: col }}>{val}</div>
      <div style={{ fontSize: "0.68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { scores, resetScores } = useScores();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const p1 = scores.player1;
  const totalGames = p1.wins + p1.losses + p1.draws;

  return (
    <div className="page">
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, animation: show ? "fadeUp 0.5s ease both" : "none" }}>
        <DecorBoard />
        <h1 style={{ fontSize: "clamp(1.9rem,5vw,2.9rem)", fontWeight: 900, letterSpacing: "2px" }}>
          Tic Tac&nbsp;
          <span style={{ background: "linear-gradient(135deg, var(--accent), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pro</span>
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "0.97rem", maxWidth: 360, lineHeight: 1.6 }}>
          Challenge yourself against our unbeatable AI or have fun with a friend. Track your stats and become the ultimate Tic Tac Toe champion!
        </p>
      </div>

      {/* Mode Cards */}
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "center" }}>
        <ModeCard
          icon="🤖"
          title="Play with Computer"
          desc="Challenge our unbeatable AI. Choose Minimax or Alpha-Beta algorithm."
          badge="Single Player"
          accentVar="--accent"
          glowVar="--accent-glow"
          onClick={() => navigate("/select/ai")}
          delay={0.2}
        />
        <ModeCard
          icon="👥"
          title="Play with Friend"
          desc="Enjoy a classic game of Tic Tac Toe with your friend on the same device."
          badge="Two Players"
          accentVar="--cyan"
          glowVar="--cyan-glow"
          onClick={() => navigate("/select/friend")}
          delay={0.35}
        />
      </div>

      {/* Score Summary */}
      {totalGames > 0 && (
        <div
          style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-m)", padding: "22px 32px", textAlign: "center", animation: "fadeUp 0.5s ease 0.5s both" }}
        >
          <div style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Your Stats (Player 1)</div>
          <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap" }}>
            <Stat label="Wins" val={p1.wins} col="var(--success)" />
            <Stat label="Losses" val={p1.losses} col="var(--danger)" />
            <Stat label="Draws" val={p1.draws} col="var(--muted)" />
            <Stat label="Played" val={totalGames} col="var(--accent)" />
          </div>
          <button className="btn btn-outline btn-sm" onClick={resetScores} style={{ marginTop: 16 }}>
            Reset Scores
          </button>
        </div>
      )}
    </div>
  );
}

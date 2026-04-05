import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-bg-glow"></div>

      {/* Hero Content */}
      <div className="landing-content">
        <h1 className="landing-title">
          Tic Tac <span className="landing-highlight">Pro</span>
        </h1>

        <p className="landing-subtitle">Play smart. Challenge AI. Compete with friends.</p>

        <button className="landing-btn" onClick={() => navigate("/home")}>
          🚀 Get Started
        </button>

        <div className="landing-engine-header">
          <h2 className="landing-engine-title">🧠 The AI Engine: Beyond Simple Moves</h2>
          <p className="landing-engine-desc">At the heart of Tic Tac Pro lies a decision-making engine using industry-standard adversarial search.</p>
        </div>

        <div className="landing-info-section">
          <div className="landing-card">
            <div className="landing-card-header">
              <span className="landing-icon">🎯</span>
              <h3>Minimax Algorithm</h3>
            </div>
            <p className="landing-card-text">
              A recursive strategy that determines the "perfect" move by simulating every outcome. The AI acts as a <b>Maximizer</b> to get the highest score, while assuming you are a <b>Minimizer</b>{" "}
              trying to limit its gain. This ensures a guaranteed win or draw.
            </p>
          </div>

          <div className="landing-card">
            <div className="landing-card-header">
              <span className="landing-icon">⚡</span>
              <h3>Alpha-Beta Pruning</h3>
            </div>
            <p className="landing-card-text">
              Our optimization "shortcut." It maintains two values: <b>Alpha</b> (best for AI) and <b>Beta</b> (best for you). If a branch is found to be mathematically inferior, the AI "prunes" it,
              making the engine $10\times$ faster without losing accuracy.
            </p>
          </div>
        </div>
      </div>

      <div className="landing-grid-container">
        <p className="landing-debug-text">AI_ENGINE: EVALUATING_TREE...</p>
        <div className="landing-grid">
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="landing-cell">
                {/* We keep the animationDelay inline because it is a dynamic loop variable */}
                <div className="landing-scanner" style={{ animationDelay: `${i * 0.1}s` }}></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

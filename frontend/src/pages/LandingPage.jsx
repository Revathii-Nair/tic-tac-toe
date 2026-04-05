import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.bgGlow}></div>

      {/* Hero Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          Tic Tac <span style={styles.highlight}>Pro</span>
        </h1>

        <p style={styles.subtitle}>Play smart. Challenge AI. Compete with friends.</p>

        <button style={styles.btn} onClick={() => navigate("/home")}>
          🚀 Get Started
        </button>

        <div style={styles.engineHeader}>
          <h2 style={styles.engineTitle}>🧠 The AI Engine: Beyond Simple Moves</h2>
          <p style={styles.engineDesc}>At the heart of Tic Tac Pro lies a decision-making engine using industry-standard adversarial search.</p>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>🎯</span>
              <h3>Minimax Algorithm</h3>
            </div>
            <p style={styles.cardText}>
              A recursive strategy that determines the "perfect" move by simulating every outcome. The AI acts as a <b>Maximizer</b> to get the highest score, while assuming you are a<b>Minimizer</b>{" "}
              trying to limit its gain. This ensures a guaranteed win or draw.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>⚡</span>
              <h3>Alpha-Beta Pruning</h3>
            </div>
            <p style={styles.cardText}>
              Our optimization "shortcut." It maintains two values: <b>Alpha</b> (best for AI) and <b>Beta</b> (best for you). If a branch is found to be mathematically inferior, the AI "prunes" it,
              making the engine $10\times$ faster without losing accuracy.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.gridContainer}>
        <p style={styles.debugText}>AI_ENGINE: EVALUATING_TREE...</p>
        <div style={styles.grid}>
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <div key={i} style={styles.cell}>
                <div style={{ ...styles.scanner, animationDelay: `${i * 0.1}s` }}></div>
              </div>
            ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scan {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; background: rgba(79,127,255,0.4); }
            100% { opacity: 0; transform: scale(1.1); }
          }
          @keyframes blink {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    padding: "60px 20px",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden",
  },
  bgGlow: { position: "absolute", top: "10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(79,127,255,0.15), transparent)", filter: "blur(120px)", zIndex: 0 },
  content: { textAlign: "center", zIndex: 2, maxWidth: "900px" },
  title: { fontSize: "4.5rem", fontWeight: 900, margin: "0 0 10px 0", letterSpacing: "-1px" },
  highlight: { background: "linear-gradient(135deg, #4f7fff, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { color: "#94a3b8", fontSize: "1.4rem", marginBottom: "40px" },
  btn: {
    padding: "16px 45px",
    borderRadius: "50px",
    border: "none",
    fontSize: "1.1rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #4f7fff, #00d4ff)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(79,127,255,0.4)",
    marginBottom: "80px",
  },
  engineHeader: { marginBottom: "30px" },
  engineTitle: { fontSize: "1.8rem", fontWeight: 700, color: "#f8fafc" },
  engineDesc: { color: "#94a3b8", maxWidth: "600px", margin: "10px auto", lineHeight: "1.6" },
  infoSection: { display: "flex", gap: "25px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" },
  card: { background: "rgba(255, 255, 255, 0.03)", padding: "30px", borderRadius: "20px", width: "350px", border: "1px solid rgba(79,127,255,0.15)", textAlign: "left", backdropFilter: "blur(10px)" },
  cardHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" },
  icon: { fontSize: "1.5rem" },
  cardText: { color: "#cbd5e1", fontSize: "0.95rem", lineHeight: "1.6" },
  gridContainer: { marginTop: "80px", display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.5 },
  debugText: { fontSize: "0.75rem", color: "#4f7fff", fontFamily: "monospace", marginBottom: "15px", animation: "blink 2s infinite" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: "10px" },
  cell: { width: "60px", height: "60px", border: "1px solid rgba(79,127,255,0.4)", position: "relative", overflow: "hidden" },
  scanner: { position: "absolute", inset: 0, animation: "scan 2.5s infinite ease-in-out" },
};

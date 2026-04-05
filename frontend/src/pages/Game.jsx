import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMinimaxMove, checkWinner, getWinningLine } from "../utils/minimax.jsx";
import { getAlphaBetaMove } from "../utils/alphabeta.jsx";
import { useScores } from "../context/ScoreContext.jsx";
import AlgoVisualizer from "../components/AlgoVisualizer.jsx";

const CONF_COLORS = ["#4f7fff", "#ff4d7d", "#00d4ff", "#ffd700", "#00e5a0", "#a78bfa"];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({ id: i, color: CONF_COLORS[i % CONF_COLORS.length], left: `${Math.random() * 100}%` }));
  return (
    <>
      {pieces.map((p) => (
        <div key={p.id} className="confetti" style={{ left: p.left, background: p.color }} />
      ))}
    </>
  );
}

function Cell({ value, onClick, isWin }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 100,
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 42,
        fontWeight: 900,
        border: `1.5px solid ${isWin ? "var(--success)" : "var(--border-hi)"}`,
        borderRadius: 10,
        cursor: value ? "default" : "pointer",
        color: value === "X" ? "var(--x-col)" : "var(--o-col)",
        background: isWin ? "color-mix(in srgb, var(--success) 10%, transparent)" : "var(--card)",
        transition: "background 0.3s",
        fontFamily: "Orbitron, monospace",
      }}
    >
      {value}
    </div>
  );
}

function ScoreBlock({ name, symbol, wins, losses, draws }) {
  return (
    <div style={{ textAlign: "center", minWidth: 100 }}>
      <div style={{ fontSize: "1.6rem", fontWeight: 900, fontFamily: "Orbitron, monospace", color: symbol === "X" ? "var(--x-col)" : "var(--o-col)" }}>{symbol}</div>
      <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem" }}>{name}</div>
      <div style={{ color: "var(--text2)", fontSize: "0.8rem", marginTop: 4 }}>
        <span style={{ color: "var(--success)" }}>{wins}W</span>
        {" · "}
        <span style={{ color: "var(--danger)" }}>{losses}L</span>
        {" · "}
        <span style={{ color: "var(--muted)" }}>{draws}D</span>
      </div>
    </div>
  );
}

function ResultOverlay({ emoji, message, isWin, onPlayAgain, onHome }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 }}>
      {isWin && <Confetti />}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          padding: "36px 40px",
          borderRadius: 16,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minWidth: 260,
        }}
      >
        <div style={{ fontSize: 52 }}>{emoji}</div>
        <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "1.4rem", color: "var(--text)", margin: 0 }}>{message}</h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={onPlayAgain}
            style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 30, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}
          >
            Play Again
          </button>
          <button
            onClick={onHome}
            style={{
              background: "var(--card)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: 30,
              padding: "10px 24px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { scores, updateScore } = useScores();

  const queryParams = new URLSearchParams(location.search);
  const engine = queryParams.get("engine") || "minimax";
  const isAi = mode === "ai" || mode === "computer";

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winLine, setWinLine] = useState([]);
  const [over, setOver] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [resultEmoji, setResultEmoji] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  const [showVisualizer, setShowVisualizer] = useState(false);
  const [traceLogs, setTraceLogs] = useState([]);
  const [aiStats, setAiStats] = useState({ visited: 0, pruned: 0 });

  const scoreRecorded = useRef(false);

  useEffect(() => {
    if (scoreRecorded.current) return;
    const result = checkWinner(board);
    if (!result) return;

    setOver(true);
    scoreRecorded.current = true;
    setWinLine(getWinningLine(board) || []);

    if (result === "X") {
      setIsWin(true);
      setResultEmoji("🎉");
      setResultMsg(isAi ? "You Win!" : "Player X Wins!");
      updateScore("player1", "wins");
      if (isAi) updateScore("ai", "losses");
      else updateScore("player2", "losses");
    } else if (result === "O") {
      setIsWin(true);
      setResultEmoji(isAi ? "🤖" : "🎉");
      setResultMsg(isAi ? "AI Wins!" : "Player O Wins!");
      updateScore("player1", "losses");
      if (isAi) updateScore("ai", "wins");
      else updateScore("player2", "wins");
    } else {
      setIsWin(false);
      setResultEmoji("🤝");
      setResultMsg("Draw!");
      updateScore("player1", "draws");
      if (isAi) updateScore("ai", "draws");
      else updateScore("player2", "draws");
    }
  }, [board]);

  useEffect(() => {
    if (!isAi || turn !== "O" || over) return;

    setAiThinking(true);
    const timer = setTimeout(() => {
      const { bestMove, traceLogs: newLogs, nodesVisited, nodesPruned } = engine === "alphabeta" ? getAlphaBetaMove([...board]) : getMinimaxMove([...board]);

      if (bestMove !== -1 && bestMove !== undefined) {
        const newBoard = [...board];
        newBoard[bestMove] = "O";
        setBoard(newBoard);
        setTurn("X");
        setTraceLogs(newLogs);
        setAiStats({ visited: nodesVisited, pruned: nodesPruned });
      }
      setAiThinking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [turn, over, board, engine]);

  function handleClick(index) {
    if (board[index] || over || aiThinking) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
    if (isAi) setTraceLogs([]);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinLine([]);
    setOver(false);
    setResultMsg("");
    setResultEmoji("");
    setIsWin(false);
    setAiThinking(false);
    scoreRecorded.current = false;
    setTraceLogs([]);
    setAiStats({ visited: 0, pruned: 0 });
  }

  const p1 = scores.player1;
  const p2 = isAi ? scores.ai : scores.player2;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: showVisualizer ? "1400px" : "800px",
        margin: "0 auto",
        height: "calc(100vh - 68px)",
        gap: 40,
        padding: "20px",
        transition: "max-width 0.6s ease",
        overflow: "hidden",
      }}
    >
      {/* Left Side: Game Board */}
      <div style={{ flex: "1", minWidth: "350px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {over && <ResultOverlay emoji={resultEmoji} message={resultMsg} isWin={isWin} onPlayAgain={resetGame} onHome={() => navigate("/")} />}

        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 16 }}>
          <ScoreBlock name="Player 1" symbol="X" {...p1} />
          <ScoreBlock name={isAi ? "AI" : "Player 2"} symbol="O" {...p2} />
        </div>

        <h4 style={{ color: "var(--text2)", fontFamily: "Orbitron, monospace", fontSize: "0.9rem", marginBottom: 20 }}>
          {aiThinking ? "🤖 AI Thinking..." : `${turn === "X" ? "Player 1" : isAi ? "AI" : "Player 2"}'s Turn`}
        </h4>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: 10, justifyContent: "center" }}>
          {board.map((cell, i) => (
            <Cell key={i} value={cell} onClick={() => handleClick(i)} isWin={winLine.includes(i)} />
          ))}
        </div>

        <div style={{ height: "76px", width: "100%", maxWidth: "320px", marginTop: "20px" }}>
          {isAi && aiStats.visited > 0 && (
            <div
              style={{
                height: "100%",
                padding: "12px 20px",
                background: "var(--card)",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "8px",
                fontSize: "0.85rem",
              }}
            >
              <div>
                Nodes Checked: <strong style={{ color: "var(--text)" }}>{aiStats.visited}</strong>
              </div>
              {engine === "alphabeta" && (
                <div>
                  Branches Pruned: <strong style={{ color: "var(--danger)" }}>{aiStats.pruned}</strong>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          <button onClick={resetGame} style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 30, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>
            Reset
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ background: "var(--card)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 30, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}
          >
            Home
          </button>

          {isAi && (
            <button
              onClick={() => setShowVisualizer(!showVisualizer)}
              style={{
                background: showVisualizer ? "var(--border)" : "var(--card)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: 30,
                padding: "10px 24px",
                fontWeight: 700,
                cursor: "pointer",
                width: "100%",
                marginTop: "5px",
              }}
            >
              {showVisualizer ? "Hide Algo Working" : "Show Algo Working"}
            </button>
          )}
        </div>
      </div>

      {/* Right Side:  Visualizer */}
      {isAi && showVisualizer && (
        <div style={{ flex: "1", minWidth: "690px" }}>
          <AlgoVisualizer traceData={traceLogs} />
        </div>
      )}
    </div>
  );
}

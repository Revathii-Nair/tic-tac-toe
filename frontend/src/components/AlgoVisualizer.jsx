import React from "react";
import "../styles/Game.css";

export default function AlgoVisualizer({ traceData }) {
  const getLogClass = (line) => {
    if (line.includes("✂️")) return "log-pruned";
    if (line.includes("✅")) return "log-success";
    return "log-normal";
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">Algorithm Visualizer</div>
      <div className="visualizer-content">
        {!traceData || traceData.length === 0 ? (
          <div className="visualizer-empty">Play a move to see the algorithm working!</div>
        ) : (
          traceData.map((line, i) => (
            <div
              key={i}
              className={`visualizer-line ${getLogClass(line)}`}
              dangerouslySetInnerHTML={{ __html: line }} // Keeps your Red X and Blue O working!
            />
          ))
        )}
      </div>
    </div>
  );
}

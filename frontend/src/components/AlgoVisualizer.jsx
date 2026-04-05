import React, { useEffect, useRef } from "react";
import "../styles/Game.css"; // Added import so the visualizer picks up the styles

export default function AlgoVisualizer({ traceData }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [traceData]);

  // Maps the text content to the new CSS classes for coloring
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
            <div key={i} className={`visualizer-line ${getLogClass(line)}`}>
              {line}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

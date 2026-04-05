import React, { useEffect, useRef } from "react";

export default function AlgoVisualizer({ traceData }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [traceData]);

  return (
    <div style={{ height: "550px", backgroundColor: "var(--card)", borderRadius: "10px", border: "1px solid var(--border)", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "var(--border)", padding: "10px", textAlign: "center", fontWeight: "bold" }}>Algorithm Visualizer</div>
      <div style={{ padding: "15px", overflowY: "auto", flex: 1, fontFamily: "monospace", fontSize: "0.85rem" }}>
        {!traceData || traceData.length === 0 ? (
          <div style={{ color: "var(--text2)", textAlign: "center", marginTop: "20px" }}>Play a move to see the algorithm working!</div>
        ) : (
          traceData.map((line, i) => (
            <div key={i} style={{ marginBottom: "4px", color: line.includes("✂️") ? "var(--danger)" : line.includes("✅") ? "var(--success)" : "var(--text)" }}>
              {line}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

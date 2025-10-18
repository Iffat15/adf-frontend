import React, { useState } from 'react';

export default function RightPanel({ queue, setResults }) {
  // const [results, setResults] = useState([]);
  const buttonStyle = {
    padding: '10px 16px',
    margin: '6px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const runPipeline = async () => {
    try {
      const res = await fetch("http://localhost:8000/run-pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scripts: queue }),
      });
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Pipeline execution failed:", err);
    }
  };

  return (
    <div
      style={{
        width: '30%',
        height: '100%',
        padding: '10px',
        background: '#e3f2fd',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <h3 style={{ marginBottom: '12px' }}>Pipeline Controls</h3>
      <button style={buttonStyle}>Start New Pipeline</button>
      <button style={buttonStyle} onClick={runPipeline}>Run Pipeline</button>
      <button style={buttonStyle}>Save Pipeline</button>
      <button style={buttonStyle}>Test Pipeline</button>
      <button style={buttonStyle}>Run Analytics</button>
      <button style={buttonStyle}>View Logs</button>

      <h4 style={{ marginTop: '20px' }}>Queued Nodes:</h4>
      {/* <ul style={{ paddingLeft: '16px' }}>
        {queue.length === 0 ? (
          <li style={{ color: '#777' }}>No nodes added yet</li>
        ) : (
          queue.map((node, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{node}</li>
          ))
        )}
      </ul> */}
      <ul style={{ paddingLeft: '16px' }}>
        {queue.length === 0 ? (
          <li style={{ color: '#777' }}>No nodes added yet</li>
        ) : (
          queue.map((node, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>
              {node?.label || "Unnamed Node"}
            </li>
          ))
        )}
      </ul>

      {/* {results.length > 0 && (
        <>
          <h4 style={{ marginTop: '20px' }}>Execution Results:</h4>
          <ul style={{ paddingLeft: '16px' }}>
            {results.map((r, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <strong>{r.script}</strong><br />
                <span style={{ color: '#333' }}>Output: {r.stdout || "No output"}</span><br />
                {r.stderr && <span style={{ color: 'red' }}>Error: {r.stderr}</span>}
              </li>
            ))}
          </ul>
        </>
      )} */}
    </div>
  );
}


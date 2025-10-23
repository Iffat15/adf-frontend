import React, { useState } from 'react';

export default function RightPanel({
  queue,
  setResults,
  canvasNodes,
  connections,
  params,
  handleStartNewPipeline,
  handleSavePipeline,
  pipelineName,
  pipelineDescription,
  setPipelineName,
  setPipelineDescription
}) {
  const [savedPipelineId, setSavedPipelineId] = useState(null);


  const buttonStyle = {
    padding: '10px 16px',
    margin: '6px 6px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '200px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  // const runPipeline = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/run-pipeline", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ scripts: queue }),
  //     });
  //     const data = await res.json();
  //     setResults(data.results);
  //   } catch (err) {
  //     console.error("Pipeline execution failed:", err);
  //   }
  // };
  const runPipeline = async (pipelineId) => {
  try {
    const response = await fetch(`http://localhost:8000/pipelines/run-pipeline/${pipelineId}`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const result = await response.json();
    console.log("Pipeline run result:", result);
    setResults(result.results); // Optional: show results in UI
    return result;
  } catch (error) {
    console.error("Error running pipeline:", error);
    return { error: error.message };
  }
};


  return (
    <div
    >
      {/* <h3 style={{ marginBottom: '12px' }}>Pipeline Controls</h3> */}
       <div style={{ marginTop: '20px' }}>
      <label>Pipeline Name:</label><br />
      <input
        type="text"
        value={pipelineName}
        onChange={(e) => setPipelineName(e.target.value)}
        style={{ width: '200px', marginBottom: '10px' }}
      /><br />
      <label>Description:</label><br />
      <textarea
        value={pipelineDescription}
        onChange={(e) => setPipelineDescription(e.target.value)}
        style={{ width: '200px', height: '60px' }}
      />
    </div>
      <button style={buttonStyle} onClick = {handleStartNewPipeline}> New Pipeline</button>
      {/* <button style={buttonStyle} onClick={runPipeline}>Run Pipeline</button> */}
      {/* <button style={buttonStyle} onClick = {handleSavePipeline}>Save Pipeline</button> */}
      <button
  style={buttonStyle}
  onClick={async () => {
    const id = await handleSavePipeline();
    if (id) setSavedPipelineId(id);
  }}
>
  Save Pipeline
</button>
      {/* <button
  style={buttonStyle}
  onClick={async () => {
    if (!savedPipelineId) return alert("Please save the pipeline first.");
    const response = await fetch(`http://localhost:8000/run-pipeline/${savedPipelineId}`);
    const result = await response.json();
    console.log("Pipeline run result:", result);
    setResults(result.results); // Optional
  }}
>
  Run Pipeline
</button> */}
<button
  style={buttonStyle}
  onClick={async () => {
    if (!savedPipelineId) return alert("Please save the pipeline first.");
    await runPipeline(savedPipelineId); // ✅ Use the defined function
  }}
>
  Run Pipeline
</button>

      <button style={buttonStyle}>Test Pipeline</button>
      <button style={buttonStyle}>Run Analytics</button>
      <button style={buttonStyle}>View Logs</button>


      {/* <h4 style={{ marginTop: '20px' }}>Queued Nodes:</h4>
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
      </ul> */}
      <h4 style={{ marginTop: '20px' }}>Canvas Nodes: {canvasNodes.length}</h4>
      <ul style={{ paddingLeft: '16px' }}>
        {canvasNodes.map((node,index) => (
          <li key={node.id ||index}>{node.label} ({node.type})</li>
        ))}
      </ul>
      <h4 style={{ marginTop: '20px' }}>Connections:</h4>
      <ul style={{ paddingLeft: '16px' }}>
        {connections.length === 0 ? (
          <li style={{ color: '#777' }}>No connections yet</li>
        ) : (
          // connections.map((conn, index) => (
          //   <li key={index}>
          //     {conn.from} → {conn.to}
          //   </li>
          // ))
          connections.map((conn, index) => (
            <li key={`${conn.from}-${conn.to}`}>{conn.from} → {conn.to}</li>
          ))

        )}
      </ul>

    </div>
  );
}


import React, { useState } from 'react';
import PipelineModal from './PipelineModal';
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
  setPipelineDescription,
  connectionsLocked,
  setConnectionsLocked,
  nodeSelectionDone,
  setNodeSelectionDone,
  showModal,
  setShowModal,
  savedPipelineId
}) {
  // const [savedPipelineId, setSavedPipelineId] = useState(null);


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
    <div className='bg-black text-white p-6 shadow-lg border-l border-gray-800 space-y-4'
    >
      <div className="flex flex-row justify-center items-center gap-4">

      {/* <button style={buttonStyle} onClick={handleStartNewPipeline}> New Pipeline</button>

      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Pipeline
      </button>

      <button
        onClick={() => setConnectionsLocked(true)}
        disabled={connectionsLocked}
        className={`px-4 py-2 rounded ${connectionsLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
      >
        {connectionsLocked ? 'Connections Locked' : 'Save Connections'}
      </button>

      <button
        onClick={() => setNodeSelectionDone(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Nodes Selection Done
      </button>

      <button
        style={buttonStyle}
        onClick={async () => {
          if (!savedPipelineId) return alert("Please save the pipeline first.");
          await runPipeline(savedPipelineId); // ✅ Use the defined function
        }}
      >
        Run Pipeline
      </button>

      <button style={buttonStyle}>Test Pipeline</button> */}

      <button className=' px-4 py-2 bg-gray-900 text-green-400 border border-green-500 rounded-md hover:text-green-300 transition duration-200' onClick={handleStartNewPipeline}> New Pipeline</button>
      <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-gray-900 text-green-400 border border-green-500 rounded-md hover:text-green-300 transition duration-200" > Save Pipeline </button>
      <button onClick={() => setConnectionsLocked(true)} disabled={connectionsLocked}
        // className={`px-4 py-2 rounded ${connectionsLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white' }`} 
        // className={` px-4 py-2 font-bold rounded transition duration-200 ${connectionsLocked
        //     ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
        //     : 'bg-green-600 hover:bg-green-500 text-white'
        //   }`}
        className={`px-4 py-2 font-bold rounded-md transition duration-200 ${
        connectionsLocked
          ? 'bg-gray-700 text-gray-400 border border-gray-500 cursor-not-allowed'
          : 'bg-gray-900 text-green-400 border border-green-500 hover:text-green-300'
      }`}
      >
        {connectionsLocked ? 'Connections Locked' : 'Save Connections'}
      </button>
      {/* <button onClick={() => setNodeSelectionDone(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded transition duration-200" > 
        Nodes Selection Done
      </button>  */}
      <button
        onClick={() => setNodeSelectionDone(true)}
        disabled={nodeSelectionDone}
        // className={`px-4 py-2 font-bold rounded transition duration-200 ${nodeSelectionDone
        //     ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
        //     : 'bg-indigo-600 hover:bg-indigo-500 text-white'
        //   }`}
        className={`px-4 py-2 font-bold rounded-md transition duration-200 ${
        nodeSelectionDone
          ? 'bg-gray-700 text-gray-400 border border-gray-500 cursor-not-allowed'
          : 'bg-gray-900 text-green-400 border border-green-500 hover:text-green-300'
      }`}
      >
        {nodeSelectionDone ? 'Selection Locked' : 'Nodes Selection Done'}
      </button>

      <button  className="px-4 py-2 bg-gray-900 text-green-400 border border-green-500 rounded-md hover:text-green-300 transition duration-200"
        onClick={async () => {
          if (!savedPipelineId) return alert("Please save the pipeline first."); await runPipeline(savedPipelineId); // ✅ Use the defined function 
        }} > Run Pipeline </button> 
        
        <button className="px-4 py-2 bg-gray-900 text-green-400 border border-green-500 rounded-md hover:text-green-300 transition duration-200">Test Pipeline</button>
    </div>
    </div>
  );
}


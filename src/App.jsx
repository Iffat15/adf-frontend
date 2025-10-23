import './App.css';
import { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import MiddlePanel from './components/MiddlePanel';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';
import LogPanel from './components/LogPanel';
function App() {

  const [nodes, setNodes] = useState([]);
  const [canvasNodes, setCanvasNodes] = useState([])
  const [results, setResults] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(null);
  const [pipelineName, setPipelineName] = useState("New Pipeline");
  const [pipelineDescription, setPipelineDescription] = useState("");
  const [params, setParams] = useState({});

  //  Fetch uploaded scripts when page loads
  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const res = await fetch('http://localhost:8000/scripts/all');
        const data = await res.json();
        // setNodes(data.scripts); // ['script1.py', 'script2.py']
        setNodes(data);
        console.log('Fetched scripts:', data);
      } catch (err) {
        console.error('Failed to fetch scripts:', err);
      }
    };

    fetchScripts();
  }, []);
  // const handleNodeClick = (label) => {
  //   setCanvasNodes((prev) => [...prev, label])
  // }
  // const handleNodeClick = (node) => {
  //   setCanvasNodes((prev) => [
  //     ...prev,
  //     { node, position: { x: 50, y: 50 } } // default position
  //   ]);
  // };
  const handleNodeClick = (node) => {
    console.log("Clicking on node",node)
    console.log("Added to canvas:", {
    id: node._id,
    label: node.name,
    type: node.type
  });
    setCanvasNodes((prev) => [
      ...prev,
      {
        id: node._id || node.id,
        label: node.name,
        type: node.type,
        position: { x: 50, y: 50 }
      }
    ]);
  };


  //  This function will be passed to MiddlePanel
  const handleNewNode = (label) => {
    setNodes((prevNodes) => [...prevNodes, label]);
  };

  // const handleDropNode = (label, position) => {
  //   setCanvasNodes((prev) => [
  //     ...prev,
  //     { label, position }
  //   ]);
  // };
  const handleDropNode = (node, position) => {
    console.log("Dropping node",node)
    console.log(node._id)
    setCanvasNodes((prev) => [
      ...prev,
      {
        id: node._id,           // Use the actual MongoDB ID
        label: node.name,       // Display name like "extract1.py"
        type: node.type,        // Optional: useful for styling or logic
        position: position
      }
    ]);
  };



  // const handleNodeSelect = (index) => {
  //   if (selectedNodeIndex === null) {
  //     setSelectedNodeIndex(index);
  //   } else {
  //     setConnections((prev) => [...prev, { from: selectedNodeIndex, to: index }]);
  //     setSelectedNodeIndex(null);
  //   }
  // };

  // const handleNodeSelect = (index) => {
  //   if (selectedNodeIndex === null) {
  //     setSelectedNodeIndex(index);
  //   } else {
  //     const from = selectedNodeIndex;
  //     const to = index;

  //     // Check if this connection already exists
  //     const alreadyConnected = connections.some(
  //       (conn) => conn.from === from && conn.to === to
  //     );

  //     if (!alreadyConnected) {
  //       setConnections((prev) => [...prev, { from, to }]);
  //     }

  //     setSelectedNodeIndex(null);
  //   }
  // };
  //   const handleNodeSelect = (index) => {
  //   if (selectedNodeIndex === null) {
  //     setSelectedNodeIndex(index);
  //   } else {
  //     const from = selectedNodeIndex;
  //     const to = index;

  //     // Normalize direction: only allow one arrow from A to B
  //     const isDuplicate = connections.some(
  //       (conn) =>
  //         (conn.from === from && conn.to === to) ||
  //         (conn.from === to && conn.to === from)
  //     );

  //     if (!isDuplicate) {
  //       // setConnections((prev) => [...prev, { from, to }]);
  //       setConnections((prev) => [...prev, { from: canvasNodes[from].id, to: canvasNodes[to].id }]);
  //     }

  //     setSelectedNodeIndex(null);
  //   }
  // };
  const handleNodeSelect = (index) => {
    console.log("Node selected:", index);
    

    if (selectedNodeIndex === null) {
      setSelectedNodeIndex(index);
    } else {
      const fromId = canvasNodes[selectedNodeIndex]?.id;
      const toId = canvasNodes[index]?.id;
      console.log("Connecting:", fromId, "→", toId);
      console.log("Connecting:", fromId, "→", toId); // ✅ Add this line here
      const isDuplicate = connections.some(
        (conn) => conn.from === fromId && conn.to === toId
      );

      if (!isDuplicate && fromId && toId) {
        setConnections((prev) => [...prev, { from: fromId, to: toId }]);
      }

      setSelectedNodeIndex(null);
    }
  };
  const handleStartNewPipeline = () => {
    setCanvasNodes([]);         // Clear all nodes from canvas
    setConnections([]);         // Remove all connections
    setSelectedNodeIndex(null); // Reset selection state
    setResults([]);             // Clear previous execution results
    setParams({});              // Reset any node-specific parameters
    setPipelineName("New Pipeline");         // Reset pipeline name
    setPipelineDescription("");             // Reset pipeline description
  };



  const handleSavePipeline = async () => {
    const payload = {
      name: "ETL",
      description: "Checking for single input pipeline",
      nodes: canvasNodes.map(n => n.id),
      connections: connections,
      params: {} // add param logic later
    };

    try {
      const res = await fetch("http://localhost:8000/pipelines/create-pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      console.log("Pipeline saved:", result);
      return result.pipeline_id
    } catch (err) {
      console.error("Failed to save pipeline:", err);
      return null
    }
  };


  return (
    <div className="app-container">
      {/* <div className='main-content'> */}
      <div className='left-area'>
        <MiddlePanel onNewNode={handleNewNode} />
        <LeftPanel nodes={nodes} onNodeClick={handleNodeClick} />
      </div>

      <div className='middle-section'>
        {/* <MiddlePanel onNewNode={handleNewNode} /> */}
        <div className='right-panel'>
          <RightPanel
            // queue={canvasNodes}
            setResults={setResults}
            canvasNodes={canvasNodes}
            connections={connections}
            params={params}
            pipelineName={pipelineName}
            pipelineDescription={pipelineDescription}
            setPipelineName={setPipelineName}
            setPipelineDescription={setPipelineDescription}
            handleStartNewPipeline={handleStartNewPipeline}
            handleSavePipeline={handleSavePipeline}
          />
        </div>
        {/* <Canvas canvasNodes={canvasNodes} onDropNode={handleDropNode} /> */}
        {/* <Canvas
          canvasNodes={canvasNodes}
          onDropNode={handleDropNode}
          setCanvasNodes={setCanvasNodes}
        /> */}
        <Canvas
          canvasNodes={canvasNodes}
          onDropNode={handleDropNode}
          setCanvasNodes={setCanvasNodes}
          onNodeSelect={handleNodeSelect}
          connections={connections}
          selectedNodeIndex={selectedNodeIndex}
        />

      </div>
      {/* <RightPanel queue={canvasNodes} setResults={setResults} /> */}
      <LogPanel results={results} />
      {/* </div> */}
    </div>
  );
}

export default App;

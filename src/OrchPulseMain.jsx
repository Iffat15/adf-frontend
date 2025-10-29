// import './App.css';
import './index.css';
import { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
// import MiddlePanel from './components/MiddlePanel';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';
import LogPanel from './components/LogPanel';
import Navbar from './components/Navbar';
// import Can1 from './components/Can1';
// import UploadFile from './components/UploadFile';
import ConfigurationPanel from './components/ConfigurationPanel';
import PipelineModal from './components/PipelineModal';
// import Table from './components/cards/Table';
// import NodeCard from './components/cards/NodeCard';
export default function OrchPulseMain() {

  const [nodes, setNodes] = useState([]);
  const [canvasNodes, setCanvasNodes] = useState([])
  const [results, setResults] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(null);
  const [pipelineName, setPipelineName] = useState("New Pipeline");
  const [pipelineDescription, setPipelineDescription] = useState("");
  const [params, setParams] = useState({});
  const [executionLogs, setExecutionLogs] = useState([]);
  const [streamlogs, setStreamLogs] = useState([])
  const [connectionsLocked, setConnectionsLocked] = useState(false);
  const [selectedConfigNode, setSelectedConfigNode] = useState(null);
  const [nodeSelectionDone, setNodeSelectionDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [savedPipelineId, setSavedPipelineId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

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

  const handleNodeClick = (node) => {
    console.log("Clicking on node", node)
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

  const handleDropNode = (node, position) => {
    console.log("Dropping node", node)
    console.log(node._id)
    setCanvasNodes((prev) => [
      ...prev,
      {
        // id: node._id,           // Use the actual MongoDB ID
        // label: node.name,       // Display name like "extract1.py"
        // type: node.type,        // Optional: useful for styling or logic
        // position: position
        ...node,
        id: node._id,
        position
      }
    ]);
  };
  const handleNodeSelect = (index) => {

    if (!nodeSelectionDone) {
      console.log("🛑 Node selection is still active. No connections allowed.");
      return;
    }
    if (connectionsLocked) {
      // alert("🔒 Connections are locked. No new links allowed.");
      const node = canvasNodes[index];
      setSelectedConfigNode(node); // ✅ pass node to config panel
      return;
    }
    const fromId = canvasNodes[selectedNodeIndex]?.id;
    const toId = canvasNodes[index]?.id;

    // First click: select node
    if (selectedNodeIndex === null) {
      setSelectedNodeIndex(index);
      return;
    }

    // Prevent self-connection
    if (fromId === toId) {
      alert("Cannot connect a node to itself.");
      setSelectedNodeIndex(null);
      return;
    }


    const fromType = canvasNodes[selectedNodeIndex]?.type;
    const toType = canvasNodes[index]?.type;

    const isValidFlow =
      (fromType === "extract" && toType === "transform") ||
      (fromType === "transform" && toType === "transform") ||
      (fromType === "transform" && toType === "load") ||
      (fromType === "extract" && toType === "load");;
    if (!isValidFlow) {
      alert("Invalid connection direction.");
      setSelectedNodeIndex(null);
      return;
    }
    // Check for duplicate connection
    const isDuplicate = connections.some(
      (conn) => conn.from === fromId && conn.to === toId
    );

    if (!isDuplicate && fromId && toId) {
      setConnections((prev) => [...prev, { from: fromId, to: toId }]);
    }
    setSelectedNodeIndex(null);
  };
  const handleModalSubmit = async (name, description) => {
    setPipelineName(name);
    setPipelineDescription(description);
    setShowModal(false);

    // Now call your backend save logic
    // handleSavePipeline();
    const id = await handleSavePipeline();
    if (id) {
      setSavedPipelineId(id); // ✅ Store the ID in App state
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
    setConnectionsLocked(false);
    setNodeSelectionDone(false);
    setSelectedConfigNode(null);     // ✅ Deselect any node

  };



  const handleSavePipeline = async () => {
    const payload = {
      name: pipelineName,
      description: pipelineDescription,
      nodes: canvasNodes.map(n => n.id),
      connections: connections,
      params: params// add param logic later
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
  const fetchExecutionLogs = async () => {
    const res = await fetch("http://localhost:8000/logs");
    const data = await res.json();
    setExecutionLogs(data.logs);
  };
  useEffect(() => {
    fetchExecutionLogs();
    const interval = setInterval(fetchExecutionLogs, 5000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/stream-output");

    eventSource.onmessage = (event) => {
      const nodeResult = JSON.parse(event.data);
      setStreamLogs((prev) => [...prev, nodeResult]);
    };

    eventSource.addEventListener("end", () => {
      eventSource.close();
    });

    eventSource.onerror = (err) => {
      console.error("Stream error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />
      {/* Main Content Area */}
      <div className="flex  flex-row flex-1 overflow-hidden">
        {/* Left Area */}
        {/* <div className="left-area"> */}
        {/* <MiddlePanel /> */}
        {/* <UploadFile/> */}
        <LeftPanel nodes={nodes} onNodeClick={handleNodeClick} />
        {/* </div> */}

        {/* Middle Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className='flex-none'>
            <RightPanel
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
              connectionsLocked={connectionsLocked}
              setConnectionsLocked={setConnectionsLocked}
              nodeSelectionDone={nodeSelectionDone}
              setNodeSelectionDone={setNodeSelectionDone}
              showModal={showModal}
              setShowModal={setShowModal}
              savedPipelineId={savedPipelineId}

            />
          </div>
          <div className="flex flex-1 relative">
            <div className='flex-grow overflow-auto relative'>
              <Canvas
                canvasNodes={canvasNodes}
                onDropNode={handleDropNode}
                setCanvasNodes={setCanvasNodes}
                onNodeSelect={handleNodeSelect}
                connections={connections}
                selectedNodeIndex={selectedNodeIndex}
                setConnections={setConnections}
                nodeSelectionDone={nodeSelectionDone}
                setSelectedConfigNode={setSelectedConfigNode}
                setIsMinimized={setIsMinimized}
              />
            </div>

            {/* <Can1 /> */}
            {/* <Table/> */}
          </div>
          {/* <div className='absolute right-0 top-0 h-full z-10'> */}
          {!isMinimized && selectedConfigNode && (<ConfigurationPanel
            selectedNode={selectedConfigNode}
            params={params}
            setParams={setParams}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
          />)}
          {/* </div> */}
          </div>
        </div>

        {/* Footer or Log Panel */}
        {/* <LogPanel results={results} /> */}
        <LogPanel streamlogs={streamlogs} executionLogs={executionLogs} />
        {/* ✅ Modal goes here */}
        <PipelineModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      </div>
      );

}

      
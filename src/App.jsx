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
  //  Fetch uploaded scripts when page loads
  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const res = await fetch('http://localhost:8000/scripts');
        const data = await res.json();
        setNodes(data.scripts); // ['script1.py', 'script2.py']
      } catch (err) {
        console.error('Failed to fetch scripts:', err);
      }
    };

    fetchScripts();
  }, []);
  // const handleNodeClick = (label) => {
  //   setCanvasNodes((prev) => [...prev, label])
  // }
  const handleNodeClick = (label) => {
    setCanvasNodes((prev) => [
      ...prev,
      { label, position: { x: 50, y: 50 } } // default position
    ]);
  };

  //  This function will be passed to MiddlePanel
  const handleNewNode = (label) => {
    setNodes((prevNodes) => [...prevNodes, label]);
  };

  const handleDropNode = (label, position) => {
    setCanvasNodes((prev) => [
      ...prev,
      { label, position }
    ]);
  };
  

  const handleNodeSelect = (index) => {
    if (selectedNodeIndex === null) {
      setSelectedNodeIndex(index);
    } else {
      setConnections((prev) => [...prev, { from: selectedNodeIndex, to: index }]);
      setSelectedNodeIndex(null);
    }
  };

  return (
    <div className="app-container">
      {/* <div className='main-content'> */}
      <LeftPanel nodes={nodes} onNodeClick={handleNodeClick} />
      <div className='middle-section'>
        <MiddlePanel onNewNode={handleNewNode} />
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
        />

      </div>
      <RightPanel queue={canvasNodes} setResults={setResults} />
      <LogPanel results={results} />
      {/* </div> */}
    </div>
  );
}

export default App;

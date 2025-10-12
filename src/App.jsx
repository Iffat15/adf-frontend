// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App
// import React, { useState } from 'react';
// import LeftPanel from './components/LeftPanel.jsx';
// import MiddlePanel from './components/MiddlePanel.jsx';
// import RightPanel from './components/RightPanel.jsx';

// export default function App() {
//   const [selectedItem, setSelectedItem] = useState(null);

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <LeftPanel onSelect={setSelectedItem} />
//       <MiddlePanel selected={selectedItem} />
//       <RightPanel />
//     </div>
//   );
// }
import './App.css';
import { useState, useEffect } from 'react';
import LeftPanel  from './components/LeftPanel';
import MiddlePanel from './components/MiddlePanel';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';
function App() {
  
  const [nodes, setNodes] = useState([]);
  const [canvasNodes,setCanvasNodes] = useState([])
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
  const handleNodeClick = (label) =>{
    setCanvasNodes((prev)=>[...prev,label])
  }
  // const handleNodeClick = (label) => {
  //   const newNode = { label, next: null };

  //   setCanvasNodes((prev) => {
  //     // Link the last node to the new one
  //     if (prev.length > 0) {
  //       prev[prev.length - 1].next = newNode;
  //     }
  //     return [...prev, newNode];
  //   });
  // };
  //  This function will be passed to MiddlePanel
  const handleNewNode = (label) => {
    setNodes((prevNodes) => [...prevNodes, label]);
  };
  return (
    <div className="app-container">
      {/* <div className='main-content'> */}
        <LeftPanel nodes = {nodes} onNodeClick={handleNodeClick}/>
        <div className='middle-section'>
          <MiddlePanel onNewNode={handleNewNode} />
          <Canvas canvasNodes={canvasNodes}/>
        </div>
        <RightPanel queue={canvasNodes}/>
      {/* </div> */}
    </div>
  );
}

export default App;

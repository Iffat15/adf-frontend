// export default function Canvas({ canvasNodes }) {
//   return (
//     <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', gap: '20px' }}>
//       {canvasNodes.map((label, index) => (
//         <div
//           key={index}
//           style={{
//             padding: '12px 16px',
//             backgroundColor: '#cce5ff',
//             borderRadius: '6px',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//           }}
//         >
//           {label}
//         </div>
//       ))}
//     </div>
//   );
// }

// // import React, { useCallback } from 'react';
// // import ReactFlow, {
// //   ReactFlowProvider,
// //   useNodesState,
// //   useEdgesState,
// //   addEdge,
// // } from 'react-flow-renderer';

// // const initialNodes = [];
// // const initialEdges = [];

// // export default function Canvas() {
// //   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
// //   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

// //   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

// //   const onDrop = useCallback((event) => {
// //     event.preventDefault();
// //     const nodeLabel = event.dataTransfer.getData('application/reactflow');
// //     const position = { x: event.clientX - 250, y: event.clientY - 100 };
// //     const newNode = {
// //       id: `${+new Date()}`,
// //       type: 'default',
// //       position,
// //       data: { label: nodeLabel },
// //     };
// //     setNodes((nds) => nds.concat(newNode));
// //   }, [setNodes]);

// //   const onDragOver = useCallback((event) => {
// //     event.preventDefault();
// //     event.dataTransfer.dropEffect = 'move';
// //   }, []);

// //   return (
// //     <div className="canvas">
// //       <ReactFlowProvider>
// //         <ReactFlow
// //           nodes={nodes}
// //           edges={edges}
// //           onNodesChange={onNodesChange}
// //           onEdgesChange={onEdgesChange}
// //           onConnect={onConnect}
// //           onDrop={onDrop}
// //           onDragOver={onDragOver}
// //           fitView
// //         />
// //       </ReactFlowProvider>
// //     </div>
// //   );
// // }
// import React from 'react';
// import ReactFlow, { ReactFlowProvider } from 'reactflow';

// const nodes = [
//   {
//     id: '1',
//     data: { label: 'Node 1' },
//     position: { x: 100, y: 100 },
//   },
//   {
//     id: '2',
//     data: { label: 'Node 2' },
//     position: { x: 300, y: 100 },
//   },
// ];

// const edges = [
//   {
//     id: 'e1-2',
//     source: '1',
//     target: '2',
//     type: 'default',
//   },
// ];

// export default function Canvas() {
//   return (
//     <div className="canvas" style={{ height: '100%', border: '2px dashed #ccc' }}>
//       <ReactFlowProvider>
//         <ReactFlow nodes={nodes} edges={edges} fitView />
//       </ReactFlowProvider>
//       Hiii
//     </div>
//   );
// }
// Canvas.js
// export default function Canvas({ canvasNodes }) {
//   return (
//     <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', gap: '20px' }}>
//       {canvasNodes.map((label, index) => (
//         <div
//           key={index}
//           style={{
//             padding: '12px 16px',
//             backgroundColor: '#cce5ff',
//             borderRadius: '6px',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//           }}
//         >
//           {label}
//         </div>
//       ))}
//     </div>
//   );
// }

// import React from 'react';

// export default function Canvas({ selectedNode }) {
//   return (
//     <div  style={{ height: '70%', width: '100%', background: '#fff', padding: '10px', overflowY: 'auto' }}>
//       <h3>Canvas</h3>
//       {selectedNode ? (
//         <div
//           style={{
//             padding: '12px',
//             background: '#eee',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//           }}
//         >
//           {selectedNode}
//         </div>
//       ) : (
//         <p>No node selected</p>
//       )}
//     </div>
//   );
// }
import React from 'react';

export default function Canvas({ canvasNodes }) {
  return (
    <div
      style={{
        height: '70%',
        width: '100%',
        background: '#fff',
        padding: '10px',
        border: '2px dotted #aaa',       // dotted border
        borderRadius: '12px',            // curved corners
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontStyle: 'italic',
        color: '#666',
      }}
    >
      {canvasNodes.length === 0 ? (
        <span>Drag and drop your nodes here</span>
      ) : (
        <div style={{ width: '100%' }}>
          {canvasNodes.map((node, index) => (
            <div
              key={index}
              style={{
                padding: '8px',
                margin: '4px',
                background: '#eee',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              {node}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

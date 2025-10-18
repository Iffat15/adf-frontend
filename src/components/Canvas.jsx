
// import React from 'react';

// export default function Canvas({ canvasNodes }) {
//   return (
//     <div
//       style={{
//         height: '70%',
//         width: '100%',
//         background: '#fff',
//         padding: '10px',
//         border: '2px dotted #aaa',       // dotted border
//         borderRadius: '12px',            // curved corners
//         boxSizing: 'border-box',
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontStyle: 'italic',
//         color: '#666',
//       }}
//     >
//       {canvasNodes.length === 0 ? (
//         <span>Drag and drop your nodes here</span>
//       ) : (
//         <div style={{ width: '100%' }}>
//           {canvasNodes.map((node, index) => (
//             <div
//               key={index}
//               style={{
//                 padding: '8px',
//                 margin: '4px',
//                 background: '#eee',
//                 border: '1px solid #ccc',
//                 borderRadius: '4px',
//               }}
//             >
//               {node}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useRef } from 'react';
export default function Canvas({ canvasNodes,
  onDropNode,
  setCanvasNodes,
  onNodeSelect,
connections }) {
  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow drop
  };

  // const handleDrop = (e) => {
  //   const label = e.dataTransfer.getData("nodeLabel");
  //   if (label) {
  //     onDropNode(label);
  //   }
  // };
  const handleDrop = (e) => {
    e.preventDefault();
    const label = e.dataTransfer.getData("nodeLabel");
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    if (label) {
      onDropNode(label, { x, y });
    }
  };
   const draggingNodeIndex = useRef(null);

  const handleMouseDown = (e, index) => {
    draggingNodeIndex.current = index;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (draggingNodeIndex.current === null) return;

    const canvasRect = document.querySelector(".canvas").getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    setCanvasNodes((prev) =>
      prev.map((node, i) =>
        i === draggingNodeIndex.current
          ? { ...node, position: { x, y } }
          : node
      )
    );
  };

  const handleMouseUp = () => {
    draggingNodeIndex.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    // <div
    //   className="canvas"
    //   onDragOver={handleDragOver}
    //   onDrop={handleDrop}
    //   style={{
    //     border: "2px dashed #ccc",
    //     minHeight: "400px",
    //     padding: "20px",
    //     backgroundColor: "#f9f9f9",
    //   }}
    // >
    //   <h3>Pipeline Canvas</h3>
    //   {canvasNodes.length === 0 ? (
    //     <p>Drag nodes here to build your pipeline</p>
    //   ) : (
    //     <ul>
    //       {canvasNodes.map((label, index) => (
    //         <li key={index}>{label}</li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
//     <div
      
//       className="canvas"
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={handleDrop}
//       style={{
//         position: "relative",
//         border: "2px dashed #ccc",
//         minHeight: "400px",
//         padding: "20px",
//         backgroundColor: "#f9f9f9",
//       }}
//     >
//       {/* {canvasNodes.map((node, index) => (
//         <div
//           key={index}
//           style={{
//             position: "absolute",
//             left: node.position.x,
//             top: node.position.y,
//             padding: "8px",
//             background: "#cce5ff",
//             borderRadius: "4px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//           }}
//         >
//           {node.label}
//         </div>
//       ))} */}
//       {canvasNodes.map((node, index) => (
//         <div
//           key={index}
//           onMouseDown={(e) => handleMouseDown(e, index)}
//           style={{
//             position: "absolute",
//             left: node.position.x,
//             top: node.position.y,
//             padding: "8px",
//             background: "#cce5ff",
//             borderRadius: "4px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//             cursor: "move",
//             userSelect: "none",
//           }}
//         >
//           {node.label}
//         </div>
//       ))}

//     </div>

//   );
// }
<div
  className="canvas"
  onDragOver={(e) => e.preventDefault()}
  onDrop={handleDrop}
  style={{
    position: "relative",
    border: "2px dashed #ccc",
    minHeight: "400px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  }}
>
  {/* 🔗 SVG for connections */}
  <svg
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    {connections?.map((conn, i) => {
      const from = canvasNodes[conn.from];
      const to = canvasNodes[conn.to];
      if (!from || !to) return null;

      return (
        <line
          key={i}
          x1={from.position.x + 50}
          y1={from.position.y + 20}
          x2={to.position.x + 50}
          y2={to.position.y + 20}
          stroke="#333"
          strokeWidth="2"
        />
      );
    })}
  </svg>

  {/* 🧱 Node rendering */}
  {/* {canvasNodes.map((node, index) => (
    <div
      key={index}
      onMouseDown={(e) => handleMouseDown(e, index)}
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
        padding: "8px",
        background: "#cce5ff",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        cursor: "move",
        userSelect: "none",
      }}
    >
      {node.label}
    </div>
  ))} */}
  {canvasNodes.map((node, index) => (
  <div
    key={index}
    onMouseDown={(e) => handleMouseDown(e, index)}
    onClick={() => onNodeSelect(index)} // 👈 Add this line
    style={{
      position: "absolute",
      left: node.position.x,
      top: node.position.y,
      padding: "8px",
      background: "#cce5ff",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      cursor: "pointer",
      userSelect: "none",
    }}
  >
    {node.label}
  </div>
))}

</div>);}

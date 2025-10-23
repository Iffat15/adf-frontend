
import { useRef } from 'react';
export default function Canvas({ canvasNodes,
  onDropNode,
  setCanvasNodes,
  onNodeSelect,
  connections,
  selectedNodeIndex
 }) {
  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow drop
  };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const label = e.dataTransfer.getData("nodeLabel");
  //   const canvasRect = e.currentTarget.getBoundingClientRect();

  //   // Calculate raw drop position
  //   let x = e.clientX - canvasRect.left;
  //   let y = e.clientY - canvasRect.top;

  //   // Clamp position to stay within canvas bounds
  //   const nodeWidth = 100;  // approximate width of a node
  //   const nodeHeight = 40;  // approximate height of a node


    
  //   x = Math.max(0, Math.min(x, canvasRect.width - nodeWidth -2));
  //   y = Math.max(0, Math.min(y, canvasRect.height - nodeHeight - 2));

  //   if (label) {
  //     onDropNode(label, { x, y });
  //   }
  // };
  const handleDrop = (e) => {
  e.preventDefault();
  const raw = e.dataTransfer.getData("nodeData");
  const node = JSON.parse(raw);
  const canvasRect = e.currentTarget.getBoundingClientRect();

  let x = e.clientX - canvasRect.left;
  let y = e.clientY - canvasRect.top;

  x = Math.max(0, Math.min(x, canvasRect.width - 100));
  y = Math.max(0, Math.min(y, canvasRect.height - 40));

  if (node) {
    onDropNode(node, { x, y });
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
    // const x = e.clientX - canvasRect.left;
    // const y = e.clientY - canvasRect.top;
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;

    // Clamp position
    x = Math.max(0, Math.min(x, canvasRect.width - 100));
    y = Math.max(0, Math.min(y, canvasRect.height - 40));
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
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="20"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
          zIndex="10"
        >
          <path d="M0,0 L0,6 L9,3 Z" fill="#333" />
        </marker>
      </defs>

      {connections?.map((conn, i) => {
        // const from = canvasNodes[conn.from];
        // const to = canvasNodes[conn.to];
        const from = canvasNodes.find(n => n.id === conn.from);
        const to = canvasNodes.find(n => n.id === conn.to);

        if (!from || !to) return null;

        const x1 = from.position.x + 50;
        const y1 = from.position.y + 20;
        const x2 = to.position.x + 50;
        const y2 = to.position.y + 20;

        return (
          <path
            key={i}
            d={`M${x1},${y1} L${x2},${y2}`}
            stroke="#333"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrow)"
          />
        );
      })}
    </svg>

      {canvasNodes.map((node, index) => (
        <div
          key={node.id || index}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onClick={() => onNodeSelect(index)} 
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

    </div>);
}

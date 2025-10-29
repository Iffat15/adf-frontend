
import { useRef } from 'react';
import NodeCard from './cards/NodeCard';
import React from 'react';
export default function Canvas({
  canvasNodes,
  onDropNode,
  setCanvasNodes,
  onNodeSelect,
  connections,
  selectedNodeIndex,
  setConnections,
  nodeSelectionDone,
  setSelectedConfigNode,
  setIsMinimized
}) {
  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow drop
  };

  const NODE_WIDTH = 100;
  const NODE_HEIGHT = 40;
  const handleDrop = (e) => {
    if (nodeSelectionDone) return;
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

  const deleteNode = (nodeId) => {
    const updatedNodes = canvasNodes.filter((node) => node.id !== nodeId);
    const updatedConnections = connections.filter(
      (conn) => conn.from !== nodeId && conn.to !== nodeId
    );
    setCanvasNodes(updatedNodes);
    setConnections(updatedConnections); // ✅ Now this works
  };
  function getEdgePoint(x1, y1, x2, y2, width, height) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const halfW = width / 2;
    const halfH = height / 2;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    let scale;
    if (absDx * halfH > absDy * halfW) {
      scale = halfW / absDx;
    } else {
      scale = halfH / absDy;
    }

    return {
      x: x2 - dx * scale,
      y: y2 - dy * scale,
    };
  }

  return (

    <div
      className="canvas"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        // position: "relative",
        // border: "2px dashed #ccc",
        // minHeight: "400px",
        // padding: "20px",
        // backgroundColor: "#f9f9f9",
        // position: "relative",
        // border: "2px dashed #00FFFF", // neon cyan accent
        // minHeight: "500px",
        // padding: "20px",
        // backgroundColor: "#1a1a1a", // dark gray, softer than pure black
        // backgroundImage: "radial-gradient(#2c2c2c 1px, transparent 1px)", // dotted texture
        // backgroundSize: "20px 20px",
        // borderRadius: "12px",
        // boxShadow: "inset 0 0 12px rgba(0, 255, 255, 0.15)", // subtle neon glow
        // transition: "background 0.3s ease",
        position: "relative",
        // border: "2px dashed #00FFFF", // neon cyan
        height: "100%",
        // minHeight: "500px",
        padding: "20px",
        backgroundColor: "#1a1a1a", // deep charcoal
        backgroundImage: "radial-gradient(#444 1.5px, transparent 1.5px)", // brighter dots
        backgroundSize: "18px 18px",
        // borderRadius: "12px",
        boxShadow: "inset 0 0 12px rgba(0, 255, 255, 0.15)",
        transition: "background 0.3s ease",
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
          zIndex: 0, // behind nodes
        }}
      >
        {connections.map((conn) => {
          const from = canvasNodes.find(n => n.id === conn.from);
          const to = canvasNodes.find(n => n.id === conn.to);
          if (!from || !to) return null;

          const x1 = from.position.x + NODE_WIDTH / 2;
          const y1 = from.position.y + NODE_HEIGHT / 2;
          const x2 = to.position.x + NODE_WIDTH / 2;
          const y2 = to.position.y + NODE_HEIGHT / 2;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const normX = length === 0 ? 0 : dx / length;
          const normY = length === 0 ? 0 : dy / length;

          const OFFSET = Math.min(30, Math.max(15, length / 4));
          const startX = x1 + normX * OFFSET;
          const startY = y1 + normY * OFFSET;
          const endX = x2 - normX * OFFSET;
          const endY = y2 - normY * OFFSET;

          return (
            <path
              key={`${conn.from}-${conn.to}`}
              d={`M${startX},${startY} L${endX},${endY}`}
              stroke="#333"
              strokeWidth="2"
              fill="none"
            />
          );
        })}
      </svg>

      {canvasNodes.map((node, index) => (
        // <div
        //   key={node.id || index}
        //   onMouseDown={(e) => handleMouseDown(e, index)}
        //   onClick={() => onNodeSelect(index)}
        //   onContextMenu={(e) => {
        //     e.preventDefault();
        //     if (window.confirm("Delete this node?")) {
        //       deleteNode(node.id);
        //     }
        //   }}
        //   style={{
        //     position: "absolute",
        //     left: node.position.x,
        //     top: node.position.y,
        //     padding: "8px",
        //     background: "#cce5ff",
        //     borderRadius: "4px",
        //     boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        //     cursor: "pointer",
        //     userSelect: "none",
        //     width: `${NODE_WIDTH}px`,
        //     height: `${NODE_HEIGHT}px`,
        //     display: "flex",               // ✅ enables flexbox
        //     alignItems: "center",          // ✅ vertical centering
        //     justifyContent: "center",      // ✅ horizontal centering
        //     textAlign: "center",           // ✅ optional: center multi-line text
        //     overflow: "hidden",         // ✅ hides overflow
        //     whiteSpace: "normal",       // ✅ allows wrapping
        //     wordBreak: "break-word",    // ✅ breaks long words
        //     fontSize: "14px",
        //   }}
        // >
        //   {node.label}
        // </div>

        <div
          key={node.id || index}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onClick={() => onNodeSelect(index)}
          onContextMenu={(e) => {
            e.preventDefault();
            if (window.confirm("Delete this node?")) {
              deleteNode(node.id);
            }
          }}
          style={{
            position: "absolute",
            left: node.position.x,
            top: node.position.y,
            cursor: "grab",
            userSelect: "none",
            zIndex: 5,
          }}
        >
          <NodeCard
            node={node}
            isCanvasNode={true}
            // onConfigure={(node) => {
            //   setSelectedConfigNode(node);
            //   setIsMinimized(false);

            // }}
            onConfigure={(node) => {
              setSelectedConfigNode(null);
              setTimeout(() => {
                setSelectedConfigNode(node);
                setIsMinimized(false);
              }, 50);
            }}
          />
        </div>

      ))}

      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10, // above nodes
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 Z" fill="#333" />
          </marker>
        </defs>

        {connections.map((conn) => {

          const from = canvasNodes.find(n => n.id === conn.from);
          const to = canvasNodes.find(n => n.id === conn.to);
          if (!from || !to) return null;

          const x1 = from.position.x + NODE_WIDTH / 2;
          const y1 = from.position.y + NODE_HEIGHT / 2;
          const x2 = to.position.x + NODE_WIDTH / 2;
          const y2 = to.position.y + NODE_HEIGHT / 2;

          const { x: endX, y: endY } = getEdgePoint(x1, y1, x2, y2, NODE_WIDTH, NODE_HEIGHT);

          const dx = endX - x1;
          const dy = endY - y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const normX = length === 0 ? 0 : dx / length;
          const normY = length === 0 ? 0 : dy / length;

          return (
            <>
              {/* <path
                key={`arrowhead-${conn.from}-${conn.to}`}
                d={`M${endX - normX * 10},${endY - normY * 10} L${endX},${endY}`}
                stroke="#333"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              /> */}
              <React.Fragment key={`arrow-${conn.from}-${conn.to}`}>
                <path
                  d={`M${endX - normX * 10},${endY - normY * 10} L${endX},${endY}`}
                  stroke="#333"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              </React.Fragment>
            </>

          );
        })}
      </svg>


    </div>

  );
}


// import React from "react";
// import NodeCard from "./cards/NodeCard";

// export default function LeftPanel({ nodes, onNodeClick }) {
//   const onDragStart = (event, node) => {
//     event.dataTransfer.setData("nodeData", JSON.stringify(node));
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const getBorderColor = (type) => {
//     switch (type) {
//       case "extract":
//         return "border-blue-300";
//       case "transform":
//         return "border-purple-300";
//       case "load":
//         return "border-green-300";
//       default:
//         return "border-gray-300";
//     }
//   };

//   return (
//     <div className="left-panel p-4">
//       <h3 className="text-xl font-bold mb-4">Node Library</h3>
//       <div className="overflow-y-auto max-h-[80vh] pr-2">
//         {nodes.map((node, index) => (
//           <div
//             key={node._id || index}
//             draggable
//             onDragStart={(event) => onDragStart(event, node)}
//             onClick={() => onNodeClick(node)}
//             className={`mb-3 cursor-grab border-l-4 pl-2 ${getBorderColor(node.type)}`}
//           >
//             <NodeCard
//               name={node.name}
//               type={node.type}
//               description={node.description}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";
import NodeCard from "./cards/NodeCard";

export default function LeftPanel({ nodes, onNodeClick }) {
  const onDragStart = (event, node) => {
    event.dataTransfer.setData("nodeData", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "move";
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "extract":
        return "border-blue-400";
      case "transform":
        return "border-purple-400";
      case "load":
        return "border-green-400";
      default:
        return "border-gray-500";
    }
  };

  return (
    <aside className="bg-black text-white w-full sm:w-64 p-4 shadow-lg border-r border-gray-800 transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 text-green-400 drop-shadow-md text-center transition duration-300 hover:scale-105 hover:text-green-300">Node Library</h3>
      <div className="overflow-y-auto max-h-[80vh] pr-2 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-800">
        {nodes.map((node, index) => (
          <div
            key={node._id || index}
            draggable
            onDragStart={(event) => onDragStart(event, node)}
            onClick={() => onNodeClick(node)}
            className={`mb-3 cursor-grab border-l-4 pl-2 hover:bg-gray-900 hover:scale-[1.02] transition-transform duration-200 ${getBorderColor(node.type)}`}
          >
            <NodeCard
              node = {node}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}

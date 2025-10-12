// import React from 'react';

// export default function LeftPanel({ onSelect }) {
//   const items = ['Node A', 'Node B', 'Node C'];

//   return (
//     <div style={{ width: '20%', padding: '10px', background: '#f0f0f0' }}>
//       <h3>Left Panel</h3>
//       {items.map((item, index) => (
//         <div
//           key={index}
//           onClick={() => onSelect(item)}
//           style={{
//             padding: '8px',
//             margin: '4px 0',
//             background: '#ddd',
//             cursor: 'pointer',
//             borderRadius: '4px',
//           }}
//         >
//           {item}
//         </div>
//       ))}
//     </div>
//   );
// }
export default function LeftPanel({nodes,onNodeClick}) {
//   const onDragStart = (event, nodeLabel) => {
//     event.dataTransfer.setData('application/reactflow', nodeLabel);
//     event.dataTransfer.effectAllowed = 'move';
//   };

  return (
    <div className="left-panel">
      <h3>Node Library</h3>
      {nodes.map((label,index) => (
        <div
          key={label}
        //   onDragStart={(event) => onDragStart(event, label)}
        //   draggable
          onClick={()=> onNodeClick(label)}
          style={{
            padding: '8px',
            margin: '4px',
            background: '#ddd',
            cursor: 'grab',
            borderRadius: '4px',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
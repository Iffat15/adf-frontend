// // import React from 'react';

// // export default function RightPanel() {
// //   return (
// //     <div style={{ width: '40%', padding: '10px', background: '#e3f2fd' }}>
// //       <h3>Right Panel</h3>
// //       <p>This is the right panel content.</p>
// //     </div>
// //   );
// // }
// import React from 'react';

// export default function RightPanel() {
//   return (
//     <div style={{
//       width: '20%',
//       padding: '10px',
//       // background: '#e3f2fd',
//       borderLeft: '1px solid #ccc',
//       boxSizing: 'border-box',
//       marginRight: '0px' // 👈 ensures no extra space
//     }}>
//       <h3>Right Panel</h3>
//       <p>This is the right panel content.</p>
//     </div>
//   );
// }
import React from 'react';

export default function RightPanel({queue}) {
  const buttonStyle = {
    padding: '10px 16px',
    margin: '6px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div
      style={{
        width: '30%',
        height: '100%',
        padding: '10px',
        background: '#e3f2fd',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <h3 style={{ marginBottom: '12px' }}>Pipeline Controls</h3>
      <button style={buttonStyle}>Run Pipeline</button>
      <button style={buttonStyle}>Save Pipeline</button>
      <button style={buttonStyle}>Test Pipeline</button>
      <button style={buttonStyle}>Run Analytics</button>
      <button style={buttonStyle}>View Logs</button>
      <h4 style={{ marginTop: '20px' }}>Queued Nodes:</h4>
      <ul style={{ paddingLeft: '16px' }}>
        {queue.length === 0 ? (
          <li style={{ color: '#777' }}>No nodes added yet</li>
        ) : (
          queue.map((node, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{node}</li>
          ))
        )}
        </ul>
        
    </div>
  );
}


// import React from 'react';
// // import Canvas from './Canvas';
// export default function MiddlePanel({ selected }) {
//   return (
//     <div style={{ width: '40%', padding: '10px', background: '#e8f5e9' }}>
//       <h3>Middle Panel</h3>
//       <p>{selected ? `You selected: ${selected}` : 'No selection yet.'}</p>
//       {/* <Canvas/> */}
//     </div>
//   );
// }
// // import Canvas from './Canvas';

// export default function MiddlePanel() {
//   return (
//     <div className="middle-panel">
//       <div>
//         <h3>Upload Your Script</h3>
//         <input type="file" />
//       </div>
//       {/* <Canvas /> */}
//     </div>
//   );
// }
// import Canvas from './Canvas.js';

// export default function MiddlePanel() {
//   return (
//     <div className="middle-panel">
//       <div className="upload-panel">
//         <h3>Upload Your Script</h3>
//         <input type="file" />
//       </div>
//       <Canvas />
//     </div>
//   );
// }
// import React, { useState } from 'react';
// // import Canvas from './Canvas';
// export default function MiddlePanel({onNewNode}) {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('script', file);

//     try {
//       const res = await fetch('http://localhost:8000/upload-script', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();
//        // ✅ This is the key line: pass the filename to parent
//       onNewNode(data.nodeLabel);
//       console.log('Backend response:', data);
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };

//   return (
//     <div className='middle-panel'>
//         <div style={ {height: '30%',  background: '#e8f5e9', padding: '10px'}}>
//             <h3>Upload Your Script</h3>
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//         {/* <Canvas/> */}
//     </div>
//   );
// }
import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa'; // Make sure react-icons is installed

export default function MiddlePanel({ onNewNode }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('script', file);

    try {
      const res = await fetch('http://localhost:8000/upload-script', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      onNewNode(data.nodeLabel);
      console.log('Backend response:', data);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="middle-panel">
      <div
        style={{
          // height: '30%',
          width: '100%',
          padding: '10px',
          boxSizing: 'border-box',
          // display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // borderBottom: '2px solid #ccc',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#fff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
        >
          <FaUpload size={20} color="#007bff" />
          <label style={{ fontWeight: 'bold', color: '#333', cursor: 'pointer' }}>
            Upload your script
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <button
            onClick={handleUpload}
            style={{
              padding: '6px 12px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

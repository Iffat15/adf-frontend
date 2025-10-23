
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

      if (!res.ok) {
        // ❌ Backend rejected the file
        alert(data.detail || "Upload failed");
        return;
      }

      if (!data.nodeLabel || typeof data.nodeLabel !== "string") {
        // ❌ Unexpected or empty response
        alert("Invalid script uploaded");
        return;
      }

      // ✅ Only add valid scripts to the canvas
      onNewNode(data.nodeLabel);
      console.log('Backend response:', data);
    } catch (err) {
      console.error('Upload failed:', err);
      alert("Upload failed");
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

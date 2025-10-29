
// import { useState, useRef, useEffect } from 'react';

// export default function LogPanel({ streamlogs, executionLogs = [] }) {
//   const [panelHeight, setPanelHeight] = useState(300);
//   const isResizing = useRef(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (isResizing.current) {
//         const newHeight = window.innerHeight - e.clientY;
//         setPanelHeight(Math.max(150, Math.min(newHeight, 600))); // clamp between 150–600px
//       }
//     };

//     const stopResizing = () => {
//       isResizing.current = false;
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', stopResizing);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', stopResizing);
//     };
//   }, []);

//   return (
//     <div style={{
//       position: 'fixed',
//       bottom: 0,
//       left: 0,
//       width: '100%',
//       height: `${panelHeight}px`,
//       backgroundColor: '#1e1e1e',
//       color: '#d4d4d4',
//       padding: '12px 20px',
//       borderTop: '2px solid #333',
//       fontFamily: 'Consolas, Menlo, Monaco, monospace',
//       fontSize: '13px',
//       zIndex: 1000,
//       display: 'flex',
//       gap: '20px',
//       flexDirection: 'row',
//     }}>
//       {/* Resize Handle */}
//       <div
//         onMouseDown={() => (isResizing.current = true)}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '6px',
//           cursor: 'ns-resize',
//           backgroundColor: '#333',
//           zIndex: 1001,
//         }}
//       />

//       {/* Execution Logs Section */}
//       <div style={{
//         flex: 1,
//         overflowY: 'auto',
//         borderRight: '1px solid #333',
//         paddingRight: '10px',
//       }}>
//         <h4 style={{ margin: '0 0 10px 0', color: '#cccccc' }}>Execution Logs</h4>
//         {executionLogs.length === 0 ? (
//           <div style={{ color: '#888' }}>No execution logs yet.</div>
//         ) : (
//           executionLogs.map((log, index) => (
//             <div key={log.log_id || index} style={{ marginBottom: '16px' }}>
//               <div style={{ color: '#ffcc00' }}>
//                 [{log.level}] {log.message}
//               </div>
//               <div style={{ fontSize: '11px', color: '#999' }}>
//                 {log.timestamp} | {log.path}
//               </div>
//               {log.tags && log.tags.length > 0 && (
//                 <div style={{ fontSize: '11px', color: '#888' }}>
//                   Tags: {log.tags.join(', ')}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Data Section */}
//       <div style={{
//         flex: 1,
//         overflowY: 'auto',
//         paddingLeft: '10px',
//       }}>
//         <h4 style={{ margin: '0 0 10px 0', color: '#cccccc' }}>Extracted Data</h4>
//         {streamlogs.length === 0 ? (
//           <div style={{ color: '#888' }}>No data yet.</div>
//         ) : (
//           streamlogs.map((r, index) => (
//             <div key={index} style={{ marginBottom: '20px' }}>
//               {r.output_data ? (
//                 <pre style={{ margin: '8px 0', color: '#d4d4d4' }}>
//                   {JSON.stringify(r.output_data, null, 2)}
//                 </pre>
//               ) : (
//                 <div style={{ color: '#888' }}>No output data.</div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useRef, useEffect } from 'react';

export default function LogPanel({ streamlogs, executionLogs = [] }) {
  const [panelHeight, setPanelHeight] = useState(300);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing.current) {
        const newHeight = window.innerHeight - e.clientY;
        setPanelHeight(Math.max(150, Math.min(newHeight, 600)));
      }
    };

    const stopResizing = () => {
      isResizing.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-[1000] bg-black font-mono text-sm text-green-400"
      style={{ height: `${panelHeight}px` }}
    >
      {/* Resize Handle */}
      <div
        onMouseDown={() => (isResizing.current = true)}
        className="absolute top-0 left-0 w-full h-1 cursor-ns-resize  z-[1001]"
      />

      {/* Execution Logs Section */}
      <div className='h-full border-t px-6 py-4 flex gap-6'>
      <div className="flex-1 overflow-y-auto border-r border-green-500 pr-4">
        <h4 className="text-green-300 mb-2 font-semibold">Execution Logs</h4>
        {executionLogs.length === 0 ? (
          <div className="text-gray-500">No execution logs yet.</div>
        ) : (
          executionLogs.map((log, index) => (
            <div key={log.log_id || index} className="mb-4">
              <div className="text-yellow-400">
                [{log.level}] {log.message}
              </div>
              <div className="text-xs text-gray-400">
                {log.timestamp} | {log.path}
              </div>
              {log.tags?.length > 0 && (
                <div className="text-xs text-gray-500">
                  Tags: {log.tags.join(', ')}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Data Section */}
      <div className="flex-1 overflow-y-auto pl-4">
        <h4 className="text-green-300 mb-2 font-semibold">Extracted Data</h4>
        {streamlogs.length === 0 ? (
          <div className="text-gray-500">No data yet.</div>
        ) : (
          streamlogs.map((r, index) => (
            <div key={index} className="mb-5">
              {r.output_data ? (
                <pre className="text-green-400 whitespace-pre-wrap break-words">
                  {JSON.stringify(r.output_data, null, 2)}
                </pre>
              ) : (
                <div className="text-gray-500">No output data.</div>
              )}
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}

export default function LogPanel({ results }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      maxHeight: '300px',
      overflowY: 'auto',
      backgroundColor: '#1e1e1e', // VS Code dark theme
      color: '#d4d4d4',
      padding: '12px 20px',
      borderTop: '2px solid #333',
      fontFamily: 'Consolas, Menlo, Monaco, monospace',
      fontSize: '13px',
      zIndex: 1000,
      whiteSpace: 'pre-wrap',
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#cccccc' }}>Terminal Output</h4>
      {results.length === 0 ? (
        <div style={{ color: '#888' }}>No logs yet.</div>
      ) : (
        results.map((r, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{ color: '#00ffff' }}>➤ {r.script}</div>
            {r.stdout && (
              <pre style={{ margin: '8px 0', color: '#d4d4d4' }}>{r.stdout}</pre>
            )}
            {r.stderr && (
              <pre style={{ margin: '8px 0', color: '#ff4d4d' }}>{r.stderr}</pre>
            )}
          </div>
        ))
      )}
    </div>
  );
}

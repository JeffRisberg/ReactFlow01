import { Handle, Position } from '@xyflow/react';

const typeStyles = {
  root:   { background: '#1e3a5f', color: '#fff',     border: '2px solid #3b82f6' },
  layer:  { background: '#1e4d3a', color: '#fff',     border: '2px solid #10b981' },
  module: { background: '#2d2d2d', color: '#e5e7eb',  border: '1px solid #4b5563' },
};

export default function ModuleNode({ data }) {
  const style = typeStyles[data.type] ?? typeStyles.module;

  return (
    <div
      style={{
        ...style,
        borderRadius: 8,
        padding: '10px 16px',
        minWidth: 130,
        textAlign: 'center',
        fontSize: 13,
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      <Handle type="target" position={Position.Top}    style={{ background: '#555' }} />
      <div style={{ fontWeight: 700, marginBottom: 3 }}>{data.label}</div>
      <div style={{ fontSize: 10, opacity: 0.75 }}>{data.description}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
}

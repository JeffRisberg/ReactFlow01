import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { moduleNodes, moduleEdges } from './moduleData';
import ModuleNode from './ModuleNode';

const nodeTypes = { moduleNode: ModuleNode };

const verticalNodes = moduleNodes.map((n) => ({ ...n, type: 'moduleNode' }));
const horizontalNodes = moduleNodes.map((n) => ({
  ...n,
  type: 'moduleNode',
  position: { x: n.position.y * 2, y: n.position.x },
  sourcePosition: 'right',
  targetPosition: 'left',
}));

const initialEdges = moduleEdges.map((e) => ({
  ...e,
  type: 'smoothstep',
  markerEnd: { type: 'arrowclosed', color: '#6b7280' },
  style: e.style ?? { stroke: '#6b7280' },
  labelStyle: { fill: '#9ca3af', fontSize: 10 },
  labelBgStyle: { fill: '#1a1a1a' },
}));

export default function App() {
  const [layout, setLayout] = useState('vertical');
  const [nodes, setNodes, onNodesChange] = useNodesState(verticalNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState(null);

  const toggleLayout = useCallback(() => {
    setLayout((prev) => {
      const next = prev === 'vertical' ? 'horizontal' : 'vertical';
      setNodes(next === 'horizontal' ? horizontalNodes : verticalNodes);
      return next;
    });
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_, node) => setSelected(node.data), []);
  const onPaneClick = useCallback(() => setSelected(null), []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>

      {/* Header */}
      <div style={{
        position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, textAlign: 'center', color: '#e5e7eb', pointerEvents: 'none',
      }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>
          Application Module Tree
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.6 }}>
          Click a node to inspect · Drag to rearrange · Scroll to zoom
        </p>
      </div>

      {/* Layout toggle */}
      <button
        onClick={toggleLayout}
        style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          background: '#1e1e1e', border: '1px solid #555', borderRadius: 8,
          padding: '6px 12px', color: '#e5e7eb', fontSize: 12,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        }}
      >
        {layout === 'vertical' ? '⇄ Horizontal' : '⇅ Vertical'}
      </button>

      {/* Legend */}
      <div style={{
        position: 'absolute', top: 52, right: 16, zIndex: 10,
        background: '#1e1e1e', border: '1px solid #333', borderRadius: 8,
        padding: '10px 14px', color: '#e5e7eb', fontSize: 11,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Legend</div>
        {[
          { color: '#3b82f6', label: 'Root' },
          { color: '#10b981', label: 'Layer' },
          { color: '#4b5563', label: 'Module' },
          { color: '#f59e0b', label: 'Cross-layer dep.' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ width: 12, height: 12, background: color, borderRadius: 2 }} />
            {label}
          </div>
        ))}
      </div>

      {/* Node inspector */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: 24, left: 24, zIndex: 10,
          background: '#1e1e1e', border: '1px solid #333', borderRadius: 8,
          padding: '12px 16px', color: '#e5e7eb', fontSize: 12, minWidth: 200,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{selected.label}</div>
          <div style={{ marginTop: 4, opacity: 0.7 }}>{selected.description}</div>
          <div style={{ marginTop: 6, opacity: 0.5, fontSize: 10 }}>type: {selected.type}</div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <MiniMap
          nodeColor={(n) => {
            if (n.data?.type === 'root')  return '#3b82f6';
            if (n.data?.type === 'layer') return '#10b981';
            return '#4b5563';
          }}
          style={{ background: '#1a1a1a' }}
        />
        <Controls />
        <Background variant={BackgroundVariant.Dots} color="#333" gap={20} />
      </ReactFlow>
    </div>
  );
}

// Software application module tree data

export const moduleNodes = [
  // Root
  {
    id: 'app',
    position: { x: 400, y: 20 },
    data: { label: 'Application', description: 'Root entry point', type: 'root' },
  },

  // Layer 1 – architectural layers
  {
    id: 'frontend',
    position: { x: 100, y: 140 },
    data: { label: 'Frontend', description: 'UI layer', type: 'layer' },
  },
  {
    id: 'backend',
    position: { x: 420, y: 140 },
    data: { label: 'Backend', description: 'API layer', type: 'layer' },
  },
  {
    id: 'infra',
    position: { x: 740, y: 140 },
    data: { label: 'Infrastructure', description: 'Ops & cloud', type: 'layer' },
  },

  // Frontend children
  {
    id: 'ui-components',
    position: { x: 0, y: 290 },
    data: { label: 'UI Components', description: 'Shared component library', type: 'module' },
  },
  {
    id: 'routing',
    position: { x: 170, y: 290 },
    data: { label: 'Routing', description: 'Page routing & navigation', type: 'module' },
  },
  {
    id: 'state',
    position: { x: 85, y: 420 },
    data: { label: 'State Management', description: 'Global app state (Redux)', type: 'module' },
  },

  // Backend children
  {
    id: 'auth',
    position: { x: 320, y: 290 },
    data: { label: 'Auth Service', description: 'Authentication & JWT', type: 'module' },
  },
  {
    id: 'api-gateway',
    position: { x: 500, y: 290 },
    data: { label: 'API Gateway', description: 'REST / GraphQL gateway', type: 'module' },
  },
  {
    id: 'db',
    position: { x: 410, y: 420 },
    data: { label: 'Database Layer', description: 'ORM & migrations', type: 'module' },
  },

  // Infra children
  {
    id: 'ci-cd',
    position: { x: 660, y: 290 },
    data: { label: 'CI / CD', description: 'Pipeline & deployments', type: 'module' },
  },
  {
    id: 'monitoring',
    position: { x: 840, y: 290 },
    data: { label: 'Monitoring', description: 'Logs, metrics & alerts', type: 'module' },
  },
  {
    id: 'storage',
    position: { x: 750, y: 420 },
    data: { label: 'Storage', description: 'Object & block storage', type: 'module' },
  },
];

export const moduleEdges = [
  // Root → Layer 1
  { id: 'app-fe',      source: 'app',      target: 'frontend' },
  { id: 'app-be',      source: 'app',      target: 'backend' },
  { id: 'app-inf',     source: 'app',      target: 'infra' },

  // Frontend → children
  { id: 'fe-ui',       source: 'frontend', target: 'ui-components' },
  { id: 'fe-rt',       source: 'frontend', target: 'routing' },
  { id: 'fe-st',       source: 'frontend', target: 'state' },

  // Backend → children
  { id: 'be-auth',     source: 'backend',  target: 'auth' },
  { id: 'be-api',      source: 'backend',  target: 'api-gateway' },
  { id: 'be-db',       source: 'backend',  target: 'db' },

  // Infra → children
  { id: 'inf-ci',      source: 'infra',    target: 'ci-cd' },
  { id: 'inf-mon',     source: 'infra',    target: 'monitoring' },
  { id: 'inf-sto',     source: 'infra',    target: 'storage' },

  // Cross-layer dependencies (animated dashed)
  {
    id: 'fe-be',
    source: 'frontend',
    target: 'api-gateway',
    animated: true,
    label: 'HTTP calls',
    style: { stroke: '#f59e0b', strokeDasharray: '5 3' },
  },
  {
    id: 'be-inf',
    source: 'backend',
    target: 'storage',
    animated: true,
    label: 'file I/O',
    style: { stroke: '#f59e0b', strokeDasharray: '5 3' },
  },
];

import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';

//import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import ChRISNode from './ChRISNode';

import 'reactflow/dist/style.css';
//import './overview.css';

import { g_nodes, g_edges } from './GetNodeGraph'
//import { test_nodes, test_edges } from './test-nodes'

const nodeTypes = {
  plugininst: ChRISNode
};

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(g_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(g_edges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Controls />
    </ReactFlow>
  );
};

export default OverviewFlow;
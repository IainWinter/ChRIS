import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import ChRISNode from './ChRISNode';
import { g_nodes, g_edges, setFeedGraph } from './GetNodeGraph'
import 'reactflow/dist/style.css';

const nodeTypes = {
  plugininst: ChRISNode
};

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(g_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(g_edges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  async function submitForm(e)
  {
    e.preventDefault();

    let value = parseInt(e.target.nodeId.value);
    await setFeedGraph(value);

    setNodes(g_nodes);
    setNodes(g_edges);

    onNodesChange();
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Controls position='top-left' />
    </ReactFlow>
  );
};

export default OverviewFlow;
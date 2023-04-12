import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  ControlButton,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
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
      <MiniMap 
        nodeColor={'blue'} 
        nodeStrokeWidth={3} 
        position='top-right'
        zoomable 
        pannable />
        <CustomControls/>
	  <Background color="#333" variant="dots" />
    </ReactFlow>
  );
};

export default OverviewFlow;

function CustomControls() {
  return (
    <Controls 
      position='top-left'>
      <ControlButton 
        onClick={() => console.log('another action')} title="action">
        <div>S</div>
      </ControlButton>
      <ControlButton 
        onClick={() => console.log('another action')} title="another action">
        <div>ID</div>
      </ControlButton>
      <ControlButton 
        onClick={() => console.log('another action')} 
        title="another action"
        area shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun">
        <div>Map</div>
      </ControlButton>
      <script>

      </script>
    </Controls>
  );
}
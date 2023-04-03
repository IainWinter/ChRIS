import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { g_nodes, g_edges, setFeedGraph } from './GetNodeGraph'

import './ChRISControls.css';

const ChRISControls = () => 
{
  const [nodes, setNodes, onNodesChange] = useNodesState(g_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(g_edges);

  async function submitForm(e)
  {
    e.preventDefault();

    let value = parseInt(e.target.nodeId.value);
    await setFeedGraph(value);

    setNodes(g_nodes);
    setNodes(g_edges);
  }

  return (<>
    <div className="chris-controls">
      <form onSubmit={(e) => submitForm(e)}>
        <input type="number" name='nodeId'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  </>);
};

export default ChRISControls;
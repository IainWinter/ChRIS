import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { g_nodes, g_edges, setFeedGraph } from './GetNodeGraph'
import './ChRISControls.css';

let g_replayTimeouts = [];

function stopReplay()
{
  document.getElementById("chris-control-replay").innerHTML = "&#9658;";

  for (let func of g_replayTimeouts)
  {
    clearTimeout(func);
  }
  g_replayTimeouts = [];

  for (let node of g_nodes)
  {
	document.getElementById(`node${node.id}`).classList.remove("working");
  }
}

function startReplay()
{
  if (g_replayTimeouts.length > 0)
  {
    stopReplay();
    return;
  }

  document.getElementById("chris-control-replay").innerHTML = "&#9632;";

  let maxTimeout = 0;
  for (let node of g_nodes)
    if (node.data.time_end_ms > maxTimeout)
      maxTimeout = node.data.time_end_ms;

  for (let node of g_nodes)
  {
    let start =  setTimeout(() => {
      document.getElementById(`node${node.id}`).classList.add("working");
    }, node.data.time_start_ms);

    let end = setTimeout(() => {
      document.getElementById(`node${node.id}`).classList.remove("working");
    }, node.data.time_end_ms);

    g_replayTimeouts.push(start);
    g_replayTimeouts.push(end);

    setTimeout(() => {
      stopReplay();
    }, maxTimeout);
  }
}

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

	{/* 

		add another div
		that lives above the 
		control bar

		look at ChRISControls.css for how to position this

		just make sure to add a name property to the input tag
		
	*/
  <div class="IdForm">
      <form>
        <div class="input-feild">
          <input type="number" name="id" required="" />
          <label>ID</label>
        </div>
        <button type="submit" class="btn">SUBMIT</button>
      </form>
    </div>
}


    <div className="chris-controls">
      <button id="chris-control-replay" className='chris-control-button' title="Start Replay" onClick={startReplay}>&#9658;</button>
    </div>
  </>);
};

export default ChRISControls;
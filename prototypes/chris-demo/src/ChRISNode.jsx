import React, { memo } from 'react';

import { Handle, Position } from 'reactflow';
import './ChRISNode.css';

function ChRISNode({ id, data }) 
{
	let title = data.title;
	if (!title || title.length === 0)
	{
		title = "unset title";
	}

	let nodeId = "node" + data.id;

	function toggleHideBody()
	{
		document.getElementById(nodeId).classList.toggle("hide-body");
	}

	return (<>
		<div id={nodeId} className='chris-plugin-instance-node' status={data.status}>
			{/* <img src={data.thumb_url}></img> */}
			<div className='chris-plugin-instance-node-header'>
				<p className='chris-plugin-instance-node-header-title'>{title}</p>
				
				<p className='chris-plugin-instance-hide-body-button' onClick={toggleHideBody}>&and;</p>

				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</div>
			<div className='chris-plugin-instance-node-body'>

				{data.options.map((option) => 
				{
					return (<>
						<span className='chris-plugin-instance-node-inline-input'>
							<label className='chris-plugin-instance-node-input-label' htmlFor={option.name}>{option.name}</label>
							<input className='chris-plugin-instance-node-input' type="text" name={option.name} value={option.value}></input>
						</span>
					</>);
				})}

				<p className='chris-plugin-instance-node-id'>{data.id}</p>
				<p className='chris-plugin-instance-node-id'>{data.time_end_ms}</p>
			</div>
		</div>
	</>);
  }
  
  export default memo(ChRISNode);
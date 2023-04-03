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

	return (<>
		<div className='chris-plugin-instance-node'>
			<div className='chris-plugin-instance-node-header'>
				<p className='chris-plugin-instance-node-header-title'>{title}</p>
				
				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</div>
			<div className='chris-plugin-instance-node-body'>

				{data.options.map((option) => 
				{
					return (<>
						<label className='chris-plugin-instance-node-input-label' htmlFor={option.name}>{option.name}</label>
						<input className='chris-plugin-instance-node-input' type="text" name={option.name} value={option.value}></input>
					</>);
				})}
			</div>
		</div>
	</>);
  }
  
  export default memo(ChRISNode);
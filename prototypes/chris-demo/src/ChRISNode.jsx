import React, { memo, useState } from 'react';
import { BsArrowBarUp, BsArrowBarDown, BsImage, BsImageFill } from 'react-icons/bs'

import { Handle, Position } from 'reactflow';
import './ChRISNode.css';

function ChRISNode({ id, data })
{
	let [img, setImg] = useState(data.files.length > 0 ? data.files[0] : "");
	let [hideBody, setHideBody] = useState(false);
	let [hideThumb, setHideThumb] = useState(false);

	let nodeId = "node" + data.id;

	let timeStartSeconds = (data.time_start_ms / 1000).toFixed(2);
	let timeEndSeconds = ((data.time_end_ms - data.time_start_ms) / 1000).toFixed(2);

	let headerClass = `chris-plugin-instance-node-header ${hideThumb ? "chris-plugin-instance-node-header-closed-top" : ""} ${hideBody ? "chris-plugin-instance-node-header-closed-bottom" : ""}`

	return (<>
		<div id={nodeId} className='chris-plugin-instance-node' status={data.status}>
			
			{/* removing the image rendering to a position below the header */}
			{/* {
				(img === "" || hideThumb)
					? <></>
					: <><img src={img} className='chris-plugin-instance-node-thumb'></img></>
			} */}
			
			<div className={headerClass}>
				<p className='chris-plugin-instance-node-header-title'>{data.title}</p>

				<div>
					<span className='chris-plugin-instance-hide-body-button' onClick={() => setHideBody(!hideBody)}>
						{
							hideBody
								? <BsArrowBarDown />
								: <BsArrowBarUp />
						}
					</span>

					<span className='chris-plugin-instance-hide-body-button' onClick={() => setHideThumb(!hideThumb)}>
						{
							hideThumb
								? <BsImage />
								: <BsImageFill />
						}
					</span>
				</div>
				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</div>


			{
				(img === "" || hideThumb)
					? <></>
					: <><img src={img} className='chris-plugin-instance-node-thumb'></img></>
			}


			{
				hideBody
					? ""
					: <>
						<div className='chris-plugin-instance-node-body'>


							{/* This generates the list of settings, it seems like because the nodes are immutable, we dont need these.
								I am a little confused as to why such a limitation would be in place when you can delete and replace a node
								if you really wanted to.  */}
							{/* {data.options.map((option) => 
							{
								return (<>
									<span className='chris-plugin-instance-node-inline-input'>
										<label className='chris-plugin-instance-node-input-label' htmlFor={option.name}>{option.name}</label>
										<input className='chris-plugin-instance-node-input' type="text" name={option.name} value={option.value}></input>
									</span>
								</>);
							})} */}

							{/* Generate a list of files in the node, if they are pings or jpegs, display them in an img tag when clicked */}

							{
								data.files.map((file) => 
								{
									return (
										<span className='chris-plugin-instance-node-inline-input'>
											<p className='fake-ref' onClick={() => setImg(file)}>{file}</p>
										</span>
									)
								})
							}

							<p className='chris-plugin-instance-node-id'>Id: {data.id}</p>
							<p className='chris-plugin-instance-node-id'>Time start: {timeStartSeconds}</p>
							<p className='chris-plugin-instance-node-id'>Duration: {timeEndSeconds}</p>
						</div>
				</>		
			}
		</div>
	</>);
  }
  
  export default memo(ChRISNode);
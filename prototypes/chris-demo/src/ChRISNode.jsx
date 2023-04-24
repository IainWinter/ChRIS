import React, { memo, useState, useEffect } from 'react';
import { BsArrowBarUp, BsArrowBarDown, BsImage, BsImageFill } from 'react-icons/bs'

import { Handle, Position, useViewport } from 'reactflow';
import './ChRISNode.css';
import { g_nodes } from './GetNodeGraph';

function ChRISNode({ id, data })
{
	let [img, setImg] = useState(data.files.length > 0 ? data.files[0] : "");
	let [hideBody, setHideBody] = useState(false);
	let [hideThumb, setHideThumb] = useState(false);
	const { x, y, zoom } = useViewport();

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);

	useEffect(() => {
	  const handleWindowResize = () => {
		setWindowWidth(window.innerWidth);
		setWindowHeight(window.innerHeight);
	  };
  
	  window.addEventListener('resize', handleWindowResize);
	  return () => window.removeEventListener('resize', handleWindowResize);
	});

	let node = g_nodes.find(n => n.id === id);

	// scale by a fisheye effect

	let viewportCenterX = x - windowWidth / 2;
	let viewportCenterY = y - windowHeight / 2;

	let nodeDeltaFromViewportX = node.position.x + viewportCenterX;
	let nodeDeltaFromViewportY = node.position.y + viewportCenterY;

	let distFromViewportCenter = Math.sqrt(nodeDeltaFromViewportX*nodeDeltaFromViewportX+nodeDeltaFromViewportY*nodeDeltaFromViewportY);

	let nDistFromViewportCenter = distFromViewportCenter / windowWidth;

	let scaleFactor = 1 - nDistFromViewportCenter;

	let style = {
		width:  200 * scaleFactor + "px",
		height: 400 * scaleFactor + "px",

		minWidth: "10px",
		minHeight: "10px",
		maxWidth: "200px",
		maxHeight: "200px"
	};

	let nodeId = "node" + data.id;

	let timeStartSeconds = (data.time_start_ms / 1000).toFixed(2);
	let timeEndSeconds = ((data.time_end_ms - data.time_start_ms) / 1000).toFixed(2);

	let headerClass = `chris-plugin-instance-node-header ${hideThumb ? "chris-plugin-instance-node-header-closed-top" : ""} ${hideBody ? "chris-plugin-instance-node-header-closed-bottom" : ""}`

	return (<>
		<div id={nodeId} className='chris-plugin-instance-node' status={data.status} style={style}>
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
import { useState, useEffect } from "react";
import { wNode } from "../Node"
import { Position } from '../Position';

export function WNodeComponent()
{
	// State of the node being drawn
	const [node, setNode] = useState<wNode>();

	// State of the node begin dragged with the mouse
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 }); // current position
	const [offset,   setOffset]   = useState<Position>({ x: 0, y: 0 }); // local offset of mouse
	const [dragging, setDragging] = useState(false);                    // is node being dragged

	function loadDataEffect()
	{
		// request node info from server

		// for now use this as a test
		// this is a random plugin from ChRIS
		let test = new wNode(
			"Test",
			["plugininstances", "filter", "groupByInstance"]
		);

		setNode(test);
	}

	function dragNodeEffect()
	{
		if (dragging) 
		{
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		}

		return () => 
		{
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}

	function handleMouseDownOnHeader(e: React.MouseEvent<HTMLDivElement>)
	{
		e.preventDefault();
		setDragging(true);
		setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
	}

	function onMouseUp()
	{
		setDragging(false);
	}

	function onMouseMove(e: MouseEvent)
	{
		e.preventDefault();

		if (dragging)
		{
			setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y, });
		}
	};

	useEffect(loadDataEffect, []);
	useEffect(dragNodeEffect, [dragging]);

	// can this just do nothing?
	if (!node)
		return (<div>Loading...</div>);

	return (
		<div className="node"
			style={{
				top: position.y,
				left: position.x,
			}}
		>
			<div className="node-header"
				onMouseDown={handleMouseDownOnHeader}
			>
				<h2 className="node-title">{node.title}</h2>

				<div className="node-socket socket-left"></div>
				<div className="node-socket socket-right"></div>
			</div>

			<div className="node-body">
				{
					node.settings.map((object, i) =>
					{
						return (
							<span className="node-body-titled-value">
								<span className="node-body-value-title">{object}</span>
								<span><input className='node-body-value-input' type='text'/></span>
							</span>
						);
					})
				}
			</div>
		</div>
	);
}

export { wNode };

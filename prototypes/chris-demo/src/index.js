import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OverviewFlow from './App';
import { g_nodes, g_edges, getChRISClientConnection, getFeedPluginInstanceGraph } from './GetNodeGraph'


// 9452 is

// 9542 -> 9453
//		-> 9454 -> 9455 -> 9456

getChRISClientConnection().then(
	() => getFeedPluginInstanceGraph(9452).then(() => 
	{
		console.log(g_nodes);
		console.log(g_edges);

		const root = ReactDOM.createRoot(document.getElementById('root'));
		root.render(
		  <React.StrictMode>
			<OverviewFlow />
		  </React.StrictMode>
		);
	})
);
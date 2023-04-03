import Client, { PluginInstance, PluginInstanceDescendantList } from "@fnndsc/chrisapi";

const chris_url = "https://cube.chrisproject.org/api/v1/";
const chris_auth_url = `${chris_url}auth-token/`;
const chris_auth_username = "cube";
const chris_auth_password = "cube1234";

let g_client = null;

export let g_nodes = [];
export let g_edges = [];

function reportNode(node, connection)
{
	g_nodes.push({
		id: `${node.id}`,
		type: 'plugininst',
		position: { x: 250, y: 0 }
	});

	for (let child of node.children)
	{
		g_edges.push({
			id: `e${node.id}-${child}`,
			source: `${node.id}`,
			target: `${child}`,
		});
	}

	console.log("Loaded node %s (%d)", node.name, node.id);
}

export function getChRISClientConnection()
{
	return Client.getAuthToken(chris_auth_url, chris_auth_username, chris_auth_password)
		.then(token => 
		{
			let client = new Client(chris_url, { token });
			g_client = client;

			console.log("Authed with CUBE");
		})
		.catch(error =>
		{
			console.log(error);
		});
}

export async function getFeedPluginInstanceGraph(pluginId)
{
	let inst = await g_client.getPluginInstance(pluginId);
	let tree = await inst.getDescendantPluginInstances();

	let x = 0;
	let y = 0;

	for (let node of tree.data)
	{
		let id = node.id;
		let pid = node.previous_id;

		// get nodes from https://cube.chrisproject.org/api/v1/plugins/instances/9452/parameters/

		let pinst = inst.data.id === id ? inst : await g_client.getPluginInstance(id);
		let instParameters = await pinst.getParameters();
		let options = [];

		for (let param of instParameters.data)
		{
			options.push({
				name: param.param_name,
				value: param.value,
				type: param.type
			});
		}

		g_nodes.push({
			id: `${id}`,
			type: 'plugininst',
			data: {
				title: node.plugin_name,
				options: options
			},
			position: { x: x, y: y }
		});

		x += 300;

		if (pid !== undefined)
		{
			g_edges.push({
				id: `e${pid}-${id}`,
				source: `${pid}`,
				target: `${id}`,
			});
		}
	}
}
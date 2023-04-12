import Client, { PluginInstance, PluginInstanceDescendantList } from "@fnndsc/chrisapi";

const chris_url = "https://cube.chrisproject.org/api/v1/";
const chris_auth_url = `${chris_url}auth-token/`;
const chris_auth_username = "cube";
const chris_auth_password = "cube1234";

let g_client = null;

export let g_nodes = [];
export let g_edges = [];

export async function setFeedGraph(pluginId)
{
	g_nodes = [];
	g_edges = [];
	await getFeedPluginInstanceGraph(pluginId);
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

async function getFromPluginInstance(pinst, func, translate)
{
	let list = await func(pinst);
	let out = [];

	if (list.data)
	for (let item of list.data)
	{
		out.push(translate(item));
	}

	return out;
}

async function getParameters(pinst)
{
	return await getFromPluginInstance(
		pinst, 
		(pinst) => pinst.getParameters(), 
		(param) => { return {
			name: param.param_name,
			value: param.value,
			type: param.type,
		}
	});
}

async function getFiles(pinst)
{
	return ["ie/image1.png", "ie/image2.png", "ie/image3.png", "ie/image4.png"];

	// there is some type of perm error

	// return await getFromPluginInstance(
	// 	pinst,
	// 	(pinst) => pinst.getFiles(),
	// 	(file) => { return {
	// 		name: file.name
	// 	}
	// });
}

export async function getFeedPluginInstanceGraph(pluginId)
{
	if (!pluginId)
		return;

	let inst = await g_client.getPluginInstance(pluginId);
	let tree = await inst.getDescendantPluginInstances();

	let x = 0;
	let y = 0;

	let initialStartTime = Date.parse(inst.data.start_date);

	let depthMap = new Map();
	let linkCountMap = new Map();

	for (let node of tree.data)
	{
		let id = node.id;
		let pid = node.previous_id ? node.previous_id : -1;

		if (depthMap.has(pid))
			depthMap.set(id, depthMap.get(pid) + 1);
		else
			depthMap.set(id, 0);

		if (linkCountMap.has(pid))
			linkCountMap.set(pid, linkCountMap.get(pid) + 1);
		else
			linkCountMap.set(pid, 1);
	}

	for (let node of tree.data)
	{
		let id = node.id;
		let pid = node.previous_id ? node.previous_id : -1;

		let nodeStartTime = Date.parse(node.start_date);
		let nodeEndTime = Date.parse(node.end_date);

		// get nodes from https://cube.chrisproject.org/api/v1/plugins/instances/9452/parameters/

		let pinst = inst.data.id === id ? inst : await g_client.getPluginInstance(id);
		let options = await getParameters(pinst);
		let files = await getFiles(pinst);

		let title = node.plugin_name;
		if (!title || title.length === 0)
			title = "unset title";

		g_nodes.push({
			id: `${id}`,
			type: 'plugininst',

			position: { x: x, y: y },
			dragHandle: '.chris-plugin-instance-node-header',

			data: {
				title: title,
				options: options,
				files: files,
				status: node.status,
				id: id,

				time_start_ms: nodeStartTime - initialStartTime,
				time_end_ms: nodeEndTime - initialStartTime,

				thumb_url: "./uv.png",

				depth: depthMap.get(id),
				parent_link_count: linkCountMap.get(pid),
				link_count: linkCountMap.get(id),
			}
		});

		let numbOfParentLinks = linkCountMap.get(pid);

		// if (numbOfParentLinks > 0)
		// {

		// }

		x += 300;
		//y += linkCountMap.get(pid) * 300;

		if (pid !== undefined)
		{
			g_edges.push({
				id: `e${pid}-${id}`,
				source: `${pid}`,
				target: `${id}`,
			});
		}
	}

	console.log(g_nodes);
	console.log(g_edges);
}
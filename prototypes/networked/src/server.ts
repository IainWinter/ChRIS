import express from "express";
import Client, { PluginInstance, PluginInstanceDescendantList } from "@fnndsc/chrisapi";

const app = express();
const port = 3000;
const chris_url = "https://cube.chrisproject.org/api/v1/";
const chris_auth_url = `${chris_url}auth-token/`;
const chris_auth_username = "cube";
const chris_auth_password = "cube1234";

let g_client: Client = null;

class PluginNode
{
	id: number;
	parentId: number;
	name: String;
	depth: number;

	constructor(id: number, parentId: number, name: String, depth: number)
	{
		this.id = id;
		this.parentId = parentId;
		this.name = name;
		this.depth = depth;
	}
}

class PluginTree
{
	nodes: Map<number, Array<PluginNode>>; // parentId -> list of children

	constructor()
	{
		this.nodes = new Map();
	}

	root(): PluginNode
	{
		return this.nodes.get(0)[0];
	}

	getChildren(id: number): Array<PluginNode>
	{
		if (!this.nodes.has(id))
			return [];

		return this.nodes.get(id);
	}

	addNode(node: PluginNode)
	{
		if (!this.nodes.has(node.parentId))
			this.nodes.set(node.parentId, new Array<PluginNode>());

		this.nodes.get(node.parentId).push(node);
	}

	itr(pred: (PluginNode) => void, parentId: number = 0)
	{
		if (!this.nodes.has(parentId))
			return;

		for (let node of this.nodes.get(parentId))
		{
			pred(node);
			this.itr(pred, node.id)
		}
	}
}

async function loadTreeFromNetwork(tree: PluginTree, client: Client, id: number, pid: number = 0, depth: number = 0)
{
	// load node data from network

	// Use this is the future
	// let test = await client.getFeed(id);
	// let insts = await test.getPluginInstances();

	let inst: PluginInstance = await client.getPluginInstance(id);
	let children: PluginInstanceDescendantList = await inst.getDescendantPluginInstances();

	// add node to local tree

	let node: PluginNode = new PluginNode(inst.data.id, pid, inst.data.plugin_name, depth);
	tree.addNode(node);

	for (let i: number = 1; i < children.data.length; i++)
	{
		await loadTreeFromNetwork(tree, client, children.data[i].id, id, depth + 1);
	}
}

async function getTree(id: number)
{
	console.log(`Loading tree for: ${id}`);

	let tree = new PluginTree();
	await loadTreeFromNetwork(tree, g_client, id);
	
	console.log("done");

	return tree;

	tree.itr((node: PluginNode) => console.log("  ".repeat(node.depth) + node.name));
}

function auth()
{
	Client.getAuthToken(chris_auth_url, chris_auth_username, chris_auth_password)
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

app.get("/get-nodes", async (req, res) => 
{
	let id: string = req.query.id as string;
	let tree: PluginTree = await getTree(Number.parseInt(id));

	let jsonObj = {
		"id": 0,
		"children": []
	};

	function toJSON(tree, node, jsonObj)
	{
		let jsonNode = {
			"id": node.id,
			"name": node.name,
			"children": []
		}

		jsonObj["children"].push(jsonNode);

		for (let child of tree.getChildren(node.id))
		{
			toJSON(tree, child, jsonNode);
		}
	}

	toJSON(tree, tree.root(), jsonObj);

	res.send(jsonObj);
});

app.get("/test", (req, res) => 
{
    let options = { root: "static" };
    res.sendFile("test.json", options);
});

app.get("/static", (req, res) => 
{
    let options = { root: "static" };
    res.sendFile("StaticGraph.html", options);
});

app.get("/force", (req, res) => 
{
    let options = { root: "static" };
    res.sendFile("ForceGraph.html", options);
});

app.get("/editor", (req, res) => 
{
    let options = { root: "static" };
    res.sendFile("Editor.html", options);
});

app.listen(port, () => 
{
    auth();
    console.log(`Express is listening at http://localhost:${port}`);
});
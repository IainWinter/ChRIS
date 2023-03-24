"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chrisapi_1 = __importDefault(require("@fnndsc/chrisapi"));
const app = (0, express_1.default)();
const port = 3000;
const chris_url = "https://cube.chrisproject.org/api/v1/";
const chris_auth_url = `${chris_url}auth-token/`;
const chris_auth_username = "cube";
const chris_auth_password = "cube1234";
let g_client = null;
class PluginNode {
    constructor(id, parentId, name, depth) {
        this.id = id;
        this.parentId = parentId;
        this.name = name;
        this.depth = depth;
    }
}
class PluginTree {
    constructor() {
        this.nodes = new Map();
    }
    root() {
        return this.nodes.get(0)[0];
    }
    getChildren(id) {
        return this.nodes.get(id);
    }
    addNode(node) {
        if (!this.nodes.has(node.parentId))
            this.nodes.set(node.parentId, new Array());
        this.nodes.get(node.parentId).push(node);
    }
    itr(pred, parentId = 0) {
        if (!this.nodes.has(parentId))
            return;
        for (let node of this.nodes.get(parentId)) {
            pred(node);
            this.itr(pred, node.id);
        }
    }
}
function loadTreeFromNetwork(tree, client, id, pid = 0, depth = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        // load node data from network
        let inst = yield client.getPluginInstance(id);
        let children = yield inst.getDescendantPluginInstances();
        // add node to local tree
        let node = new PluginNode(inst.data.id, pid, inst.data.plugin_name, depth);
        tree.addNode(node);
        for (let i = 1; i < children.data.length; i++) {
            yield loadTreeFromNetwork(tree, client, children.data[i].id, id, depth + 1);
        }
    });
}
function getTree(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Loading tree for: ${id}`);
        let tree = new PluginTree();
        yield loadTreeFromNetwork(tree, g_client, id);
        console.log("done");
        return tree;
        tree.itr((node) => console.log("  ".repeat(node.depth) + node.name));
    });
}
function auth() {
    chrisapi_1.default.getAuthToken(chris_auth_url, chris_auth_username, chris_auth_password)
        .then(token => {
        let client = new chrisapi_1.default(chris_url, { token });
        g_client = client;
        console.log("Authed with CUBE");
    })
        .catch(error => {
        console.log(error);
    });
}
app.get("/", (req, res) => {
    let options = { root: "static" };
    res.sendFile("ForceGraphPrototype.html", options);
});
app.get("/get-nodes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query.id;
    let tree = yield getTree(Number.parseInt(id));
    let jsonObj = {
        "id": 0,
        "children": []
    };
    function toJSON(tree, node, jsonObj) {
        let jsonNode = {
            "id": node.id,
            "name": node.name,
            "children": []
        };
        jsonObj["children"].push(jsonNode);
        for (let child of tree.getChildren(node.id)) {
            toJSON(tree, child, jsonNode);
        }
    }
    toJSON(tree, tree.root(), jsonObj);
    console.log(JSON.stringify(jsonObj));
    res.send(jsonObj);
}));
app.listen(port, () => {
    auth();
    console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chrisapi_1 = __importDefault(require("@fnndsc/chrisapi"));
const app = (0, express_1.default)();
const port = 3000;
const chris_authUrl = "http://cube.chrisproject.org/api/v1/";
function auth() {
    // fetch a user auth token
    chrisapi_1.default.getAuthToken(chris_authUrl, 'cube', 'cube1234');
    // .then(token => {
    //     window.console.log('Token: ', token);
    //     //chris_authToken = token;
    // })
    // .catch(error => {
    //     window.console.log('Error!!!: ', error);
    // });
}
app.get('/', (req, res) => {
    let options = { root: "static" };
    res.sendFile("ForceGraphPrototype.html", options);
});
app.listen(port, () => {
    auth();
    console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map
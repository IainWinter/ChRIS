import express from 'express';
import Client from '@fnndsc/chrisapi';

const app = express();
const port = 3000;
const chris_authUrl = "http://cube.chrisproject.org/api/v1/";

function auth()
{
    // fetch a user auth token
    Client.getAuthToken(chris_authUrl, 'cube', 'cube1234');
        // .then(token => {
        //     window.console.log('Token: ', token);
        //     //chris_authToken = token;
        // })
        // .catch(error => {
        //     window.console.log('Error!!!: ', error);
        // });
}

app.get('/', (req, res) => 
{
    let options = { root: "static" };
    res.sendFile("ForceGraphPrototype.html", options);
});

app.listen(port, () => 
{
    auth();

    console.log(`Express is listening at http://localhost:${port}`);
});
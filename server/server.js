const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

const connections = {};
const users = {};

const broadcastMessage = (message) => {
    const messageAsString = JSON.stringify(message);
    console.log(`Broadcasting message: ${messageAsString}`);

    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        connection.send(messageAsString);
    });
};

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString());
    message.username = users[uuid];

    console.log(`Received message: ${JSON.stringify(message)}`);
    broadcastMessage(message);
};

const handleClose = uuid => {
    const username = users[uuid];
    delete connections[uuid];
    delete users[uuid];

    console.log(`${username} has disconnected (${uuid})`);
    const message = {
        messageType: "disconnect",
        username
    };
    broadcastMessage(message);
};

wsServer.on("connection", (connection, request) => {
    const { username } = url.parse(request.url, true).query;
    const uuid = uuidv4();

    console.log(`${username} has connected (${uuid})`);

    connections[uuid] = connection;
    users[uuid] = username;

    connection.on("message", message => handleMessage(message, uuid));
    connection.on("close", () => handleClose(uuid));

    const message = {
        messageType: "connect",
        username
    };
    broadcastMessage(message);
});

server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

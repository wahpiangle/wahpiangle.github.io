const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const WebSocket = require('ws');

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

app.get('/src', (req, res) => {
    res.sendFile(__dirname + '/public/src.html');
});

app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/public/client.html');
});

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
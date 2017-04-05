
const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 2001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (payload) => {
    console.log('Got a signal from the UI...');
    const data = JSON.parse(payload);
    console.log(data);
    // // Broadcast to everyone else.
    // wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(data));
    //   }
    wss.broadcast(data);
    });


    // switch (data.type) {
    //   case 'message':
    //     console.log(data.type);
    //     break;
    //   default:
    //     // console.log(payload);
    //     break;
    // }
  });


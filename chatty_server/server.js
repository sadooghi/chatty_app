
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
  let num = wss.clients.size;
  wss.broadcast({type: 'clientNum', clientsConnect: num});
  console.log('Client connected');
  const uuidV1 = require('uuid/v1');

  ws.on('message', (payload) => {
    console.log('Got a signal from the UI...');
    let data = JSON.parse(payload);
    data.id = uuidV1();

    switch(data.type) {
      case "postMessage":
        data.type = "incomingMessage";
        console.log(data);
        wss.broadcast(data);
        break;
      case "postNotification":
        data.type = "incomingNotification";
        console.log(data);
        wss.broadcast(data);
        break;
    }

    });

  ws.on('close', () => {
     console.log('Client disconnected')
     let num = wss.clients.size;
     wss.broadcast({type: 'clientNum', clientsConnect: num});
     // At this point in time wss.clients no longer contains the ws object
     // of the client who disconnected
   });

  });


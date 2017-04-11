
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

let randomColor = () => {
  const colors = ['#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#FF00FF', '#FF00FF', '#BA55D3', '#9932CC', '#9400D3', '#8A2BE2', '#8B008B', '#800080', '#9370DB', '#7B68EE', '#6A5ACD', '#483D8B', '#663399', '#4B0082'];
  return colors[Math.floor(Math.random()*colors.length)];
}
let userColors = {};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function (data) {
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
    console.log(data)
    switch(data.type) {
      case "postMessage":
        data.type = "incomingMessage";
        data.color =  userColors[data.username];
        console.log(data);
        wss.broadcast(data);

        break;
      case "postNotification":
        data.type = "incomingNotification";
        console.log(data);
        wss.broadcast(data);
        userColors[data.currentName] = userColors[data.priorName] || randomColor();

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


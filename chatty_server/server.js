
const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;


const PORT = 2001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let randomColor = () => {
  const colors = ['#E6E6FA', '#FF00FF', '#9932CC', '#8B008B', '#9370DB', '#663399', '#4B0082', '#3498db', '#34495e', '#e74c3c', '#d35400'];
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
    console.log(46,data)
    switch(data.type) {
      case "postMessage":
        data.type = "incomingMessage";
        data.color =  userColors[data.username];
        console.log(51,data);
        wss.broadcast(data);

        break;
      case "postNotification":
        data.type = "incomingNotification";
        console.log(57,data);
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


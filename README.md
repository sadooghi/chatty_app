#Project Description#
Chatty allows users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.
##Functional Specifications##
* A client-side SPA (single-page app) built with ReactJS
  * Based on the HTML and CSS
  * Contains a chat log displaying messages and notifications
  * Contains an input field to change your name and an input field to send a message
* The client-side app communicates with a server via WebSockets for multi-user real-time updates
###Behaviour:###
* When any connected user sends a chat message, all connected users see the message real-time
* When any connected user changes their name, all connected users are notified of the name change
  * Notifications are styled differently from chat messages
* The number of connected users is displayed on top of the page
* When the number of connected users changes, this count will be updated for all connected users real-time
* Different users' names will each be colored differently
##Technical Specifications##
###Stack:###
* Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
* WebSockets using Node package ws on the server-side, and native WebSocket on client side
* ReactJS

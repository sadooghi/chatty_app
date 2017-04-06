import React, {Component} from 'react';
import Navbar from "./Navbar.jsx";
import Chatbar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";



class App extends Component {
  ws = null;
  // this.message = {};

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'bob'},
      messageList: [{
        id: 1,
        username: 'bob',
        content: 'Hi',
      }]
    };
  }

  handleChange = (event) => {
    this.setState({currentUser: {name: event}});
    console.log(event)
  }

  handleSendMesssage = (content) => {
    console.log(content)
    const uuidV1 = require('uuid/v1');

    let message = {};
    message.username = this.state.currentUser.name;
    message.content= content;
    // this.setState({messageList: this.state.messageList.concat(message)})

    this.ws.send(JSON.stringify({id:uuidV1(), username:this.state.currentUser.name, content:content}));
  }


  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:2001");
    const self = this;

    this.ws.onopen = function(ev) {
      console.log("Connected to server!");

    }

    this.ws.onmessage = function(event) {
      console.log(event.data);
      console.log(self.state);
      self.setState({messageList: self.state.messageList.concat(JSON.parse(event.data))});
    }


    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const message = this.state.messageList.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messageList: message})
    }, 3000);
  }


  render() {
    console.log("Rendering <App/>");
    return (
      <section>
        <Navbar/>
        <MessageList messages={this.state.messageList}/>
        <Chatbar user={this.state.currentUser} onSendMessage={this.handleSendMesssage} onChange={this.handleChange}/>
      </section>
    );
  }
}
export default App;

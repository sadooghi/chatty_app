import React, {Component} from 'react';
import Navbar from "./Navbar.jsx";
import Chatbar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";



class App extends Component {
  ws = null;

  constructor(props) {
    super(props);
    this.state = {
      type: "postMessage",
      currentUser: {name: 'anonymous'},
      messageList: [],
      numConnectClients: 0,
      color: "black"
    };
  }


  handleSendMesssage = (content) => {

    console.log({username:this.state.currentUser.name, content:content, type: "postMessage"});
    this.ws.send(JSON.stringify({username:this.state.currentUser.name, content:content, type: "postMessage"}));
  }

  handleChangeUser = (usr) => {

    this.ws.send(JSON.stringify({currentName: usr, priorName:this.state.currentUser.name, type: "postNotification"}))
    this.setState({currentUser: {name: usr}})
  }


  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:2001");


    this.ws.onopen = (ev) => {
      console.log("Connected to server!");

    }

    this.ws.onmessage = (event) => {
     let eventData = JSON.parse(event.data)
      switch (eventData.type) {
        //note: data inside each case is different even though first two cases seem the same, if I make them one, they wont work properly!
        case "incomingMessage":
          this.setState({messageList: this.state.messageList.concat(eventData)});
          break;
        case "incomingNotification":
          this.setState({messageList: this.state.messageList.concat(eventData)});
          break;
        case "clientNum":
          this.setState({numConnectClients: eventData.clientsConnect});
          break;
        case "userColor":
          this.setState({color: eventData.color});
          break;
      }

    }


    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!",type: "incomingMessage"};
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
        <Navbar numConnectClients={this.state.numConnectClients}/>
        <MessageList messages={this.state.messageList} userColor={this.state.color}/>
        <Chatbar user={this.state.currentUser} onSendMessage={this.handleSendMesssage} onChangeUser={this.handleChangeUser}/>
      </section>
    );
  }
}
export default App;

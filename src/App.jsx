import React, {Component} from 'react';
import Navbar from "./Navbar.jsx";
import Chatbar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {

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

  handleSendMesssage = (content) => {
    console.log(content)
    var message = {};
    message.username = this.state.currentUser.name;
    message.content= content;
    this.setState({messageList: this.state.messageList.concat(message)})

  }



  componentDidMount() {
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
        <Chatbar user={this.state.currentUser} onSendMessage={this.handleSendMesssage}/>
      </section>
    );
  }
}
export default App;

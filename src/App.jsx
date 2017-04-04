import React, {Component} from 'react';
import Navbar from "./Navbar.jsx";
import Messages from "./Messages.jsx";
import Chatbar from "./Chatbar.jsx";

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <section>
        <Navbar/>
        <Messages/>
        <Chatbar/>
      </section>
    );
  }
}
export default App;

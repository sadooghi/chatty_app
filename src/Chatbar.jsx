import React, {Component} from 'react';

class Chatbar extends Component {
  _textdetectKeypress = (event) => {
    // Detect if it was an enter
    if(event.key == 'Enter'){
      this.props.onSendMessage(event.target.value)
    }
  }

  _usernamedetectKeypress = (event) => {
    // Detect if it was an enter
    if(event.key == 'Enter'){
      this.props.onChange(event.target.value)
    }
  }

  render() {
    console.log("Rendering <Chatbar/>");
    return (

        <footer className="chatbar">
          <input className="chatbar-username" onKeyUp={this._usernamedetectKeypress} defaultValue="bob" placeholder="Your Name (Optional)" />
          <input className="chatbar-message" onKeyUp={this._textdetectKeypress} placeholder="Type a message and hit ENTER" />
        </footer>

    );
  }
}

export default Chatbar;

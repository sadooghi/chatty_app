import React, {Component} from 'react';

class Chatbar extends Component {
  _textKeypress = (event) => {
    // Detect if it was an enter pressed in text area
    if(event.key == 'Enter'){
        this.props.onSendMessage(event.target.value)
      // }
    }
  }

  _usernameKeypress = (event) => {
    // Detect if it was an enter pressed in username area
    if(this.props.user.name == "anonymous"){
      if(event.key == 'Enter'){
        console.log(14);
        this.props.onChangeUser(event.target.value)
      }
    } else{
      if(event.key == 'Enter'){
        console.log(22);
        this.props.onChangeUser(event.target.value)
      }
    }



  }


  render() {
    console.log("Rendering <Chatbar/>");
    console.log(this.props);
    return (

        <footer className="chatbar">
          <input className="chatbar-username" onKeyUp={this._usernameKeypress} defaultValue={this.props.user.name} placeholder="Your Name (Optional)" />
          <input className="chatbar-message" onKeyUp={this._textKeypress} placeholder="Type a message and hit ENTER" />
        </footer>

    );
  }
}

export default Chatbar;

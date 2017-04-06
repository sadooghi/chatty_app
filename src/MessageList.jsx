import React, {Component} from 'react';
import Message from "./Message.jsx";

const MessageList = (props) => {

  return (
      <div className="MessageList">
        { props.messages.map( message => <Message key={message.id} username={message.username} content={message.content}/> )}
      </div>
  );
}
export default MessageList;
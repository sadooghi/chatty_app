import React, {Component} from 'react';

const Message = (props) => {
  console.log("Rendering <Messages/>");
  // console.log(props.messages)
  return (
      <main className="messages">
        <div className="message">
          <span style={{color: props.color}} className="message-username">{props.username}</span>
          <span className="message-content">{props.content}</span>
        </div>
      </main>
  );
}
export default Message;









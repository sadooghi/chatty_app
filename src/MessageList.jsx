import React, {Component} from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";


const MessageList = (props) => {
  console.log(5,props.messages)
  return (
      <div className="MessageList">
        { props.messages.map( message => {
          if(/.jpg$/ || /.png$/ || /.gif$/){
            return <img src={message.content}/>
          }else if(message.type == "incomingMessage"){
            return <Message key={message.id} username={message.username} content={message.content} newName={message.newName} color={message.color}/>
          } else if(message.type == "incomingNotification") {
            return <Notification key={message.id} currentName={message.currentName} priorName={message.priorName}/>
          } else {
            console.log(14,"not working",message)
          }
          })
        }
      </div>
  );
}
export default MessageList;
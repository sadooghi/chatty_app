import React, {Component} from 'react';



const Notification = (props) => {
  console.log("Rendering <Notification/>");
  return (
      <main className="notification">
        <div className="notification">
          <span className="notification-username">{`user ${props.priorName} changed theri name to ${props.currentName}`}</span>
        </div>
      </main>
  );
}
export default Notification;









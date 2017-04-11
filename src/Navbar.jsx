import React, {Component} from 'react';

const Navbar = (props) => {
  console.log("Rendering <Navbar/>");
  return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="userNums">{props.numConnectClients} users online</div>
      </nav>
  );
}
export default Navbar;

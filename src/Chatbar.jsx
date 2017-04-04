import React, {Component} from 'react';

// class Chatbar extends Component {
//   render() {
//     console.log("Rendering <Chatbar/>");
//     return (

//         <footer className="chatbar">
//           <input className="chatbar-username" placeholder="Your Name (Optional)" />
//           <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
//         </footer>

//     );
//   }
// }

const Chatbar = () =>{
  console.log("Rendering <Chatbar/>");
  return(
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  )
}
export default Chatbar;
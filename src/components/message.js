import React from "react";
import "./styles/message.css";
import {removeMessage} from "./helper/addMessage"
//This is just a simple notifcaiton of sorts that appears at the top of the screen
class Message extends React.Component {
  constructor(){
    super();
    this.state={hidden:false}
  }

  //if someone closes or dismisses the notification we first hide it, then remove it so it doesnt show up in the future
  close = () =>{
    this.setState({hidden:true})
    removeMessage(this.props.index);
  }

  render() {
    //The only logic happening here is that it only displays if the hidden state is set to false
    return (
      <div className={`message ${this.state.hidden ? " hidden " : ""}  ${this.props.type}`}>
        {this.props.children}
        <div className="close" onClick={this.close}>X</div>
      </div>
    );
  }
}

export default Message;

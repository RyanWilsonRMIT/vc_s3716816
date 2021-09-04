import React from "react";
import "./styles/message.css";
import {removeMessage} from "./helper/addMessage"
class Message extends React.Component {
  constructor(){
    super();
    this.state={hidden:false}
  }

  close = () =>{
    this.setState({hidden:true})
    removeMessage(this.props.index);
  }

  render() {
    return (
      <div className={`message ${this.state.hidden ? " hidden " : ""}  ${this.props.type}`}>
        {this.props.children}
        <div className="close" onClick={this.close}>X</div>
      </div>
    );
  }
}

export default Message;

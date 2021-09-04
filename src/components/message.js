import React from "react";
import "./styles/message.css";

class Message extends React.Component {
  constructor(){
    super();
    this.state={hidden:false}
  }

  close = () =>{
    this.setState({hidden:true})
  }

  render() {
    console.log(this);
    return (
      <div className={`message ${this.state.hidden ? " hidden " : ""}  ${this.props.type}`}>
        {this.props.children}
        <div className="close" onClick={this.close}>X</div>
      </div>
    );
  }
}

export default Message;

import React from "react";
import "./styles/loginRegister.css";
import Input from "./input.js";
class LoginRegister extends React.Component {
  constructor(){
    super();
    this.state={
      selected:"register",
    }
  }
  componentDidMount(){
    this.setState({selected:this.props.selected})
  }
  swapLogin = () =>{
    this.setState({selected:"login"})
  }
  swapRegister = () =>{
    this.setState({selected:"register"})
  }
  render() {
    let selected = this.state.selected
    return (
      <div className="loginRegister">
        <div className="toggleSwitch">
          <button className={`toggle ${(selected=="login") ? "selected": ""}`} onClick={this.swapLogin}>Log In</button>
          <button className={`toggle ${(selected=="register") ? "selected": ""}`} onClick={this.swapRegister}>Register</button>  
        </div>
        {selected=="login" &&
          <div className="login">
            <Input label="Username" id="username"></Input>
            <Input label="Password" id="password" validation=".^6" errmsg = "Your password must be at least 6 characters and contain one number, one lowercase and uppercase letter, and !-=;'" type="password"></Input>
            <input type="submit"></input>
          </div>

        }
        {selected=="register" &&
          <div className="register">
            <Input label="Email" id="email" validation=""></Input>
            <Input label="Username" id="username" validation=""></Input>
            <Input label="Password" id="password" validation=".^6" errmsg = "Your password must be at least 6 characters and contain one number, one lowercase and uppercase letter, and !-=;'" type="password"></Input>
            <input type="submit"></input>
          </div>
        }
      </div>
    )
  }
}

export default LoginRegister;

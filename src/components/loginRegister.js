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
    let passwordValidation=[
      {
        rule: new RegExp("^.{6,}$"),
        msg: "Your password must have at least 6 characters",
      },
      {
        rule: new RegExp("^.*[a-z].*$"),
        msg: "Your password must have at least 1 lowecase character",
      },
      {
        rule: new RegExp("^.*[A-Z].*$"),
        msg: "Your password must have at least 1 uppercase character",
      },
      {
        rule: new RegExp("^.*[0-9].*$"),
        msg: "Your password must have at least 1 number",
      },
      {
        rule: new RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,@#.\/]/),
        msg: "Your password must have at least 1 symbol",
      },
    ]
    let emailValidation = [
      {
        rule:new RegExp(/^[a-zA-Z][a-zA-Z0-9\.]*@[a-zA-Z]*\.([\.a-zA-Z]*)*[a-zA-Z]$/),
        msg:"Please enter a valid email address",
      },
    ]
    return (
      <div className="loginRegister">
        <div className="toggleSwitch">
          <button className={`toggle ${(selected==="login") ? "selected": ""}`} onClick={this.swapLogin}>Log In</button>
          <button className={`toggle ${(selected==="register") ? "selected": ""}`} onClick={this.swapRegister}>Register</button>  
        </div>
        {selected==="login" &&
          <div className="login">
            <Input label="Username" id="username"></Input>
            <Input label="Password" id="password" validation={passwordValidation} type="password"></Input>
            <input type="submit"></input>
          </div>

        }
        {selected==="register" &&
          <div className="register">
            <Input label="Email" id="email" validation={emailValidation}></Input>
            <Input label="Username" id="username"></Input>
            <Input label="Password" id="password" validation={passwordValidation} type="password"></Input>
            <input type="submit"></input>
          </div>
        }
      </div>
    )
  }
}

export default LoginRegister;

import React from "react";
import "./styles/loginRegister.css";
import Form from "./form.js";
import {addMessage} from "./helper/addMessage.js";
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
  login = (data) =>{
    let accounts = [];
    if (localStorage.getItem("accounts")!=null){
      accounts = JSON.parse(localStorage.getItem("accounts"));
    }
    else{
      this.setState({"errormsg":"Login Failed"});
    }
    for (let a in accounts){
      if (accounts[a].username===data.username && accounts[a].password===data.password){
        localStorage.setItem("username",data.username)
        addMessage("good","Logged in! Welcome " + data.username)
        window.location.assign("/profile");
        return;
      }
    }
    this.setState({"errormsg":"Login Failed"});
  }
  register = (data) =>{
    let accounts = [];
    if (localStorage.getItem("accounts")!=null){
      accounts = JSON.parse(localStorage.getItem("accounts"));
    }
    let newAccount={
      username:data.username,
      password:data.password, //TODO: HASH PASSWORD ON REGISTRATION
      email: data.email,
      joinDate: new Date(),
    }
    accounts.push(newAccount)
    localStorage.setItem("accounts",JSON.stringify(accounts))
    addMessage("good","You have registed for an account");
    window.location.assign("/login")
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
        rule: new RegExp(/[-!$%^&*()_+|~=`{}[\]:";'<>?,@#./]/),
        msg: "Your password must have at least 1 symbol",
      },
    ]
    let emailValidation = [
      {
        rule:new RegExp(/^[a-zA-Z][a-zA-Z0-9.]*@[a-zA-Z]*\.([.a-zA-Z]*)*[a-zA-Z]$/),
        msg:"Please enter a valid email address",
      },
    ]
    let loginInputs=[
      {
        label:"Username",
        id:"username",
      },
      {
        label:"Password",
        id:"password",
        validation:passwordValidation,
        type:"password",
      },
    ]
    let registerInputs=[
      {
        label:"Username",
        id:"username",
      },
      {
        label:"Email",
        id:"email",
        validation:emailValidation,
      },
      {
        label:"Password",
        id:"password",
        validation:passwordValidation,
        type:"password",
      },
    ]
    return (
      <div className="loginRegister">
        <div className="toggleSwitch">
          <button className={`toggle ${(selected==="login") ? "selected": ""}`} onClick={this.swapLogin}>Log In</button>
          <button className={`toggle ${(selected==="register") ? "selected": ""}`} onClick={this.swapRegister}>Register</button>  
        </div>
        <p>{this.state.errormsg}</p>
        {selected==="login" &&
          <div className="login">
            <Form inputs={loginInputs} submit={this.login}></Form>
          </div>

        }
        {selected==="register" &&
          <div className="register">
            <Form inputs={registerInputs} submit = {this.register}></Form>
          </div>
        }
      </div>
    )
  }
}

export default LoginRegister;

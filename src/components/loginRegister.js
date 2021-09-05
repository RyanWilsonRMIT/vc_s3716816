import React from "react";
import "./styles/loginRegister.css";
import Form from "./form.js";
import {addMessage} from "./helper/addMessage.js";
import validation from "./helper/validations.js"
import {newProfile} from "./helper/profile.js"
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
      accounts = JSON.parse(localStorage.getItem("`accounts"));
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
    let newAccount={
      username:data.username,
      password:data.password, //TODO: HASH PASSWORD ON REGISTRATION
      email: data.email,
      joinDate: new Date(),
    }
    newProfile(newAccount); 
    addMessage("good","You have registed for an account");
    window.location.assign("/login")
  }
  render() {
    let selected = this.state.selected
    let loginInputs=[
      {
        label:"Username",
        id:"username",
      },
      {
        label:"Password",//We dont need to validate password for the login page
        id:"password",
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
        validation:validation.email,
      },
      {
        label:"Password",
        id:"password",
        validation:validation.password,
        type:"password",
      },
    ]
    return (
      <div className="loginRegister page">
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

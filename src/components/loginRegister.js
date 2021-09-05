import React from "react";
import "./styles/loginRegister.css";
import Form from "./form.js";
import {addMessage} from "./helper/addMessage.js";
import validation from "./helper/validations.js"
import {newProfile} from "./helper/profile.js"
//this is the component that deals with the login and register section of the site (seperated by a toggle switch)
class LoginRegister extends React.Component {
  constructor(){
    super();
    this.state={
      selected:"register",
    }
  }
 
  componentDidMount(){
    this.setState({selected:this.props.selected})  //check which toggle was selected to start with
  }
  //The two basic functions that swap which view is being shown
  swapLogin = () =>{
    this.setState({selected:"login"})
  }
  swapRegister = () =>{
    this.setState({selected:"register"})
  }
  //The function that gets called when "login" is clicked (it is the callback provided to the Form element)
  login = (data) =>{
    let accounts = [];
    if (localStorage.getItem("accounts")!=null){
      accounts = JSON.parse(localStorage.getItem("`accounts"));   //this just allows for the program to not crash if "accounts" is not allready a key
    }
    else{
      this.setState({"errormsg":"Login Failed"});   //if no accounts exist, then we know that they havent logged in
    }
    for (let a in accounts){
      if (accounts[a].username===data.username && accounts[a].password===data.password){//if the username, and the password are correct
        localStorage.setItem("username",data.username) //Then set the username key in localStorage
        addMessage("good","Logged in! Welcome " + data.username) //setup a notification
        window.location.assign("/profile"); //And redirect them to their profile
        return;
      }
    }
    //Otherwise they failed to login
    this.setState({"errormsg":"Login Failed"});
  }
  //similar to the login function, this is the callback for the "register" form's submit button
  register = (data) =>{
    //Setup our new account
    let newAccount={
      username:data.username,
      password:data.password, //TODO: HASH PASSWORD ON REGISTRATION
      email: data.email,
      joinDate: new Date(),
    }
    //send it over to the profile.js helper file (handles adding it to localStorage)
    newProfile(newAccount); 
    addMessage("good","You have registed for an account"); 
    window.location.assign("/login")
  }
  render() {
    let selected = this.state.selected
    //setup the fields for each of our forums
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
            <Form inputs={loginInputs} submit={this.login}></Form>  {/*form just has two props that are required */}
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

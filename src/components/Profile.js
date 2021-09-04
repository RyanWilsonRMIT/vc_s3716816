import React from "react";
import "./styles/profile.css";
class Profile extends React.Component {
  constructor(){
    super();
    this.state={
      username: null,
      email:null,
      joinDate:null,
    }
  }
  componentDidMount(){
    //Get profile information(will be serverside later)
    let profiles = JSON.parse(localStorage.getItem("accounts"))
    let username = localStorage.getItem("username")
    let profile={};
    console.log(profiles)
    console.log(username)
    for (let a in profiles){
      if (profiles[a].username===username){
        profile=profiles[a]
      }
    }
    //Adding the fields to state
    this.setState({
      username: profile.username,
      email: profile.email,
    })
  }
  render() {
    return (
      <div className="loginRegister">
        <h1>{this.state.username}</h1>
        <p>{this.state.email}</p>
      </div>
    )
  }
}

export default Profile;

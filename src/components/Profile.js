import React from "react";
import "./styles/profile.css";
class Profile extends React.Component {
  constructor(){
    super();
    this.state={
      username: null,
      email:null,
      joinDate:new Date(),
    }
  }
  componentDidMount(){
    //Get profile information(will be serverside later)
    let profiles = JSON.parse(localStorage.getItem("accounts"))
    let username = localStorage.getItem("username")
    let profile={};
    for (let a in profiles){
      if (profiles[a].username===username){
        profile=profiles[a]
      }
    }
    //Adding the fields to state
    profile.joinDate = new Date(Date.parse(profile.joinDate))
    console.log(profile.joinDate.getFullYear());
    this.setState({
      username: profile.username,
      email: profile.email,
      joinDate: profile.joinDate,
    })
  }
  render() {
    let niceDate = "";
    let date = this.state.joinDate
    niceDate += date.getDate()
    niceDate += "-"
    niceDate += date.getMonth()+1
    niceDate += "-"
    niceDate += date.getFullYear()
    return (
      <div className="loginRegister">
        <h1>{this.state.username}</h1>
        <p>{this.state.email}</p>
        <p>Has been a member since {niceDate}</p>
      </div>
    )
  }
}

export default Profile;

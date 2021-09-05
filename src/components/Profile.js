import React from "react";
import "./styles/profile.css";
import ProfileDetail from "./profileDetail.js";
import {getProfile} from "./helper/profile.js"

class Profile extends React.Component {
  constructor(){
    super();
    this.state={
      username: null,
      email:null,
      joinDate:new Date(),
      emailType:"p",
    }
  }
  componentDidMount(){
    let profile = getProfile(localStorage.getItem("username"))
    //Adding the fields to state
    profile.joinDate = new Date(Date.parse(profile.joinDate))
    this.setState({
      username: profile.username,
      email: profile.email,
      joinDate: profile.joinDate,
    })
  }
  editProfile = ()=>{
    this.setState({emailType:"input"})
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
      <div className="profile">
        <h1>{this.state.username}</h1>
        <ProfileDetail field = "email"></ProfileDetail>
        <ProfileDetail field = "Favourite Color"></ProfileDetail>
        <p>Has been a member since {niceDate}</p>
      </div>
    )
  }
}

export default Profile;

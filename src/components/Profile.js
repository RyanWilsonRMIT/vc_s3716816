import React from "react";
import "./styles/profile.css";
import ProfileDetail from "./profileDetail.js";
import {getProfile, deleteProfile} from "./helper/profile.js"
import { addMessage } from "./helper/addMessage";

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
  toggleDelete = () =>{
    if (this.state.delete){
      this.setState({delete:false})
    }
    else{
      this.setState({delete:true})
    }
    
  }
  confirmDelete = () =>{
    deleteProfile(localStorage.getItem("username"))
    localStorage.removeItem("username")
    addMessage("bad","Your profile has been deleted")
    window.location.replace("/")
  }
  render() {
    let niceDate = "";
    let date = this.state.joinDate
    niceDate += date.getDate()
    niceDate += "-"
    niceDate += date.getMonth()+1
    niceDate += "-"
    niceDate += date.getFullYear()
    let deleteSection = null;
    if (this.state.delete){
      deleteSection = (
        <div className="deleteSection">
          <p>Are You sure you want to delete?</p>
          <button onClick={this.confirmDelete}>Yes</button>
          <button onClick = {this.toggleDelete}>No</button>
        </div>
      )
    }
    else{
      deleteSection = (
        <div className="deleteSection">
          <button onClick = {this.toggleDelete}>Delete Profile</button>
        </div>
      )
    }
    return (
      <div className="profile">
        <h1>{this.state.username}</h1>
        <ProfileDetail field = "email"></ProfileDetail>
        <ProfileDetail field = "Favourite Color"></ProfileDetail>
        <p>Has been a member since {niceDate}</p>
        {deleteSection}
        
      </div>
    )
  }
}

export default Profile;

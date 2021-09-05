import React from "react";
import "./styles/profile.css";
import ProfileDetail from "./profileDetail.js";
import {getProfile, deleteProfile} from "./helper/profile.js"
import { addMessage } from "./helper/addMessage";
import { getPosts } from "./helper/post";
import Post from "./post.js"
//This element allows the user to view and update their details
class Profile extends React.Component {
  constructor(){
    super();
    this.state={
      username: null,
      email:null,
      joinDate:new Date(),
      posts:[],
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
      posts:this.getFormattedPosts(),
    })
  }
  //displayes all of the users post's at the bottom of their profile
  getFormattedPosts=()=>{
    let posts = [];
    let rawPosts = getPosts(localStorage.getItem("username"));
    for (let a in rawPosts){
      posts.push(<Post key={a} title = {rawPosts[a].title} body = {rawPosts[a].body}></Post>)
    }
    return posts;
  }
  //Toggles the confirm delete dialogue
  toggleDelete = () =>{
    if (this.state.delete){
      this.setState({delete:false})
    }
    else{
      this.setState({delete:true})
    }
    
  }
  //deletes the user (mainly by calling the helper function)
  confirmDelete = () =>{
    deleteProfile(localStorage.getItem("username"))
    localStorage.removeItem("username")
    addMessage("bad","Your profile has been deleted")
    window.location.replace("/")
  }
  render() {
    //Generate a nice view for the date of creation
    let niceDate = "";
    let date = this.state.joinDate
    niceDate += date.getDate()
    niceDate += "-"
    niceDate += date.getMonth()+1
    niceDate += "-"
    niceDate += date.getFullYear()
    let deleteSection = null;
    //If delete has been toggled then create the confirmation
    if (this.state.delete){
      deleteSection = (
        <div className="deleteSection">
          <p>Are You sure you want to delete?</p>
          <button onClick={this.confirmDelete}>Yes</button>
          <button onClick = {this.toggleDelete}>No</button>
        </div>
      )
    }
    else{ //Otherwise, create the basic option
      deleteSection = (
        <div className="deleteSection">
          <button onClick = {this.toggleDelete}>Delete Profile</button>
        </div>
      )
    }
    return (
      <div profile>
        <div className="page profile">
          <h1>{this.state.username}</h1>
          <ProfileDetail field = "email"></ProfileDetail> {/* this is really cool, all you need to do to add another field to the user, is to create another ProfileDetail object*/}
          <ProfileDetail field = "Favourite Color"></ProfileDetail>
          <p>Has been a member since {niceDate}</p>
          {deleteSection} {/*displays the (previously decided) delete section*/}
          
        </div>
        {this.state.posts}
      </div>
    )
  }
}

export default Profile;

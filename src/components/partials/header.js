import React from "react";
import Searchbar from "../searchbar.js";
import logo from "./logo.png";
import "./styles/header.css";
class Header extends React.Component {
  //The way that I kept track of if a user was logged in was just to store something in "username" of localStorage
  logout = () =>{
    //So when someone logs out, we just remove that key
    localStorage.removeItem("username")
    //end redirect them to the home page
    window.location.assign("/")
  }
  render() {
    //This allows us to check if someone is logged in
    let username = localStorage.getItem("username");
    return (
      <div className="header">
        <div>
          <a href = "/">
            <img src={logo} alt="Vibe Check"></img>
          </a>
          {/*A searchbar was not required, but the header looked so empty, and I thought a searchbar could be fun to implement */}
          <Searchbar q={this.props.q}></Searchbar>
          {/*We only want the login/register button to show up if the user is NOT logged in */}
          {username== null &&
            <>
              <a href="/login">Log In</a>
              <a href="/register">Sign Up</a>
            </>
          }
          {/*likewise, we only want the "profile" and "logout" buttons to show up if a user IS logged in */}
          {username != null && 
            <>
              <a href = "/profile">{username}</a>
              <a onClick = {this.logout} href="/logout">Logout</a>
            </>
          }   
        </div>
      </div>
    );
  }
}

export default Header;

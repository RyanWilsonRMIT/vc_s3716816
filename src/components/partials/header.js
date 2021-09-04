import React from "react";
import Searchbar from "../searchbar.js";
import logo from "./logo.png";
import "./styles/header.css";
class Header extends React.Component {
  logout = () =>{
    localStorage.removeItem("username")
    window.location.assign("/")
  }
  render() {
    let username = localStorage.getItem("username");
    return (
      <div className="header">
        <div>
          <a href = "/">
            <img src={logo} alt="Vibe Check"></img>
          </a>
          <Searchbar></Searchbar>
          {username== null &&
            <>
              <a href="/login">Log In</a>
              <a href="/register">Sign Up</a>
            </>
          }
          {username != null && 
            <>
              <a href = "/profile">{username}</a>
              <a onClick = {this.logout}>Logout</a>
            </>
          }   
        </div>
      </div>
    );
  }
}

export default Header;

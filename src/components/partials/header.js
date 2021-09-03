import React from "react";
import Searchbar from "../searchbar.js";
import logo from "./logo.png";
import "./styles/header.css";
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div>
          <a href = "/">
            <img src={logo} alt="Vibe Check"></img>
          </a>
          <Searchbar></Searchbar>
          <a href="/login">Log In</a>
          <a href="/register">Sign Up</a>
        </div>
      </div>
    );
  }
}

export default Header;

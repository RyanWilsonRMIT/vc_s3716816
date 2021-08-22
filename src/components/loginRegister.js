import React from "react";
import logo from "../logo.svg";

class LoginRegister extends React.Component {
  render() {
    return (
      <div className="text-center">
        <h1 className="display-4">LoginRegister</h1>
        {this.props.selected}
      </div>
    );
  }
}

export default LoginRegister;

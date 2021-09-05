import React from "react";
import "./styles/searchbar.css";

class Searchbar extends React.Component {
  constructor(){
    super();
    this.state={active:false}
  }
  focused = () =>{
    this.setState({active:true});
  }
  blured = () =>{
    this.setState({active:false});
  }
  keyDown = (e)=>{
    if (e.keyCode === 13){
      window.location.assign("/search?q="+e.target.value)
    }
  }
  render() {
    return (
      <div className={
        `searchbar ${this.state.active ? " active" : ""}`
      }>
        <input type="text" onFocus={this.focused} onBlur={this.blured} onKeyDown = {this.keyDown}></input>
        
      </div>
    );
  }
}

export default Searchbar;

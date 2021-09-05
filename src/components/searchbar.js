import React from "react";
import "./styles/searchbar.css";
//The searchbar at the top of the screen
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
  //if they push enter, then search
  keyDown = (e)=>{
    if (e.keyCode === 13){
      window.location.assign("/search?q="+e.target.value)
    }
  }
  //basic render function
  render() {
    return (
      <div className={
        `searchbar ${this.state.active ? " active" : ""}`
      }>
        <input type="text" onFocus={this.focused} onBlur={this.blured} onKeyDown = {this.keyDown} defaultValue = {this.props.q} placeholder="Search...  "></input>
        
      </div>
    );
  }
}

export default Searchbar;

import React from "react";
import "./styles/input.css";

class Input extends React.Component {
  constructor(){
    super();
    this.state={
      label: null,
      id: null,
      validation: null,
    }
  }
  componentDidMount(){
    let validation, errmsg;
    if (this.props.validation){
      validation=this.props.validation;
      errmsg = this.props.errmsg;
    }
    else{
      validation="any";
    }
    this.setState({
      label: this.props.label,
      id: this.props.id,
      validation: validation,
    })
  }
  focused = () =>{
    this.setState({active:true});
  }
  blured = () =>{
    this.setState({active:false});
  }
  keyDown = (e)=>{
    //does e.target.data match the validation in this.state.validation
  }
  render() {
    return (
      <div>
        <p>{this.props.label + ": "}</p>
        <input className="input" id = {this.props.id} placeholder = {this.props.label}></input>
        <p>{this.state.validation}</p>
      </div>
    );
  }
}

export default Input;

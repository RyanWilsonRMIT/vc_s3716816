import React from "react";
import "./styles/input.css";

class Input extends React.Component {
  constructor(){
    super();
    this.state={
      label: null,
      id: null,
      validation: null,
      correct:false,
      type:null,
      errors:null,
      defaultValue:"",
      showErrors:true,
    }
  }
  componentDidMount(){
    let validation, type, defaultValue,showErrors=true;
    if (this.props.validation){
      validation= this.props.validation;
    }
    else{
      validation = [
        {
          rule: new RegExp("^.+$"),
          msg: "Please Enter something",
        },
      ]
    }
    if (this.props.type){
      type=this.props.type;
    }
    else{
      type="text";
    }
    if (this.props.defaultValue){
      defaultValue=this.props.defaultValue;
    }
    else{
      defaultValue="";
    }
    if (this.props.showErrors===false){
      showErrors=false;
    }
    this.setState({
      label: this.props.label,
      id: this.props.id,
      validation,
      type,
      errors:[],
      correct:false,
      defaultValue,
      showErrors,
    })
  }
  focused = () =>{
    this.setState({active:true});
  }
  blured = () =>{
    this.setState({active:false});
  }
  keyUp = (e)=>{
    //does e.target.data match the validation in this.state.validation
    let validation = this.state.validation;
    let data = e.target.value;
    let errors=[]
    let correct=true
    for (var v in validation){
      if (!data.match(validation[v].rule)){
        correct=false;
        errors.push(validation[v].msg)
      }
    }
    this.setState({correct:correct,errors:errors})
    if (correct){
      this.props.onValidChange({id:this.props.id,data});
    }
    else{
      this.props.onValidChange({id:this.props.id,data:null});
    }
    
  }
  render() {
    let errorBody=[];
    if (!this.state.correct){
      let errors = this.state.errors;
      for (var error in errors){
        errorBody.push(<p>{errors[error]}</p>)
      }
    }
    return (
      <div className="input">
        {this.state.label!=="" ? <p>{this.props.label + ": "}</p> : "" }
        <input defaultValue = {this.state.defaultValue} className={`input ${this.state.correct ? " correct" : " incorrect"}`} id = {this.props.id} placeholder = {this.props.label} onKeyUp={this.keyUp} type={this.state.type}></input>
        {this.state.showErrors? errorBody:""}
      </div>
    );
  }
}

export default Input;

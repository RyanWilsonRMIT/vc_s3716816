import React from "react";
import "./styles/input.css";

//this is the input class, it was my attempt at creating an element that you could easily feed some regex into and a label
//and have it generate an input element that had the validations automatically applied
//It is a little bit clunky (mainly in the way that i get the status/value  back to the parent element)
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
  //Once the component mounts go through and set all the default values if props werent provided
  componentDidMount(){
    let validation, type, defaultValue,showErrors=true;
    if (this.props.validation){
      validation= this.props.validation;
    }
    else{
      validation = [
        {
          rule: new RegExp("^.+$"), //I figured that you almost always want SOMETHING to be in the input box
          msg: "Please Enter something",
        },
      ]
    }
    if (this.props.type){
      type=this.props.type;
    }
    else{
      type="text"; //Type is going to be text most of the time
    }
    if (this.props.defaultValue){
      defaultValue=this.props.defaultValue;
    }
    else{
      defaultValue=""; //default value is blank unless its provided
    }
    if (this.props.showErrors===false){
      showErrors=false;
    }
    //Then we apply all of those prop values (or default values) to the state
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
  //The focused/blured functions allow us to stylise the <Div> surrounding the <input> based on weather the <input> is selected or not
  focused = () =>{
    this.setState({active:true});
  }
  blured = () =>{
    this.setState({active:false});
  }
  //Whenever the user releases a key, we want to let our parent know so that they can make adjustments if nessecery
  keyUp = (e)=>{
    //does e.target.data match the validation in this.state.validation
    let validation = this.state.validation;
    let data = e.target.value;
    let errors=[]
    let correct=true
    for (var v in validation){
      if (!data.match(validation[v].rule)){   //check if the new value passes the validation requirements
        correct=false;    
        errors.push(validation[v].msg)    //if not then add the relevent messages to the state
      }
    }
    this.setState({correct:correct,errors:errors})
    if (correct){   //if it is correct however, then send the value to the parent
      this.props.onValidChange({id:this.props.id,data});
    }
    else{         //if it isnt correct then send the packet, but with data as null (this way the parent never sees an invalid value)
      this.props.onValidChange({id:this.props.id,data:null});
    }
    
  }
  render() {
    let errorBody=[];
    if (!this.state.correct){   //if there are errors, then prepare them to be printed (so that the user knows how to correct their input)
      let errors = this.state.errors;
      for (var error in errors){
        errorBody.push(<p key={error}>{errors[error]}</p>)
      }
    }
    return (
      <div className="input">
        {this.state.label!=="" ? <p>{this.props.label + ": "}</p> : "" } {/*if a label is provided, then display it*/}
        <input defaultValue = {this.state.defaultValue} className={`input ${this.state.correct ? " correct" : " incorrect"}`} 
        id = {this.props.id} placeholder = {this.props.label} onKeyUp={this.keyUp} type={this.state.type}></input>
        {this.state.showErrors? errorBody:""} {/*if the input is set up to display errors, then show them*/}
      </div>
    );
  }
}

export default Input;

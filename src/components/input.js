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
    }
  }
  componentDidMount(){
    let validation, errmsg, type;
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
    this.setState({
      label: this.props.label,
      id: this.props.id,
      validation: validation,
      type:type,
      errors:[],
      correct:false,
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
    console.log(data)
    let errors=[]
    let correct=true
    console.log(validation);
    for (var v in validation){
      console.log("Checking rule: " + validation[v].msg)
      if (!data.match(validation[v].rule)){
        console.log("failed");
        correct=false;
        errors.push(validation[v].msg)
      }
    }
    this.setState({correct:correct,errors:errors})
    
    
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
      <div>
        <p>{this.props.label + ": "}</p>
        <input className={`input ${this.state.correct ? " correct" : " incorrect"}`} id = {this.props.id} placeholder = {this.props.label} onKeyUp={this.keyUp} type={this.state.type}></input>
        {errorBody}
      </div>
    );
  }
}

export default Input;

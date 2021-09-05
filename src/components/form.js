import React from "react";
import "./styles/form.css";
import Input from "./input.js";
class Form extends React.Component {
  constructor(){
    super();
    this.state={
      inputs:[],
    }
  }
  //This is a callback function that is passed into each of the <Input> elementts
  //I'm just using it to keep track of a) weather the input is valid; and b) what the input is
  ChangeMade = (data) =>{
    let datas = this.state.datas;
    datas[data.id]=data.data;
    this.setState(datas)
  }
  componentDidMount(){
    //We actually generate a form based on a JSON object in the "registerLogin" page (this means that any parent element can describe the inputs of a form then create the form)
    let inputs=[];
    let datas={};
    for (let a in this.props.inputs){
      let input = this.props.inputs[a];
      let label, id, validation, type;
      //This is just going through each of the optional properties and applying a default value if no value was provided
      if ("label" in input){
        label = input.label;
      }
      else{
        label="defaultLabel"
      }
      if ("id" in input){
        id = input.id;
      }
      else{
        id="defaultID";
      }
      if ("validation" in input){
        validation=input.validation;
      }
      else{
        validation = null
      }
      if ("type" in input){
        type=input.type;
      }
      else{
        type=null;
      }
      datas[id]=null;
      //This is what actually generates the Input element to be put in the form
      inputs.push(<Input key={a} label={label} id = {id} validation={validation} type={type} onValidChange={this.ChangeMade}></Input>)
    }
    this.setState({inputs,datas})
  }

  attemptSubmit = () =>{
    let datas = this.state.datas;
    let correct=true;
    for (let a in datas){
      if (datas[a]==null){//datas[a] being null implies that it does not pass the validation currently
        correct=false;
      }
    }
    //if we make it through the whole list of datas without correct being false, then we can callback the submit function
    if (correct){
      this.props.submit(datas);
    }
  }

  render() {
    //render function looks very simple, because it is mostly being generated into a list in the didMount function
    return (
      <div className="form">
        {this.state.inputs}
        <button onClick={this.attemptSubmit}>Submit</button>
      </div>
    )
  }
}

export default Form;

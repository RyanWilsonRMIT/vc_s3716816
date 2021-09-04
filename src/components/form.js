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
  ChangeMade = (data) =>{
    console.log("valid Change Made");
    console.log(data);
    let datas = this.state.datas;
    datas[data.id]=data.data;
    this.setState(datas)
    console.log(this.state.datas)
  }
  componentDidMount(){
    let inputs=[];
    let datas={};
    for (let a in this.props.inputs){
      let input = this.props.inputs[a];
      let label, id, validation, type;
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
      inputs.push(<Input label={label} id = {id} validation={validation} type={type} onValidChange={this.ChangeMade}></Input>)
    }
    this.setState({inputs,datas})
  }

  attemptSubmit = () =>{
    let datas = this.state.datas;
    let correct=true;
    for (let a in datas){
      if (datas[a]==null){
        correct=false;
      }
    }
    if (correct){
      this.props.submit(datas);
    }
    else{
      console.log("You failed")
    }
  }

  render() {
    console.log(this.inputs);
    return (
      <div className="form">
        {this.state.inputs}
        <button onClick={this.attemptSubmit}>Submit</button>
      </div>
    )
  }
}

export default Form;

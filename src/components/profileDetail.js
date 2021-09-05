import React from "react";
import "./styles/profileDetail.css";
import Input from "./input.js"
import validation from "./helper/validations.js";
import {getProfile, updateField} from "./helper/profile.js"
class ProfileDetail extends React.Component {
  constructor(){
    super();
    this.state={
      detail: "",
      editMode:false,
      editable:true,
      valid:true,
      data:"",
    }
  }
  componentDidMount(){
    //Get profile information(will be serverside later
    let profile=getProfile(localStorage.getItem("username"))
    if (this.state.detail !== this.props.detail){
      this.setState(
        {
          detail: profile[this.props.field],
        }
      )
    }
  }
  edit = ()=>{
    if (this.state.editable){
      this.setState({
        editMode:true,
      })
    }
  }
  cancel = () =>{
    this.setState({
      editMode:false,
    })
  }
  save = () => {
    let username = localStorage.getItem("username");
    let field = this.props.field;
    let data = this.state.data;
    if (this.state.valid){
      if (updateField(username,field,data)){
        this.setState({editMode:false,detail:data})
      }
    }
  }
  onChange = (data) => {
    if (data.data!=null){
      this.setState({
        valid:true,
        data:data.data,
      })
    }
    else{
      this.setState({
        valid:false,
      })
    }
  }
  render() {
    if (this.state.editMode){
      return (
        <div className="profileDetail">
          <Input defaultValue = {this.state.detail} onValidChange = {this.onChange} id={this.props.field} label={this.props.field} validation={validation[this.props.field]} showErrors={false}></Input>
          <button disabled = {!this.state.valid} onClick={this.save}>Save</button>
          <button onClick={this.cancel}>X</button>
        </div>
      )
    }
    else{
      return (
        <div className="profileDetail">
          <p>{this.props.field}:</p>
          <p>{this.state.detail}</p>
          {this.state.editable? <button onClick={this.edit}>Edit</button> : ""}
        </div>
      )
    }
    
  }
}

export default ProfileDetail;

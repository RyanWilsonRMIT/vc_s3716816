import React from "react";
import "./styles/profileDetail.css";
import Input from "./input.js"
import validation from "./helper/validations.js";
import {getProfile, updateField} from "./helper/profile.js"
//This is a row of the users profile that contains some information about the user
//as well as a mechanism to update that particular piece of information.
class ProfileDetail extends React.Component {
  constructor(){
    super();
    this.state={
      detail: "",
      editMode:false, //refers to weather or not the field is currently editable
      editable:true, //refers to weather we want something to be editable at all
      valid:false,  //Is the change valid (default is false, because then you aren't changing the value)
      data:"",
    }
  }
  //once the component mounts we can fetch the accurate details from the "server"
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
  //when a user clicks the edit button we will check if it is editable, and if it is then we will tell the state to allow editing
  edit = ()=>{
    if (this.state.editable){
      this.setState({
        editMode:true,
        valid:false,
      })
    }
  }
  //if they click cancel, then we want to go back to the non-editing mode without makin changes to the actual value
  cancel = () =>{
    this.setState({
      editMode:false,
    })
  }
  //if they click save, then gather relevent information and send it to the helper function that will update it on the "database"(localstorage)
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
  //Keeps track of changes made to the input
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
    //Two display options, one that is an Input, and one that is just a P
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
           <p>{(this.state.detail!== null && this.state.detail!=="") ? this.state.detail : "None" }</p>
          {this.state.editable? <button onClick={this.edit}>Edit</button> : ""}
        </div>
      )
    }
    
  }
}

export default ProfileDetail;

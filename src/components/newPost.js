import React from "react";
import "./styles/newPost.css"
import {newPost} from "./helper/post.js"
//This is the element that allows a user to create a new post
class NewPost extends React.Component {
  constructor(){
    super();
    this.state={
      values:{},
      loading:true,
      titleVal:"",
    }
  }
 //once it mounts set loading to false (this is going to matter more when databases are setup)
  componentDidMount(){
    this.setState({loading:false})
  }
  //Callback function for the inputs
  change = (data)=>{
    let values = this.state.values
    values[data.target.id] = data.target.value;
    this.setState({values})
  }
  //the function that makes the post
  makePost = () =>{
    let values = this.state.values;
    //most of the work is done by the helper function (should be easy to change this to an api call in A2)
    newPost(values.title, values.body, localStorage.getItem("username"))
    this.setState({loading:true})
    this.props.reload();
    this.setState({loading:false})
  }
  render() {
    //the only logic here is weather it shows the form, or a loading template.
    if (!this.state.loading){
      return (
        <div className="newPost page">
          <h1>Make a new post</h1>
          <input required className="titleInput" placeholder="Title..." id="title" onChange={this.change}></input>
          <textarea required className="bodyInput" placeholder="Enter your text here" id="body" onChange={this.change}></textarea>
          <button onClick ={this.makePost}>Make Post</button>
        </div>
      )
    }
    else{
      return (
        <div className="page">
          <p>Loading...</p>
        </div>
      )
    }
  }
}

export default NewPost;

import React from "react";
import "./styles/newPost.css"
import {newPost} from "./helper/post.js"
class NewPost extends React.Component {
  constructor(){
    super();
    this.state={
      values:{},
      loading:true,
      titleVal:"",
    }
  }
 
  componentDidMount(){
    this.setState({loading:false})
  }
  change = (data)=>{
    let values = this.state.values
    values[data.target.id] = data.target.value;
    this.setState({values})
  }
  makePost = () =>{
    let values = this.state.values;
    newPost(values.title, values.body, localStorage.getItem("username"))
    this.setState({loading:true})
    this.props.reload();
    this.setState({loading:false})
  }
  render() {
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

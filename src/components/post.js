import React from "react";
import "./styles/post.css"
class Post extends React.Component {
  constructor(){
    super();
  }
 
  componentDidMount(){
    
  }
  
  render() {
    let niceDate = "";
    let date = new Date(this.props.date)
    niceDate += date.getDate()
    niceDate += "-"
    niceDate += date.getMonth()+1
    niceDate += "-"
    niceDate += date.getFullYear()
    return (
      <div className="newPost page">
        <h1>{this.props.title}</h1>
        {this.props.author!=null ? <h4 className = "authordate">{this.props.author} {niceDate}</h4> : ""}
        <p>{this.props.body}</p>
      </div>
    )
  }
}

export default Post;

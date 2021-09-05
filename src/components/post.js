import React from "react";
import "./styles/post.css"
//The element that dictates how a post should be displayed
class Post extends React.Component {
  render() {
    let niceDate = "";
    let date = new Date(this.props.date)
    niceDate += date.getDate()
    niceDate += "-"
    niceDate += date.getMonth()+1
    niceDate += "-"
    niceDate += date.getFullYear()
    //the above code is converting UTC to a readable format
    return (
      <div className="newPost page">
        <h1>{this.props.title}</h1>
        {/*we dont always want to show the author (if looking at one users posts for exmaple) */}
        {this.props.author!=null ? <h4 className = "authordate">{this.props.author} {niceDate}</h4> : "" } 
        <p>{this.props.body}</p>
      </div>
    )
  }
}

export default Post;

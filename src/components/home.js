import React from "react";
import {getPosts as getPostsFromServer } from "./helper/post";
import NewPost from "./newPost";
import Post from "./post.js";
class Home extends React.Component {
  constructor(){
    super()
    this.state={
      posts:this.getPosts(),
    }
    
  }
  getPosts = () => {
    let posts = [];
    let rawPosts = getPostsFromServer();
    //we are creating an array of all the posts, which will get dispalyed in the render function
    for (let a in rawPosts){
      posts.push(<Post key={a} title = {rawPosts[a].title} body = {rawPosts[a].body} author = {rawPosts[a].username} date = {rawPosts[a].date}></Post>)
    }
    this.setState({posts:posts})
    return posts;
  }
  render() {
    return (
      <div className="home">
        <div className="page">
          <h1>Home</h1>
          <p>Welcome to the forum, feel free to make a post!</p>
        </div>
        {/* If the user is logged in, then allow them to create a post */}
        {localStorage.getItem("username")!=null ? <NewPost reload={this.getPosts}></NewPost> : ""}
        {/*But regardless of that, allow the user to see existing posts */}
        {this.state.posts}
      </div>
    );
  }
}

export default Home;

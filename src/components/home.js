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
    for (let a in rawPosts){
      posts.push(<Post key={a} title = {rawPosts[a].title} body = {rawPosts[a].body} author = {rawPosts[a].username} date = {rawPosts[a].date}></Post>)
    }
    console.log(posts)
    this.setState({posts:posts})
    console.log(this.state)
    return posts;
  }
  render() {
    console.log(this.state)
    return (
      <div className="home">
        <div className="page">
          <h1>Home</h1>
          <p>Welcome to the forum, feel free to make a post!</p>
        </div>
        <NewPost reload={this.getPosts}></NewPost>
        {this.state.posts}
      </div>
    );
  }
}

export default Home;

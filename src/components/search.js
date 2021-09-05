import React from "react";
import {getPosts, search as searchFromServer } from "./helper/post";
import Post from "./post.js";
class Search extends React.Component {
  constructor(){
    super()
    this.state={
      posts:[],
    }
    
  }
  componentDidMount(){
    console.log("mounted")
    this.getPosts()
  }
  getPosts = () => {
    
    let posts = [];
    let q = this.props.q.toLowerCase()
    let rawPosts = searchFromServer(q);
    for (let a in rawPosts){
      posts.push(<Post key={a} title = {rawPosts[a].title} body = {rawPosts[a].body} author = {rawPosts[a].username} date = {rawPosts[a].date}></Post>)
    }
    if (rawPosts.length===0){
      posts.push(<Post key="a" title="No results" body="There were no posts fitting that description"/>)
    }
    this.setState({posts:posts})
    return posts;
  }
  render(){
    return (
      <div className="search">
        {this.state.posts}
      </div>
    );
  }
}

export default Search;

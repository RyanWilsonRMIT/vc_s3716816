import React from "react";
import {getPosts, search as searchFromServer } from "./helper/post";
import Post from "./post.js";
//the search page
class Search extends React.Component {
  constructor(){
    super()
    this.state={
      posts:[],
    }
    
  }
  componentDidMount(){
    this.getPosts()
  }
  getPosts = () => {
    //Get the query string and take the query out of it
    let posts = [];
    let q = this.props.q.toLowerCase()
    //get the relevent posts
    let rawPosts = searchFromServer(q);
    //and add them to an array (if they exist)
    for (let a in rawPosts){
      posts.push(<Post key={a} title = {rawPosts[a].title} body = {rawPosts[a].body} author = {rawPosts[a].username} date = {rawPosts[a].date}></Post>)
    }
    //if they dont exist then make an error message
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

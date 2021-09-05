//These are the helper functions for everything related to posting (add post, getting posts by different filters)
//Function for creating a new post at the current time
//parameters:
//title   The title of the post (apears as a heading)
//body    The main content of the post
//username  The user who is creating the post
export function newPost(title, body, username){
  let posts = JSON.parse(localStorage.getItem("posts"))
  if (posts==null){
    posts=[];
  }
  posts.push({
    title,
    body,
    username,
    date: new Date(),
  })
  localStorage.setItem("posts",JSON.stringify(posts))
}
//Gets all posts (by a filter, if reqeusted)
//parameters:
//username(optional)  Will only get posts made by that particular user (if left blank, all posts will be returned)
export function getPosts(username){
  let allPosts = JSON.parse(localStorage.getItem("posts"))
  let posts=[]
  for (let a in allPosts){
    let b = allPosts.length-1-a;
    if (username!=null){
      if (username===allPosts[b].username){
        posts.push(allPosts[b])
      }
    }
    else{
      posts.push(allPosts[b])
    }
    
  }
  return posts;
}
//Gets all posts that contain '%q%' in their title
//parameters:
//q   the search term (if left blank, all posts will be returned)
export function search(q){
  let allPosts = JSON.parse(localStorage.getItem("posts"));
  let posts=[];
  for (let a in allPosts){
    let b = allPosts.length-1-a;
    if ("title" in allPosts[b]){
      if (allPosts[b].title.toLowerCase().match(q)){
        posts.push(allPosts[b])
      }
    }
  }
  return posts;
}
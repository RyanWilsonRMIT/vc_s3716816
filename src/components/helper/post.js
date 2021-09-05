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
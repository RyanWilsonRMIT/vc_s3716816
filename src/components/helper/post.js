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
    posts.push(allPosts[allPosts.length-1-a])
  }
  return posts;
}
export function search(q){
  let allPosts = JSON.parse(localStorage.getItem("posts"))
  let posts=[]
  for (let a in allPosts){
    posts.push(allPosts[a])
  }
  return posts;
}
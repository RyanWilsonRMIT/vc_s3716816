export function updateField(username, field, data){
  let profiles = JSON.parse(localStorage.getItem("accounts"))
  for (let a in profiles){
    if (profiles[a].username===username){
      profiles[a][field] = data
      localStorage.setItem("accounts",JSON.stringify(profiles))
      return true;
    }
  }
  return false;
}
export function getProfile(username){
  let profiles = JSON.parse(localStorage.getItem("accounts"))
  if (username==null){
    window.location.replace("/") //keep people who are logged out from seeing their own profile... use repace so they cant go back
  }
  let profile={};
  for (let a in profiles){
    if (profiles[a].username===username){
      profile=profiles[a]
    }
  }
  return profile;
}
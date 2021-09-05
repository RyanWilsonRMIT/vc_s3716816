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
  let profile={};
  for (let a in profiles){
    if (profiles[a].username===username){
      profile=profiles[a]
    }
  }
  return profile;
}
export function deleteProfile(username){
  let profiles = JSON.parse(localStorage.getItem("accounts"))
  let profile={};
  for (let a=profiles.length-1; a>=0;a--){
    console.log(profiles[a].username + " " + username)
    if (profiles[a].username===username){
      console.log("Found a match")
      profiles.splice(a,1)
      localStorage.setItem("accounts",JSON.stringify(profiles))
      return true
    }
  }
  return false
}
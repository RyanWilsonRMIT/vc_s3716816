//The helper file for all things related to profiles

//updatefield will update one `field` of `username`'s profile to be `data`; returns true only if successfull
//parameters:
//username    the username of the profile to be updated
//field       the field to be updated
//data        the new value for the field
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
//will get all informaiton on a particular profile, returning it as an object
//parameters:
//username    the username of the profile that is being requested
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
//will delete a particular user; only returns true if succesfull
//parameters:
//username    The username of the profile to be deleted 
export function deleteProfile(username){
  let profiles = JSON.parse(localStorage.getItem("accounts"))
  for (let a=profiles.length-1; a>=0;a--){
    if (profiles[a].username===username){
      profiles.splice(a,1)
      localStorage.setItem("accounts",JSON.stringify(profiles))
      return true
    }
  }
  return false
}
//will create a new profile
//parameters
//newAccount      The account that is to be added to the system
export function newProfile(newAccount){
  let accounts = [];
  if (localStorage.getItem("accounts")!=null){
    accounts = JSON.parse(localStorage.getItem("accounts"));
  }
  accounts.push(newAccount)
  localStorage.setItem("accounts",JSON.stringify(accounts))
}
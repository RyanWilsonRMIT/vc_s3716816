//This is the object that contains helper functions related to the message system (notifcaitons at the top of the site for login confirmation etc)
import Message from "../message.js";

//adds a message to be displayed at the top of the screen untill the user dismisses it
//parameters:
//type    good/info/bad  changes the bg color of the message from green/gray/red
//data    this is the content of the message
export function addMessage(type, data){
  let messages = [];
  if (localStorage.getItem("messages")!=null){
    messages=JSON.parse(localStorage.getItem("messages"));
  }
  messages.push({
    "type":type,
    "data":data,
  })
  localStorage.setItem("messages",JSON.stringify(messages))
}
//Gets all of the messages that are meant to be gettin displayed currently
//Returns a list of JSX objects
export function getMessages(){
  let messages = [];
  if (localStorage.getItem("messages")!=null){
    messages=JSON.parse(localStorage.getItem("messages"));
  }
  else{
    return [];
  }
  let formattedMsgs=[];
  for (let a in messages){
    let message = messages[a];
    if (message!=null){
      formattedMsgs.push(<Message key={a} index = {a} type={message.type}>{message.data}</Message>)
    }
  }
  return formattedMsgs;
}
//Removes a message from the users "queue" of messages
//parameters:
//index   the index of the message to be removed
export function removeMessage(index){
  let messages = [];
  if (localStorage.getItem("messages")!=null){
    messages=JSON.parse(localStorage.getItem("messages"));
  }
  else{
    return false;
  }
  if (messages[index]===null){
    return false;
  }
  messages[index]=null;
  localStorage.setItem("messages",JSON.stringify(messages))
  return true;
}
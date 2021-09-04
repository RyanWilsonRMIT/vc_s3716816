import Message from "../message.js";
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
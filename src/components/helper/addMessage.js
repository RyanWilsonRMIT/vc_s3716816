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
    formattedMsgs.push(<Message type={message.type}>{message.data}</Message>)
  }
  return formattedMsgs;
}

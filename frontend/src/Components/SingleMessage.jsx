import React from "react";

function SingleMessage(props) {
  console.log(props.currUser)
  console.log(props.sender)
  const chatType = props.currUser === props.sender ? "chat-end" : "chat-start";
  // const chatType = "chat-end"
  // console.log(props.key)
  return (
   
      <div className={`chat ${chatType} text-sm`}>
        <div className="chat-bubble">{props.text}</div>
      </div>
    
  );
}

export default SingleMessage;

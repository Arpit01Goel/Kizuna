import React from "react";
import { format } from "date-fns";

function SingleMessage(props) {
  console.log(props.currUser)
  console.log(props.sender)
  const chatType = props.currUser === props.sender ? "chat-end" : "chat-start";
  // const chatType = "chat-end"
  // console.log(props.key)
  const formattedTime = format(new Date(props.time), "HH:mm");

  return (
   
      <div className={`chat ${chatType} text-sm`}>
        <div className="chat-bubble">{props.text}
        </div>
        
        <div className="chat-footer opacity-50">{formattedTime}</div>
       

      </div>
    
  );
}

export default SingleMessage;

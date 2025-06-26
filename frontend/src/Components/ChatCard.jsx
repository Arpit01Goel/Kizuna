import React, { useState } from "react";
function Username({name}) {
  return (
    <div className="relative  p-2 z-100 " >
      {name}
    </div>
  )
}
function ChatCard(props) {
  const [showUsername, setShowUsername] = useState(false)
  return (
    <div className="relative rounded-lg  mb-3 hover:bg-gray-700 " onClick={props.onClick}
    
    >
      <div className="flex flex-row ">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full  ">
          <img src={props.img === "" ? "./assets/defaultDP.jpeg" : props.img} />
        </div>
      </div>

      {(showUsername||props.expand)? <Username  name={props.username} />:""}
      </div>
    </div>
  );
}

export default ChatCard;

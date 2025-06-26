import React, { useState } from "react";

function ChatCard(props) {
  const [showUsername, setShowUsername] = useState(true)
  return (
    <div className=" min-h-12 rounded-lg  mb-2 " onClick={props.onClick}>
      <div className="flex flex-row justify-start items-start ml-0 ">
      <div className="avatar hover:bg-fuchsia-400">
        <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full  ">
          <img src={props.img === "" ? "./assets/defaultDP.jpeg" : props.img} />
        </div>
      </div>
      {showUsername? props.username:""}
      </div>
    </div>
  );
}

export default ChatCard;

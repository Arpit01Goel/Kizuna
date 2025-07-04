import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
function Username({name}) {
  return (
    <div className="relative  p-2 z-100 " >
      {name}
    </div>
  )
}
function ChatCard(props) {
  
  const { onlineUsers } = useAuthStore();
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (onlineUsers.includes(props.userId)) {
      setOnline(true);
      
    } else {
      setOnline(false);
    }
  }, [onlineUsers, props.userId]);

  return (
    <div
      className="relative rounded-lg mb-3 hover:bg-base-300"
      onClick={props.onClick}
    >
      <div className="flex flex-row">
        <div className="avatar relative">
            {online && (
              <div
                aria-label="success"
                className="status status-success absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white z-60"
              ></div>
            )}
          <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full relative z-0">
            <img
              src={
                props.img === ""
                  ? "./assets/defaultDP.jpeg"
                  : `data:image/jpeg;base64,${props.profilePic}`
              }
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>

        {( props.expand) ? <Username name={props.username} /> : ""}
      </div>
    </div>
  );
}

export default ChatCard;
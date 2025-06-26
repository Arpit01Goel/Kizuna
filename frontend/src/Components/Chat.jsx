import React, { useEffect, useState } from "react";
import MessageArea from "./MessageArea";
import ChatCard from "./ChatCard";
import { useAuthStore } from "../store/useAuthStore";
function Chat() {
  const { listUsers, users } = useAuthStore();
    const currUser = useAuthStore((state) => state.authUser)?.username; // Safely access username
  
  const [receiver, setReceiver] = useState(currUser)
  useEffect(() => {
    users();
  }, [users]);
  

  return (
    <div className="relative w-full bg-cover bg-center inset-0 bg-gray-500 h-screen py-[5%]">
      <div className="flex flex-row  h-full">
        <div className="w-36 h-full flex flex-col items-center flex-grow overflow-y-auto">
          {Object.entries(listUsers).map(([key, val]) => (
            <ChatCard key={key} img={val.profilePic} username={val.username} onClick={async () =>{
              setReceiver(val.username)
            }} />
          ))}
        </div>
        <div className="divider divider-horizontal divider-success"></div>
        <div className="w-full ">
          <MessageArea key={"123"} rec={receiver}/>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import React Router hooks
import MessageArea from "./MessageArea";
import ChatCard from "./ChatCard";
import { useAuthStore } from "../store/useAuthStore";

function Chat() {
  const { listUsers, users, setSelectedUser } = useAuthStore();
  const { username } = useParams(); // Extract username from URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [receiver, setReceiver] = useState(username || ""); // Initialize receiver from URL

  useEffect(() => {
    users();
  }, [users]);

  const [extend, setExtend] = useState(false);

  return (
    <div className="fixed w-full bg-cover bg-center inset-0 bg-base-100 h-screen ">
      <div className="flex flex-row h-full pb-[0%]">
        <div
          className={`${
            extend ? "w-36" : "w-12"
          } hover:w-36 flex flex-col items-start flex-grow overflow-y-auto bg-base-200/30 py-[96px] hide-scrollbar `}
          onMouseEnter={() => setExtend(!extend)}
          onMouseLeave={() => setExtend(!extend)}
        >
          {Object.entries(listUsers).map(([key, val]) => (
            <ChatCard
              key={key}
              img={val.profilePic}
              username={val.username}
              userId={val._id}
              expand={extend}
              onClick={() => {
                setReceiver(val.username);
                setSelectedUser(val);
                navigate(`/chat/${val.username}`); // Navigate to the dynamic URL
              }}
            />
          ))}
        </div>
        <div className="w-full pt-[5%]">
          <MessageArea key={"123"} receiver={receiver} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
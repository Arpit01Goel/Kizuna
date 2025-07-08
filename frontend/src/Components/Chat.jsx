import React, { useEffect, useState } from "react";
import MessageArea from "./MessageArea";
import ChatCard from "./ChatCard";
import { useAuthStore } from "../store/useAuthStore";
function Chat() {
  const { listUsers, users , setSelectedUser} = useAuthStore();
  const currUser = useAuthStore((state) => state.authUser)?.username; // Safely access username

  const [receiver, setReceiver] = useState(currUser);
  useEffect(() => {
    users();
  }, [users]);
  const [extend, setExtend] = useState(false);

  return (
    <div className="fixed w-full bg-cover bg-center inset-0 bg-base-100 h-screen ">
      <div className="flex flex-row  h-full pb-[0%]">
        <div
          className={`${
            extend ? "w-36" : "w-12"
          } hover:w-36  flex flex-col items-start flex-grow overflow-y-auto bg-base-200/30 py-[96px] hide-scrollbar `}
          onMouseEnter={async () => {
            setExtend(!extend);
          }}
          onMouseLeave={async () => {
            setExtend(!extend);
          }}
        >
          {/* <button
            className="lg:hidden btn btn-soft btn-secondary ml-1"
            onClick={async () => {
              setExtend(!extend);
            }}
          ></button> */}

          {Object.entries(listUsers).map(([key, val]) => (
            <ChatCard
              key={key}
              img={val.profilePic}
              username={val.username}
              userId={val._id}
              expand={extend}
              onClick={async () => {
                setReceiver(val.username);
                setSelectedUser(val)
              }}
            />
          ))}
          
        </div>
        {/* <div className="divider divider-horizontal divider-success"></div> */}
        <div className="w-full pt-[5%]">
          <MessageArea key={"123"} receiver={receiver} />
        </div>
      </div>
    </div>
  );
}

export default Chat;

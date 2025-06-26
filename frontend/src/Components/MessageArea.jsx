import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SingleMessage from "./SingleMessage";
function MessageArea({ rec }) {
  console.log(rec);
  const currUser = useAuthStore((state) => state.authUser)?._id; // Safely access username
  const listMessages = useAuthStore((state) => state.listMessages); // Access listMessages
  const receiver = rec;
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (receiver) {
      useAuthStore.getState().messages({ receiver }); // Call messages directly from the store
    }
  }, [receiver, isSubmit]); // Only depend on receiver
  const [file, setFile] = useState("");
  const sendMessage = useAuthStore((state) => state.sendMessage);
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() || file) {
      sendMessage({ receiver: receiver, text: message, image: file });
      setMessage("");
      setFile("");

      setTimeout(() => {
        setIsSubmit(!isSubmit);
      }, 100);
    }
  };

  return (
    <div className="relative text-5xl text-primary-content flex flex-col justify-between h-full">
      <div className="overflow-y-auto m-12 h-full">
        {Object.entries(listMessages).map(([key, item]) => (
          <SingleMessage
            key={key}
            currUser={currUser}
            text={item.text}
            sender={item.sender}
            time={item.time}
          />
        ))}
      </div>
      <div className="flex flex-row items-center w-full ">
        <input
          type="file"
          className="file-input file-input-primary w-24"
          value={file}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          className="input flex-grow "
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary w-12" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default MessageArea;

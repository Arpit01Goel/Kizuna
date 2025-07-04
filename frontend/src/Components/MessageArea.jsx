import React, { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SingleMessage from "./SingleMessage";

function MessageArea({ receiver }) {
  const {
    authUser,
    listMessages,
    sendMessage,
    messages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useAuthStore();
  const currUser = authUser._id;

  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");

  // Ref for the messages container
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (receiver) {
      messages({ receiver });
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [receiver, messages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to bottom whenever listMessages changes
  useEffect(() => {
    scrollToBottom();
  }, [listMessages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() || file) {
      sendMessage({ receiver: receiver, text: message, image: file });
      setMessage("");
      setFile("");
      setIsSubmit(!isSubmit);

      // Scroll to bottom after sending a message
      scrollToBottom();
    }
  };

  return (
    <div className="relative text-5xl text-primary-content flex flex-col justify-between h-full">
      <div
        className="overflow-y-auto m-12 h-full"
        ref={messagesEndRef} // Attach the ref to the container
      >
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e); // Trigger handleSubmit when Enter is pressed
            }
          }}
        />
        <button className="btn btn-primary w-12" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default MessageArea;
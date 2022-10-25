import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      {message.senderId === currentUser.uid ? (
        <div className="messageInfoRight">
          <img src={currentUser.photoURL} alt="" />
          <span>
            {message.date
              .toDate()
              .toLocaleTimeString()
              .substring(
                0,
                message.date.toDate().toLocaleTimeString().indexOf(":", 3)
              ) +
              message.date
                .toDate()
                .toLocaleTimeString()
                .substring(
                  message.date.toDate().toLocaleTimeString().indexOf(" ")
                )}
          </span>
        </div>
      ) : (
        <div className="messageInfoLeft">
          <img src={data.user.photoURL} alt="" />
          <span>
            {message.date
              .toDate()
              .toLocaleTimeString()
              .substring(
                0,
                message.date.toDate().toLocaleTimeString().indexOf(":", 3)
              ) +
              message.date
                .toDate()
                .toLocaleTimeString()
                .substring(
                  message.date.toDate().toLocaleTimeString().indexOf(" ")
                )}
          </span>
        </div>
      )}
      <div className="messageContent">
        {message?.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;

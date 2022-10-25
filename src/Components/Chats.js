import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  function convertDate(time) {
    let dateInMillis = time * 1000;
    let date = new Date(dateInMillis);
    let myDate = date.toLocaleDateString();
    return myDate;
  }

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object?.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => {
              handleSelect(chat[1].userInfo);
            }}>
            <div className="userchat-group">
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
            <div className="date-span">
              <span>{convertDate(chat[1].date?.seconds)}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;

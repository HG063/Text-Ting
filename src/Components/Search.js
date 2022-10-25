import React, { useContext, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import { ChatContext } from "../Context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  // const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const { dispatch } = useContext(ChatContext);

  const fetchUserData = async () => {
    const userDataRef = collection(db, "users");
    getDocs(userDataRef)
      .then((res) => {
        const datas = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setUserData(datas);
      })
      .catch((err) => setErr(true));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSelect = async (user) => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (res.exists()) {
        dispatch({ type: "CHANGE_USER", payload: user });
      } else if (!res.exists()) {
        //create a chat in chats collection
        dispatch({ type: "CHANGE_USER", payload: user });
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder=" &#xf002; Search user.."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {userData
        .filter((datas) => {
          if (username === "") return "";
          else if (
            datas.data.displayName
              .toLowerCase()
              .includes(username.toLowerCase()) &&
            !datas.data.displayName
              .toLowerCase()
              .includes(currentUser.displayName.toLowerCase())
          )
            return datas;
          return "";
        })
        .map((datas) => {
          return (
            <div
              key={datas.data.uid}
              className="userChatSearch"
              onClick={() => {
                handleSelect(datas.data);
              }}>
              <img src={datas.data.photoURL} alt="" />
              <span>{datas.data.displayName}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Search;

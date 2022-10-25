import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import UserProfileModal from "./Modals/UserProfileModal";
import CurrentUserProfileModal from "./Modals/CurrentUserProfileModal";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [currentModalShow, setCurrentModalShow] = useState(false);

  return (
    <>
      <div className="chat">
        <div className="chatInfo">
          <div className="group-div" onClick={() => setCurrentModalShow(true)}>
            {data.user?.photoURL && (
              <img className="img-icon" src={data.user?.photoURL} alt="" />
            )}
            <span>{data.user?.displayName}</span>
          </div>
          <div className="chatIcons">
            <CgProfile
              className="img-size"
              onClick={() => setModalShow(true)}></CgProfile>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
      <UserProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={currentUser.displayName}
        image={currentUser.photoURL}
      />
      <CurrentUserProfileModal
        show={currentModalShow}
        onHide={() => setCurrentModalShow(false)}
        name={data.user?.displayName}
        image={data.user?.photoURL}
      />
    </>
  );
};

export default Chat;

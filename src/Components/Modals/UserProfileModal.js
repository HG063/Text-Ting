import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HiUser } from "react-icons/hi";

const UserProfileModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#5d5b8d", color: "white" }}>
        <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#ddddf7" }}>
        <div className="profile-modal">
          <img src={props.image} alt="" />
          <div className="logo-group">
            <HiUser className="img-user"></HiUser>
            <h1>Username: </h1>
            <h1 className="h1-tag" style={{ paddingTop: "10px" }}>
              {props.name}
            </h1>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#e0e5f7" }}>
        <Button
          style={{
            backgroundColor: "#8da4f1",
            border: "none",
          }}
          onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileModal;

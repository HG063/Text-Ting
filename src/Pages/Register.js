import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import YellowBell from "../img/YellowBell.png";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filepic, setFilepic] = useState("");
  const [filename, setFilename] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/Text-Ting/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          Text-Ting{" "}
          <img
            src={YellowBell}
            alt=""
            style={{ height: "40px", width: "40px", paddingLeft: "3px" }}
          />
        </span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Enter Name.." />
          <input required type="email" placeholder="Enter Email.." />
          <input required type="password" placeholder="Enter Password.." />
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => {
              setFilename(e.target.files[0].name);
              setFilepic(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <label required htmlFor="file">
            {filepic ? (
              <img className="img-file" src={filepic} alt="" />
            ) : (
              <img src={Add} alt="" />
            )}
            {filename ? (
              <span style={{ color: "#5d5b8d" }}>{filename}</span>
            ) : (
              <span>Add an avatar</span>
            )}
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && (
            <span
              style={{
                color: "red",
                textAlign: "center",
                fontWeight: "bold",
              }}>
              Something went wrong...!!!
            </span>
          )}
        </form>
        <p>
          You do have an account? <Link to="/Text-Ting/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

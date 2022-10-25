import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import YellowBell from "../img/YellowBell.png";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Text-Ting/");
    } catch (err) {
      setErr(true);
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
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="Enter Email.." />
          <input required type="password" placeholder="Enter Password.." />
          <button>Sign in</button>
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
          You don't have an account?{" "}
          <Link to="/Text-Ting/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

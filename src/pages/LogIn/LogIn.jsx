import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import ReUseButton from "../components/ReUseButton";

const LogIn = () => {
  const auth = getAuth();
  const [data, SetData] = useState({});

  const getData = (e) => {
    let input = { [e.target.name]: e.target.value };
    SetData({ ...data, ...input });
  };

  let { email, password } = data;

  const signinuser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="loginContainer">
      <form className="LoginForm">
        <h1 className="logoHeading">Campus-App</h1>
        <input placeholder="Email" name="email" onChange={(e) => getData(e)} />
        <input
          maxLength={10}
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => getData(e)}
        />
        <ReUseButton
          disabled={!(data?.email && data?.password)}
          className="Btn"
          type="submit"
          onClick={signinuser}
          btnText={"LogIn"}
        />

        <p>
          Dont have an account ?
          <span className="link">
            <Link to="/signUp">SignUp</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogIn;

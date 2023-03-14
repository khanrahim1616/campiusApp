import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

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
        <button
          disabled={!(data?.email && data?.password)}
          className="loginBtn"
          type="submit"
          onClick={signinuser}
        >
          LogIn
        </button>
        <p>
          Dont have an account ?
          <span className="signuplink">
            <Link to="/signUp">SignUp</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogIn;

import React from "react";
import { Button } from "antd";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { PieChartTwoTone } from "@ant-design/icons";
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
        <h1 className="logoHeading">
          <PieChartTwoTone id="campusIcon" />
          Campus-App
        </h1>
        <input placeholder="Email" name="email" onChange={(e) => getData(e)} />
        <input
          maxLength={10}
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => getData(e)}
        />
        <p>
          If you dont have account
          <span className="signuplink">
            <Link to="/signUp">SignUp</Link>
          </span>
        </p>
        <Button
          disabled={!data?.email || !data?.password}
          className="loginBtn"
          htmlType="submit"
          type="primary"
          onClick={signinuser}
        >
          LogIn
        </Button>
      </form>
    </div>
  );
};

export default LogIn;

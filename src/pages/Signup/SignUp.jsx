import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../../Firebaseconfig";

const SignUp = () => {
  const auth = getAuth();
  const [data, SetData] = useState({});
  const [role, setRole] = useState();
  const [experience, setExperience] = useState("");
  const getData = (e) => {
    let input = { [e.target.name]: e.target.value };
    SetData({ ...data, ...input });
  };

  let { email, password, username } = data;

  const signUpBtnDisableForCompany = !(
    role &&
    data?.email &&
    data?.password &&
    data?.username
  );

  const signUpBtnDisableForStudent = signUpBtnDisableForCompany || !experience;

  const signinuser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        const uid = user?.user?.uid;
        await set(ref(db, "Accounts/" + uid), {
          username: username,
          email: email,
          role: role,
          uid: uid,
          experience: experience,
        });
        setExperience("");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="loginContainer">
      <form className="LoginForm">
        <h1 className="logoHeading">Campus-App</h1>
        <span>
          <label htmlFor="username">username : </label>
          <input
            required
            maxLength={10}
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => getData(e)}
          />
        </span>
        <span>
          <label htmlFor="Email">Email : </label>
          <input
            required
            id="Email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => getData(e)}
          />
        </span>
        <span>
          <label htmlFor="Password">Password : </label>
          <input
            required
            id="Password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => getData(e)}
          />
        </span>
        <span>
          Sign up as :
          <span>
            <input
              required
              onChange={() => setRole("Student")}
              name="role"
              type="radio"
              id="Student"
              value="Student"
            />
            <label htmlFor="Student">Student</label>
          </span>
          <span>
            <input
              required
              onChange={() => setRole("Company")}
              name="role"
              type="radio"
              id="company"
              value="company"
            />
            <label htmlFor="company">Company</label>
          </span>
        </span>
        {role === "Student" && (
          <span>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Experience
              </option>
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </span>
        )}
        <button
          className="loginBtn"
          disabled={
            role === "Student"
              ? signUpBtnDisableForStudent
              : signUpBtnDisableForCompany
          }
          htmlType="submit"
          type="primary"
          onClick={signinuser}
        >
          SignUp
        </button>
        <p>
          Already have an account ?
          <span className="signuplink">
            <Link to="/LogIn">LogIn</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../../Firebaseconfig";
import { signUpSchema } from "../../schemas";
import ReUseButton from "../components/ReUseButton";
import { useFormik } from "formik";

const SignUp = () => {
  const auth = getAuth();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        role: "",
        experience: "",
      },
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(async (user) => {
            const uid = user?.user?.uid;
            await set(ref(db, "Accounts/" + uid), {
              username: values.username,
              email: values.email,
              role: values.role,
              uid: uid,
              experience: values.experience,
            });
            action.resetForm();
          })
          .catch((error) => {
            alert(error);
          });
      },
    });
  console.log(errors);
  return (
    <div className="loginContainer">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <h1 className="logoHeading">Campus-App</h1>
        <span>
          <label htmlFor="username">username : </label>
          <input
            id="username"
            name="username"
            placeholder="username"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </span>
        <span>
          <label htmlFor="Email">Email : </label>
          <input
            id="Email"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </span>
        <span>
          <label htmlFor="Password">Password : </label>
          <input
            id="Password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </span>
        <span>
          Sign up as :
          <span>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.role === "Student"}
              value="Student"
              name="role"
              type="radio"
              id="Student"
            />
            <label htmlFor="Student">Student</label>
          </span>
          <span>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.role === "company"}
              value="company"
              name="role"
              type="radio"
              id="company"
            />
            <label htmlFor="company">Company</label>
          </span>
        </span>
        {values.role === "Student" && (
          <span>
            <select
              name="experience"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.experience}
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
        <ReUseButton
          className={"buttonReuse"}
          type="submit"
          btnText={"SignUp"}
        />
        <p>
          Already have an account ?
          <span className="link">
            <Link to="/LogIn">LogIn</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

// const signinuser = (e) => {
//   e.preventDefault();
//   createUserWithEmailAndPassword(auth, email, password)
//     .then(async (user) => {
//       const uid = user?.user?.uid;
//       await set(ref(db, "Accounts/" + uid), {
//         username: username,
//         email: email,
//         role: role,
//         uid: uid,
//         experience: experience,
//       });
//     })
//     .catch((error) => {
//       alert(error);
//     });
// };

{
  /* <span>
          <label htmlFor="username">username : </label>
          <input
          
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
        )} */
}

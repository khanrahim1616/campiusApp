import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import { passwordVisible } from "../../Helper/Helper";
import { Avatar } from "@mui/material";
import logo from "../../Assets/logo.png";
import { logInSchema } from "../../schemas";
import Loader from "../../components/Loader/Loader";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";

const LogIn = () => {
  const auth = getAuth();
  const [loader, setLoader] = useState(false);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: logInSchema,
    onSubmit: (values, action) => {
      setLoader(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          setLoader(false);
          action.resetForm();
        })
        .catch((error) => {
          console.log(error);
          <ErrorAlert message={error} />;
          setLoader(false);
        });
    },
  });

  const handleCustomizedChange = (event) => {
    const target = event.target;
    setFieldValue(target.name, target.value.trim());
  };

  let disable = !(isValid && dirty);

  return (
    <div className="LoginSignUpForm">
      <form onSubmit={handleSubmit} className="formDiv">
        <div className="logo">
          <Avatar
            style={{
              border: "1px solid grey",
              width: "100px",
              height: "100px",
              borderRadius: "20px",
            }}
            src={logo}
          />
        </div>
        <label htmlFor="email">Email</label>
        <span className="formSteps">
          <input
            id="email"
            placeholder="Email"
            name="email"
            className="input"
            value={values.email}
            onChange={handleCustomizedChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p> {errors.email}</p> : null}
        </span>
        <label htmlFor="Password">Password</label>
        <span className="formSteps">
          <input
            id="Password"
            maxLength={10}
            className="input"
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>
            <input type="checkbox" onClick={() => passwordVisible()} />
            Show Password
          </div>
          {errors.password && touched.password ? (
            <p> {errors.password}</p>
          ) : null}
        </span>
        <span style={{ textAlign: "center" }}>
          {loader ? (
            <Loader />
          ) : (
            <Button
              className="ButtonReuse"
              // disabled={disable}
              // className={disable ? "opacity1" : "ButtonReuse"}
              type="submit"
              btnText="LogIn"
            />
          )}
        </span>
        <p>
          Dont have an account ?
          <span>
            <Link className="link" to="/signUp">
              SignUp
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogIn;

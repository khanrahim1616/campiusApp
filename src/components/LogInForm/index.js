import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { passwordVisible } from "../../Helper/globalHelper";
import { Avatar } from "@mui/material";
import logo from "../../Assets/logo.png";
import { logInSchema } from "../../schemas";
import Loader from "../../components/Loader";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorAlert from "../../components/ErrorAlert";

const Form = () => {
  const auth = getAuth();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

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
          setLoader(false);
          setError(error?.message.split("/")[1].replace(")", ""));
        });
    },
  });

  const handleCustomizedChange = (event) => {
    const target = event.target;
    setFieldValue(target.name, target.value.trim());
  };

  return (
    <>
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
            <Input
              id="email"
              placeholder="Email"
              name="email"
              className="Input"
              value={values.email}
              onChange={handleCustomizedChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? <p> {errors.email}</p> : null}
          </span>
          <label htmlFor="Password">Password</label>
          <span className="formSteps">
            <Input
              id="Password"
              maxLength={10}
              className="Input"
              placeholder="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="showPasswordDiv">
              <Input type="checkbox" onClick={passwordVisible} />
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
              <Button className="ButtonReuse" type="submit" btnText="LogIn" />
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
      {!!error && (
        <ErrorAlert
          message={error}
          open={!!error}
          onClose={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
};

export default Form;

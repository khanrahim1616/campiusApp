import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import ReUseButton from "../components/ReUseButton";
import { useFormik } from "formik";
// import { logInSchema } from "../../schemas";

const LogIn = () => {
  const auth = getAuth();

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: logInSchema,
    onSubmit: (values, action) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          action.resetForm();
        })
        .catch((error) => {
          alert(error);
        });
    },
  });

  const handleCustomizedChange = (event) => {
    const target = event.target;
    setFieldValue(target.name, target.value.trim());
  };

  const disabledConditions = !(values.email && values.password);

  return (
    <div className="loginContainer">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <h1 className="logoHeading">Campus-App</h1>
        <input
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleCustomizedChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? <p> {errors.email}</p> : null}
        <input
          maxLength={10}
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? <p> {errors.password}</p> : null}
        <ReUseButton
          disabled={disabledConditions}
          className={disabledConditions ? "opacity1" : "buttonReuse"}
          type="submit"
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

import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../../Firebaseconfig";
import { signUpSchema } from "../../schemas";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { passwordVisible } from "../../Helper/globalHelper";
import { Avatar } from "@mui/material";
import logo from "../../Assets/logo.png";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import ErrorAlert from "../../components/ErrorAlert";
import Input from "../../components/Input";

const Form = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      experience: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      setLoader(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (user) => {
          const uid = user?.user?.uid;
          await set(ref(db, "Accounts/" + uid), {
            username: values.username,
            email: values.email,
            role: values.role,
            experience: values.experience,
            uid: uid,
            isVerified: false,
            isBlocked: false,
          });
          navigate();
          action.resetForm();
          setLoader(false);
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
        <label htmlFor="username">Username</label>
        <span className="formSteps">
          <Input
            id="username"
            name="username"
            placeholder="Raheem khan"
            className="Input"
            value={values.username}
            onChange={handleCustomizedChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username ? (
            <p> {errors.username}</p>
          ) : null}
        </span>
        <label htmlFor="Email">Email</label>
        <span className="formSteps">
          <Input
            id="Email"
            name="email"
            className="Input"
            value={values.email}
            placeholder="Raheem@gmail.com"
            onChange={handleCustomizedChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p> {errors.email}</p> : null}
        </span>
        <label htmlFor="Password">Password</label>
        <span className="formSteps">
          <Input
            id="Password"
            name="password"
            type="password"
            className="Input"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="showPasswordDiv">
            <Input type="checkbox" onClick={() => passwordVisible()} />
            Show Password
          </div>
          {errors.password && touched.password ? (
            <p> {errors.password}</p>
          ) : null}
        </span>
        <span className="formSteps">
          <b>Sign up as : </b>
          <span>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value="Student"
              name="role"
              type="radio"
              id="Student"
            />
            <label htmlFor="Student">Student</label>
          </span>
          <span>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value="Company"
              name="role"
              type="radio"
              id="company"
            />
            <label htmlFor="company">Company</label>
          </span>
          {errors.role && touched.role ? <p> {errors.role}</p> : null}
        </span>
        {values.role === "Student" && (
          <span className="formSteps">
            <select
              className="selectOptions signUpSelectOption"
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
            {errors.experience && touched.experience ? (
              <p> {errors.experience}</p>
            ) : null}
          </span>
        )}
        <div className="buttonDiv">
          {loader ? (
            <Loader />
          ) : (
            <Button
              className={"ButtonReuse button"}
              type="submit"
              btnText={"SignUp"}
            />
          )}
        </div>
        <p>
          Already have an account ?
          <span>
            <Link className="link" to="/LogIn">
              LogIn
            </Link>
          </span>
        </p>
      </form>
      {!!error && (
        <ErrorAlert
          message={error}
          open={!!error}
          onClose={() => {
            setError(false);
          }}
        />
      )}
    </div>
  );
};

export default Form;

import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../../Firebaseconfig";
import { signUpSchema } from "../../schemas";
import ReUseButton from "../components/ReUseButton";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
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

  console.log(values);

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
            value={values.username}
            onChange={handleCustomizedChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username ? (
            <p> {errors.username}</p>
          ) : null}
        </span>
        <span>
          <label htmlFor="Email">Email : </label>
          <input
            id="Email"
            name="email"
            value={values.email}
            placeholder="email"
            onChange={handleCustomizedChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p> {errors.email}</p> : null}
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
          {errors.password && touched.password ? (
            <p> {errors.password}</p>
          ) : null}
        </span>
        <span>
          Sign up as :
          <span>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              // checked={values.role === "Student"}
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
              // checked={values.role === "Hello"}
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
            {errors.experience && touched.experience ? (
              <p> {errors.experience}</p>
            ) : null}
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

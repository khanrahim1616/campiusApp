import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../../Firebaseconfig";
import { signUpSchema } from "../../schemas";
import Button from "../../components/Button/Button";
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

  return (
    <div className="LoginSignUpForm">
      <form onSubmit={handleSubmit} className="formDiv">
        <h1>Campus-App</h1>
        <label htmlFor="username">Username</label>
        <span className="formSteps">
          <input
            id="username"
            name="username"
            placeholder="Raheem khan"
            className="input"
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
          <input
            id="Email"
            name="email"
            className="input"
            value={values.email}
            placeholder="Raheem@gmail.com"
            onChange={handleCustomizedChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p> {errors.email}</p> : null}
        </span>
        <label htmlFor="Password">Password</label>
        <span className="formSteps">
          <input
            id="Password"
            name="password"
            type="password"
            className="input"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p> {errors.password}</p>
          ) : null}
        </span>
        <span className="formSteps">
          Sign up as :
          <span>
            <input
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
            <input
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
        <Button className={"ButtonReuse"} type="submit" btnText={"SignUp"} />
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

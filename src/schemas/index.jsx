import * as yup from "yup";

export const logInSchema = yup.object({
  email: yup.string().email().required("Required!"),
  password: yup.string().min(6).required("Required!"),
});

export const signUpSchema = yup.object({
  username: yup.string().min(6).required("Required!"),
  email: yup.string().email().required("Required!"),
  password: yup.string().min(6).required("Required!"),
  role: yup.string().required("Required!"),
  experience: yup.string().when("role", {
    is: "Student",
    then: () => yup.string().required("Required!"),
  }),
});

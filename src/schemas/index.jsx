import * as yup from "yup";

export const logInSchema = yup.object({
  email: yup.string().email().required("Required!"),
  password: yup.string().min(6).required("Required!"),
});

export const signUpSchema = yup.object({
  email: yup.string().email().required("Required!"),
  password: yup.string().min(6).required("Required!"),
});

import * as yup from "yup";

export const logInSchema = yup.object({
  email: yup.string().email().required("Required!"),
  password: yup.string().required("Required!").min(8),
});

export const signUpSchema = yup.object({
  username: yup.string().min(6).required("Required!"),
  email: yup.string().email().required("Required!"),
  password: yup
    .string()
    .required("Required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  role: yup.string().required("Required!"),
  experience: yup.string().when("role", {
    is: "Student",
    then: () => yup.string().required("Required!"),
  }),
});

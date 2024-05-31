import * as yup from "yup";

const signupSchema = yup
  .object({
    username: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, "Invalid username")
      .required("Username is required*")
      .min(3, "Username must be at least 3 characters long")
      .max(30, "Username cannot exceed 30 characters"),
    email: yup
      .string()
      .required("Email is required*")
      .email("Enter a valid email address")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
        "Enter a valid email address"
      ),
    password: yup
      .string()
      .required("Password is required*")
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: yup
      .string()
      .required("Password is required*")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

export { signupSchema };

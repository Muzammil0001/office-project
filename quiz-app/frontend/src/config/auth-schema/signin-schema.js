import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required*")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
        "Enter a valid email address"
      ),
    password: yup
      .string()
      .required("Password is required*")
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

export default loginSchema;

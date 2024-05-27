import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../config/auth-schema/signup-schema";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signUpImage } from "../../config/constants/images";

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    alert("Registered Successfully");
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-[100vh]">
      <div className="flex">
        <div className="max-w-[50%] h-full hidden lg:block">
          <img className="object-cover" src={signUpImage} alt="Sign Up" />
        </div>
        <div className="h-full min-h-[100vh] flex flex-col justify-center items-center w-full bg-gradient-to-r from-blue-950 to-blue-800 pt-2">
          <h1 className=" my-10 lg:mb-10 text-white font-nunito text-3xl font-bold text-center">
            Welcome to <span className="text-lime-400">Quiz Revolution</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-[450px] w-full lg:max-w-[400px] px-2 pb-4"
          >
            <input
              {...register("username")}
              type="text"
              autoComplete="off"
              placeholder="Username"
              className={`h-12 p-4 ring-2 rounded-full text-normal text-black mx-2 ${
                errors.username ? " ring-red-500" : " ring-blue-700"
              }`}
            />
            <p className="mx-4 text-red-500 text-sm mt-[-10px]">
              {errors.username?.message}
            </p>

            <input
              {...register("email")}
              type="text"
              autoComplete="off"
              placeholder="Email"
              className={`h-12 p-4 ring-2 rounded-full text-normal text-black mx-2 ${
                errors.email ? " ring-red-500" : " ring-blue-700"
              }`}
            />
            <p className="mx-4 text-red-500 text-sm mt-[-10px]">
              {errors.email?.message}
            </p>

            <div className="relative mx-2">
              <input
                {...register("password")}
                type={passwordShown ? "text" : "password"}
                className={`h-12 p-4 pl-4 pr-10 rounded-full text-normal text-black w-full ring-2 ${
                  errors.password ? " ring-red-500" : " ring-blue-700"
                }`}
                autoComplete="off"
                placeholder="Password"
              />

              <div
                onClick={togglePasswordVisibility}
                className="absolute top-0 bottom-0 right-4 flex items-center my-2 text-lg cursor-pointer"
              >
                {passwordShown ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <p className="mx-4 text-red-500 text-sm mt-[-10px]">
              {errors.password?.message}
            </p>

            <div className="relative mx-2">
              <input
                {...register("confirm_password")}
                type={passwordShown ? "text" : "password"}
                className={`h-12 p-4 pl-4 pr-10 rounded-full text-normal text-black w-full ring-2 ${
                  errors.confirm_password ? " ring-red-500" : " ring-blue-700"
                }`}
                autoComplete="off"
                placeholder="Confirm Password"
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute top-0 bottom-0 right-4 flex items-center my-2 text-lg cursor-pointer"
              >
                {passwordShown ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <p className="mx-4 text-red-500 text-sm mt-[-10px]">
              {errors.confirm_password?.message}
            </p>
            <button
              type="submit"
              className="h-12 p-2 rounded-full text-normal mb-4 mx-2 bg-green-500 hover:opacity-70 text-black"
            >
              Register
            </button>
            <p className="text-center text-white mx-2">
              Have an account?{" "}
              <a
                href="/signin"
                className="hover:opacity-75 font-semibold text-nowrap"
              >
                Login Here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { signInImage } from "../../config/constants/images";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../config/auth-schema/signin-schema";
import { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  console.log("formData=>", formData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="min-h-[100vh]">
        <div className="flex">
          <div className="max-w-[50%] h-full hidden lg:block">
            <img className="object-cover" src={signInImage} alt={signInImage} />
          </div>
          <div className=" h-[100vh] flex flex-col justify-center items-center w-full bg-gradient-to-r from-blue-950 to-blue-800">
            <h1 className="mb-20 text-white font-nunito text-3xl font-bold text-center">
              Welcome to <span className="text-lime-400">Quiz Revolution</span>
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 max-w-[450px] w-full lg:max-w-[400px] px-2 pb-4"
            >
              <input
                className={`h-12 p-4 rounded-full text-normal text-black mx-2 ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                type="text"
                placeholder="Email"
                autoComplete="off"
                {...register("email")}
              />
              <p className="mx-4 text-red-500 text-sm mt-[-10px]">
                {errors.email?.message}
              </p>
              <input
                className={`h-12 p-4 rounded-full text-normal text-black mx-2 ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                type="password"
                placeholder="Password"
                autoComplete="off"
                {...register("password")}
              />
              <p className="mx-4 text-red-500 text-sm mt-[-10px]">
                {errors.password?.message}
              </p>
              <button
                className="h-12 p-2 rounded-full text-normal mb-4 mx-2 bg-green-500 hover:opacity-70 text-black"
                type="submit"
              >
                Log in
              </button>
              <p className="text-center text-white mx-2">
                Don not have account?{" "}
                <a
                  className="hover:opacity-75 font-semibold  text-nowrap"
                  href="/signup"
                >
                  Signup Here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserApi } from "../../../../apis/user-api";
import AuthSchema from "../config/constants/schema/user-schema";
import { getCoursesApi } from "../../../../apis/course-apis";

const CreateStudent = ({ isOpenModal, setToClose }) => {
  const [courses, setCourses] = useState([{ _id: "", courseName: "" }]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AuthSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "teacher",
    },
  });

  const onSubmit = async (data) => {
    data.role = "teacher";
    console.log("Teacher:", data);
    await createUserApi(data);
    setToClose(false);
    reset();
  };

  useEffect(() => {
    const getCourseFunc = async () => {
      const response = await getCoursesApi();
      setCourses(response);
      console.log("courses", response);
    };
    getCourseFunc();
  }, []);

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}} __demoMode>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="flex justify-between items-center "
                >
                  <span className="text-lg text-center font-medium leading-6 text-gray-900">
                    Create a New Teacher
                  </span>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center rounded-md text-sm font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setToClose(false)}
                  >
                    <RxCross2 className="size-5" />
                  </button>
                </DialogTitle>
                <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Teacher Name
                    </label>
                    <input
                      type="text"
                      {...register("username")}
                      className="dialog_input"
                      placeholder="Enter student name"
                    />
                    <p className=" text-red-500 text-sm">
                      {errors.username?.message}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="text"
                      {...register("email")}
                      className="dialog_input"
                      placeholder="Enter email"
                    />
                    <p className=" text-red-500 text-sm">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Class
                    </label>
                    <select
                      name="Class No."
                      className="dialog_input"
                      required
                      {...register("courseId", {
                        required: "courseId is required",
                      })}
                    >
                      <option value="">Select class</option>
                      {courses?.map((course, index) => {
                        return (
                          <>
                            <option key={index} value={course._id}>
                              {course.courseName}
                            </option>
                          </>
                        );
                      })}
                      <p className=" text-red-500 text-sm">
                        {errors.courseId?.message}
                      </p>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="text"
                      {...register("password")}
                      className="dialog_input"
                      placeholder="Enter password"
                    />
                    <p className=" text-red-500 text-sm">
                      {errors.password?.message}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="text"
                      {...register("confirm_password")}
                      className="dialog_input"
                      placeholder="Enter password"
                    />
                    <p className=" text-red-500 text-sm ">
                      {errors.confirm_password?.message}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-end">
                    <Button
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="submit"
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default CreateStudent;

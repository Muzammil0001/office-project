import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { getUserByIdApi, updateUserApi } from "../../../../apis/user-api";

const UpdateStudent = ({ isOpenModal, setToClose, studentId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await updateUserApi(studentId, data);
      if (response.status == 200) {
        alert("Student updated successfully.");
        setToClose(false);
      } else {
        console.log("Failed to update student.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update student.");
    }
  };

  useEffect(() => {
    if (!isOpenModal || !studentId) return;

    const fetchStudent = async () => {
      try {
        const studentData = await getUserByIdApi(studentId);
        console.log("studentData:", studentData);
        setValue("username", studentData.username);
        setValue("email", studentData.email);
      } catch (error) {
        console.log("Failed to fetch student details:", error);
      }
    };

    fetchStudent();
  }, [studentId, isOpenModal, setValue]);

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
                    Update Student
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
                      Student Name
                    </label>
                    <input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                        pattern: {
                          value: /^[A-Za-z ]*$/,
                          message:
                            "Username can only contain letters and spaces.",
                        },
                        minLength: {
                          value: 3,
                          message: "Username must have at least 3 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "Username cannot exceed 30 characters",
                        },
                      })}
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
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="dialog_input"
                      placeholder="Enter email"
                    />
                    <p className=" text-red-500 text-sm">
                      {errors.email?.message}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-end">
                    <Button
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      type="submit"
                    >
                      Update
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
export default UpdateStudent;

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
import {
  updateCourseApi,
  getCourseByIdApi,
} from "../../../../apis/course-apis";

const UpdateCourse = ({ isOpenModal, setToClose, courseId }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    courseImage: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    await updateCourseApi(courseId, data);
    setToClose(false);
    alert("Course Updated Successfully");
  };

  useEffect(() => {
    if (!isOpenModal) return;
    const GetApiFunc = async () => {
      try {
        const fetchCourse = await getCourseByIdApi(courseId);
        setFormData(fetchCourse);
        console.log("fetchCourse:", fetchCourse);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };
    if (courseId) {
      GetApiFunc();
    }
  }, [courseId, isOpenModal]);

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
                <form className="mt-2" onSubmit={onSubmitHandle}>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      className="dialog_input"
                      placeholder="Enter course name"
                      required
                      value={formData?.courseName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      name="description"
                      className="dialog_input"
                      required
                      value={formData?.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Course Image
                    </label>
                    <input
                      type="file"
                      name="courseImage"
                      className="dialog_input"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-end">
                    <Button
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
export default UpdateCourse;

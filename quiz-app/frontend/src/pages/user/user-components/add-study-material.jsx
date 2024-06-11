import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { getCoursesApi } from "../../../apis/course-apis";
import { postStudyMaterial } from "../../../apis/study-material-api";

const AddStudyMaterial = ({ isOpenModal, setToClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const courseId = user?.courseId;

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    content: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const getCourseFunc = async () => {
    const response = await getCoursesApi();
    console.log("courses all", response);
    if (role === "teacher") {
      const TeacherCourses = response?.filter(
        (course) => course._id === courseId
      );
      setCourses(TeacherCourses);
      console.log("courses teacher", TeacherCourses);
    } else if (role === "admin") {
      setCourses(response);
      console.log("courses all", response);
    }
  };

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("courseId", selectedCourse);
    console.log("FormData:");
    for (let pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    const resp = await postStudyMaterial(data);
    if (resp.status === 201) {
      alert("Study Material Uploaded");
      setFormData({
        title: "",
        description: "",
        courseId: "",
        content: null,
      });
      setSelectedCourse("");
    }
  };

  useEffect(() => {
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
                    Add study material
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
                      Title
                    </label>
                    <input
                      required
                      onChange={handleChange}
                      type="text"
                      name="title"
                      value={formData.title}
                      className="dialog_input"
                      placeholder="Enter quiz name"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      required
                      onChange={handleChange}
                      type="text"
                      name="description"
                      value={formData.description}
                      className="dialog_input"
                      placeholder="Details..."
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Course
                    </label>
                    <select
                      required
                      onChange={(event) => {
                        setFormData((preState) => ({
                          ...preState,
                          courseId: event.target.value,
                        }));
                      }}
                      value={formData.courseId}
                      name="courseId"
                      className="dialog_input"
                    >
                      <option value=""> --Select Course-- </option>
                      {courses?.map((course, idx) => (
                        <option key={idx} value={course._id}>
                          {course.courseName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4">
                    <input
                      required
                      onChange={handleChange}
                      type="file"
                      name="content"
                      className="block w-full text-sm border border-gray-700 rounded-lg text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-end">
                    <Button
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="submit"
                    >
                      ADD
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
export default AddStudyMaterial;

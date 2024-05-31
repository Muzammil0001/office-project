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
import { getCourseByIdApi } from "../../../../apis/course-apis";

const ViewCourseDetails = ({ isOpenModal, setToClose, courseId }) => {
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    createdAt: "",
  });

  useEffect(() => {
    if (!isOpenModal) return;

    const GetCourseFunc = async () => {
      try {
        const fetchCourse = await getCourseByIdApi(courseId);
        setCourse(fetchCourse);
        console.log("fetchCourseById:", fetchCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    if (courseId) {
      GetCourseFunc();
    }
  }, [courseId,isOpenModal]);

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
                  className="flex justify-between items-center mb-2 "
                >
                  <span className="text-xl font-medium leading-6 text-gray-900">
                    View Course
                  </span>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center rounded-md text-md font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setToClose(false)}
                  >
                    <RxCross2 className="size-5" />
                  </button>
                </DialogTitle>
                <div className=" flex flex-col gap-2">
                  <div className="">
                    <div className=" font-medium text-base">Course Name:</div>
                    <div className="text-sm">{course?.courseName}</div>
                  </div>
                  <div className="">
                    <div className=" font-medium">Details</div>
                    <div className="text-sm">{course?.description}</div>
                  </div>
                  <div className="">
                    <div className=" font-medium">createdAt:</div>
                    <div className="text-sm">{course?.createdAt}</div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ViewCourseDetails;

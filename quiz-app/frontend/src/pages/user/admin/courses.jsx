import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateCourse from "./components/create-course";
import UpdateCourse from "./components/update-course";
import DeleteCourse from "./components/delete-course";
import ViewCourseDetails from "./components/view-course";
import { useEffect, useState } from "react";
import { getCoursesApi } from "../../../apis/course-apis";
import Loader from "../../../components/loader";

const CoursesList = () => {
  const [loader, setLoader] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const handleIconClick = (id, setModalOpen) => {
    setSelectedCourseId(id);
    setModalOpen(true);
  };

  useEffect(() => {
    const GetApiFunc = async () => {
      const fetchCourses = await getCoursesApi();
      setCourseData(fetchCourses);
      fetchCourses ? setLoader(false) : setLoader(true);
    };
    GetApiFunc();
  }, [courseData]);
  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
        <CreateCourse
          isOpenModal={isCreateModalOpen}
          setToClose={setCreateModalOpen}
        />
        <UpdateCourse
          isOpenModal={isUpdateModalOpen}
          setToClose={setUpdateModalOpen}
          courseId={selectedCourseId}
        />
        <DeleteCourse
          isOpenModal={isDeleteModalOpen}
          setToClose={setDeleteModalOpen}
          courseId={selectedCourseId}
        />
        <ViewCourseDetails
          isOpenModal={isViewModalOpen}
          setToClose={setViewModalOpen}
          courseId={selectedCourseId}
        />
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
          <button
            onClick={() => {
              setCreateModalOpen(true);
            }}
            className="py-2 px-4 bg-gradient-to-tr from-blue-950 to-blue-500 rounded-sm text-white"
          >
            Add Course
          </button>
        </div>
        <div className="flex flex-col items-center px-4 py-10">
          <h2 className="text-center text-3xl font-bold font-nunito mb-10">
            Courses
          </h2>
          <div className="w-full overflow-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="text-center bg-blue-950 text-white h-12">
                  <th className="p-2  font-medium border border-gray-400">#</th>
                  <th className="p-2  font-medium border border-gray-400">
                    Course Name
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseData?.map((course, index) => {
                  const { _id, courseName } = course;
                  return (
                    <tr
                      key={index}
                      className="text-center hover:bg-gray-100 h-12"
                    >
                      <td className=" border border-gray-300">{index + 1}</td>
                      <td className=" border border-gray-300">{courseName}</td>

                      <td className=" border border-gray-300 ">
                        <div className="flex gap-5  justify-center">
                          <div className="flex gap-5  justify-center">
                            <FaEye
                              onClick={() =>
                                handleIconClick(_id, setViewModalOpen)
                              }
                              className="size-5 cursor-pointer text-blue-500"
                            />
                            <FaRegEdit
                              onClick={() =>
                                handleIconClick(_id, setUpdateModalOpen)
                              }
                              className="size-5 cursor-pointer text-green-800"
                            />
                            <RiDeleteBin6Line
                              onClick={() =>
                                handleIconClick(_id, setDeleteModalOpen)
                              }
                              className="size-5 cursor-pointer  text-red-500"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loader && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesList;

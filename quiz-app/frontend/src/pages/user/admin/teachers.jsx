import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateTeacher from "./components/create-teacher";
import UpdateTeacher from "./components/update-teacher";
import DeleteTeacher from "./components/delete-teacher";
import ViewTeacherDetails from "./components/view-teacher";
import { useEffect, useState } from "react";
import { getUserByIRole } from "../../../apis/user-api";
import Loader from "../../../components/loader";

const TeachersList = () => {
  const [loader, setLoader] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [teacherData, setTeacherData] = useState([]);

  const handleIconClick = (id, setModalOpen) => {
    setSelectedTeacherId(id);
    setModalOpen(true);
  };

  useEffect(() => {
    const GetTeachersFunc = async () => {
      const response = await getUserByIRole("teacher");
      setTeacherData(response);
      response ? setLoader(false) : setLoader(true);
      console.log(response);
    };
    GetTeachersFunc();
  }, []);
  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
        <CreateTeacher
          isOpenModal={isCreateModalOpen}
          setToClose={setCreateModalOpen}
        />
        <UpdateTeacher
          isOpenModal={isUpdateModalOpen}
          setToClose={setUpdateModalOpen}
          teacherId={selectedTeacherId}
        />
        <DeleteTeacher
          isOpenModal={isDeleteModalOpen}
          setToClose={setDeleteModalOpen}
          teacherId={selectedTeacherId}
        />
        <ViewTeacherDetails
          isOpenModal={isViewModalOpen}
          setToClose={setViewModalOpen}
          teacherId={selectedTeacherId}
        />
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
          <button
            onClick={() => {
              setCreateModalOpen(true);
            }}
            className="py-2 px-4 bg-gradient-to-tr from-blue-950 to-blue-500 rounded-sm text-white"
          >
            Add Teacher
          </button>
        </div>
        <div className="flex flex-col items-center px-4 py-10">
          <h2 className="text-center text-3xl font-bold font-nunito mb-10">
            Teachers
          </h2>
          <div className="w-full overflow-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="text-center bg-blue-950 text-white h-12">
                  <th className="p-2  font-medium border border-gray-400">#</th>
                  <th className="p-2  font-medium border border-gray-400">
                    Teacher Name
                  </th>
                  <th className="p-2 sm:table-cell hidden font-medium border border-gray-400">
                    Email Address
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Course Name
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {teacherData?.map((teacher, index) => {
                  const { _id, username, email } = teacher;
                  return (
                    <tr
                      key={index}
                      className="text-center hover:bg-gray-100 h-12"
                    >
                      <td className="p-2 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-2 border border-gray-300">{username}</td>
                      <td className="p-2 border sm:table-cell hidden border-gray-300">
                        {email}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {teacher.courseId.courseName}
                      </td>
                      <td className="p-2 border border-gray-300 ">
                        <div className="flex gap-5 p-2 justify-center">
                          <div className="flex gap-5 px-2 justify-center">
                            <FaEye
                              onClick={() => {
                                handleIconClick(_id, setViewModalOpen);
                              }}
                              className="size-5 cursor-pointer text-blue-500"
                            />
                            <FaRegEdit
                              onClick={() => {
                                handleIconClick(_id, setUpdateModalOpen);
                              }}
                              className="size-5 cursor-pointer text-green-800"
                            />
                            <RiDeleteBin6Line
                              onClick={() => {
                                handleIconClick(_id, setDeleteModalOpen);
                              }}
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

export default TeachersList;

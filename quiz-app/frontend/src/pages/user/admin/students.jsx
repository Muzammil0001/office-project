import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateStudent from "./components/create-student";
import UpdateStudent from "./components/update-student";
import DeleteStudent from "./components/delete-student";
import ViewStudentDetails from "./components/view-student";
import { useState, useEffect } from "react";
import { getUserByIRole } from "../../../apis/user-api";
import Loader from "../../../components/loader";

const StudentsList = () => {
  const [loader, setLoader] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentData, setStudentData] = useState([
    { _id: "", username: "", email: "" },
  ]);

  const handleIconClick = (id, setModalOpen) => {
    setSelectedStudentId(id);
    setModalOpen(true);
  };

  useEffect(() => {
    const GetUsersFunc = async () => {
      const fetchStudent = await getUserByIRole("student");
      setStudentData(fetchStudent);
      fetchStudent ? setLoader(false) : setLoader(true);
    };
    GetUsersFunc();
  }, [studentData]);

  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
        <CreateStudent
          isOpenModal={isCreateModalOpen}
          setToClose={setCreateModalOpen}
        />
        <UpdateStudent
          isOpenModal={isUpdateModalOpen}
          setToClose={setUpdateModalOpen}
          studentId={selectedStudentId}
        />
        <DeleteStudent
          isOpenModal={isDeleteModalOpen}
          setToClose={setDeleteModalOpen}
          studentId={selectedStudentId}
        />
        <ViewStudentDetails
          isOpenModal={isViewModalOpen}
          setToClose={setViewModalOpen}
          studentId={selectedStudentId}
        />
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
          <button
            onClick={() => {
              setCreateModalOpen(true);
            }}
            className="py-2 px-4 bg-gradient-to-tr from-blue-950 to-blue-500  rounded-sm text-white"
          >
            Add Student
          </button>
        </div>
        <div className="flex flex-col items-center px-4 py-10">
          <h2 className="text-center text-3xl font-bold font-nunito mb-10">
            Students
          </h2>
          <div className="w-full overflow-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="text-center bg-blue-950 text-white h-12">
                  <th className="p-2  font-medium border border-gray-400">#</th>
                  <th className="p-2  font-medium border border-gray-400">
                    Student Name
                  </th>
                  <th className="p-2 sm:table-cell hidden font-medium border border-gray-400">
                    Email Address
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => {
                  const { _id, username, email } = student;
                  return (
                    <tr
                      key={index}
                      className="text-center hover:bg-gray-100 h-12"
                    >
                      <td className="px-2 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-2 border border-gray-300">
                        {username}
                      </td>
                      <td className="px-2 border sm:table-cell hidden border-gray-300">
                        {email}
                      </td>
                      <td className="px-2 border border-gray-300 ">
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

export default StudentsList;

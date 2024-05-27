import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateStudent from "./components/create-student";
import UpdateStudent from "./components/update-student";
import DeleteStudent from "./components/delete-student";
import ViewStudentDetails from "./components/view-student";
import { useState } from "react";

const StudentsList = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

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
        />
        <DeleteStudent
          isOpenModal={isDeleteModalOpen}
          setToClose={setDeleteModalOpen}
        />
        <ViewStudentDetails
          isOpenModal={isViewModalOpen}
          setToClose={setViewModalOpen}
        />
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
          <button
            onClick={() => {
              setCreateModalOpen(true);
            }}
            className="py-2 px-4 bg-blue-800 rounded-sm text-white"
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
                  <th className="p-2  font-medium border border-gray-400">
                    Batch
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Address
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    name: "Ahmad",
                    batch: 2,
                    address: "Lahore",
                    date: "22/02/2024",
                  },
                  {
                    id: 2,
                    name: "Ali",
                    batch: 2,
                    address: "Lahore",
                    date: "22/02/2024",
                  },
                  {
                    id: 3,
                    name: "Akbar",
                    batch: 2,
                    address: "Lahore",
                    date: "22/02/2024",
                  },
                ].map((student) => {
                  const { id, batch, name, address } = student;
                  return (
                    <tr key={id} className="text-center hover:bg-gray-100 h-12">
                      <td className="p-2 border border-gray-300">{id}</td>
                      <td className="p-2 border border-gray-300">{name}</td>
                      <td className="p-2 border border-gray-300">{batch}</td>

                      <td className="p-2 border border-gray-300">{address}</td>
                      <td className="p-2 border border-gray-300 ">
                        <div className="flex gap-5 p-2 justify-center">
                          <div className="flex gap-5 p-2 justify-center">
                            <FaEye
                              onClick={() => {
                                setViewModalOpen(true);
                              }}
                              className="size-5 cursor-pointer text-blue-500"
                            />
                            <FaRegEdit
                              onClick={() => {
                                setUpdateModalOpen(true);
                              }}
                              className="size-5 cursor-pointer text-green-800"
                            />
                            <RiDeleteBin6Line
                              onClick={() => {
                                setDeleteModalOpen(true);
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
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsList;

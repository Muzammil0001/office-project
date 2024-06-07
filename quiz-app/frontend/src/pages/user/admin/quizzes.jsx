import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineStop } from "react-icons/ai";
import { useState } from "react";
import UpdateQuiz from "./components/update-quiz";
import DeleteQuiz from "./components/delete-quiz";
import ViewQuizDetails from "./components/view-quiz";
import { Link } from "react-router-dom";

const QuizzesList = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
        <UpdateQuiz
          isOpenModal={isUpdateModalOpen}
          setToClose={setUpdateModalOpen}
        />
        <DeleteQuiz
          isOpenModal={isDeleteModalOpen}
          setToClose={setDeleteModalOpen}
        />
        <ViewQuizDetails
          isOpenModal={isViewModalOpen}
          setToClose={setViewModalOpen}
        />
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
          <Link to={"/admin/quizzes/create-quiz"}>
            <button
              onClick={() => {
                setCreateModalOpen(true);
              }}
              className="py-2 px-4 bg-blue-800 rounded-sm text-white"
            >
              Create Quiz
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center px-4 py-10">
          <h2 className="text-center text-3xl font-bold font-nunito mb-10">
            Quizzes
          </h2>
          <div className="w-full overflow-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="text-center bg-blue-950 text-white h-12">
                  <th className="p-2  font-medium border border-gray-400">#</th>
                  <th className="p-2  font-medium border border-gray-400">
                    Name
                  </th>
                  <th className="p-2 md:table-cell hidden  font-medium border border-gray-400">
                    Batch
                  </th>
                  <th className="p-2 md:table-cell hidden font-medium border border-gray-400">
                    Instructor
                  </th>
                  <th className="p-2 md:table-cell hidden  font-medium border border-gray-400">
                    Date
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
                    quizname: "Math",
                    batch: 11,
                    instructor: "Sufyan",
                    date: "22/02/2024",
                  },
                ].map((student) => {
                  const { id, quizname, batch, instructor, date } = student;
                  return (
                    <tr key={id} className="text-center hover:bg-gray-100 h-12">
                      <td className="p-2 border border-gray-300">{id}</td>
                      <td className="p-2 border border-gray-300">{quizname}</td>
                      <td className="p-2 md:table-cell hidden  border border-gray-300">
                        {batch}
                      </td>

                      <td className="p-2 md:table-cell hidden border border-gray-300">
                        {instructor}
                      </td>
                      <td className="p-2 md:table-cell hidden  border border-gray-300">
                        {date}
                      </td>
                      <td className="p-2 border border-gray-300 ">
                        <div className="flex gap-5 p-2 justify-center">
                          <FaEye
                            onClick={() => {
                              setViewModalOpen(true);
                            }}
                            className="size-5 cursor-pointer text-blue-500"
                          />
                          <AiOutlineStop className="size-5 cursor-pointer text-red-500" />
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

export default QuizzesList;

import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineStop } from "react-icons/ai";
import { useState, useEffect } from "react";
import UpdateQuiz from "./components/update-quiz";
import DeleteQuiz from "./components/delete-quiz";
import ViewQuizDetails from "./components/view-quiz";
import { Link } from "react-router-dom";
import { getQuizzes } from "../../../apis/quizzes-apis";

const QuizzesList = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuiz = async () => {
      const response = await getQuizzes();
      setQuizzes(response.data);
    };
    getQuiz();
  }, []);
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
          <Link to={"/create-quiz"}>
            <button
              onClick={() => {
                setCreateModalOpen(true);
              }}
              className="py-2 px-4  bg-gradient-to-tr from-blue-950 to-blue-500  rounded-sm text-white"
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
                    Quiz Name
                  </th>
                  <th className="p-2 md:table-cell hidden  font-medium border border-gray-400">
                    Course
                  </th>
                  <th className="p-2 md:table-cell hidden font-medium border border-gray-400">
                    Status
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {quizzes?.map((quiz, index) => {
                  const { _id, courseId, quizTitle, isActive } = quiz;
                  return (
                    <tr
                      key={_id}
                      className="text-center hover:bg-gray-100 h-12"
                    >
                      <td className="p-2 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {quizTitle}
                      </td>
                      <td className="p-2 md:table-cell hidden  border border-gray-300">
                        {courseId.courseName}
                      </td>

                      <td className="p-2 md:table-cell hidden border border-gray-300">
                        {isActive ? "Active" : "Inactive"}
                      </td>
                      <td className="p-2 border border-gray-300 ">
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

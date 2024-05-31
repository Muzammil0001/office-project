import { useState } from "react";
import CreateQuiz from "./components/create-quiz";
import { Link } from "react-router-dom";

const Quizzes = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  return (
    <>
      <div className="w-full mt-4">
        <CreateQuiz
          isOpenModal={isCreateModalOpen}
          setToClose={setCreateModalOpen}
        />
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
          <Link to={"/quiz"}>
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
            Quizzes Report
          </h2>
          <div className="w-full overflow-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="text-center bg-blue-950 text-white h-12">
                  <th className="p-2  font-medium border border-gray-400">#</th>
                  <th className="p-2  font-medium border border-gray-400">
                    Quiz Name
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Duration
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Total Points
                  </th>
                  <th className="p-2  font-medium border border-gray-400 ">
                    Class
                  </th>

                  <th className="p-2  font-medium border border-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    name: "Satistics",
                    duration: 60,
                    totalScore: 600,
                    classes: 12,
                    date: "22/02/2024",
                  },
                ].map((student) => {
                  const { id, name, duration, totalScore, classes, date } =
                    student;
                  return (
                    <tr key={id} className="text-center hover:bg-gray-100 h-12">
                      <td className="p-2 border border-gray-300">{id}</td>
                      <td className="p-2 border border-gray-300">{name}</td>
                      <td className="p-2 border  border-gray-300">
                        {duration}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {totalScore}
                      </td>
                      <td className="p-2 border border-gray-300">{classes}</td>

                      <td className="p-2 border border-gray-300">{date}</td>
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

export default Quizzes;

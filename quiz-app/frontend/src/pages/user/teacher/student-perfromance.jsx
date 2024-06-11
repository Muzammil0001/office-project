import { useState } from "react";
import ViewStudentDetails from "../user-components/student-details";

const TeacherLeaderBoard = () => {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
        <ViewStudentDetails
          isOpenModal={isViewModalOpen}
          setToClose={setViewModalOpen}
        />
        <div className="flex flex-col items-center px-4 py-10">
          <h2 className="text-center text-3xl font-bold font-nunito mb-10">
            Students Performance
          </h2>
          <div className="w-full overflow-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="text-center bg-blue-950 text-white h-12">
                  <th className="p-2  font-medium border border-gray-400">#</th>
                  <th className="p-2  font-medium border border-gray-400">
                    Name
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Obtained Points
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Class
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
                    score: 580,
                    totalScore: 600,
                    date: "22/02/2024",
                  },
                  {
                    id: 2,
                    name: "Ali",
                    score: 308,
                    totalScore: 600,
                    date: "22/02/2024",
                  },
                  {
                    id: 3,
                    name: "Akbar",
                    score: 580,
                    totalScore: 600,
                    date: "22/02/2024",
                  },
                ].map((student) => {
                  const { id, name, score, totalScore } = student;
                  const percentage = (score * 100) / totalScore;
                  return (
                    <tr key={id} className="text-center hover:bg-gray-100 h-12">
                      <td className="p-2 border border-gray-300">{id}</td>
                      <td className="p-2 border border-gray-300">{name}</td>
                      <td className="p-2 border border-gray-300">{score}</td>

                      <td className="p-2 border border-gray-300">
                        {totalScore}
                      </td>
                      <td className="p-2 border border-gray-300">
                        <button
                          onClick={() => {
                            setViewModalOpen(true);
                          }}
                          className="px-4 py-2 bg-yellow-400 rounded"
                        >
                          Detail
                        </button>
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

export default TeacherLeaderBoard;

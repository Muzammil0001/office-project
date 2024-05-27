const StudentList = () => {
  return (
    <>
      <div className="flex flex-col items-center px-4 py-10">
        <h2 className="text-center text-3xl font-bold font-nunito mb-10">
          Marks Details
        </h2>
        <div className="w-full overflow-auto">
          <table className="min-w-[500px] w-full">
            <thead>
              <tr className="text-center bg-blue-950 text-white h-12">
                <th className="p-2  font-medium border border-gray-400">
                  Rank
                </th>
                <th className="p-2  font-medium border border-gray-400">
                  Name
                </th>
                <th className="p-2  font-medium border border-gray-400">
                  Obtained Points
                </th>
                <th className="p-2  font-medium border border-gray-400">
                  Percentage
                </th>
                <th className="p-2  font-medium border border-gray-400">
                  Total Points
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
              ].map((student) => {
                const { id, name, score, totalScore } = student;
                const percentage = (score * 100) / totalScore;
                return (
                  <tr key={id} className="text-center hover:bg-gray-100 h-12">
                    <td className="p-2 border border-gray-300">{id}</td>
                    <td className="p-2 border border-gray-300">{name}</td>
                    <td className="p-2 border border-gray-300">{score}</td>
                    <td className="p-2 border border-gray-300">
                      {percentage.toFixed(2)}%
                      <div className="w-full h-[6px] mt-2 bg-slate-300 rounded-full">
                        <div
                          style={{ width: `${percentage}%` }}
                          className="rounded-full bg-yellow-500 h-full"
                        ></div>
                      </div>
                    </td>
                    <td className="p-2 border border-gray-300">{totalScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentList;

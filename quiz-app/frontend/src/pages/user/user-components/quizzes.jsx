import { Link } from "react-router-dom";
import { getQuizzes, updateQuiz } from "../../../apis/quizzes-apis";
import { useState, useEffect } from "react";

const Quizzes = () => {
  const { _id, role, courseId } = JSON.parse(localStorage.getItem("user"));
  const [quizzes, setQuizzes] = useState(null);

  const GetQuizzesFunc = async () => {
    try {
      const resp = await getQuizzes();

      if (role === "teacher") {
        const TeacherQuizzes = resp.data.filter(
          (quiz) => quiz.courseId._id === courseId
        );
        setQuizzes(TeacherQuizzes);
        console.log("TeacherQuizzes", TeacherQuizzes);
      } else if (role === "admin") {
        setQuizzes(resp.data);
      }
    } catch (error) {
      console.error("Error to call Quiz API", error);
    }
  };

  const quizStatusHandle = async (id, status) => {
    console.log("QuizID", id);
    const isActive = !status;

    const response = await updateQuiz(id, { isActive });
    if (response.status == 200) {
      alert(`Quiz status updated`);
      GetQuizzesFunc();
    }
  };

  useEffect(() => {
    GetQuizzesFunc();
  }, []);

  return (
    <>
      <div className="w-full mt-4">
        <div className="w-full flex md:flex-row flex-col items-end sm:items-center justify-end px-4">
          <Link to={`/create-quiz`}>
            <button className="py-2 px-4 bg-gradient-to-tr from-blue-900 to-blue-500 rounded-sm text-white">
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
                  {[
                    "#",
                    "Quiz Title",
                    "Course",
                    "Due Date",
                    "Duration",
                    "Total Points",
                    "Status",
                  ].map((header, indx) => {
                    const cellHeadResponsiveStyle =
                      header === "Duration" ||
                      header === "Total Points" ||
                      header === "Course"
                        ? "hidden sm:table-cell"
                        : "";

                    return (
                      <th
                        key={indx}
                        className={`p-2 font-medium border border-gray-400 ${cellHeadResponsiveStyle}`}
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {quizzes?.length > 0 &&
                  quizzes?.map((student, indx) => {
                    const {
                      _id,
                      quizTitle,
                      timeLimit,
                      isActive,
                      totalMarks,
                      courseId,
                      dueDate,
                    } = student;

                    const dateClass =
                      new Date(dueDate) < new Date()
                        ? "text-red-700"
                        : "text-green-700";
                    return (
                      <tr
                        key={_id}
                        className="text-center hover:bg-gray-100 h-12"
                      >
                        <td className="p-2 border border-gray-300">
                          {indx + 1}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {quizTitle}
                        </td>

                        <td className="p-2 border border-gray-300 hidden sm:table-cell">
                          {courseId.courseName}
                        </td>

                        <td
                          className={`p-2 border ${dateClass} border-gray-300`}
                        >
                          {dueDate.split("T")[0]}
                        </td>
                        <td className="p-2 border  border-gray-300 hidden sm:table-cell">
                          {timeLimit}
                        </td>
                        <td className="p-2 border border-gray-300 hidden sm:table-cell">
                          {totalMarks}
                        </td>
                        <td
                          onClick={() => quizStatusHandle(_id, isActive)}
                          className={`p-2 border cursor-pointer border-gray-300 ${
                            isActive ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
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

export default Quizzes;

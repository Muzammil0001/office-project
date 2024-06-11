import { useEffect, useState } from "react";
import QuizReport from "./components/quiz-report";
import { getQuizByStdId } from "../../../apis/quizzes-apis";
import { useNavigate } from "react-router-dom";

const StudentQuizzes = () => {
  const navigation = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const studentId = JSON.parse(localStorage.getItem("user"))._id;
      try {
        const response = await getQuizByStdId(studentId);
        const validQuizzes = response.data.filter(
          (quiz) => new Date(quiz.dueDate) >= new Date() && quiz.isActive
        );
        setQuizzes(validQuizzes);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const startQuiz = (quizId) => {
    navigation(`/quiz/${quizId}`);
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-3xl font-bold font-nunito mb-10">
        Quizzes
      </h2>
      <div className="w-full flex flex-col items-center justify-center min-h-16">
        {quizzes && quizzes.length > 0 ? (
          quizzes?.map((quiz) => (
            <div
              key={quiz._id}
              className="w-full bg-white border border-gray-300 flex md:flex-row h-full flex-col items-center p-3 gap-5 mb-4"
            >
              <div className="w-full max-w-40 text-center p-2 font-bold text-nowrap">
                {quiz.quizTitle}
              </div>
              <div className="w-full flex sm:flex-row flex-col gap-5 sm:gap-[100px] p-2 justify-center md:justify-end items-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="font-medium text-nowrap">Due Date:</div>
                  <div className="text-base">
                    {new Date(quiz.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="font-medium">Duration:</div>
                  <div className="text-base text-nowrap">
                    {quiz.timeLimit} minutes
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => startQuiz(quiz._id)}
                    className="w-full mt-2 sm:mt-0 text-nowrap py-2 px-4 sm:py-3 sm:px-4 bg-gradient-to-tr from-blue-950 to-blue-700 text-white rounded-full"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-wrap text-sm font-nunito text-center w-full my-3 ">
            Currently there is no quiz available😊
          </p>
        )}
      </div>
      <QuizReport />
    </div>
  );
};

export default StudentQuizzes;

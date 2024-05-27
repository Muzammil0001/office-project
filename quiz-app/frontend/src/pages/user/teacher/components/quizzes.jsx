import QuizReport from "./quiz-report";

const Quizzes = () => {
  return (
    <>
      <div className="w-full mt-4">
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
         <button className="py-2 px-4 bg-blue-800 rounded-sm text-white">Create Quiz</button>
        </div>

        <QuizReport />
      </div>
    </>
  );
};

export default Quizzes;

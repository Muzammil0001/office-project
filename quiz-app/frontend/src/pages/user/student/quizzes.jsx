import QuizReport from "./components/quiz-report";

const Quizzes = () => {
  return (
    <>
      <div className="w-full">
        <h2 className="text-center text-3xl font-bold font-nunito mb-10">
          Quizzes
        </h2>
        <div className="w-full flex md:flex-row flex-col items-center justify-center min-h-16 ">
          <div className=" w-full bg-white border border-gray-300 flex md:flex-row h-full flex-col items-center p-3 gap-5">
            <div className=" w-full max-w-40 text-center  p-2 font-bold  text-nowrap">
              Quiz Name
            </div>
            <div className=" w-full flex sm:flex-row flex-col  gap-5 sm:gap-[100px] p-2 justify-center md:justify-end items-center ">
              <div className="flex items-center justify-center gap-2">
                <div className="font-medium text-nowrap">Due Date:</div>
                <div className="text-base">20/02/2024</div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="font-medium">Duration:</div>
                <div className="text-base text-nowrap">1 hour</div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button className="w-full mt-2 sm:mt-0 text-nowrap py-2 px-4 sm:py-3 sm:px-4  bg-gradient-to-tr from-blue-950 to-blue-700 text-white rounded-full">
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <QuizReport />
      </div>
    </>
  );
};

export default Quizzes;

const Participants = () => {
  return (
    <>
      <div className="mb-12 min-h-44 w-full flex flex-wrap gap-5 items-center justify-center p-2 sm:justify-evenly bg-blue-950 ">
        <div className="text-white min-w-32 flex flex-col gap-2 items-center justify-center">
          <h1 className="text-xl sm:text-4xl font-semibold sm:font-bold text-center">
            100+
          </h1>
          <p className="text-normal">Students</p>
        </div>
        <div className="text-white min-w-32 flex flex-col gap-2 items-center justify-center">
          <h1 className="text-xl sm:text-4xl font-semibold sm:font-bold text-center">
            100+
          </h1>
          <p className="text-lg">Courses</p>
        </div>
        <div className="text-white min-w-32 flex flex-col gap-2 items-center justify-center">
          <h1 className="text-xl sm:text-4xl font-semibold sm:font-bold text-center">
            10K+
          </h1>
          <p className="text-lg">Happy User</p>
        </div>
        <div className="text-white min-w-32 flex flex-col gap-2 items-center justify-center">
          <h1 className="text-xl sm:text-4xl font-semibold sm:font-bold text-center">
            500+
          </h1>
          <p className="text-lg">Quizzes Created</p>
        </div>
      </div>
    </>
  );
};

export default Participants;

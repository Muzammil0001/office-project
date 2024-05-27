import { headerImage } from "../config/constants/images";
import { ReactTyped } from "react-typed";

const StudentHeader = () => {
  return (
    <>
      <div className="relative z-0 h-full min-h-[90vh] w-full flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] md:order-1 order-2 flex flex-col justify-center ps-2 sm:ps-5 pb-5 sm:pb-10">
          <h1 className="m-2 lg:mb-3 lg:ms-10 flex-col flex gap-5">
            <span className="text-2xl md:text-5xl font-semibold text-black font-inter">
              Welcome to the
            </span>
            <span className="text-3xl md:text-6xl font-bold font-nunito text-blue-900">
              <ReactTyped
                strings={[" Quiz Revolution"]}
                typeSpeed={70}
                backSpeed={50}
                loop
              />
            </span>
          </h1>
          <p className="m-2 lg:my-3 lg:ms-10 text-blue-950 text-base sm:text-[18px] md:text-xl">
            Empowering students, teachers, and administrators with interactive
            quizzes, discussions, and analytics for a new era of learning.
          </p>
          <div className="ms-0 lg:ms-10">
            <a href="/singin">
              <button className="btn">Learn more</button>
            </a>
          </div>
        </div>

        <div className="md:w-[50%] w-full md:order-2 order-1">
          <img
            src={headerImage}
            alt="banner-img"
            className="w-full p-5 object-contain max-h-[500px] md:max-h-[800px] h-full"
          />
        </div>
      </div>
    </>
  );
};

export default StudentHeader;

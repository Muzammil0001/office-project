import { FaCrown } from "react-icons/fa";
import { IoTrophySharp } from "react-icons/io5";
import { FaAward } from "react-icons/fa6";
import StudentList from "./components/student-list";

const LeaderBoard = () => {
  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
        <div className="flex justify-center items-center pt-9">
          <FaCrown className=" animate-bounce text-yellow-500 text-9xl" />
        </div>
        <h1 className="text-center text-5xl font-bold font-nunito pb-10 mb-5">
          Leaderboard
        </h1>
        <h3 className="underline underline-offset-4 text-center text-3xl font-bold font-nunito pb-10">
          Our Positions
        </h3>
        <div className="  h-full min-h-[300px] flex flex-col sm:flex-row flex-wrap items-center sm:items-end justify-center gap-3 sm:gap-5 lg:gap-16">
          <div className="hover:mb-[10px] order-2 sm:order-1 duration-300 cursor-pointer flex flex-row sm:flex-col items-center md:rounded-tl-full md:rounded-tr-full h-full  lg:h-[260px] border-2 border-blue-950">
            <img
              className="md:rounded-full"
              src="https://picsum.photos/150/150"
              alt="winner_img"
            />
            <div className="flex flex-col items-center sm:py-2">
              <p className=" order-2 sm:order-1 px-5 pt-2 sm:pt-4 pb-2 text-center font-nunito font-bold text-lg w-full max-w-[150px] text-wrap">
                2nd Position
              </p>
              <FaAward className="text-2xl sm:text-3xl text-yellow-700 sm:order-2 order-1" />
            </div>
          </div>

          <div className="order-1 sm:order-2 flex flex-row sm:flex-col items-center md:rounded-tl-full md:rounded-tr-full border-2 border-blue-950 lg:min-h-[300px]">
            <img
              className="md:rounded-full"
              src="https://picsum.photos/150/150"
              alt="winner_img"
            />
            <div className="flex flex-col items-center sm:py-2">
              <p className="order-2 sm:order-1  px-5  pt-2 sm:pt-4 pb-2 text-center font-nunito font-bold text-xl w-full max-w-[150px] text-wrap">
                1st Position
              </p>
              <IoTrophySharp className="text-4xl z-0 sm:text-6xl text-yellow-500 sm:order-2 order-1" />
            </div>
          </div>

          <div className="order-3 hover:mb-[10px] duration-300 flex flex-row sm:flex-col items-center md:rounded-tl-full md:rounded-tr-full h-full lg:min-h-[260px] border-2 border-blue-950">
            <img
              className="md:rounded-full"
              src="https://picsum.photos/150/150"
              alt="winner_img"
            />
            <div className="flex flex-col items-center sm:py-2">
              <p className=" order-2 sm:order-1 px-5 pt-2 sm:pt-4 pb-2 text-center font-nunito font-bold text-lg w-full max-w-[150px] text-wrap">
                3rd Position
              </p>
              <FaAward className=" text-2xl sm:text-3xl text-slate-400 sm:order-2 order-1" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-center text-3xl font-bold font-nunito my-5 lg:my-10">
            Your Position
          </h2>
          <div className="flex items-center justify-center text-white max-w-[600px] h-12 text-center w-full bg-blue-950">
            <h1>Position</h1>
          </div>
        </div>
        <StudentList />
      </div>
    </>
  );
};

export default LeaderBoard;

import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ClassesList = () => {
  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
        <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
          <button className="py-2 px-4 bg-blue-800 rounded-sm text-white">
            Add Class
          </button>
        </div>
        <div className="flex flex-col items-center px-4 py-10">
          <h2 className="text-center text-3xl font-bold font-nunito mb-10">
            Classes
          </h2>
          <div className="w-full overflow-auto">
            <table className="min-w-[500px] w-full">
              <thead>
                <tr className="text-center bg-blue-950 text-white h-12">

                  <th className="p-2  font-medium border border-gray-400">
                   Batch
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Instructor
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Date
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {

                    batch: 1,
                    instructor: "Sufyan",
                    date: "22/02/2024",
                  },
                  {

                    batch: 2,
                    room:"10",
                    instructor: "Ahmad",
                    date: "22/02/2024",
                  },
                  {

                    batch: 3,
                    room:"10",
                    instructor: "Ali",
                    date: "22/02/2024",
                  },
                ].map((student,index) => {
                  const {  batch, instructor, date } = student;
                  return (
                    <tr key={index} className="text-center hover:bg-gray-100 h-12">
                      <td className="p-2 border border-gray-300">{batch}</td>

                      <td className="p-2 border border-gray-300">
                        {instructor}
                      </td>
                      <td className="p-2 border border-gray-300">{date}</td>
                      <td className="p-2 border border-gray-300 ">
                        <div className="flex gap-5 p-2 justify-center">
                          <FaEye className="size-5 cursor-pointer text-blue-500" />
                          <FaRegEdit className="size-5 cursor-pointer text-green-800" />
                          <RiDeleteBin6Line className="size-5 cursor-pointer  text-red-500" />
                        </div>
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

export default ClassesList;

import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TeachersList = () => {
  return (
    <>
      <div className="h-full min-h-[100vh] w-full">
      <div className="w-full flex md:flex-row flex-col items-center justify-end px-4">
         <button className="py-2 px-4 bg-blue-800 rounded-sm text-white">Add Teacher</button>
        </div>
        <div className="flex flex-col items-center px-4 py-10">
          <h2 className="text-center text-3xl font-bold font-nunito mb-10">
            Teachers
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
                    Phone
                  </th>
                  <th className="p-2  font-medium border border-gray-400">
                    Address
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
                    phone:923030303333,
                    address:"Lahore",
                    date: "22/02/2024",
                  },
                  {
                    id: 2,
                    name: "Ali",
                    phone:923030303333,
                    address:"Lahore",
                    date: "22/02/2024",
                  },
                  {
                    id: 3,
                    name: "Akbar",
                    phone:923030303333,
                    address:"Lahore",
                    date: "22/02/2024",
                  },
                ].map((student) => {
                  const { id, name, phone, address } = student;
                  return (
                    <tr key={id} className="text-center hover:bg-gray-100 h-12">
                      <td className="p-2 border border-gray-300">{id}</td>
                      <td className="p-2 border border-gray-300">{name}</td>
                      <td className="p-2 border border-gray-300">{phone}</td>

                      <td className="p-2 border border-gray-300">
                        {address}
                      </td>
                      <td className="p-2 border border-gray-300 ">
                        <div className="flex gap-5 p-2 justify-center">
                          <FaEye className="size-5 cursor-pointer text-blue-500" />
                          <FaRegEdit className="size-5 cursor-pointer text-green-800" />
                          <RiDeleteBin6Line className="size-5 cursor-pointer text-red-500" />
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

export default TeachersList;

import { useEffect, useState } from "react";
import AddStudyMaterial from "../user-components/add-study-material";
import {
  deleteStudyMaterial,
  getStudyMaterial,
} from "../../../apis/study-material-api";
import { FiDownload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
const TeacherStudyMaterial = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [studyMaterials, setStudyMaterials] = useState([]);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      const resp = await getStudyMaterial();
      setStudyMaterials(resp.data);
      console.log("resp SM", resp.data);
    };
    fetchStudyMaterials();
  }, []);

  const onClickDeleteHandle = async (id) => {
    if (id) {
      const isConfirmed = confirm("Confirm to delete this study material?");
      if (isConfirmed) {
        const resp = await deleteStudyMaterial(id);
        console.log(resp);
      }
    }
  };
  return (
    <>
      <div className="w-full">
        <AddStudyMaterial
          isOpenModal={isAddModalOpen}
          setToClose={setAddModalOpen}
        />
        <div className="w-full flex sm:flex-row flex-col items-end sm:items-center justify-end px-4">
          <button
            onClick={() => {
              setAddModalOpen(true);
            }}
            className="py-2 px-4 bg-gradient-to-tr from-blue-900 to-blue-500 rounded-sm text-white"
          >
            Add Material
          </button>
        </div>
        <div className="w-full mt-10">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="w-full bg-blue-900 text-white uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-center">Title</th>
                      <th className="py-3 px-6 text-center hidden sm:table-cell">
                        Description
                      </th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {studyMaterials.map((material) => {
                      const fileName = material.content.split("/").pop();
                      return (
                        <tr
                          key={material._id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-center whitespace-nowrap ">
                            <span className="font-medium">
                              {material.title}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center max-w-40 hidden sm:table-cell">
                            <span className="line-clamp-1">
                              {material.description}
                            </span>
                          </td>
                          <td className="py-3 px-6 flex justify-center items-center gap-3">
                            <FaEye className="text-gray-600 hover:text-blue-700 text-lg" />

                            <FaEdit className="text-gray-600 hover:text-green-700 text-lg" />
                            <MdDelete
                              onClick={() => {
                                onClickDeleteHandle(material._id);
                              }}
                              className="text-gray-600 hover:text-red-700 text-lg"
                            />
                            <a href={material.content} download={fileName}>
                              <FiDownload className="text-gray-600 hover:text-blue-700 text-lg" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherStudyMaterial;

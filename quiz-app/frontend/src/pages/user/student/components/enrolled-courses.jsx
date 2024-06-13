import { useEffect, useState } from "react";
import { getEnrolledCourses } from "../../../../apis/enrolled-courses";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  useEffect(() => {
    const StudentId = JSON.parse(localStorage.getItem("user"))._id;
    const EnrolledCourses = async () => {
      const response = await getEnrolledCourses(StudentId);
      setEnrolledCourses(response.data);
      console.log("Enrolled Courses:", response?.data);
    };
    EnrolledCourses();
  }, []);
  return (
    <>
      <div className="w-full">
        <h1 className="text-center text-lg sm:text-2xl w-full font-semibold font-nunito mt-3 mb-5 ">
          Enrolled Courses
        </h1>
        <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
          {enrolledCourses && enrolledCourses.length > 0 ? (
            enrolledCourses.map((course, idx) => {
              const { courseId } = course;
              const courseImage = `http://localhost:5000/${courseId.courseImage.replace(
                "../",
                ""
              )}`;
              return (
                <div
                  key={idx}
                  className="hover:mt-[-5px] duration-300 cursor-pointer w-[300px] h-[350px] shadow-md shadow-gray-300 bg-white rounded-[20px]"
                >
                  <div>
                    <img
                      className="h-[200px] w-[300px] object-fit rounded-tl-[20px] rounded-tr-[20px]"
                      src={courseImage}
                      alt={courseImage}
                    />
                  </div>
                  <div className="px-5 py-3">
                    <h3 className="heading3">{courseId.courseName}</h3>
                    <p className="text-center py-2 line-clamp-1">
                      {courseId.description}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <p
                      className={`capitalize py-2 rounded-full w-3/4 text-center  shadow-md font-semibold ${
                        course.courseStatus == "pending"
                          ? "text-white  bg-red-500"
                          : "bg-green-500 "
                      }`}
                    >
                      {course.courseStatus}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-wrap text-sm font-nunito text-center w-full my-3 ">
              Currently you are not enrolled in any course please enrolled😊
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrolledCourses;

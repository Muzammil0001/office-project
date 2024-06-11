import { useEffect, useState } from "react";
import { courseImage5 } from "../../../config/constants/images";
import { getCoursesApi } from "../../../apis/course-apis";
import { REACT_API_URL } from "../../../../config";

const TeacherCourses = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const teacherCourseId = JSON.parse(localStorage.getItem("user")).courseId;

    const getCourseFunc = async () => {
      try {
        const response = await getCoursesApi();
        const teacherCourses = response?.filter(
          (course) => course._id === teacherCourseId
        );
        setCourses(teacherCourses);
        console.log("teacherCourses", teacherCourses);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    getCourseFunc();
  }, []);

  return (
    <>
      <div>
        {courses?.map((course, indx) => {
          return (
            <div
              key={indx}
              className="hover:mt-[-5px] duration-300 cursor-pointer w-[300px] h-[400px] shadow-md shadow-gray-300 bg-white rounded-[20px]"
            >
              <div>
                <img
                  className="h-[200px] w-[300px] object-fit rounded-tl-[20px] rounded-tr-[20px]"
                  src={`${REACT_API_URL}/${course.courseImage}`}
                  alt={`${REACT_API_URL}/${course.courseImage}`}
                />  
              </div>
              <div className="px-5 py-3">
                <h3 className="heading3">{course.courseName}</h3>
                <p className="text-center py-2 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex justify-center">
                  {" "}
                  <button className="btn">Read more</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeacherCourses;

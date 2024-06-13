import { useEffect, useState } from "react";
import { courseImage5 } from "../../../config/constants/images";
import { getCoursesApi } from "../../../apis/course-apis";
import { REACT_API_URL } from "../../../../config";

const TeacherCourses = () => {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const teacherCourseIds = JSON.parse(localStorage.getItem("user")).courseId;

    const getCourseFunc = async () => {
      try {
        const response = await getCoursesApi();
        const teacherCourses = response.filter((course) =>
          teacherCourseIds.includes(course._id)
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
    <div className="w-full mt-5">
    <h1 className="text-2xl font-semibold  text-center mb-5">Your Courses</h1>
       <div className="flex items-center flex-wrap gap-5 justify-center lg:justify-start">

        {courses?.map((course, indx) => {
          const courseImage = `${REACT_API_URL}/${course.courseImage}`;
          return (
            <div
              key={indx}
              className="hover:mt-[-5px] duration-300 cursor-pointer w-[300px] h-[400px] shadow-md shadow-gray-300 bg-white rounded-[20px]"
            >
              <div>
                <img
                  className="h-[200px] w-[300px] object-fit rounded-tl-[20px] rounded-tr-[20px]"
                  src={courseImage}
                  alt={courseImage}
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
    </div>

    </>
  );
};

export default TeacherCourses;

import { useEffect, useState } from "react";
import {
  createEnrollment,
  getEnrolledCourses,
} from "../../../../apis/enrolled-courses";
import { getCoursesApi } from "../../../../apis/course-apis";
import { updateUserApi } from "../../../../apis/user-api";

const AvailableCourses = () => {
  const [avaiableCourses, setAvailableCourses] = useState(null);

  useEffect(() => {
    const studentId = JSON.parse(localStorage.getItem("user"))._id;

    const fetchCourses = async () => {
      try {
        const allCourses = await getCoursesApi();
        const enrolledCoursesResponse = await getEnrolledCourses(studentId);

        const enrolledCourses = enrolledCoursesResponse.data.map(
          (enrollment) => enrollment.courseId._id
        );

        const notEnrolledCourses = allCourses.filter(
          (course) => !enrolledCourses.includes(course._id)
        );

        setAvailableCourses(notEnrolledCourses);
        console.log("Available Courses:", notEnrolledCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const onClickHandle = async (courseId) => {
    const studentId = JSON.parse(localStorage.getItem("user"))._id;

    const stdCoursesResp = await getEnrolledCourses(studentId);
    const isPendingCourse = stdCoursesResp.data.some(
      (course) => course.courseStatus === "pending"
    );

    if (isPendingCourse) {
      alert("Please complete pending course before enrolling in a new course.");
    } else {
      const enrolledResponse = await createEnrollment({ courseId, studentId });

      console.log("enrolledResponse:", enrolledResponse);
    }
  };
  return (
    <>
      <div>
        <h1 className="text-center text-lg sm:text-2xl w-full font-semibold font-nunito my-10 mb-5 ">
          Available Courses
        </h1>

        <div className="flex items-center justify-center md:justify-start gap-5 flex-wrap">
          {avaiableCourses ? (
            avaiableCourses.map((course, idx) => {
              const { _id, courseImage, courseName, description } = course;
              const courseImg = `http://localhost:5000/${courseImage.replace(
                "../",
                ""
              )}`;
              return (
                <div
                  key={idx}
                  className="hover:mt-[-5px] duration-300 cursor-pointer w-[300px] h-[400px] shadow-md shadow-gray-300 bg-white rounded-[20px]"
                >
                  <div>
                    <img
                      className="h-[200px] w-[300px] object-fit rounded-tl-[20px] rounded-tr-[20px]"
                      src={courseImg}
                      alt={courseImg}
                    />
                  </div>
                  <div className="px-5 py-3">
                    <h3 className="heading3">{courseName}</h3>
                    <p className="text-center py-2 line-clamp-1">
                      {description}
                    </p>

                    <div className="flex justify-center">
                      {" "}
                      <button
                        className="btn"
                        onClick={() => onClickHandle(_id)}
                      >
                        Enrolled Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className=" text-sm font-nunito text-center w-full my-3 text-wrap ">
              Currently No course available here due to some server issues.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableCourses;

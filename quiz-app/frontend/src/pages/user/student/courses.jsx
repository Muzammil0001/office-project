import AvailableCourses from "./components/available-courses";
import EnrolledCourses from "./components/enrolled-courses";


const Courses = () => {
  return (
    <>
      <div className="w-full h-[max-content]">
      <EnrolledCourses/>
      <AvailableCourses/>
      </div>
    </>
  );
};

export default Courses;

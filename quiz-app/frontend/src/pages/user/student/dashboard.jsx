import React, { useEffect, useState } from "react";
import CountCard from "../user-components/count-cards";
import HighchartsContainer from "../user-components/charts";
import { countUserByIRole } from "../../../apis/user-api";
import { countCourse } from "../../../apis/course-apis";

const StudentDashboard = () => {
  const [dataCount, setDataCount] = useState([]);
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "My Score",
    },
    series: [
      {
        name: "Score",
        data: [1, 1, 3, 4, 4, 8, 2, 4],
      },
    ],
  };

  useEffect(() => {
    const countUsersFunc = async () => {
      const fetchedTeacherCounts = await countUserByIRole("teacher");
      const fetchedStudentCounts = await countUserByIRole("student");
      const fetchedCourseCounts = await countCourse();
      setDataCount([
        fetchedTeacherCounts,
        fetchedStudentCounts,
        fetchedCourseCounts,
      ]);
    };
    countUsersFunc();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="flex justify-center gap-5 items-center flex-wrap mb-5 px-4">
        {[
          { id: 1, title: "Rank", count: 12 },
          { id: 2, title: "No. Courses", count: 12 },
          { id: 3, title: "Attempted Quiz", count: 12 },
          { id: 4, title: "Notification", count: 12 },
        ].map((item) => (
          <CountCard key={item.id} title={item.title} count={item.count} />
        ))}
      </div>
      <div className="flex sm:flex-row flex-col justify-center items-center flex-wrap p-0 sm:p-5 gap-5 mb-5">
        <HighchartsContainer options={options} />
        <HighchartsContainer options={options} />
      </div>
    </div>
  );
};

export default StudentDashboard;

import React, { useState } from "react";
import {
  MdDashboard,
  MdSettings,
  MdNotifications,
  MdMenu,
} from "react-icons/md";
import { PiTrophyFill } from "react-icons/pi";
import { IoBook, IoDocumentText, IoChatboxEllipses } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar";
import StudentDashboard from "./dashboard";

const StudentMain = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const currentPath = location.pathname;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      icon: <MdDashboard className="size-5" />,
      label: "Dashboard",
      path: "/students/dashboard",
    },
    {
      icon: <PiTrophyFill className="size-5" />,
      label: "Leaderboard & Progress",
      path: "/students/leaderboard",
    },
    {
      icon: <IoBook className="size-5" />,
      label: "Courses",
      path: "/students/courses",
    },
    {
      icon: <IoDocumentText className="size-5" />,
      label: "Quiz",
      path: "/students/quizzes",
    },
    {
      icon: <ImBooks className="size-5" />,
      label: "Study Material",
      path: "/students/study-material",
    },
    {
      icon: <IoChatboxEllipses className="size-5" />,
      label: "Chat",
      path: "/students/chat",
    },
    {
      icon: <MdNotifications className="size-5" />,
      label: "Notifications",
      path: "/students/notifications",
    },
    {
      icon: <MdSettings className="size-5" />,
      label: "Settings",
      path: "/students/profile",
    },
  ];

  const onClickHandle = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigation("/signin");
  };

  return (
    <div className="bg-gray-100 h-full min-h-[100vh] w-full">
      <Sidebar
        menuItems={menuItems}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <nav className="w-full bg-white shadow py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <MdMenu size="24" />
            </button>
          </div>
          <button
            onClick={onClickHandle}
            className="cursor-pointer text-black font-normal py-2 px-4 rounded"
          >
            Logout
          </button>
        </nav>
        <main className="flex p-4 ms-0 lg:ml-64">
          {currentPath == "/students/" || currentPath == "/students" ? (
            <StudentDashboard />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentMain;

import React, { useState } from "react";
import {
  MdDashboard,
  MdSettings,
  MdNotifications,
  MdMenu,
} from "react-icons/md";
import { IoBook, IoDocumentText, IoChatboxEllipses } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { BsGraphUpArrow } from "react-icons/bs";
import Sidebar from "../../../components/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TeacherDashboard from "./dashboard";

const TeacherMain = () => {
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
      path: "/teacher/dashboard",
    },
    {
      icon: <BsGraphUpArrow className="size-5" />,
      label: "Student Performance",
      path: "/teacher/performance",
    },
    {
      icon: <IoBook className="size-5" />,
      label: "Courses",
      path: "/teacher/courses",
    },
    {
      icon: <IoDocumentText className="size-5" />,
      label: "Quizzes",
      path: "/teacher/quizzes",
    },
    {
      icon: <ImBooks className="size-5" />,
      label: "Study Material",
      path: "/teacher/study-material",
    },
    {
      icon: <IoChatboxEllipses className="size-5" />,
      label: "Chat",
      path: "/teacher/chat",
    },
    {
      icon: <MdNotifications className="size-5" />,
      label: "Notifications",
      path: "/teacher/notifications",
    },
    {
      icon: <MdSettings className="size-5" />,
      label: "Settings",
      path: "/teacher/profile",
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
          {currentPath == "/teacher/" || currentPath == "/teacher" ? (
            <TeacherDashboard />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherMain;

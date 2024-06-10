import React, { useState } from "react";
import {
  MdDashboard,
  MdSettings,
  MdAnnouncement,
  MdMenu,
} from "react-icons/md";
import { IoBook, IoDocumentText } from "react-icons/io5";
import { FaUser, FaUserGraduate } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar";
import Dashboard from "./dashboard";

const AdminDashboard = () => {
  const location = useLocation();
  const navigation=useNavigate();
  const currentPath = location.pathname;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      icon: <MdDashboard className="size-5" />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <FaUser className="size-5" />,
      label: "Teachers",
      path: "/admin/teachers",
    },
    {
      icon: <FaUserGraduate className="size-5" />,
      label: "Students",
      path: "/admin/students",
    },
    {
      icon: <IoBook className="size-5" />,
      label: "Courses",
      path: "/admin/courses",
    },
    {
      icon: <IoDocumentText className="size-5" />,
      label: "Quizzes",
      path: "/admin/quizzes",
    },
    {
      icon: <MdAnnouncement className="size-5" />,
      label: "Announcement",
      path: "/admin/announcements",
    },
    {
      icon: <MdSettings className="size-5" />,
      label: "Settings",
      path: "/admin/profile",
    },
  ];

 const onClickHandle =()=>{
localStorage.removeItem("user");
localStorage.removeItem("token");
navigation("/signin")
 }
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
          <button onClick={onClickHandle} className="cursor-pointer text-black font-normal py-2 px-4 rounded">
            Logout
          </button>
        </nav>
        <main className="flex p-4 ms-0 lg:ml-64">
          {currentPath == "/admin/" || currentPath == "/admin" ? (
            <StudentDashboard />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

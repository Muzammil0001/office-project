import React, { useState } from "react";
import { courseImage5 } from "../../../config/constants/images";
import {
  MdDashboard,
  MdSettings,
  MdNotifications,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { PiTrophyFill } from "react-icons/pi";
import { IoBook, IoDocumentText, IoChatboxEllipses } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import Dashboard from "./components/dashboard";
import Quizzes from "./components/quizzes";
import StudyMaterial from "./components/study-material";
import LeaderBoard from "./components/leaderboard";
import Chat from "./components/chat";
import Courses from "./components/courses";
import Notify from "./components/notification";
import StudentProfileSetting from "./components/setting";

const StudentDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const onClickMenuHandle = (componentName) => {
    setActiveComponent(componentName);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      icon: <MdDashboard className="size-5" />,
      label: "Dashboard",
      component: "dashboard",
    },
    {
      icon: <PiTrophyFill className="size-5" />,
      label: "Leaderboard & Progress",
      component: "leaderboard",
    },
    {
      icon: <IoBook className="size-5" />,
      label: "Courses",
      component: "courses",
    },
    {
      icon: <IoDocumentText className="size-5" />,
      label: "Quiz",
      component: "quiz",
    },
    {
      icon: <ImBooks className="size-5" />,
      label: "Study Material",
      component: "studyMaterial",
    },
    {
      icon: <IoChatboxEllipses className="size-5" />,
      label: "Chat",
      component: "chat",
    },
    {
      icon: <MdNotifications className="size-5" />,
      label: "Notifications",
      component: "notify",
    },
    {
      icon: <MdSettings className="size-5" />,
      label: "Settings",
      component: "setting",
    },
  ];
  return (
    <div className="bg-gray-100 h-full min-h-[100vh] w-full">
      <div
        className={`bg-white w-64 p-5 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <MdClose
            className="lg:hidden cursor-pointer"
            size="24"
            onClick={toggleSidebar}
          />
        </div>
        <div className="mt-4">
          <div className="mb-5 flex flex-col justify-center items-center">
            <img
              className="rounded-full size-14 lg:size-20"
              src={courseImage5}
              alt="profile"
            />
            <div className="mt-2 text-center">
              <p className="text-lg font-medium text-gray-700">M. Ahmad</p>
              <div className="w-32 h-8 py-1 px-3 bg-gray-700 text-white rounded-full flex justify-center items-center">
                Student
              </div>
            </div>
          </div>
          <div>
            {/* Generate menu items with icons */}
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="listStyle cursor-pointer"
                onClick={() => onClickMenuHandle(item.component)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </li>
            ))}
          </div>
        </div>
      </div>

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
          <button className="cursor-pointer text-black font-normal py-2 px-4 rounded">
            Logout
          </button>
        </nav>
        <main className="flex p-4 ms-0 lg:ml-64">
          {activeComponent === "dashboard" && <Dashboard />}
          {activeComponent === "quiz" && <Quizzes />}
          {activeComponent === "studyMaterial" && <StudyMaterial />}
          {activeComponent === "leaderboard" && <LeaderBoard />}
          {activeComponent === "chat" && <Chat />}
          {activeComponent === "courses" && <Courses />}
          {activeComponent === "notify" && <Notify />}
          {activeComponent === "setting" && <StudentProfileSetting />}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
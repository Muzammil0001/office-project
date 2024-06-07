import React from "react";
import { userPng } from "../config/constants/images";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({ menuItems, isSidebarOpen, toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { username, role, email, userAvatar } = user;
  return (
    <>
      <div
        className={`bg-white w-64 p-5 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          <MdClose
            className="lg:hidden cursor-pointer"
            size="24"
            onClick={() => {
              toggleSidebar();
            }}
          />
        </div>
        <div className="mt-4">
          <div className="mb-5 flex flex-col justify-center items-center">
            <img
              className="rounded-full w-14 lg:w-20"
              src={userAvatar || userPng}
              alt="profile"
            />
            <div className="mt-2 text-center">
              <p className="text-lg font-medium text-gray-700">{username}</p>
              <div className="w-32 h-8 py-1 px-3 bg-gray-700 text-white rounded-full flex justify-center items-center">
                {role}
              </div>
            </div>
          </div>
          <div>
            {menuItems?.map((item, index) => (
              <Link to={item.path} key={index}>
                <li className="listStyle cursor-pointer">
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </li>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

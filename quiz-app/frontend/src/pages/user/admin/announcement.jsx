import React, { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { getUserByIRole } from "../../../apis/user-api";
import {
  deleteAnnouncement,
  getAnnouncements,
  postAnnouncement,
} from "../../../apis/announcement-api";

const Chat = () => {
  const [announcement, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("all");
  const chatEndRef = useRef(null);

  const deleteAnnouncementHandle = async (id) => {
    const deleted = announcement?.filter((item) => item._id != id);
    setAnnouncements(deleted);
    console.log("id:", id);
    await deleteAnnouncement(id);
  };
  const sendMessage = async () => {
    try {
      if (role === "all") {
        const getTeacher = await getUserByIRole("teacher");
        const getStudent = await getUserByIRole("student");

        const allUsers = [...getTeacher, ...getStudent];
        const allUserIds = allUsers.map((user) => user._id);
        const announcement = {
          title,
          description,
          audience: allUserIds,
          targetUser: role,
        };
        const response = await postAnnouncement(announcement);
        console.log("Announcement response:", response);
      } else {
        const getUsers = await getUserByIRole(role);
        const UserIds = getUsers.map((user) => user._id);
        const announcement = {
          title,
          description,
          audience: UserIds,
          targetUser: role,
        };
        await postAnnouncement(announcement);
      }
    } catch (error) {
      console.error("Failed to create announcement", error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [announcement]);

  useEffect(() => {
    const getAnnouncementsFunc = async () => {
      const response = await getAnnouncements();
      setAnnouncements(response.data);
    };
    getAnnouncementsFunc();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-4 min-h-[80vh]">
        <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Create Announcement
          </h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audience
            </label>
            <select
              className="border border-gray-300 rounded p-2 w-full sm:w-auto"
              value={role}
              required
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="all">Both</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="border border-gray-300 rounded p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value.trim())}
              placeholder="Enter the title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              type="text"
              required
              className="border border-gray-300 rounded p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the description"
            />
          </div>

          <div className="mb-4 flex justify-end">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>

          <div
            className="h-80 overflow-y-auto mb-4 p-3 bg-gray-50 rounded"
            style={{ position: "relative" }}
          >
            {announcement.map((msg) => (
              <div key={msg._id} className="bg-white p-3 rounded mb-2 shadow">
                <div className="flex justify-end items-center gap-2">
                  <RxCross2
                    onClick={() => {
                      deleteAnnouncementHandle(msg._id);
                    }}
                    className="text-red-600 size-4 sm:size-5"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-600">
                    Time:
                    {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="text-xs text-blue-500">To: {msg.targetUser}</p>
                </div>
                <p className="font-semibold text-wrap">{msg.title}</p>
                <p className="italic text-wrap text-gray-600 font-normal text-sm">
                  {msg.description}
                </p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

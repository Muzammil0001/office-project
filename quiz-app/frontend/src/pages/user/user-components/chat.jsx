import React, { useState, useEffect, useRef } from "react";
import { getChats, postChat } from "../../../apis/discussion-api";
import { getAllEnrollments } from "../../../apis/enrolled-courses";
import { getUserByIRole } from "../../../apis/user-api";

const UserChat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user?._id;
  const senderRole = user?.role;
  const senderCourses = user?.courseId;
  console.log("SenderId", senderId);
  console.log("SenderRole", senderRole);

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [receiverId, setReceiverId] = useState([]);

  const chatEndRef = useRef(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      try {
        const data = {
          message: message,
          senderId,
          receiverId,
        };

        console.log("Chat created", data);
        await postChat(data);
        setMessage("");
        CallApis();
      } catch (error) {
        console.log("Failed to create Chat", error);
      }
    }
  };

  const sendHandle = async () => {
    try {
      const data = {
        message: message,
        senderId,
        receiverId,
      };

      console.log("Chat created", data);
      await postChat(data);
      setMessage("");
      CallApis();
    } catch (error) {
      console.log("Failed to create Chat", error);
    }
  };

  const CallApis = async () => {
    try {
      const enrolledResp = await getAllEnrollments();
      const teachersResp = await getUserByIRole("teacher");

      if (senderRole == "teacher") {
        const teachers = teachersResp?.filter((teacher) =>
          teacher.courseId.some((course) => senderCourses.includes(course._id))
        );
        const teacherIds = teachers?.map((teacher) => teacher._id);
        console.log("teacherIds", teacherIds);
        const classFellows = enrolledResp?.data.filter(
          (std) => senderCourses.includes(std.courseId._id) || []
        );
        const classFellowsIds =
          classFellows.map((stdId) => stdId.studentId._id) || [];

        const receiverId = [...teacherIds, ...classFellowsIds];
        setReceiverId(receiverId);
      }
      if (senderRole === "student") {
        console.log(" enrolledResp:", enrolledResp.data);
        const StdCourses = enrolledResp?.data.filter(
          (enrollment) => enrollment.studentId._id == senderId
        );
        console.log("StdCourses", StdCourses);

        const studentCourseIds = StdCourses.map(
          (enrollment) => enrollment.courseId._id
        );
        console.log("Student Course IDs", studentCourseIds);

        const classFellows = enrolledResp?.data.filter((enrollment) =>
          studentCourseIds.includes(enrollment.courseId._id)
        );
        const classFellowsIds = classFellows.map(
          (enrollment) => enrollment.studentId._id
        );
        console.log("Class Fellows IDs", classFellowsIds);

        const teachers = teachersResp?.filter((teacher) =>
          teacher.courseId.some((course) =>
            studentCourseIds.includes(course._id)
          )
        );
        const teacherIds = teachers.map((teacher) => teacher._id);
        console.log("Teacher IDs", teacherIds);
        const receiverIds = [...teacherIds, ...classFellowsIds];
        setReceiverId(receiverIds);
      }

      const chatResp = await getChats();
      // console.log("chatResp", chatResp);
      if (chatResp.status === 200) {
        const filteredChats = chatResp.data.filter(
          (chat) =>
            chat.senderId._id === senderId ||
            chat.receiverId.some((id) => id._id === senderId)
        );

        if (filteredChats.length > 0) {
          setChatHistory(filteredChats);
        } else {
          setChatHistory([]);
        }
      }
    } catch (error) {
      console.log("Failed to fetch chats", error);
    }
  };

  useEffect(() => {
    CallApis();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-4 min-h-[80vh]">
        <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg p-2 sm:p-6">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">Chat</h1>

          <div
            className="h-80 overflow-y-auto mb-4 p-3 bg-gray-50 rounded"
            style={{ position: "relative" }}
          >
            {chatHistory?.map((msg) => {
              const { _id, message, senderId, updatedAt } = msg;
              const date = updatedAt.split("T")[0];
              const time = updatedAt.split("T")[1].split(".")[0];
              return (
                <div key={_id} className="bg-white p-3 rounded mb-2 shadow">
                  <div className=" flex justify-between items-center">
                    <p className="text-sm text-blue-500 capitalize">
                      From: {senderId.role}
                    </p>
                    <p className="text-sm text-gray-600">{`${date} ${time}`}</p>
                  </div>
                  <p className="pt-2">{message}</p>
                </div>
              );
            })}

            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2 sm:flex-row flex-col">
            <textarea
              className="w-full flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Type your message here..."
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className="w-full sm:w-40 px-6 py-3 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={sendHandle}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChat;

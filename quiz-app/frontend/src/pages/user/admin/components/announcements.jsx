import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const chatEndRef = useRef(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);


  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
      setMessage("");
    }
  };


  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  // Send message when Enter is pressed without Shift key
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center  bg-gray-100 p-4 min-h-[80vh]">
        <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg p-2 sm:p-6">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Announcements
          </h1>

          <div
            className="h-80 overflow-y-auto mb-4 p-3 bg-gray-50 rounded"
            style={{ position: "relative" }}
          >
            {chatHistory.map((msg) => (
              <div key={msg.id} className="bg-white p-3 rounded mb-2 shadow">
                <p className="text-sm text-gray-600">{msg.time}</p>
                <p>{msg.text}</p>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>
          {/* Input area */}
          <div className="flex gap-2 sm:flex-row flex-col">
            <textarea
              className="w-full  flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Type your message here..."
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className="w-full sm:w-40 px-6 py-3 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

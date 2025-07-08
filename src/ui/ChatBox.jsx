import React, { useState, useEffect, useRef } from "react";

export default function ChatBox({ selectedGroup }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "admin",
        name: "Cô Lan",
        avatar: "https://i.pravatar.cc/150?img=47",
        text: "Chào các em học sinh! Ban nề nếp luôn sẵn sàng hỗ trợ các em.",
      },
    ]);
  }, [selectedGroup]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      name: "Nguyễn Văn A – 10A1",
      avatar: "https://i.pravatar.cc/150?img=68",
      text: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const colorMap = {
    1: "bg-blue-500",
    2: "bg-red-500",
    3: "bg-green-500",
    4: "bg-purple-500",
  };

  return (
    <div className="w-1/2 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-2">
          {selectedGroup.icon} {selectedGroup.name}
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg h-110 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex  items-end gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "admin" && (
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-10 h-10 rounded-full "
                />
              )}

              <div className="max-w-[70%]">
                <p className="text-sm text-gray-600 font-semibold">
                  {msg.name}
                </p>
                <div
                  className={`p-2 text-white rounded-2xl text-start px-4 ${
                    msg.sender === "user"
                      ? `${colorMap[selectedGroup.id]} rounded-br-none`
                      : "bg-gray-500 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {msg.sender === "user" && (
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

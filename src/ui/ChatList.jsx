import React from "react";

export default function ChatList({ chatGroups, onSelect, selectedId }) {
  return (
    <div className="w-1/2 p-4 border-r border-gray-300 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Nhóm Trò Chuyện</h2>
      {chatGroups.map((group) => (
        <div
          key={group.id}
          onClick={() => onSelect(group)}
          className={`p-2 mb-2 rounded-lg cursor-pointer shadow ${
            selectedId === group.id ? "bg-blue-100" : "bg-white"
          } hover:bg-blue-50`}
        >
          <div className="text-2xl">{group.icon}</div>
          <h3 className="font-semibold">{group.name}</h3>
          <p className="text-sm text-gray-500">{group.description}</p>
          <span className="text-xs text-gray-400">
            {group.members} thành viên
          </span>
        </div>
      ))}
    </div>
  );
}

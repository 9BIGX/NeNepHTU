import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

const ContactBlock = ({ title, icon, contacts, color }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (value, index) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6">
      <h2 className={`font-semibold mb-3 flex items-center ${color}`}>
        <span className="mr-2 text-4xl">{icon}</span> {title}
      </h2>
      <ul className="space-y-3 text-lg">
        {contacts.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">{item.icon}</span> {item.label}
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span>{item.value}</span>
              {item.copy && (
                <button
                  onClick={() => handleCopy(item.value, index)}
                  className="hover:text-purple-600 transition"
                  title="Sao chép"
                >
                  {copiedIndex === index ? <FaCheck /> : <FaCopy />}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactBlock;

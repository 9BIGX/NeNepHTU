import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import từ react-icons

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        {isOpen ? (
          <FaChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <FaChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 text-start border-t border-t-gray-500 pt-2">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
import React from 'react';
import { FaCopyright, FaEnvelope, FaGithub, FaPhoneAlt, FaUserShield } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-100 text-black py-6 px-4 rounded-2xl shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <FaCopyright className="text-purple-400" />
          <span>2025 Nề Nếp System - All rights reserved</span>
        </div>

        <div className="text-sm flex items-center gap-10">
          <div className="flex items-center gap-3">
            <FaUserShield className="text-green-400 text-lg" />
            <span><strong> Sittixay CHOUNLAMANY</strong></span>
          </div>
          <a href="mailto:support@nenep.edu.vn" className="hover:text-purple-300 flex items-center gap-1">
            <FaEnvelope /> Email
          </a>
          <a href="tel:+84987654321" className="hover:text-purple-300 flex items-center gap-1">
            <FaPhoneAlt /> Gọi
          </a>
          <a href="https://github.com/yourprojectlink" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 flex items-center gap-1">
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

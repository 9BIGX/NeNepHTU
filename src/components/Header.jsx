import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { CiSun } from "react-icons/ci";
import Logo from '../assets/Logo.webp';

export default function Header(props) {
  const { isOpen, toggleSideBar, namePage, Theme } = props;
  const [Avartar, setAvartar] = useState('avatars/user.jpg');
  const [Name, setName] = useState("Nguyễn Thị Thuỳ Linh");
  const [Email, setEmail] = useState("ThuyLinh07@gmail.com");
  const [Role, setRole] = useState(0);
  return (
    <header className="w-full shadow-sm bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span onClick={toggleSideBar} className="cursor-pointer">
          {isOpen ? (
            <MdCancel className="text-2xl" />
          ) : (
            <GiHamburgerMenu className="text-2xl" />)}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{namePage}</h1>
        </div>

        <div className="flex text-center space-x-2 text-sm text-gray-700 items-center">
          {Theme === "light" ? (
            <CiSun className="text-2xl cursor-pointer" />
          ) : (
            <BsFillMoonStarsFill className="text-2xl cursor-pointer" />
          )}
          <UserMenu Avartar={Avartar} Name={Name} Email={Email} Role={Role} />
        </div>
      </div>
    </header>
  );
}
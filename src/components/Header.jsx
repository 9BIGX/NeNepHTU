import { BsFillMoonStarsFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { CiSun } from "react-icons/ci";

export default function Header({ Theme, isOpen, toggleSideBar , namePage }) {
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

        {/* Auth buttons */}
        <div className="flex space-x-4 text-sm text-gray-700 ">
          <span>
            {Theme === "light" ? (
              <CiSun className="text-2xl" />
            ) : (
              <BsFillMoonStarsFill className="text-2xl" />
            )}
          </span>
          <a href="#" className="hover:text-black">Đăng ký</a>
        </div>
      </div>
    </header>
  );
}
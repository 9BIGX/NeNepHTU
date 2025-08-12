import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { CiSun } from "react-icons/ci";
import Logo from '../assets/Logo.webp';
import { Navigate, replace } from "react-router-dom";
import SessionExpiredModal from './SessionExpired';
import { useNavigate } from 'react-router-dom';
import LoadingPopUp from "../ui/Loading";
export default function Header(props) {
  const { isOpen, toggleSideBar, namePage, Theme } = props;
  const [Avartar, setAvartar] = useState('/avatars/user.jpg');
  const [Name, setName] = useState();
  const [Email, setEmail] = useState("Chưa có Email");
  const [Role, setRole] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // ตัวแปรโหลด
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_API_URL;
  const fetchData = async () => {
    try {
      const res = await fetch(ApiUrl + '/api/GetHeader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (res.status === 401) {

        setShowModal(true);

        return;
      }

      const result = await res.json();
      setName(result)
    } catch (error) {
      console.error(error)
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate('/Login');
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <header className="w-full sticky top-0 z-50 bg-blue-500 text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <span onClick={toggleSideBar} className="cursor-pointer">
          <GiHamburgerMenu className="text-2xl text-white " />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-white">{namePage}</h1>
        </div>

        <div className="flex text-center space-x-2 text-sm text-white items-center">
          {Theme === "light" ? (
            <CiSun className="text-2xl cursor-pointer " />
          ) : (
            <BsFillMoonStarsFill className="text-2xl cursor-pointer" />
          )}
          <UserMenu Avartar={Avartar} Name={Name} Email={Email} Role={Role} />
        </div>
        {showModal && <SessionExpiredModal onConfirm={handleConfirm} />}
      </div>
    </header>
  );
}
import { useState, useRef, useEffect } from "react";
import { FaUserEdit, FaSignOutAlt , FaChalkboardTeacher  } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiStudentBold, PiStudentFill } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";


export default function UserMenu(props) {
	const { Avartar, Name, Email , Role } = props
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);
	const ArrayRole = [
		<MdAdminPanelSettings className="text-2xl text-gray-600 mr-1" title="Quản trị viên" />,
		<FaChalkboardTeacher className="text-2xl text-gray-600 mr-1" title="Giáo viên" />, 
		<PiStudentBold className="text-2xl text-gray-600 mr-1" title="Học sinh" />,
	];

	// Close dropdown if clicked outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={menuRef}>
			<button onClick={() => setOpen(!open)} className="flex items-center gap-2">
				<img
					src={Avartar}
					alt="Avatar"
					className="w-10 h-10 rounded-full border-2 border-white shadow object-cover"
				/>
				<span className="font-medium text-gray-800 cursor-pointer">{Name}</span>
			</button>

			{open && (
				<div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
					<div className="flex px-4 py-3 border-b items-center">
						{ArrayRole[Role]}
						<div className="ml-3 text-start">
							<h2 className="font-semibold text-gray-800">{Name}</h2>
							<p className="text-sm text-gray-500">{Email}</p>
						</div>
					</div>
					<ul className="py-2">
						<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
							<FaUserEdit className="text-gray-600" />
							Thông tin cá nhân
						</li>
						<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
							<FiSettings className="text-gray-600" />
							Cài đặt tài khoản
						</li>
						<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
							<IoMdHelpCircleOutline className="text-gray-600" />
							Hỗ trợ
						</li>
					</ul>
					<div className="border-t px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
						<FaSignOutAlt className="text-red-500" />
						<span className="text-red-500 font-medium">Đăng xuất</span>
					</div>
				</div>
			)}
		</div>
	);
}

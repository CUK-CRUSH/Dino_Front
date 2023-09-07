import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@reducer/uiSlice";
import { RootState } from "@store/index";

function Sidebar() {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!isSidebarOpen) return; // Don't handle clicks outside if the sidebar is closed
      if (!e.target.closest("#sidebar")) {
        dispatch(toggleSidebar()); // Close the sidebar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, dispatch]);

  const toggleSide = () => {
    dispatch(toggleSidebar()); // Dispatch the toggleSidebar action to update the Redux store
  };

  const hrefLink = [
    { id: 1, text: "로그인", href: "/" },
    { id: 2, text: "회원가입", href: "/" },
  ];

  return (
    <div
      id="sidebar"
      className={`z-5 px-12 border-l-2 border-white bg-gray-800 h-full right-0 top-0 fixed transition-transform duration-500 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute left-0 p-4">
        <FaTimes
          className="cursor-pointer"
          size={32}
          color="red"
          onClick={toggleSide}
          onKeyDown={toggleSide}
        />
      </div>

      <ul className="text-center font-bold text-white mt-20 sm:text-[8px]">
        {hrefLink.map((link) => (
          <li key={link.id} className="my-8">
            <Link to={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

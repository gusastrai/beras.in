import React from "react";
import {
  FaHome,
  FaChartLine,
  FaList,
  FaSearch,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import LogoImg from "../assets/images/rice.png";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`h-screen flex flex-col items-center ps-2 sm:px-4 py-4 sm:py-8 flex-shrink-0 ${
        isOpen ? "block" : "hidden"
      } sm:flex`}
    >
      <div className="flex items-center justify-center">
        <img src={LogoImg} alt="logo" className="w-8 h-auto sm:block hidden" />
      </div>
      <button className="sm:hidden text-gray-800 mb-8" onClick={toggleSidebar}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <ul className="flex flex-col gap-y-4 sm:py-8 items-center">
        <SidebarLink to="/home" icon={FaHome} />
        <SidebarLink to="/prediction" icon={FaChartLine} />
        <SidebarLink to="/classification" icon={FaList} />
        <SidebarLink to="/identification" icon={FaSearch} />
      </ul>
      <div className="flex-1"></div>
      <div>
        <SidebarLink to="/" icon={FaSignOutAlt} />
      </div>
    </div>
  );
};

export default Sidebar;

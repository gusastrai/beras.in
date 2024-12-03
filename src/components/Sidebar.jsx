import React from "react";
import {
  FaHome,
  FaChartLine,
  FaList,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import LogoImg from "../assets/images/rice.png";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <div className="h-screen flex flex-col items-center px-4 py-8 flex-shrink-0"> 
      <img src={LogoImg} alt="logo" className="w-8 h-auto" />
      <ul className="flex flex-col gap-y-4 py-8 items-center">
        <SidebarLink to="/" icon={FaHome} />
        <SidebarLink to="/prediction" icon={FaChartLine} />
        <SidebarLink to="/classification" icon={FaList} />
        <SidebarLink to="/identification" icon={FaSearch} />
      </ul>
      <div className="flex-1"></div>
      <div>
        <Link to="/logout">
          <div className="hover:text-cyan-300 hover:bg-gray-800 p-4 rounded-full bg-white cursor-pointer transition-all duration-300">
            <FaSignOutAlt size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

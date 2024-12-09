import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="list-none">
      <Link to={to}>
        <div 
          className={`
            p-3 rounded-full cursor-pointer transition-all duration-300
            ${isActive 
              ? 'bg-gray-800 text-cyan-300' 
              : 'bg-white hover:text-cyan-300 hover:bg-gray-800'
            }
          `}
        >
          <Icon className="block sm:hidden" size={18} />
          <Icon className="hidden sm:block" size={20} />
        </div>
      </Link>
    </li>
  );
};

export default SidebarLink;
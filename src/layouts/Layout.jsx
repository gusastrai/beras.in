import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Header from "../components/Header";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 sm:px-8 px-4 overflow-y-auto">
        <div className="sm:hidden flex items-center py-4 sm:py-8">
          {!isSidebarOpen && (
            <button
              className="sm:hidden text-gray-800"
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>
          )}
          <p className="text-xl font-bold text-gray-800 flex-1 text-center">
            Beras.<span className="font-extrabold text-cyan-500">in</span>
          </p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

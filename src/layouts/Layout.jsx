import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden"> 
      <Sidebar />
      <main className="flex-1 px-8 overflow-y-auto"> 
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

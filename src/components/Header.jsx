import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Bell } from "lucide-react";

import logo from "../assets/logo-pura.png";

const Header = () => {
  const logout = useLogout();
  return (
    <header className="bg-gradient-to-r from-[#72bbbc] to-[#118295] shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Logo" className="w-10 h-10 drop-shadow-lg" />
          <a href="/home" className="font-medium text-5xl text-[#004a5f] drop-shadow-sm">
            RestInt
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-200 hover:text-gray-400 hover:rounded-md focus:outline-none cursor-pointer">
            <Bell size={40} strokeWidth={1.25} />
          </button>

          <button
            onClick={logout}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

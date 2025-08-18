import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Bell } from "lucide-react";

import logo from "../assets/logo-pura.png";

const Header = () => {
  const logout = useLogout();
  return (
    <header className="bg-gradient-to-r from-[#72bbbc] to-[#118295] shadow-xl">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Logo" className="w-12 h-12 drop-shadow-lg" />
          <a href="/home" className="font-semibold text-3xl text-[#f8f1de] tracking-wide drop-shadow-md">
            RestInt
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-200 focus:outline-none transition duration-300 ease-in-out cursor-pointer">
            <Bell size={40} strokeWidth={1.25} className="hover:fill-current"/>
          </button>

          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-md hover:bg-red-400 transition duration-300 ease-in-out"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

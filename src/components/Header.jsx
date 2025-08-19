import React, { useState, useEffect, useRef } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuth } from "../contexts/AuthContext"; // Para pegar os dados do usuário
import { useUserData } from "../hooks/useUserData"; // Para pegar a foto
import { Bell, Search, User, LogOut } from "lucide-react";
import logo from "../assets/logo-pura.png";

const Header = () => {
  const logout = useLogout();
  const { currentUser } = useAuth();
  const { profileData } = useUserData(currentUser?.uid);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-gradient-to-r from-[#72bbbc] to-[#118295] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Lado Esquerdo: Logo e Nome */}
        <a href="/home" className="flex items-center gap-3 flex-shrink-0 group">
          <img src={logo} alt="Logo" className="w-11 h-11 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-bold text-2xl text-[#f8f1de] tracking-wider hidden sm:block">
            RestInt
          </span>
        </a>

        {/* Centro: Barra de Pesquisa (visível em telas médias e maiores) */}
        <div className="relative hidden md:flex flex-grow max-w-md mx-4">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        {/* Lado Direito: Ações */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Ícone de Notificações */}
          <button className="relative p-2 text-white rounded-full hover:bg-white/20 transition-colors">
            <Bell size={24} />
            {/* Ponto de notificação (exemplo) */}
            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#118295]"></span>
          </button>

          {/* Menu do Usuário */}
          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/50 hover:ring-white transition">
              {profileData?.profilePicture ? (
                <img src={profileData.profilePicture} alt="Avatar do usuário" className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-[#118295] font-bold">
                  {profileData?.username ? profileData.username[0].toUpperCase() : <User />}
                </div>
              )}
            </button>

            {/* Dropdown do Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50">
                <a href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} /> Meu Perfil
                </a>
                <button onClick={logout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={16} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
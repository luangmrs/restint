import React from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useLogout } from "../../hooks/useLogout.jsx";

const Home = () => {
  const { currentUser } = useAuth();
  const logout = useLogout();
  
  return (
    <div>
      <h1>Seja bem-vindo: {currentUser.email}</h1>
      <button onClick={logout} className="border-2 w-full bg-amber-900 hover:bg-amber-200">SAIR</button>
    </div>
  );
};

export default Home;
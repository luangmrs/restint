import React from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useLogout } from "../../hooks/useLogout.jsx";

import Header from "../Header.jsx";

const Home = () => {
  const { currentUser } = useAuth();
  
  
  return (
    <div className="min-h-screen bg-gray-200"> 
      <Header />
       <main className="container mx-auto  mt-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6"> 
        <div className="border-4  hidden md:block md:col-span-2">
          <h1 className=" text-2xl font-bold mb-4">Bem-vindo, {currentUser.email}</h1>
        </div>
        <div className=" border-4  md:col-span-3 lg:col-span-3">
          <h1 >Feed</h1>
        </div>
        <div className=" border-4  hidden lg:block lg:col-span-2">
          <h1>userList</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
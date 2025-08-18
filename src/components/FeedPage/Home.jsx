import React from "react";
import { useLogout } from "../../hooks/useLogout.jsx";

import Header from "../Header.jsx";
import UserProfile from "./userProfile.jsx";
import UsersList from "./usersList.jsx";

const Home = () => { 
  
  return (
    <div className="min-h-screen bg-gray-200"> 
      <Header />
       <main className="container mx-auto  mt-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6"> 
        <div className=" hidden md:block md:col-span-2">
          <UserProfile />
        </div>
        <div className=" border-4  md:col-span-3 lg:col-span-3">
          <h1 >Feed</h1>
        </div>
        <div className=" hidden lg:block lg:col-span-2">
          <UsersList />
        </div>
      </main>
    </div>
  );
};

export default Home;
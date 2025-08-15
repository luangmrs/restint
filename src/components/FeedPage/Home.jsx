import React from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <h1>Seja bem-vindo:</h1>
      
    </div>
  );
};

export default Home;

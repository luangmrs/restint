import React from "react";
import LoginPage from "../components/LoginPage/LoginPage.jsx";
import Home from "../components/FeedPage/Home.jsx";
import PrivateRoutes from "../components/PrivateRoutes.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

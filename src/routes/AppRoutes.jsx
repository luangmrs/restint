import React from 'react'
import LoginPage from '../components/LoginPage/LoginPage.jsx';
import Home from '../components/FeedPage/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router'

const AppRoutes = () => {
  return (
   <BrowserRouter>
   <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes

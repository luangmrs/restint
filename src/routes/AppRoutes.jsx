import React from 'react'
import LoginPage from '../components/LoginPage/LoginPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router'

const AppRoutes = () => {
  return (
   <BrowserRouter>
   <Routes>
        <Route path="/" element={<LoginPage />} />
   </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes

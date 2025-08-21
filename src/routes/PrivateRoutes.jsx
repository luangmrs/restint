import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function RequireAuth({ children }) {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
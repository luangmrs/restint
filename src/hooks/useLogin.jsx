import { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebaseConfig.js";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAuth } from "../contexts/AuthContext.jsx";

export const AuthConst = createContext({});

export default function useLogin() {
  const { currentUser, setCurrentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [userData, setUserData] = useState(null);

  const [signInWithEmailAndPassword, user, loading, errorSignIn] =
    useSignInWithEmailAndPassword(auth);

  const login = async (email, password) => {
    if (!email || !password) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }
    setErrorMessage("");
    await signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (errorSignIn) {
      setShowCredentialsError(true);
    }
  }, [errorSignIn]);

  useEffect(() => {
    if (showCredentialsError) {
      const timer = setTimeout(() => setShowCredentialsError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCredentialsError]);

  useEffect(() => {
    if (user) {
      console.log("Usuário autenticado:", user);
      setCurrentUser(user);
    }
  }, [setCurrentUser, user]);

  return {
    login,
    user,
    loading,
    errorMessage,
    showCredentialsError,
  };
}

import { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebaseConfig.js";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useAuth } from "../contexts/AuthContext.jsx";

export const AuthConst = createContext({});

export default function useLogin() {
  const { setCurrentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);

  const [signInWithEmailAndPassword, user, loading, errorSignIn] =
    useSignInWithEmailAndPassword(auth);

  const login = async (email, password) => {
    setErrorMessage("");
    setShowCredentialsError(false);
    if (!email || !password) {
      setErrorMessage("Preencha todos os campos.");
      return false;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      if (userCredential) {
        setCurrentUser(userCredential.user);
        return true;
      }
    } catch (error) {
      console.error("Erro de login:", error);
    }

    return false;
  };

  useEffect(() => {
    if (errorSignIn) {
      setShowCredentialsError(true);
      const timer = setTimeout(() => setShowCredentialsError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorSignIn]);

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

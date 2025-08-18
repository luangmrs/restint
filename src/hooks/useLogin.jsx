import { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig.js";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


export default function useLogin() {
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
      console.log(userCredential);
      return !!userCredential; 
    } catch (error) {
      console.error("Erro de login:", error);
      return false;
    }
  };

  useEffect(() => {
    if (errorSignIn) {
      setShowCredentialsError(true);
      const timer = setTimeout(() => setShowCredentialsError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorSignIn]);

  return {
    login,
    user,
    loading,
    errorMessage,
    showCredentialsError,
  };
}
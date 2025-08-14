import { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig.js";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function useLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);

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

  return {
    login,
    user,
    loading,
    errorMessage,
    setErrorMessage,
    showCredentialsError,
  };
}
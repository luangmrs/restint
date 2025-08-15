import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig.js";

export function useLogout() {
  const navigate = useNavigate();

  async function logout() {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  }

  return logout;
}
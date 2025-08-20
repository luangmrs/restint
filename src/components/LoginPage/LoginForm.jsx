import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin.jsx";
import PasswordReset from "./PasswordReset.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { sendMagicLink } from "../../services/authService.js";

import { checkUser } from "../../services/firestore.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarReset, setMostrarReset] = useState(false);
  const [loadingMagic, setLoadingMagic] = useState(false);
  
  const navigate = useNavigate();

  const { login, user, loading, errorMessage, showCredentialsError } =
    useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      await checkUser(user);
      navigate("/home", { replace: true });
    }
  };

    const handleMagicLink = async () => {
        try {
            setLoadingMagic(true);
            await sendMagicLink(email);
            alert("Link mágico enviado para seu email!");
        } catch (err) {
            console.error(err);
            alert("Erro ao enviar link mágico.");
        } finally {
            setLoadingMagic(false);
        }
    };

  if (mostrarReset) {
    return <PasswordReset onBack={() => setMostrarReset(false)} />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {showCredentialsError && (
          <p className="text-center mx-auto m-3 p-0 text-red-600 font-bold ">
            Credenciais inválidas!
          </p>
        )}
        <p
          className="text-center mx-auto m-3 p-0  text-[#555] hover:text-[#05445b] w-3/5"
          onClick={() => setMostrarReset(true)}
          style={{ cursor: "pointer" }}
        >
          Esqueceu sua senha?
        </p>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-gradient-to-r from-[#068ba1] to-[#77bfbc] text-white rounded-md text-[1.1rem] font-bold cursor-pointer transition-colors duration-200 flex items-center justify-center"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner size={5} />
              <span>Carregando...</span>
            </div>
          ) : (
            <span>Entrar</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

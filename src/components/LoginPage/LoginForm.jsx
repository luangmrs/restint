import React, { useState } from "react";
import useLogin from "../../hooks/useLogin.jsx";
import PasswordReset from "./PasswordReset.jsx";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarReset, setMostrarReset] = useState(false);

  const { login, user, loading, errorMessage, showCredentialsError } =
    useLogin();

  if (mostrarReset) {
    return <PasswordReset onBack={() => setMostrarReset(false)} />;
  }

  return (
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
          Credenciais invalidas!
        </p>
      )}
      <p
        className="text-center mx-auto m-3 p-0  text-[#555] hover:text-[#05445b] w-3/5"
        onClick={() => setMostrarReset(true)}
        style={{ cursor: "pointer" }}
      >
        Esqueceu sua senha?
      </p>
      <button type="submit">Entrar</button>
    </form>
  );
};

const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  }

export default LoginForm;

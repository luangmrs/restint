import React, { useState } from "react";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarReset, setMostrarReset] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setError("");
    if (onLogin) {
      onLogin({ email, password });
    }
    // Aqui você pode adicionar lógica de autenticação
  };

  if (mostrarReset) {
    // Tela de redefinição de senha
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Redefinição de senha enviada para ${email}`);
        }}
        className={styles.font}
      >
        <h2>Redefinir Senha</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Redefinir</button>
        <button
          type="button"
          onClick={() => setMostrarReset(false)}
          style={{ marginTop: "15px",background: "linear-gradient(to right, #6E0C0C, #dd1818)"  }}
        >
          Voltar
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.font}>
      <h2>LOGIN</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
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
      <p className="text-center mx-auto m-3 p-0  text-[#555] hover:text-[#05445b] w-3/5"
        onClick={() => setMostrarReset(true)}
        style={{ cursor: "pointer" }}>
        Esqueceu sua senha?
      </p>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;

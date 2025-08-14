import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { auth } from "../../services/firebaseConfig.js";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mostrarReset, setMostrarReset] = useState(false);
  const [erroCredenciais, setErroCredenciais] = useState(false);

  const [signInWithEmailAndPassword, user, loading, errorSignIn] =
    useSignInWithEmailAndPassword(auth);

  React.useEffect(() => {
    if (errorSignIn) {
      setErroCredenciais(true);
    }
    if (loading) {
      return console.log("Carregando...");
    }
    if (user) {
      return console.log(`Usuário ${user.user.email} logado com sucesso`);
    }
  }, [errorSignIn, user, loading]);

  React.useEffect(() => {
    if (erroCredenciais) {
      const timer = setTimeout(() => {
        setErroCredenciais(false);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // limpa caso o componente desmonte
    }
  }, [erroCredenciais]);

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
          style={{
            marginTop: "15px",
            background: "linear-gradient(to right, #6E0C0C, #dd1818)",
          }}
        >
          Voltar
        </button>
      </form>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setError("");
    await signInWithEmailAndPassword(email, password);
  };

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
      {erroCredenciais && (
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

export default LoginForm;

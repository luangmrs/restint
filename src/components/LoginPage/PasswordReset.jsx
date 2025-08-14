import { useState } from "react";

export default function PasswordResetForm({ onBack }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Redefinição de senha enviada para ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        onClick={onBack}
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

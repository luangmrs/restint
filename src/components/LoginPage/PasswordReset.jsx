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
      <button
        type="submit"
        className="w-full 
                    p-3 
                    bg-gradient-to-r from-[#068ba1] to-[#77bfbc] 
                    text-white 
                    border-none 
                    rounded-md 
                    text-[1.1rem] 
                    font-bold 
                    cursor-pointer 
                    transition-colors 
                    duration-200"
      >
        Redefinir
      </button>
      <button
        type="button"
        onClick={onBack}
        style={{
          marginTop: "15px",
        }}
        className="w-full 
                    p-3 
                    bg-gradient-to-br from-zinc-800 to-red-900
                    hover:from-zinc-700 hover:to-red-700
                    text-white 
                    border-none 
                    rounded-md 
                    text-[1.1rem] 
                    font-bold 
                    cursor-pointer 
                    transition-colors 
                    duration-200"
      >
        Voltar
      </button>
    </form>
  );
}

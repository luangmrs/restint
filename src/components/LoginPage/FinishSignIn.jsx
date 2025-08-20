import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { finishSignIn } from "../services/auth";

export default function FinishSignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        async function completeLogin() {
            try {
                const user = await finishSignIn();
                if (user) {
                    alert(`Login concluído! Bem-vindo, ${user.email}`);
                    // redireciona para a FeedPage
                    navigate("/feed");
                }
            } catch (err) {
                console.error("Erro ao finalizar login:", err);
                alert("Erro ao finalizar login.");
            }
        }

        completeLogin();
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl font-bold">Finalizando login...</h2>
            <p className="text-gray-600">Por favor, aguarde.</p>
        </div>
    );
}

import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Configurações do link mágico
const actionCodeSettings = {
    url: "http://localhost:3000/finishSignIn",
    handleCodeInApp: true,
};

// Envia o link mágico
export async function sendMagicLink(email) {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
}

// Finaliza login quando usuário clicar no link
export async function finishSignIn() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
            email = window.prompt("Digite seu e-mail para confirmar:");
        }

        const result = await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem("emailForSignIn");

        return result.user;
    }
}

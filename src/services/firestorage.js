import { db } from "../services/firebaseConfig.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function checkUser(user) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        username: user.email.split("@")[0],
        email: user.email,
        createdAt: new Date(),
        bio: "",
        profilePicture: "",
        badges: [],
        posts: [],
      });
      console.log("Novo documento de usuário criado no Firestore!");
    }
  } catch (error) {
    console.error("Erro ao verificar ou criar usuário:", error);
    throw error;
  }
}

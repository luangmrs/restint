import { db } from "./firebaseConfig.js";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  getDocs,
} from "firebase/firestore";

export async function checkUser(user) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        displayName: "",
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

export async function getUsers() {
  const usersList = [];
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      usersList.push({ id: doc.id, ...doc.data() });
    });

    console.log("Usuários obtidos com sucesso!");
    return usersList;
  } catch (error) {
    console.error("Erro ao buscar a lista de usuários:", error);
    return [];
  }
}

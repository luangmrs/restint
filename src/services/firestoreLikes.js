import { db } from "./firebaseConfig.js";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

// Curtir post
export async function likePost(postId, userId) {
    try {
        const likeRef = doc(db, `posts/${postId}/likes`, userId);
        await setDoc(likeRef, { likedAt: new Date() });
    } catch (error) {
        console.error("Erro ao curtir post:", error);
    }
}

// Descurtir post
export async function unlikePost(postId, userId) {
    try {
        const likeRef = doc(db, `posts/${postId}/likes`, userId);
        await deleteDoc(likeRef);
    } catch (error) {
        console.error("Erro ao remover like:", error);
    }
}

// Listar likes
export async function getLikes(postId) {
    try {
        const likesRef = collection(db, `posts/${postId}/likes`);
        const snapshot = await getDocs(likesRef);
        return snapshot.docs.map(doc => doc.id); // retorna ids dos usuários que curtiram
    } catch (error) {
        console.error("Erro ao buscar likes:", error);
        return [];
    }
}

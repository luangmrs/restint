import { db } from "./firebaseConfig.js";
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

//CREATE
export async function createComment(postId, commentData) {
    try {
        const commentsRef = collection(db, `posts/${postId}/comments`);
        const docRef = await addDoc(commentsRef, {
            ...commentData,
            createdAt: serverTimestamp(),
        });
        console.log("Comentário criado com sucesso!");
        return docRef;
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        throw error;
    }
}

//READ
export async function getComments(postId) {
    try {
        const commentsRef = collection(db, `posts/${postId}/comments`);
        const snapshot = await getDocs(commentsRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        return [];
    }
}

//UPDATE
export async function updateComment(postId, commentId, newData) {
    try {
        const commentRef = doc(db, `posts/${postId}/comments`, commentId);
        await updateDoc(commentRef, {
            ...newData,
            updatedAt: new Date(),
        });
        console.log("Comentário atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar comentário:", error);
        throw error;
    }
}

//DELETE
export async function deleteComment(postId, commentId) {
    try {
        const commentRef = doc(db, `posts/${postId}/comments`, commentId);
        await deleteDoc(commentRef);
        console.log("Comentário deletado com sucesso!");
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        throw error;
    }
}


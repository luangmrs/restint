import { db } from "./firebaseConfig.js";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  increment,
  where,
  serverTimestamp,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

const POSTS_PER_PAGE = 5;

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
        bannerPicture,
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

export async function getPosts(lastVisibleDoc = null) {
  try {
    const postsCollectionRef = collection(db, "posts");
    let q = query(
      postsCollectionRef,
      orderBy("createdAt", "desc"),
      limit(POSTS_PER_PAGE)
    );

    if (lastVisibleDoc) {
      q = query(
        postsCollectionRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisibleDoc),
        limit(POSTS_PER_PAGE)
      );
    }

    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { posts, lastDoc };
  } catch (error) {
    console.error("Erro ao buscar os posts:", error);
    throw new Error("Não foi possível carregar o feed.");
  }
}

export const getPostsByUser = async (userId) => {
  if (!userId) return [];
  try {
    const postsCollection = collection(db, "posts");
    
    // A query agora filtra onde 'authorId' é igual ao userId fornecido
    const q = query(
      postsCollection, 
      where("authorId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erro ao buscar os posts do usuário:", error);
    throw new Error("Não foi possível carregar os posts.");
  }
};

export async function createPost(postData) {
  try {
    const postsCollectionRef = collection(db, "posts");
    const docRef = await addDoc(postsCollectionRef, {
      ...postData,
      createdAt: serverTimestamp(),
    });
    return docRef;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    throw error;
  }
}

export const updateUserProfile = async (userId, dataToUpdate) => {
  if (!userId) {
    throw new Error("ID do usuário não fornecido para atualização.");
  }
  try {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId); // Pega a referência do documento do usuário
    await updateDoc(userDocRef, dataToUpdate); // Atualiza o documento
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error);
    throw new Error("Não foi possível atualizar o perfil do usuário.");
  }
};

export const toggleLikePost = async (postId, userId, isLiked) => {
  if (!postId || !userId) {
    throw new Error("ID do post ou do usuário não fornecido.");
  }
  try {
    const postDocRef = doc(db, "posts", postId);

    const updateData = {
      likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
    };

    await updateDoc(postDocRef, updateData);
  } catch (error) {
    console.error("Erro ao curtir o post:", error);
    throw new Error("Não foi possível atualizar o like.");
  }
};

export const getCommentsForPost = async (postId) => {
  const commentsRef = collection(db, "posts", postId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addCommentToPost = async (postId, commentData) => {
  // Adiciona o comentário na subcoleção
  const commentsRef = collection(db, "posts", postId, "comments");
  await addDoc(commentsRef, { ...commentData, createdAt: serverTimestamp() });

  // Atualiza a contagem de comentários no documento do post principal
  const postDocRef = doc(db, "posts", postId);
  await updateDoc(postDocRef, {
    commentsCount: increment(1),
  });
};

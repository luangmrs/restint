import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async (file, path) => {
  if (!file) {
    throw new Error("Nenhum arquivo fornecido para upload.");
  }

  const storage = getStorage();

  const storageRef = ref(storage, path);

  try {
    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Erro no upload:", error);
    throw new Error("Falha ao fazer o upload do arquivo.");
  }
};

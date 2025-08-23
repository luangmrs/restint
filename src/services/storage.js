import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

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

export const deleteFile = async (path) => {
  if (!path) return; // Se não há caminho, não faz nada
  const storage = getStorage();
  const fileRef = ref(storage, path);
  try {
    await deleteObject(fileRef);
  } catch (error) {
    // Se o arquivo não existir, o Firebase dá um erro que podemos ignorar.
    if (error.code === "storage/object-not-found") {
      console.warn(
        "Arquivo não encontrado no Storage, talvez já tenha sido deletado:",
        path
      );
    } else {
      console.error("Erro ao deletar arquivo do Storage:", error);
      throw error;
    }
  }
};

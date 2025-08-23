import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import { createPost } from "../../services/firestore.js";
import { uploadFile } from "../../services/storage.js";
import { Image as ImageIcon, X } from "lucide-react";

const MAX_CHARS = 280;

const CreatePost = ({ onPostCreated }) => {
  const { currentUser } = useAuth();
  const { profileData } = useUserData(currentUser?.uid); // Pegar os dados do usuário logado

  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = React.useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Cria uma URL local para o preview
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    fileInputRef.current.value = null; // Limpa o input de arquivo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !imageFile) {
      setError("O post não pode estar vazio.");
      return;
    }

    if (content.length > MAX_CHARS) {
      setError(`O post não pode exceder ${MAX_CHARS} caracteres.`);
      return;
    }

    setIsPosting(true);
    setError("");

    let imageUrl = null;
    let imagePath = null;

    try {
      if (imageFile) {
        // Cria um caminho único para a imagem do post
        const filePath = `post_images/${currentUser.uid}/${Date.now()}-${
          imageFile.name
        }`;
        imagePath = filePath;
        imageUrl = await uploadFile(imageFile, filePath);
      }

      const postData = {
        authorId: currentUser.uid,
        authorUsername: profileData.username,
        authorDisplayName: profileData.displayName || profileData.username,
        authorProfilePic: profileData.profilePicture || null,
        content: content,
        imageUrl: imageUrl,
        imagePath: imagePath,
        likes: [],
        commentsCount: 0,
      };

      await createPost(postData);
      setContent("");
      handleRemoveImage(); // Limpa a imagem após o post
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError("Falha ao publicar. Tente novamente.");
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  const charsLeft = MAX_CHARS - content.length;
  const counterColor = charsLeft < 20 ? "text-red-500" : "text-gray-500";

  const firtsName = profileData?.displayName.split(" ")[0];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#72bbbc]"
          rows="3"
          placeholder={`Compartilhe algo com a gente, ${
            firtsName || profileData?.username
          }!`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPosting}
          maxLength={MAX_CHARS}
        ></textarea>

        {imagePreview && (
          <div className="mt-4 relative">
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-[#118295] text-[white] rounded-full p-1 hover:bg-[#016a79] hover:cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>
            <img
              src={imagePreview}
              alt="Preview do post"
              className="rounded-lg w-full"
            />
          </div>
        )}

        <div className="text-right text-xs font-">
          <span className={counterColor}>{content.length}</span>/{MAX_CHARS}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-between items-center mt-2 pt-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-[#72bbbc] hover:bg-cyan-100 rounded-full transition-colors"
            title="Adicionar imagem"
          >
            <ImageIcon size={24} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
          />

          <button
            type="submit"
            className="bg-[#018ca1] text-white font-bold py-2 px-6 rounded-full hover:bg-[#016a79] disabled:bg-gray-400 transition-colors"
            disabled={isPosting || (!content.trim() && !imageFile)}
          >
            {isPosting ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import { createPost } from "../../services/firestore.js";

const MAX_CHARS = 280;

const CreatePost = ({ onPostCreated }) => {
  const { currentUser } = useAuth();
  const { profileData } = useUserData(currentUser?.uid); // Pegar os dados do usuário logado

  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || !profileData) {
      setError("O post não pode estar vazio.");
      return;
    }

    if (content.length > MAX_CHARS) {
      setError(`O post não pode exceder ${MAX_CHARS} caracteres.`);
      return;
    }

    setIsPosting(true);
    setError("");

    const postData = {
      authorId: currentUser.uid,
      authorUsername: profileData.username,
      authorDisplayName: profileData.displayName || profileData.username,
      authorProfilePic: profileData.profilePicture || null,
      content: content,
      likes: [],
      commentsCount: 0,
    };

    try {
      await createPost(postData);
      setContent("");
      if (onPostCreated) {
        onPostCreated();
      }
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

        <div className="text-right text-xs font-">
          <span className={counterColor}>{content.length}</span>/{MAX_CHARS}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-[#018ca1] text-white font-bold py-2 px-4 rounded-md hover:bg-[#016a79] disabled:bg-gray-400"
            disabled={isPosting || !content.trim()}
          >
            {isPosting ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

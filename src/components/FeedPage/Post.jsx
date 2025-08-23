import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { deletePost } from "../../services/firestore";
import { Trash2 } from "lucide-react";
import { toggleLikePost } from "../../services/firestore.js";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Heart, MessageSquare } from "lucide-react";

import CommentsModal from "../Modals/CommentsModal.jsx";

const Post = ({ post, onPostUpdate, onPostDelete }) => {
  const postDate = post.createdAt?.toDate();
  const { currentUser } = useAuth();
  const [isCommentModalOpen, setIsCommentModalOpen] = React.useState(false);

  const isLiked = post.likes?.includes(currentUser.uid);
  const isAuthor = currentUser && currentUser.uid === post.authorId;

  const handleLike = async () => {
    const newLikes = isLiked
      ? post.likes.filter((uid) => uid !== currentUser.uid)
      : [...(post.likes || []), currentUser.uid];

    onPostUpdate({ ...post, likes: newLikes });

    try {
      await toggleLikePost(post.id, currentUser.uid, isLiked);
    } catch (error) {
      console.error("Falha ao curtir:", error);
      onPostUpdate(post);
    }
  };

  const handleDelete = async () => {
    // 2. Adicione uma confirmação para evitar exclusões acidentais
    if (
      window.confirm(
        "Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await deletePost(post.id, post.imagePath);

        onPostDelete(post.id); // 3. Avise o Feed para remover o post da tela
      } catch (error) {
        console.error("ERRO CAPTURADO no handleDelete do Post.jsx:", error);
        alert("Erro ao excluir o post. Tente novamente.");
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-5 transition-shadow duration-300 hover:shadow-lg">
        {/* Container principal com padding */}
        <div className="p-4">
          <div className="flex items-start">
            {/* Foto do Perfil (agora com um leve anel) */}
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#72bbbc] shadow-md">
                {post.authorProfilePic ? (
                  <img
                    src={post.authorProfilePic}
                    alt="Foto de Perfil"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                    {post.authorDisplayName[0].toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              {/* Informações do Autor com melhor hierarquia e cursor de link */}
              <div className="flex items-baseline space-x-2 cursor-pointer group">
                <p className="font-bold text-gray-900 group-hover:underline">
                  {post.authorDisplayName}
                </p>
                <p className="text-sm text-gray-500">@{post.authorUsername}</p>
              </div>

              {/* Data do post, agora em uma linha separada para mais clareza */}
              <p className="text-xs text-gray-400 mt-1">
                {postDate
                  ? formatDistanceToNow(postDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })
                  : "agora"}
              </p>

              {/* Conteúdo do Post com melhor legibilidade */}
              <p className="mt-3 text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
              {post.imageUrl && (
                <div className="mt-4">
                  <img
                    src={post.imageUrl}
                    alt="Imagem do post"
                    className="rounded-lg w-full border border-gray-300 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botões de Ação com design aprimorado e contadores */}
        <div className="flex justify-around items-center px-4 py-2 border-t border-gray-200 mt-2">
          {/* Botão Curtir */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 group transition-colors duration-200 ${
              isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            }`}
          >
            <div
              className={`p-2 rounded-full group-hover:bg-red-100 cursor-pointer transition-colors duration-200`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            </div>
            <span className="text-sm font-semibold">
              {post.likes?.length || 0}
            </span>
          </button>

          {/* Botão Comentar */}
          <button
            onClick={() => setIsCommentModalOpen(true)}
            className="flex items-center space-x-2 text-gray-500 hover:text-cyan-500 group transition-colors duration-200"
          >
            <div className="p-2 rounded-full group-hover:bg-cyan-100 hover:cursor-pointer">
              <MessageSquare size={20} />
            </div>
            <span className="text-sm font-semibold">
              {post.commentsCount || 0}
            </span>
          </button>
        </div>
        {isAuthor && (
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-full"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {isCommentModalOpen && (
        <CommentsModal
          postId={post.id}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </>
  );
};

export default Post;

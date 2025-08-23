// src/pages/profile/ProfilePage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook para pegar o :userId da URL
import { useAuth } from "../../contexts/AuthContext";
import { getPostsByUser } from "../../services/firestore";

import Header from "../Header";
import Profile from "../FeedPage/userProfile"; // Reutilizando o componente de perfil
import Post from "../FeedPage/Post"; // Reutilizando o componente de post
import LoadingSpinner from "../LoadingSpinner";

const ProfilePage = () => {
  let { userId } = useParams(); // Pega o ID da URL
  const { currentUser } = useAuth();

  const [profileTrigger, setProfileTrigger] = useState(0);

  // Se a URL for /profile/me, usamos o ID do usuário logado
  if (userId === "me" && currentUser) {
    userId = currentUser.uid;
  }

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      const userPosts = await getPostsByUser(userId);
      setPosts(userPosts);
      setLoadingPosts(false);
    };
    fetchPosts();
  }, [userId]); // Re-executa se o ID na URL mudar

  const handleProfileUpdate = () => {
    setProfileTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Header key={`header-${profileTrigger}`} />
      <main className="container mx-auto mt-8 max-w-4xl">
        {/* Usamos a key para forçar a remontagem do Profile ao navegar para um novo usuário */}
        <Profile
          key={`profile-${userId}-${profileTrigger}`}
          targetUserId={userId}
          onProfileUpdate={handleProfileUpdate}
        />

        <div className="mt-8">
          <h2 className="text-xl font-extrabold mb-4 border-b-2 border-[#118295] pb-1">
            Publicações
          </h2>
          {loadingPosts ? (
            <div className="flex justify-center mt-8">
              <LoadingSpinner size={8} />
            </div>
          ) : (
            posts.map((post) => <Post key={post.id} post={post} />)
          )}
          {!loadingPosts && posts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              Este usuário ainda não publicou nada.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

// Precisamos modificar um pouco o userProfile para aceitar um ID alvo
// Vamos assumir que você fará essa pequena alteração:
// No userProfile.jsx, em vez de usar sempre currentUser.uid,
// você usará `props.targetUserId || currentUser.uid`.

export default ProfilePage;

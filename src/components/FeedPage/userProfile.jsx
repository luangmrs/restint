import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import LoadingSpinner from "../LoadingSpinner";
import { Pencil } from "lucide-react"; // Ícone para o botão de editar

const Profile = () => {
  const { currentUser } = useAuth();
  const { profileData, loading, error } = useUserData(currentUser?.uid);

  // O tratamento de 'loading' e 'error' continua excelente, não precisa mudar.
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md flex justify-center items-center h-64 overflow-hidden">
        <LoadingSpinner size={6} />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="bg-white rounded-xl shadow-md text-red-600 p-6">
        {error || "Erro: Perfil não encontrado."}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* 1. Banner/Foto de Capa */}
      <div className="h-32 bg-gradient-to-r from-[#72bbbc] to-[#118295]">
        {profileData.bannerPicture && (
          <img
            src={profileData.bannerPicture}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 2. Conteúdo Principal do Perfil */}
      <div className="p-6 relative">
        {/* Foto de Perfil com Sobreposição */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-16">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white bg-gray-200 shadow-lg">
            {profileData.profilePicture ? (
              <img
                src={profileData.profilePicture}
                alt="Foto de Perfil"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl font-bold">
                {profileData.username[0].toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Nome, Username e Bio */}
        <div className="text-center mt-15">
          <h2 className="text-2xl font-bold text-gray-800">
            {profileData.displayName || profileData.username}
          </h2>
          <p className="text-gray-500">@{profileData.username}</p>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            {profileData.bio ||
              "Edite seu perfil para adicionar uma biografia."}
          </p>
        </div>

        {/* 4. Badges/Conquistas */}
        {profileData.badges && profileData.badges.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap justify-center gap-2">
              {profileData.badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

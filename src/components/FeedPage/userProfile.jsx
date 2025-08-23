import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserData } from "../../hooks/useUserData";
import LoadingSpinner from "../LoadingSpinner";
import EditProfileModal from "../Modals/EditProfileModal"; // Corrigido para a pasta correta
import { Pencil } from "lucide-react";

const Profile = ({ targetUserId, onProfileUpdate }) => {
  const { currentUser } = useAuth();
  const userIdToFetch = targetUserId || currentUser?.uid;
  const { profileData, loading, error } = useUserData(userIdToFetch);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const isOwnProfile = currentUser?.uid === userIdToFetch;

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
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Banner */}
        <div className="h-40 bg-gradient-to-r from-[#72bbbc] to-[#118295]">
          {profileData.bannerPicture && (
            <img src={profileData.bannerPicture} alt="Banner" className="w-full h-full object-cover" />
          )}
        </div>

        {/* --- INÍCIO DA GRANDE MUDANÇA ESTRUTURAL --- */}
        <div className="p-6">
          {/* Cabeçalho do Perfil (Foto e Botão Editar) */}
          <div className="flex items-start justify-between -mt-20">
            {/* Foto de Perfil */}
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white bg-gray-200 shadow-lg flex-shrink-0">
              {profileData.profilePicture ? (
                <img src={profileData.profilePicture} alt="Foto de Perfil" className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl font-bold">
                  {profileData.username[0].toUpperCase()}
                </div>
              )}
            </div>
            {/* Botão Editar Perfil */}
            {isOwnProfile && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 mt-4  rounded-full border-1 border-gray-400 shadow-sm text-sm font-semibold bg-[#018ca1] text-[#f8f1de] hover:bg-gray-100 hover:text-gray-800 transition-colors flex items-center gap-2"
              >
                <Pencil size={14} /> Editar Perfil
              </button>
            )}
          </div>

          {/* Informações do Perfil (Nome, Bio, etc.) */}
          <div className="mt-4 ml-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {profileData.displayName || profileData.username}
            </h2>
            <p className="text-gray-500">@{profileData.username}</p>
            <p className="mt-3 text-gray-700 max-w-xl">
              {profileData.bio || "Edite seu perfil para adicionar uma biografia."}
            </p>
          </div>

          {/* Badges */}
          {profileData.badges && profileData.badges.length > 0 && (
            <div className="mt-4 ml-2">
              <div className="flex flex-wrap justify-start gap-2">
                {profileData.badges.map((badge, index) => (
                  <span key={index} className="bg-[#018ca1] text-[#f8f1de] text-xs font-bold px-3 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          currentUserData={profileData}
          currentUserId={userIdToFetch}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateSuccess={() => {
            setIsEditModalOpen(false);
            if (onProfileUpdate) onProfileUpdate();
          }}
        />
      )}
    </>
  );
};

export default Profile;
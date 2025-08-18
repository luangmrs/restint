import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '../../hooks/useUserData';
import LoadingSpinner from '../LoadingSpinner';

const Profile = () => {
  const { currentUser } = useAuth();
  const { profileData, loading, error } = useUserData(currentUser?.uid);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-48">
       <LoadingSpinner size={5} /> 
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-red-600">
        {error || "Erro: Perfil não encontrado."}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      {/* Foto de Perfil */}
      <div className="w-34 h-34 mx-auto rounded-full overflow-hidden mb-4">
        {profileData.profilePicture ? (
          <img src={profileData.profilePicture} alt="Foto de Perfil" className="object-cover w-full h-full" />
        ) : (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500 text-3xl">
            {profileData.username}
          </div>
        )}
      </div>

      {/* Nome de Exibição (se você tiver) e Username */}
      <h2 className="text-3xl font-bold mb-1">{profileData.displayName || profileData.username}</h2>
      <p className="text-gray-500 text-lg">@{profileData.username}</p>
      
      {/* Biografia */}
      <p className="mt-4 text-gray-700 text-xl">
        {profileData.bio || "Nenhuma biografia adicionada."}
      </p>

      {/* Badges */}
      {profileData.badges && profileData.badges.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {profileData.badges.map((badge, index) => (
            <span key={index} className="bg-[#018ca1] text-white text-xs font-bold px-2 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from "react";
import { uploadFile } from "../../services/storage";
import { updateUserProfile } from "../../services/firestore";
import { X, Camera } from "lucide-react";

const EditProfileModal = ({ currentUserId, currentUserData, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Preenche o formulário com os dados atuais quando o modal abre
  useEffect(() => {
    if (currentUserData) {
      setFormData({
        displayName: currentUserData.displayName || "",
        bio: currentUserData.bio || "",
      });
      setProfilePreview(currentUserData.profilePicture || "");
      setBannerPreview(currentUserData.bannerPicture || "");
    }
  }, [currentUserData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "profile") {
        setProfileImageFile(file);
        setProfilePreview(previewUrl);
      } else if (type === "banner") {
        setBannerImageFile(file);
        setBannerPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const dataToUpdate = { ...formData };

    try {
      // Faz upload da nova foto de perfil, se houver
      if (profileImageFile) {
        const path = `profilePics/${currentUserId}`;
        const url = await uploadFile(profileImageFile, path);
        dataToUpdate.profilePicture = url;
      }

      // Faz upload do novo banner, se houver
      if (bannerImageFile) {
        const path = `profileBanners/${currentUserId}`;
        const url = await uploadFile(bannerImageFile, path);
        dataToUpdate.bannerPicture = url;
      }

      // Atualiza os dados no Firestore
      await updateUserProfile(currentUserId, dataToUpdate);

      onUpdateSuccess(); // Avisa o componente pai para recarregar os dados e fechar o modal
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Não foi possível salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Editar Perfil</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#118295] text-[white] hover:bg-[#016a79]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          {/* Editor de Banner e Foto */}
          <div className="relative h-48 bg-gray-300">
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Preview do Banner"
                className="w-full h-full object-cover"
              />
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer text-white opacity-0 hover:opacity-100 transition-opacity">
              <Camera size={24} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "banner")}
              />
            </label>
            <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full ring-4 ring-white overflow-hidden">
              {profilePreview && (
                <img
                  src={profilePreview}
                  alt="Preview do Perfil"
                  className="w-full h-full object-cover"
                />
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer text-white opacity-0 hover:opacity-100 transition-opacity">
                <Camera size={20} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profile")}
                />
              </label>
            </div>
          </div>

          <div className="p-6 pt-20">
            {/* Campos de Texto */}
            <div className="mb-4">
              <label
                htmlFor="displayName"
                className="block text-sm font-bold text-black mb-1"
              >
                Nome de Exibição
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118295]"
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-bold text-black mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118295]"
              ></textarea>
            </div>
          </div>

          <div className="p-4 border-t border-gray-400 flex justify-end">
            <button
              type="submit"
              className="bg-[#018ca1] text-white font-bold py-2 px-6 rounded-full hover:bg-[#016a79] disabled:bg-gray-400 transition-colors"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

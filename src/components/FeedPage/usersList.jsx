import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/firestore.js";
import LoadingSpinner from "../LoadingSpinner.jsx";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (e) {
        setError("Não foi possível carregar a lista de usuários.");
        console.error("Erro ao buscar usuários:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <LoadingSpinner size={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className=" border-b-2 border-[#72bbbc] pb-0  w-full">
        <h2 className="text-xl font-bold mb-2">Comunidade</h2>
      </div>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="flex items-center p-2 mb-2 rounded-md hover:bg-gray-100"
            >
              {/* Foto de Perfil */}
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Foto de Perfil"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-500 text-lg">
                    {user.username[0].toUpperCase()}
                  </div>
                )}
              </div>

              {/* Informações do Usuário */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {user.displayName || user.username}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              {user.badges && user.badges.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {user.badges.map((badge, index) => (
                    <span key={index} className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Nenhum usuário cadastrado.
          </p>
        )}
      </ul>
    </div>
  );
};

export default UsersList;

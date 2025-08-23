// src/components/home/CommentsModal.jsx
import React, { useState, useEffect } from 'react';
import { getCommentsForPost, addCommentToPost } from '../../services/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '../../hooks/useUserData';
import LoadingSpinner from '../LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CommentsModal = ({ postId, onClose }) => {
  const { currentUser } = useAuth();
  const { profileData } = useUserData(currentUser?.uid);
  
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const commentsData = await getCommentsForPost(postId);
    setComments(commentsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !profileData) return;

    setIsPosting(true);
    const commentData = {
      text: newComment,
      authorId: currentUser.uid,
      authorUsername: profileData.username,
      authorDisplayName: profileData.displayName || profileData.username,
      authorProfilePic: profileData.profilePicture || null,
    };

    await addCommentToPost(postId, commentData);
    setNewComment('');
    setIsPosting(false);
    fetchComments(); // Recarrega os comentários para incluir o novo
  };

  return (
    // Overlay
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center" onClick={onClose}>
      {/* Modal Content */}
      <div className="bg-white rounded-lg w-full max-w-2xl h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center p-4 border-b border-gray-300">Comentários</h2>
        
        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? <LoadingSpinner /> : comments.map(comment => (
            <div key={comment.id} className="flex items-start space-x-3">
              <img src={comment.authorProfilePic} alt={comment.authorDisplayName} className="w-10 h-10 rounded-full"/>
              <div>
                <p>
                  <span className="font-bold">{comment.authorDisplayName}</span>
                  <span className="text-gray-600 ml-2">{comment.text}</span>
                </p>
                <span className="text-xs text-gray-400">{formatDistanceToNow(comment.createdAt.toDate(), { locale: ptBR })}</span>
              </div>
            </div>
          ))}
          {!loading && comments.length === 0 && <p className="text-center text-gray-500">Nenhum comentário ainda. Seja o primeiro!</p>}
        </div>

        {/* New Comment Form */}
        <form onSubmit={handleSubmitComment} className="p-4 border-t border-gray-300">
          <div className="flex space-x-3">
            <input 
              type="text" 
              className="flex-1 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              disabled={isPosting}
            />
            <button type="submit" className="bg-[#018ca1] text-white hover:bg-[#016a79] cursor-pointer font-semibold px-6 py-2 rounded-full disabled:bg-gray-400" disabled={isPosting || !newComment.trim()}>
              {isPosting ? '...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentsModal;
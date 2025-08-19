// src/components/home/Feed.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPosts } from '../../services/firestore.js';
import Post from './Post.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading inicial da página
  const [loadingMore, setLoadingMore] = useState(false); // Loading de novos posts
  const [lastDoc, setLastDoc] = useState(null); // Cursor para paginação
  const [hasMore, setHasMore] = useState(true); // Indica se há mais posts
  const [error, setError] = useState(null);

  // Função para a busca inicial
  const fetchInitialPosts = async () => {
    try {
      const { posts: newPosts, lastDoc: newLastDoc } = await getPosts();
      setPosts(newPosts);
      setLastDoc(newLastDoc);
      if (!newLastDoc) setHasMore(false); // Se não houver lastDoc, não há mais páginas
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar mais posts
  const fetchMorePosts = useCallback(async () => {
    if (!lastDoc) {
        setHasMore(false);
        return;
    }
    setLoadingMore(true);
    try {
      const { posts: newPosts, lastDoc: newLastDoc } = await getPosts(lastDoc);
      setPosts(prevPosts => [...prevPosts, ...newPosts]); // Adiciona os novos posts aos antigos
      setLastDoc(newLastDoc);
      if (!newLastDoc) setHasMore(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingMore(false);
    }
  }, [lastDoc]);

  // Efeito para a busca inicial
  useEffect(() => {
    fetchInitialPosts();
  }, []);

  // Lógica do Intersection Observer
  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if (loading || loadingMore) return; // Não faz nada se já estiver carregando
    if (observer.current) observer.current.disconnect(); // Desconecta o observer antigo
    
    observer.current = new IntersectionObserver(entries => {
      // Se o último elemento estiver visível e houver mais posts, busca a próxima página
      if (entries[0].isIntersecting && hasMore) {
        fetchMorePosts();
      }
    });

    if (node) observer.current.observe(node); // Observa o novo último elemento
  }, [loading, loadingMore, hasMore, fetchMorePosts]);

  if (loading) {
    return <div className="mt-8 flex justify-center"><LoadingSpinner size={8} /></div>;
  }

  if (error) {
    return <div className="bg-white p-4 rounded-lg shadow-md text-red-600">{error}</div>;
  }

  return (
    <div>
      {posts.map((post, index) => {
        // Se este for o último post da lista, adicionamos a ref a ele
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={post.id}>
              <Post post={post} />
            </div>
          );
        } else {
          return <Post key={post.id} post={post} />;
        }
      })}

      {/* Indicador de "carregando mais" */}
      {loadingMore && <div className="my-4 flex justify-center"><LoadingSpinner size={6} /></div>}

      {/* Mensagem de fim de feed */}
      {!loading && !hasMore && (
        <div className="text-center text-gray-500 py-4">
          <p>Você chegou ao fim!</p>
        </div>
      )}
    </div>
  );
};

export default Feed;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Heart, MessageCircle } from 'lucide-react';
import { postsService, type Post } from '@/services/supabaseService';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommentSection from '@/components/common/CommentSection';
import NewsletterSubscription from '@/components/common/NewsletterSubscription';

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

const categoryNames: Record<string, string> = {
  noticias: 'Notícias',
  desporto: 'Desporto', 
  politica: 'Política',
  economia: 'Economia',
  cultura: 'Cultura',
  tecnologia: 'Tecnologia'
};

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const fetchedPost = await postsService.getById(id);
        setPost(fetchedPost);

        if (fetchedPost) {
          // Load related posts from the same category
          const categoryPosts = await postsService.getByCategory(fetchedPost.category);
          const related = categoryPosts
            .filter(p => p.id !== fetchedPost.id && p.status === 'published')
            .slice(0, 5);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleLike = async () => {
    if (!post || liking) return;
    
    try {
      setLiking(true);
      await postsService.like(post.id!);
      setPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLiking(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 page-container">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-pulse">Carregando notícia...</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 page-container">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Notícia não encontrada</h1>
              <Link to="/noticias" className="text-rtam-blue hover:underline">
                Voltar às notícias
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 page-container">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            to="/noticias" 
            className="inline-flex items-center text-rtam-blue hover:text-rtam-blue-dark transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às notícias
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-sm p-6">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="bg-rtam-blue text-white px-3 py-1 text-sm rounded-full">
                    {categoryNames[post.category] || post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-gray-600 text-sm mb-6 pb-6 border-b">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {post.author_name || 'RTVAM'}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(post.created_at!)}
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes} gostos
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments_count} comentários
                  </div>
                </div>

                {/* Featured Image */}
                {post.image_url && (
                  <div className="mb-6">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t">
                  <button
                    onClick={handleLike}
                    disabled={liking}
                    className="inline-flex items-center px-4 py-2 bg-rtam-blue text-white rounded-lg hover:bg-rtam-blue-dark transition-colors disabled:opacity-50"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {liking ? 'A gostar...' : `Gostar (${post.likes})`}
                  </button>
                </div>
              </article>

              {/* Comments Section */}
              <div className="mt-8">
                <CommentSection postId={post.id!} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Notícias Relacionadas</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        to={`/noticias/${relatedPost.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <img 
                            src={relatedPost.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=60'} 
                            alt={relatedPost.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 group-hover:text-rtam-blue transition-colors text-sm line-clamp-2 mb-1">
                              {relatedPost.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(relatedPost.created_at!)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {categoryNames[post.category] || post.category}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore mais notícias desta categoria
                </p>
                <Link 
                  to={`/noticias?categoria=${post.category}`}
                  className="text-rtam-blue hover:text-rtam-blue-dark font-medium text-sm"
                >
                  Ver todas →
                </Link>
              </div>

              {/* Newsletter Subscription */}
              <NewsletterSubscription />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsDetail;

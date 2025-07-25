
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { postsService, type Post } from '@/services/supabaseService';
import { NewsItem } from '@/types/news';
import NewsCarousel from '@/components/news/NewsCarousel';
import PublicationTimeline from '@/components/news/PublicationTimeline';
import NewsByCategory from '@/components/news/NewsByCategory';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BreakingNewsTicker from '@/components/news/BreakingNewsTicker';

// Format date to localized string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

// Category names mapping
const categoryNames: Record<string, string> = {
  noticias: 'Notícias',
  desporto: 'Desporto', 
  politica: 'Política',
  economia: 'Economia',
  cultura: 'Cultura',
  tecnologia: 'Tecnologia'
};

// Breaking news data
const breakingNewsData = [
  "Fortes chuvas causam inundações no norte de Moçambique. Autoridades emitem alerta para moradores.",
  "Presidente anuncia novo pacote de investimentos para o setor de telecomunicações.",
  "Costa do Sol vence o Ferroviário por 2-0 e mantém liderança no Moçambola.",
  "Ministério da Saúde lança campanha de vacinação contra malária em cinco províncias.",
  "Novo campus universitário será inaugurado em Nampula no próximo mês.",
  "Assembleia da República aprova orçamento para desenvolvimento de infraestruturas."
];

const News = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('categoria');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let fetchedPosts;
        if (selectedCategory) {
          fetchedPosts = await postsService.getByCategory(selectedCategory);
        } else {
          fetchedPosts = await postsService.getAll();
        }
        setPosts(fetchedPosts.filter(post => post.status === 'published'));
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [selectedCategory]);

  const featuredNews = posts.slice(0, 5);
  
  // Group posts by category
  const postsByCategory = posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  return (
    <div className="min-h-screen bg-white pb-12">
      <Navbar />
      <div className="pt-16 page-container">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-rtam-blue mb-8">
              {selectedCategory ? `Notícias - ${categoryNames[selectedCategory] || selectedCategory}` : 'Notícias'}
            </h1>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-pulse">Carregando notícias...</div>
              </div>
            ) : (
              <>
                {/* Category Filter */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    <Link 
                      to="/noticias" 
                      className={`px-4 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-rtam-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      Todas
                    </Link>
                    {Object.entries(categoryNames).map(([categoryId, categoryName]) => (
                      <Link 
                        key={categoryId}
                        to={`/noticias?categoria=${categoryId}`}
                        className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === categoryId ? 'bg-rtam-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {categoryName}
                      </Link>
                    ))}
                  </div>
                </div>

                {featuredNews.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Featured News Carousel */}
                    <div className="lg:col-span-2">
                      <NewsCarousel featuredNews={featuredNews.map(post => ({
                        id: parseInt(post.id!),
                        title: post.title,
                        date: post.created_at!,
                        image: post.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60',
                        url: `/noticias/${post.id}`,
                        category: post.category,
                        source: post.author_name || 'RTVAM'
                      }))} formatDate={formatDate} />
                    </div>
                    
                    {/* News Timeline */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <h2 className="text-xl font-bold text-rtam-blue mb-4">Últimas Notícias</h2>
                      <PublicationTimeline news={posts.slice(0, 10).map(post => ({
                        id: parseInt(post.id!),
                        title: post.title,
                        date: post.created_at!,
                        image: post.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60',
                        url: `/noticias/${post.id}`,
                        category: post.category,
                        source: post.author_name || 'RTVAM',
                        categoryTitle: categoryNames[post.category] || post.category
                      }))} formatDate={formatDate} />
                    </div>
                  </div>
                )}
                
                {/* All Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Link 
                      key={post.id} 
                      to={`/noticias/${post.id}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60'} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-rtam-blue text-white px-2 py-1 text-xs rounded">
                            {categoryNames[post.category] || post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-rtam-blue transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.content.substring(0, 100)}...</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>{post.author_name || 'RTVAM'}</span>
                          <span>{formatDate(post.created_at!)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {posts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhuma notícia encontrada.</p>
                  </div>
                )}
              </>
            )}
          </div>
      </div>
      <Footer />
      <BreakingNewsTicker news={breakingNewsData} />
    </div>
  );
};

export default News;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Youtube, Twitter, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample Twitter feed data
const twitterPosts = [
  {
    id: 1,
    username: 'RTAM_Mocambique',
    handle: '@RTAM_Oficial',
    content: 'Não perca o Jornal Académico, hoje às 19h com as principais notícias do dia para a comunidade universitária. #JornalAcademico #RTAM',
    date: '28 maio, 2023',
    avatar: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    username: 'RTAM_Mocambique',
    handle: '@RTAM_Oficial',
    content: 'A #ManhãAcadémica recebe amanhã o Reitor da Universidade Eduardo Mondlane para discutir os novos projetos de pesquisa. Sintonize às 8h!',
    date: '27 maio, 2023',
    avatar: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    username: 'RTAM_Mocambique',
    handle: '@RTAM_Oficial',
    content: 'Festival Cultural Universitário começa na próxima semana. A RTAM fará cobertura completa de todas as apresentações. #FestivalUniversitário',
    date: '26 maio, 2023',
    avatar: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

// Facebook video embeds
const facebookVideos = [
  {
    id: 1,
    title: 'Entrevista com o Presidente da Associação Académica',
    embed: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F1234567890%2F&show_text=false',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: 2,
    title: 'Cobertura da Semana Científica',
    embed: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F0987654321%2F&show_text=false',
    thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

const SocialFeed = () => {
  const { toast } = useToast();

  const handleFollow = (platform: string) => {
    toast({
      title: `Seguir no ${platform}`,
      description: `Você será redirecionado para a página do ${platform} da RTVAM.`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Compartilhar",
      description: "O link da RTVAM foi copiado para a área de transferência.",
    });
  };

  const handleSubscribe = (email: string) => {
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Inscrição confirmada",
      description: "Obrigado por se inscrever na nossa newsletter!",
    });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-rtam-blue text-center mb-10">Conecte-se Connosco</h2>
        
        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Inscreva-se na nossa Newsletter</h3>
          <p className="text-gray-600 mb-4">Receba as últimas notícias, programação e conteúdos exclusivos diretamente no seu email.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              id="email-newsletter"
              placeholder="Seu endereço de email" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <Button 
              className="bg-rtam-blue hover:bg-rtam-blue-dark text-white"
              onClick={() => handleSubscribe((document.getElementById('email-newsletter') as HTMLInputElement).value)}
            >
              Inscrever-se
            </Button>
          </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Twitter Feed */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-rtam-blue mb-6">Twitter</h2>
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="space-y-5">
                {twitterPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-start">
                      <img 
                        src={post.avatar} 
                        alt={post.username}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-bold text-gray-900">{post.username}</h4>
                          <span className="ml-2 text-gray-500 text-sm">{post.handle}</span>
                        </div>
                        <p className="mt-1 text-gray-700">{post.content}</p>
                        <div className="mt-2 text-gray-500 text-sm">{post.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-center">
                <a 
                  href="https://twitter.com/RTAM_Oficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Ver Mais no Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Facebook Videos */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-rtam-blue mb-6">Vídeos em Destaque</h2>
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="space-y-6">
                {facebookVideos.map((video) => (
                  <div key={video.id} className="group">
                    <h3 className="font-bold text-gray-800 mb-3">{video.title}</h3>
                    <div className="relative rounded-lg overflow-hidden">
                      {/* This would be an iframe in a real implementation */}
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-center">
                <a 
                  href="https://facebook.com/RTAMMocambique" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Ver Mais no Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Social Media Follow Section */}
        <div className="mt-12">
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-rtam-blue to-blue-700 text-white">
              <CardTitle className="text-center text-2xl">Siga-nos nas Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Button 
                    className="w-full bg-[#1877F2] hover:bg-[#1661c7] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('Facebook')}
                  >
                    <Facebook size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">Seguir no</span>
                      <span className="font-bold">Facebook</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">24K seguidores</p>
                </div>
                
                <div className="text-center">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#fd5949] to-[#d6249f] hover:from-[#e0503f] hover:to-[#c2228c] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('Instagram')}
                  >
                    <Instagram size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">Seguir no</span>
                      <span className="font-bold">Instagram</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">15.8K seguidores</p>
                </div>
                
                <div className="text-center">
                  <Button 
                    className="w-full bg-[#FF0000] hover:bg-[#d60000] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('YouTube')}
                  >
                    <Youtube size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">Inscrever no</span>
                      <span className="font-bold">YouTube</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">8.5K inscritos</p>
                </div>
                
                <div className="text-center">
                  <Button 
                    className="w-full bg-[#1DA1F2] hover:bg-[#0d8fd9] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('Twitter')}
                  >
                    <Twitter size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">Seguir no</span>
                      <span className="font-bold">Twitter</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">12.3K seguidores</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Globe size={18} />
                  Compartilhar Nosso Site
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;

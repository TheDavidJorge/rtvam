import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Youtube, Twitter, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import NewsletterSubscription from '@/components/common/NewsletterSubscription';
import { useLanguage } from '@/contexts/LanguageContext';

// Real Twitter posts from RTVAM
const twitterPosts = [
  {
    id: 1,
    username: 'RTVAM Oficial',
    handle: '@RtvamOficial',
    content: 'ANAMALALA e CHEGA firmam acordo de cooperação\n\nO ex-candidato presidencial Venâncio Mondlane, anunciou, nesta terça-feira, um acordo com o partido português CHEGA. Segundo Mondlane, as formações políticas manifestaram abertura para cooperação em diversos níveis.',
    date: '15 Jul, 2025',
    avatar: 'https://pbs.twimg.com/profile_images/1234567890/rtvam_400x400.jpg',
    url: 'https://twitter.com/RtvamOficial/status/1945119157449523601',
  },
  {
    id: 2,
    username: 'RTVAM Oficial',
    handle: '@RtvamOficial',
    content: 'Presidente Lula assinou decreto que regulamenta a Lei da Reciprocidade, permitindo contramedidas a tarifas de 50% anunciadas por Trump sobre produtos brasileiros a partir de 01/08. A medida responde a barreiras comerciais e protege exportações, negando excedente alegado por Trump',
    date: '15 Jul, 2025',
    avatar: 'https://pbs.twimg.com/profile_images/1234567890/rtvam_400x400.jpg',
    url: 'https://twitter.com/RtvamOficial/status/1945112362564116834',
  },
  {
    id: 3,
    username: 'RTVAM Oficial',
    handle: '@RtvamOficial',
    content: 'O Governo anunciou hoje, na Beira, a suspensão definitiva, por ora, do subsídio a estudantes de medicina do 6º ano de universidades públicas. O executivo lamentou a medida, pediu compreensão aos médicos estagiários e destacou que o subsídio era discriminatório.',
    date: '15 Jul, 2025',
    avatar: 'https://pbs.twimg.com/profile_images/1234567890/rtvam_400x400.jpg',
    url: 'https://twitter.com/RtvamOficial/status/1945107416707645794',
  },
  {
    id: 4,
    username: 'RTVAM Oficial',
    handle: '@RtvamOficial',
    content: 'O Governo de Moçambique considerou um "momento histórico e de orgulho nacional" a inscrição do Parque Nacional de Maputo na lista do Património Mundial da UNESCO, decisão tornada pública este sábado, durante a 47.ª sessão da organização, em Paris',
    date: '13 Jul, 2025',
    avatar: 'https://pbs.twimg.com/profile_images/1234567890/rtvam_400x400.jpg',
    url: 'https://twitter.com/RtvamOficial/status/1944425596324385107',
  },
];

// YouTube videos with real content
const youtubeVideos = [
  {
    id: 1,
    title: 'CERIMÓNIA DE GRADUAÇÃO ISCTAC MAPUTO - 28.06.2025',
    embed: 'https://www.youtube.com/embed/d2QpnlD34mw?si=-AhxY_AuILBQwZf7',
    thumbnail: 'https://img.youtube.com/vi/d2QpnlD34mw/maxresdefault.jpg',
  },
  {
    id: 2,
    title: 'POR OUTRO LADO',
    embed: 'https://www.youtube.com/embed/y33Zbdv9CxY?si=VItPECg0ilXtIo9U',
    thumbnail: 'https://img.youtube.com/vi/y33Zbdv9CxY/maxresdefault.jpg',
  },
];

const SocialFeed = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFollow = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'Facebook':
        url = 'https://www.facebook.com/RtvamOficial';
        break;
      case 'Instagram':
        url = 'https://www.instagram.com/rtvamoficial/';
        break;
      case 'YouTube':
        url = 'https://www.youtube.com/@radioetelevisaoacademica';
        break;
      case 'Twitter':
        url = 'https://x.com/RtvamOficial';
        break;
      case 'TikTok':
        url = 'https://www.tiktok.com/@rtvam';
        break;
      default:
        break;
    }
    
    if (url) {
      window.open(url, '_blank');
    }
    
    toast({
      title: `${t('follow_on')} ${platform}`,
      description: `${t('redirect_to')} ${platform} ${t('of_rtvam')}`,
    });
  };

  const handleShare = () => {
    toast({
      title: t('share'),
      description: t('link_copied'),
    });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-rtam-blue text-center mb-10">{t('connect_with_us')}</h2>
        
        <div className="max-w-2xl mx-auto mb-12">
          <NewsletterSubscription />
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Twitter Feed */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-rtam-blue mb-6">Twitter/X</h2>
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="space-y-5">
                {twitterPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-rtam-blue flex items-center justify-center mr-3">
                        <Twitter className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-bold text-gray-900">{post.username}</h4>
                          <span className="ml-2 text-gray-500 text-sm">{post.handle}</span>
                        </div>
                        <p className="mt-1 text-gray-700 whitespace-pre-line">{post.content}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-gray-500 text-sm">{post.date}</span>
                          <a 
                            href={post.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-rtam-blue hover:text-rtam-blue-dark text-sm font-medium"
                          >
                            Ver no Twitter
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-center">
                <Button
                  onClick={() => handleFollow('Twitter')}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  {t('see_more_on')} X (Twitter)
                </Button>
              </div>
            </div>
          </div>

          {/* YouTube Videos */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-rtam-blue mb-6">{t('featured_videos')}</h2>
            <div className="bg-white rounded-lg shadow-md p-5">
              <div className="space-y-6">
                {youtubeVideos.map((video) => (
                  <div key={video.id} className="group">
                    <h3 className="font-bold text-gray-800 mb-3">{video.title}</h3>
                    <div className="relative rounded-lg overflow-hidden">
                      <div className="aspect-video">
                        <iframe
                          src={video.embed}
                          title={video.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-center">
                <Button
                  onClick={() => handleFollow('YouTube')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {t('see_more_on')} YouTube
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Social Media Follow Section */}
        <div className="mt-12">
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-rtam-blue to-blue-700 text-white">
              <CardTitle className="text-center text-2xl">{t('follow_us')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <Button 
                    className="w-full bg-[#1877F2] hover:bg-[#1661c7] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('Facebook')}
                  >
                    <Facebook size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">{t('follow_on')}</span>
                      <span className="font-bold">Facebook</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">24K {t('followers')}</p>
                </div>
                
                <div className="text-center">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#fd5949] to-[#d6249f] hover:from-[#e0503f] hover:to-[#c2228c] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('Instagram')}
                  >
                    <Instagram size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">{t('follow_on')}</span>
                      <span className="font-bold">Instagram</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">15.8K {t('followers')}</p>
                </div>
                
                <div className="text-center">
                  <Button 
                    className="w-full bg-[#FF0000] hover:bg-[#d60000] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('YouTube')}
                  >
                    <Youtube size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">{t('subscribe_to')}</span>
                      <span className="font-bold">YouTube</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">8.5K {t('subscribers')}</p>
                </div>
                
                <div className="text-center">
                  <Button 
                    className="w-full bg-[#000000] hover:bg-[#333333] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('Twitter')}
                  >
                    <Twitter size={24} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">{t('follow_on')}</span>
                      <span className="font-bold">X</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">12.3K {t('followers')}</p>
                </div>
                
                <div className="text-center">
                  <Button 
                    className="w-full bg-[#ff0050] hover:bg-[#e6004a] text-white flex items-center justify-center gap-2 px-4 py-6"
                    onClick={() => handleFollow('TikTok')}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs opacity-80">{t('follow_on')}</span>
                      <span className="font-bold">TikTok</span>
                    </div>
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">5.2K {t('followers')}</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Globe size={18} />
                  {t('share_our_site')}
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


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Youtube, ThumbsUp, MessageSquare, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock data for YouTube videos (simulating content from Radio Académica de Moçambique)
const sportsVideos = [
  {
    id: '1',
    title: 'Melhores momentos: Black Bulls vs. Ferroviário Maputo',
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '2024-05-10',
    views: '1.2K',
    channel: 'Rádio Académica de Moçambique',
    likes: 86,
    comments: 12
  },
  {
    id: '2',
    title: 'Entrevista com Reinildo Mandava',
    thumbnail: 'https://images.unsplash.com/photo-1547691889-841a6f1c5ca6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '2024-05-05',
    views: '3.5K',
    channel: 'Rádio Académica de Moçambique',
    likes: 215,
    comments: 43
  },
  {
    id: '3',
    title: 'Análise tática: Costa do Sol vs. Liga Desportiva',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c643e7d22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '2024-04-28',
    views: '954',
    channel: 'Rádio Académica de Moçambique',
    likes: 67,
    comments: 8
  },
  {
    id: '4',
    title: 'Reportagem: O crescimento do futebol feminino em Moçambique',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '2024-04-20',
    views: '1.7K',
    channel: 'Rádio Académica de Moçambique',
    likes: 143,
    comments: 27
  },
];

const SportsVideos = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePlay = (id: string, title: string) => {
    setActiveVideo(id === activeVideo ? null : id);
    if (id !== activeVideo) {
      toast({
        title: "Video em reprodução",
        description: title,
      });
    }
  };

  const handleShare = (title: string) => {
    toast({
      title: "Compartilhar",
      description: `O link do vídeo "${title}" foi copiado para a área de transferência.`,
    });
  };

  const handleSubscribe = () => {
    toast({
      title: "Inscrição",
      description: "Obrigado por se inscrever no canal da Rádio Académica de Moçambique!",
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-rtam-blue-dark flex items-center">
          <Youtube className="mr-2 text-red-600" /> 
          Vídeos de Desporto
        </h2>
        <Button 
          onClick={handleSubscribe}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Inscrever-se
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sportsVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all cursor-pointer"
                  onClick={() => handlePlay(video.id, video.title)}
                >
                  <Youtube className="h-8 w-8 text-white" />
                </div>
              </div>
              {activeVideo === video.id && (
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center text-white p-4">
                  <p>Reproduzindo vídeo... (Simulação)</p>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-gray-800 line-clamp-2">{video.title}</h3>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{video.date}</span>
                <span>{video.views} visualizações</span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 p-1">
                  <ThumbsUp size={16} /> <span>{video.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 p-1">
                  <MessageSquare size={16} /> <span>{video.comments}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-gray-500 p-1"
                  onClick={() => handleShare(video.title)}
                >
                  <Share size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SportsVideos;

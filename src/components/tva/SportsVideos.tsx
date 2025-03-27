
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Youtube } from 'lucide-react';

// Mock data for YouTube videos
const sportsVideos = [
  {
    id: '1',
    title: 'Melhores momentos: Black Bulls vs. Ferroviário Maputo',
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '2024-05-10',
    views: '1.2K',
    channel: 'Rádio Académica de Moçambique'
  },
  {
    id: '2',
    title: 'Entrevista com Reinildo Mandava',
    thumbnail: 'https://images.unsplash.com/photo-1547691889-841a6f1c5ca6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '2024-05-05',
    views: '3.5K',
    channel: 'Rádio Académica de Moçambique'
  },
  {
    id: '3',
    title: 'Análise tática: Costa do Sol vs. Liga Desportiva',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c643e7d22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    date: '2024-04-28',
    views: '954',
    channel: 'Rádio Académica de Moçambique'
  },
];

const SportsVideos = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-rtam-blue-dark mb-4 flex items-center">
        <Youtube className="mr-2 text-red-600" /> 
        Vídeos de Desporto
      </h2>
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
                <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all cursor-pointer">
                  <Youtube className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-gray-800 line-clamp-2">{video.title}</h3>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{video.date}</span>
                <span>{video.views} visualizações</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SportsVideos;

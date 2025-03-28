
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock data for football news
const footballNews = [
  { 
    title: 'Costa do Sol vence e mantém-se na luta pelo título do Moçambola', 
    date: '2024-05-20', 
    summary: 'O Costa do Sol venceu o Ferroviário de Nampula por 2-0 e mantém-se na luta pelo título do Moçambola.',
    source: 'RTVAM',
    likes: 24,
    comments: 8
  },
  { 
    title: 'Black Bulls mantém liderança com vitória sobre o Ferroviário de Nacala', 
    date: '2024-05-19', 
    summary: 'Os Black Bulls venceram o Ferroviário de Nacala por 3-1 e mantêm a liderança do Moçambola.',
    source: 'RTVAM',
    likes: 42,
    comments: 15
  },
  { 
    title: 'Reinildo Mandava brilha na conquista do título espanhol pelo Atlético Madrid', 
    date: '2024-05-15', 
    summary: 'O internacional moçambicano Reinildo Mandava foi uma peça importante na conquista do título espanhol pelo Atlético Madrid.',
    source: 'Notícias',
    likes: 89,
    comments: 32
  },
  { 
    title: 'Seleção de Moçambique intensifica preparação para as qualificações mundialistas', 
    date: '2024-05-12', 
    summary: 'A seleção nacional de Moçambique intensifica a preparação para os jogos de qualificação para o Mundial 2026.',
    source: 'Jornal Desportivo',
    likes: 56,
    comments: 21
  },
  { 
    title: 'Manchester City conquista quarto título consecutivo na Premier League', 
    date: '2024-05-19', 
    summary: 'O Manchester City conquistou o seu quarto título consecutivo na Premier League, um feito inédito no futebol inglês.',
    source: 'BBC Sport',
    likes: 103,
    comments: 47
  }
];

const FootballNews = () => {
  const [likedNews, setLikedNews] = useState<number[]>([]);
  const { toast } = useToast();
  
  const handleLike = (index: number) => {
    if (!likedNews.includes(index)) {
      setLikedNews([...likedNews, index]);
      toast({
        title: "Obrigado pelo seu voto!",
        description: "Sua interação é importante para nós.",
      });
    }
  };

  const handleComment = (title: string) => {
    toast({
      title: "Comentário",
      description: `Você quer comentar sobre "${title}". Esta funcionalidade estará disponível em breve!`,
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-rtam-blue-dark mb-4">Últimas Notícias</h2>
      <div className="space-y-4">
        {footballNews.map((news, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-gray-50 p-4">
              <CardTitle className="text-base text-gray-800">{news.title}</CardTitle>
              <p className="text-xs text-gray-500 mt-1">{new Date(news.date).toLocaleDateString('pt-PT')} • {news.source}</p>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">{news.summary}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex items-center gap-1 ${likedNews.includes(index) ? 'text-blue-500' : 'text-gray-500'}`}
                    onClick={() => handleLike(index)}
                  >
                    <ThumbsUp size={16} /> 
                    <span>{likedNews.includes(index) ? news.likes + 1 : news.likes}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 text-gray-500"
                    onClick={() => handleComment(news.title)}
                  >
                    <MessageSquare size={16} /> 
                    <span>{news.comments}</span>
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-rtam-blue hover:text-rtam-blue-dark"
                >
                  Ler mais
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FootballNews;

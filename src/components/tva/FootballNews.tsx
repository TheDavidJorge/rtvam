
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for football news
const footballNews = [
  { 
    title: 'Costa do Sol vence e mantém-se na luta pelo título do Moçambola', 
    date: '2024-05-20', 
    summary: 'O Costa do Sol venceu o Ferroviário de Nampula por 2-0 e mantém-se na luta pelo título do Moçambola.',
    source: 'RTVAM'
  },
  { 
    title: 'Black Bulls mantém liderança com vitória sobre o Ferroviário de Nacala', 
    date: '2024-05-19', 
    summary: 'Os Black Bulls venceram o Ferroviário de Nacala por 3-1 e mantêm a liderança do Moçambola.',
    source: 'RTVAM'
  },
  { 
    title: 'Reinildo Mandava brilha na conquista do título espanhol pelo Atlético Madrid', 
    date: '2024-05-15', 
    summary: 'O internacional moçambicano Reinildo Mandava foi uma peça importante na conquista do título espanhol pelo Atlético Madrid.',
    source: 'Notícias'
  },
  { 
    title: 'Seleção de Moçambique intensifica preparação para as qualificações mundialistas', 
    date: '2024-05-12', 
    summary: 'A seleção nacional de Moçambique intensifica a preparação para os jogos de qualificação para o Mundial 2026.',
    source: 'Jornal Desportivo'
  },
  { 
    title: 'Manchester City conquista quarto título consecutivo na Premier League', 
    date: '2024-05-19', 
    summary: 'O Manchester City conquistou o seu quarto título consecutivo na Premier League, um feito inédito no futebol inglês.',
    source: 'BBC Sport'
  }
];

const FootballNews = () => {
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
              <p className="text-sm text-gray-600">{news.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FootballNews;

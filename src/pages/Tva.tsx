
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FootballStandings from '@/components/home/FootballStandings';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for Premier League standings
const premierLeagueTeams = [
  { position: 1, name: 'Manchester City', played: 32, won: 23, drawn: 5, lost: 4, goalsFor: 72, goalsAgainst: 28, points: 74 },
  { position: 2, name: 'Arsenal', played: 32, won: 23, drawn: 4, lost: 5, goalsFor: 77, goalsAgainst: 26, points: 73 },
  { position: 3, name: 'Liverpool', played: 32, won: 21, drawn: 8, lost: 3, goalsFor: 72, goalsAgainst: 31, points: 71 },
  { position: 4, name: 'Aston Villa', played: 33, won: 17, drawn: 6, lost: 10, goalsFor: 65, goalsAgainst: 49, points: 57 },
  { position: 5, name: 'Tottenham', played: 32, won: 16, drawn: 5, lost: 11, goalsFor: 61, goalsAgainst: 49, points: 53 },
  { position: 6, name: 'Newcastle', played: 33, won: 15, drawn: 6, lost: 12, goalsFor: 69, goalsAgainst: 52, points: 51 },
  { position: 7, name: 'Manchester United', played: 31, won: 15, drawn: 5, lost: 11, goalsFor: 49, goalsAgainst: 46, points: 50 },
  { position: 8, name: 'Chelsea', played: 31, won: 13, drawn: 9, lost: 9, goalsFor: 57, goalsAgainst: 51, points: 48 },
  { position: 9, name: 'West Ham', played: 32, won: 11, drawn: 8, lost: 13, goalsFor: 49, goalsAgainst: 61, points: 41 },
  { position: 10, name: 'Bournemouth', played: 32, won: 11, drawn: 8, lost: 13, goalsFor: 46, goalsAgainst: 58, points: 41 }
];

// Mock data for upcoming World Cup qualification matches
const wcQualificationMatches = [
  { date: '7 Jun 2024', homeTeam: 'Moçambique', awayTeam: 'Somália', competition: 'Qualificação Mundial', venue: 'Estádio do Zimpeto' },
  { date: '10 Jun 2024', homeTeam: 'Botswana', awayTeam: 'Moçambique', competition: 'Qualificação Mundial', venue: 'Botswana National Stadium' },
  { date: '21 Mar 2025', homeTeam: 'Moçambique', awayTeam: 'Argélia', competition: 'Qualificação Mundial', venue: 'Estádio do Zimpeto' },
  { date: '24 Mar 2025', homeTeam: 'Gana', awayTeam: 'Moçambique', competition: 'Qualificação Mundial', venue: 'Cape Coast Stadium' },
  { date: '6 Jun 2024', homeTeam: 'Egito', awayTeam: 'Burkina Faso', competition: 'Qualificação Mundial', venue: 'Cairo International Stadium' },
  { date: '7 Jun 2024', homeTeam: 'Marrocos', awayTeam: 'Zâmbia', competition: 'Qualificação Mundial', venue: 'Stade Mohamed V' },
  { date: '8 Jun 2024', homeTeam: 'Nigéria', awayTeam: 'África do Sul', competition: 'Qualificação Mundial', venue: 'Godswill Akpabio Stadium' }
];

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

const Tva = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16 pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-rtam-blue">TVA 2 - Zona Desportiva</h1>
          
          <Tabs defaultValue="mocambola" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="mocambola">Moçambola</TabsTrigger>
              <TabsTrigger value="premier">Premier League</TabsTrigger>
              <TabsTrigger value="mundial">Qualificação Mundial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mocambola" className="animate-fade-in">
              <Card>
                <CardHeader className="bg-rtam-blue text-white">
                  <CardTitle>Classificação Moçambola 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-100">
                          <TableHead className="w-14 text-center">Pos</TableHead>
                          <TableHead>Equipa</TableHead>
                          <TableHead className="w-14 text-center">J</TableHead>
                          <TableHead className="w-14 text-center">V</TableHead>
                          <TableHead className="w-14 text-center">E</TableHead>
                          <TableHead className="w-14 text-center">D</TableHead>
                          <TableHead className="w-14 text-center">GM</TableHead>
                          <TableHead className="w-14 text-center">GS</TableHead>
                          <TableHead className="w-14 text-center">Pts</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* We'll use our existing FootballStandings component's data */}
                        <FootballStandings />
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="premier" className="animate-fade-in">
              <Card>
                <CardHeader className="bg-rtam-blue text-white">
                  <CardTitle>Classificação Premier League 2023/24</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-100">
                          <TableHead className="w-14 text-center">Pos</TableHead>
                          <TableHead>Equipa</TableHead>
                          <TableHead className="w-14 text-center">J</TableHead>
                          <TableHead className="w-14 text-center">V</TableHead>
                          <TableHead className="w-14 text-center">E</TableHead>
                          <TableHead className="w-14 text-center">D</TableHead>
                          <TableHead className="w-14 text-center">GM</TableHead>
                          <TableHead className="w-14 text-center">GS</TableHead>
                          <TableHead className="w-14 text-center">Pts</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {premierLeagueTeams.map((team) => (
                          <TableRow key={team.name} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">{team.position}</TableCell>
                            <TableCell className="font-medium">{team.name}</TableCell>
                            <TableCell className="text-center">{team.played}</TableCell>
                            <TableCell className="text-center">{team.won}</TableCell>
                            <TableCell className="text-center">{team.drawn}</TableCell>
                            <TableCell className="text-center">{team.lost}</TableCell>
                            <TableCell className="text-center">{team.goalsFor}</TableCell>
                            <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                            <TableCell className="text-center font-bold">{team.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mundial" className="animate-fade-in">
              <Card>
                <CardHeader className="bg-rtam-blue text-white">
                  <CardTitle>Jogos de Qualificação para o Mundial 2026 - África</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-100">
                          <TableHead>Data</TableHead>
                          <TableHead>Casa</TableHead>
                          <TableHead>Fora</TableHead>
                          <TableHead>Competição</TableHead>
                          <TableHead>Local</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {wcQualificationMatches.map((match, index) => {
                          const isMozambique = match.homeTeam === 'Moçambique' || match.awayTeam === 'Moçambique';
                          return (
                            <TableRow 
                              key={index} 
                              className={isMozambique ? "bg-yellow-50 hover:bg-yellow-100" : "hover:bg-gray-50"}
                            >
                              <TableCell>{match.date}</TableCell>
                              <TableCell className={match.homeTeam === 'Moçambique' ? "font-bold text-rtam-red" : ""}>
                                {match.homeTeam}
                              </TableCell>
                              <TableCell className={match.awayTeam === 'Moçambique' ? "font-bold text-rtam-red" : ""}>
                                {match.awayTeam}
                              </TableCell>
                              <TableCell>{match.competition}</TableCell>
                              <TableCell>{match.venue}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-rtam-blue-dark mb-4">Últimas Notícias de Futebol</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {footballNews.map((news, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gray-50 p-4">
                    <CardTitle className="text-lg text-gray-800">{news.title}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{new Date(news.date).toLocaleDateString('pt-PT')} • {news.source}</p>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-600">{news.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tva;

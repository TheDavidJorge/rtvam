
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FootballStandings from '@/components/home/FootballStandings';
import PremierLeagueTable from '@/components/tva/PremierLeagueTable';
import WorldCupMatches from '@/components/tva/WorldCupMatches';
import SportsVideos from '@/components/tva/SportsVideos';
import FootballComments from '@/components/tva/FootballComments';
import FootballNews from '@/components/tva/FootballNews';

const Tva = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16 pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-rtam-blue">TVA 2 - Zona Desportiva</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - League tables */}
            <div className="lg:col-span-2">
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
                      <FootballStandings />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="premier" className="animate-fade-in">
                  <Card>
                    <CardHeader className="bg-rtam-blue text-white">
                      <CardTitle>Classificação Premier League 2023/24</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PremierLeagueTable />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="mundial" className="animate-fade-in">
                  <Card>
                    <CardHeader className="bg-rtam-blue text-white">
                      <CardTitle>Jogos de Qualificação para o Mundial 2026 - África</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <WorldCupMatches />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* YouTube Videos Section */}
              <SportsVideos />

              {/* Comments Section */}
              <FootballComments />
            </div>
            
            {/* Right column - News */}
            <div className="lg:col-span-1">
              <FootballNews />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tva;


import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Tva = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16 pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">TVA 2</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="bg-rtam-blue text-white">
                <CardTitle>Notícias de Futebol</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>Acompanhe as últimas notícias sobre o futebol moçambicano e internacional.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-rtam-blue text-white">
                <CardTitle>Transmissões ao Vivo</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>Assista às transmissões ao vivo dos jogos mais importantes do Moçambola.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-rtam-blue text-white">
                <CardTitle>Análises e Comentários</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>Especialistas analisam as partidas e trazem comentários exclusivos sobre o desempenho das equipes.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-rtam-blue text-white">
                <CardTitle>Entrevistas</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>Entrevistas com jogadores, treinadores e personalidades do futebol moçambicano.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-rtam-blue text-white">
                <CardTitle>Classificação</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>Confira a classificação atualizada do Moçambola e de outras competições importantes.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-rtam-blue text-white">
                <CardTitle>Calendário de Jogos</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p>Veja a programação completa dos próximos jogos do Moçambola.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tva;

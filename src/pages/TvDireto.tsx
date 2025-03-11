
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LiveStream from '@/components/tv/LiveStream';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radio, Tv, MonitorPlay } from 'lucide-react';

const TvDireto = () => {
  const [activeTab, setActiveTab] = useState<string>("tva1");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-rtam-blue mb-8">TV Académica Directo</h1>
          
          {/* Players de TV */}
          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="bg-white shadow-md rounded-lg p-6 animate-slide-in">
              <h2 className="section-title mb-4">Transmissão Ao Vivo</h2>
              
              {/* Seletor de canal */}
              <Tabs defaultValue="tva1" className="w-full mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="tva1" className="flex items-center justify-center">
                    <Tv className="w-4 h-4 mr-2" />
                    Televisão Académica
                  </TabsTrigger>
                  <TabsTrigger value="tva2" className="flex items-center justify-center">
                    <MonitorPlay className="w-4 h-4 mr-2" />
                    TVA 2
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="tva1" className="mt-2">
                  <LiveStream 
                    videoUrl="https://www.youtube.com/embed/live_stream?channel=EXAMPLE_CHANNEL_ID_1"
                    title="Televisão Académica"
                    isLive={true}
                    description="Canal principal da TVA com programas noticiosos, debates acadêmicos e conteúdos educativos transmitidos diretamente das universidades de Moçambique."
                  />
                </TabsContent>
                
                <TabsContent value="tva2" className="mt-2">
                  <LiveStream 
                    videoUrl="https://www.youtube.com/embed/live_stream?channel=EXAMPLE_CHANNEL_ID_2"
                    title="TVA 2"
                    isLive={true}
                    description="Canal alternativo da TVA focado em entretenimento, cultura e programas especiais produzidos pelos estudantes universitários."
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Destaques da TV */}
          <div className="mb-12">
            <h2 className="section-title mb-6">Destaques da TV</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden card-hover">
                <div className="aspect-video relative">
                  <img 
                    src="/placeholder.svg" 
                    alt="Debate Académico" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-rtam-blue/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white rounded-full p-3">
                      <Tv className="w-6 h-6 text-rtam-blue" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Debate Académico</h3>
                  <p className="text-gray-600 text-sm mb-2">Quinta-feira, 19:30</p>
                  <p className="text-gray-700">
                    Análise semanal dos principais temas políticos e sociais de Moçambique.
                  </p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden card-hover">
                <div className="aspect-video relative">
                  <img 
                    src="/placeholder.svg" 
                    alt="Cultura Universitária" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-rtam-blue/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white rounded-full p-3">
                      <Tv className="w-6 h-6 text-rtam-blue" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Cultura Universitária</h3>
                  <p className="text-gray-600 text-sm mb-2">Sábado, 16:00</p>
                  <p className="text-gray-700">
                    Programa que destaca as atividades culturais nos campus universitários.
                  </p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden card-hover">
                <div className="aspect-video relative">
                  <img 
                    src="/placeholder.svg" 
                    alt="Jornal Académico" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-rtam-blue/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white rounded-full p-3">
                      <Tv className="w-6 h-6 text-rtam-blue" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Jornal Académico</h3>
                  <p className="text-gray-600 text-sm mb-2">Diariamente, 20:00</p>
                  <p className="text-gray-700">
                    Principais notícias do dia com foco no meio acadêmico e universitário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TvDireto;

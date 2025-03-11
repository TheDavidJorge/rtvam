
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RadioPlayer from '@/components/radio/RadioPlayer';
import RadioSchedule from '@/components/radio/RadioSchedule';
import Presenters from '@/components/radio/Presenters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Radio = () => {
  const [activeTab, setActiveTab] = useState<string>("player");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-rtam-blue mb-8">Rádio Académica de Moçambique</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Player e Introdução - Desktop: Coluna da Esquerda, Mobile: Topo */}
            <div className="lg:col-span-1 order-1 lg:order-1">
              <div className="bg-white shadow-md rounded-lg p-6 mb-8 animate-slide-in">
                <h2 className="section-title mb-4">Transmissão Ao Vivo</h2>
                <div className="mb-6">
                  <RadioPlayer />
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700">
                    Ouça a Rádio Académica de Moçambique 24 horas por dia, com a melhor seleção de música e programas 
                    informativos produzidos pelos estudantes universitários de Moçambique.
                  </p>
                  <p className="text-gray-700 mt-4">
                    Frequência: 98.7 FM (Maputo) | 94.5 FM (Nampula) | 96.3 FM (Beira)
                  </p>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal - Desktop: Coluna da Direita, Mobile: Embaixo */}
            <div className="lg:col-span-2 order-2 lg:order-2">
              <div className="bg-white shadow-md rounded-lg p-6 animate-slide-in">
                {/* Tabs para Mobile e Desktop */}
                <Tabs defaultValue="player" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="schedule">Programação</TabsTrigger>
                    <TabsTrigger value="presenters">Locutores</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="schedule" className="mt-6">
                    <RadioSchedule />
                  </TabsContent>
                  
                  <TabsContent value="presenters" className="mt-6">
                    <Presenters />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Radio;

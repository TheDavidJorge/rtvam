
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RadioPlayer from '@/components/radio/RadioPlayer';
import RadioSchedule from '@/components/radio/RadioSchedule';
import Presenters from '@/components/radio/Presenters';
import AboutUs from '@/components/radio/AboutUs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Radio = () => {
  const [activeTab, setActiveTab] = useState<string>("schedule");
  const radioLogo = "/lovable-uploads/143b33e3-d9cb-4db6-8e79-8cdb091a0a1c.png";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-rtam-blue mb-8">Rádio Académica de Moçambique</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Player e Introdução - Fixed sidebar */}
            <div className="lg:col-span-4 order-1">
              <div className="bg-white shadow-md rounded-lg p-6 mb-8 animate-slide-in sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Transmissão Ao Vivo</h2>
                <div className="mb-6">
                  <RadioPlayer 
                    streamUrl="https://stream.zeno.fm/f32qntg3srhvv" 
                    stationName="Rádio Académica de Moçambique"
                    stationLogo={radioLogo}
                  />
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700">
                    Ouça a Rádio Académica de Moçambique 24 horas por dia, com a melhor seleção de música e programas 
                    informativos.
                  </p>
                  <p className="text-gray-700 mt-4">
                    Frequência: 88.0 FM (Beira)
                  </p>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal - Main content area */}
            <div className="lg:col-span-8 order-2">
              <div className="bg-white shadow-md rounded-lg p-6 animate-slide-in">
                {/* Tabs para Mobile e Desktop */}
                <Tabs defaultValue="schedule" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="schedule">Programação</TabsTrigger>
                    <TabsTrigger value="presenters">Locutores</TabsTrigger>
                    <TabsTrigger value="about">Sobre Nós</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="schedule" className="mt-6">
                    <RadioSchedule />
                  </TabsContent>
                  
                  <TabsContent value="presenters" className="mt-6">
                    <Presenters />
                  </TabsContent>

                  <TabsContent value="about" className="mt-6">
                    <AboutUs />
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

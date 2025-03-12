
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from '@/lib/utils';

// Reutilizando os dados do componente RadioSchedule
const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const weeklySchedule = {
  "Segunda": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "Maria José" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva" },
    { time: "09:00 - 12:00", program: "Aula Aberta", host: "Carlos Menezes" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos" },
    { time: "15:00 - 17:00", program: "Ciência e Cultura", host: "Marta Luís" },
    { time: "17:00 - 19:00", program: "Desporto Universitário", host: "João Mutondo" },
    { time: "19:00 - 20:30", program: "Debate Académico", host: "Filipe Costa" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe" },
    { time: "22:00 - 00:00", program: "Jazz e Blues", host: "André Matola" }
  ],
  "Terça": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "Maria José" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva" },
    { time: "09:00 - 12:00", program: "Pesquisa em Foco", host: "Rosa Mateus" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos" },
    { time: "15:00 - 17:00", program: "Tecnologia e Inovação", host: "Hélio Chaves" },
    { time: "17:00 - 19:00", program: "Economia e Sociedade", host: "Teresa Machava" },
    { time: "19:00 - 20:30", program: "Debate Académico", host: "Filipe Costa" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe" },
    { time: "22:00 - 00:00", program: "Rock Alternativo", host: "Carlos Menezes" }
  ],
  "Quarta": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "Maria José" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva" },
    { time: "09:00 - 12:00", program: "Saúde e Bem-estar", host: "Laura Ngonga" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos" },
    { time: "15:00 - 17:00", program: "Ambiente e Sustentabilidade", host: "Marta Luís" },
    { time: "17:00 - 19:00", program: "Artes e Letras", host: "Alexandre Maputo" },
    { time: "19:00 - 20:30", program: "Entrevista da Semana", host: "Helena Buque" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe" },
    { time: "22:00 - 00:00", program: "Música Africana", host: "André Matola" }
  ],
  "Quinta": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "Maria José" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva" },
    { time: "09:00 - 12:00", program: "Direito e Cidadania", host: "Alberto Simango" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos" },
    { time: "15:00 - 17:00", program: "Tecnologia e Inovação", host: "Hélio Chaves" },
    { time: "17:00 - 19:00", program: "Desporto Universitário", host: "João Mutondo" },
    { time: "19:00 - 20:30", program: "Debate Académico", host: "Filipe Costa" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe" },
    { time: "22:00 - 00:00", program: "Hip Hop e R&B", host: "Fábio Murima" }
  ],
  "Sexta": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "Maria José" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva" },
    { time: "09:00 - 12:00", program: "Aula Aberta", host: "Carlos Menezes" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos" },
    { time: "15:00 - 17:00", program: "Mundo Universitário", host: "Teresa Machava" },
    { time: "17:00 - 19:00", program: "Economia e Sociedade", host: "Teresa Machava" },
    { time: "19:00 - 20:30", program: "Top 10 Semanal", host: "Maria José" },
    { time: "20:30 - 23:00", program: "Sexta Dançante", host: "DJ Académico" },
    { time: "23:00 - 00:00", program: "Madrugada Académica", host: "Fábio Murima" }
  ],
  "Sábado": [
    { time: "04:00 - 07:00", program: "Madrugada de Fim-de-Semana", host: "DJ Académico" },
    { time: "07:00 - 10:00", program: "Bom Dia Fim-de-Semana", host: "Joana Tembe" },
    { time: "10:00 - 12:00", program: "Revista de Imprensa", host: "Helena Buque" },
    { time: "12:00 - 14:00", program: "Almoço Musical", host: "André Matola" },
    { time: "14:00 - 16:00", program: "Mundo dos Livros", host: "Alexandre Maputo" },
    { time: "16:00 - 18:00", program: "Desporto ao Vivo", host: "João Mutondo" },
    { time: "18:00 - 20:00", program: "Entrevista Especial", host: "Filipe Costa" },
    { time: "20:00 - 23:00", program: "Top Hits", host: "Ana Silva" },
    { time: "23:00 - 00:00", program: "Noite de Sábado", host: "DJ Académico" }
  ],
  "Domingo": [
    { time: "04:00 - 08:00", program: "Madrugada de Domingo", host: "DJ Académico" },
    { time: "08:00 - 10:00", program: "Despertar Domingueiro", host: "Paulo Santos" },
    { time: "10:00 - 12:00", program: "Momento Espiritual", host: "Maria José" },
    { time: "12:00 - 14:00", program: "Domingo Musical", host: "André Matola" },
    { time: "14:00 - 16:00", program: "Cinema e Séries", host: "Fábio Murima" },
    { time: "16:00 - 18:00", program: "Resumo Desportivo", host: "João Mutondo" },
    { time: "18:00 - 20:00", program: "Ciência em Destaque", host: "Hélio Chaves" },
    { time: "20:00 - 22:00", program: "Jazz ao Domingo", host: "Alexandre Maputo" },
    { time: "22:00 - 00:00", program: "Preparando a Semana", host: "Marta Luís" }
  ]
};

const Programming = () => {
  // Get current day of week as index (0 = Monday, 6 = Sunday)
  const getTodayIndex = () => {
    const today = new Date().getDay();
    // Convert Sunday (0) to index 6, and others to index-1 (as our array is 0-indexed starting with Monday)
    return today === 0 ? 6 : today - 1;
  };

  const [selectedDay, setSelectedDay] = useState<string>(weekDays[getTodayIndex()]);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // Format current date
    setCurrentDate(format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: pt }));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-rtam-blue mb-4">Grelha de Programação</h1>
          <p className="text-gray-600 mb-8">Confira a programação completa da Rádio e Televisão Académica de Moçambique</p>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-rtam-blue-dark mb-1">{selectedDay}-feira</h2>
              <p className="text-gray-600">{currentDate}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {weekDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    selectedDay === day 
                      ? "bg-rtam-blue text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableCaption>Programação de {selectedDay}-feira</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Horário</TableHead>
                    <TableHead>Programa</TableHead>
                    <TableHead className="hidden md:table-cell">Apresentador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklySchedule[selectedDay as keyof typeof weeklySchedule].map((slot, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <TableCell className="font-medium">{slot.time}</TableCell>
                      <TableCell>{slot.program}</TableCell>
                      <TableCell className="hidden md:table-cell">{slot.host}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>A programação está sujeita a alterações sem aviso prévio.</p>
              <p className="mt-1">Para mais informações, contacte-nos: +258 21 123 456</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Programming;

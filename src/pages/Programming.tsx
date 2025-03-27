
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

// Usando a mesma nova grelha de programação
const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const weeklySchedule = {
  "Segunda": [
    { time: "04:00", program: "Abertura de Emissão", host: "" },
    { time: "07:00 - 10:00", program: "Bom Dia Beira", host: "Ana Silva" },
    { time: "10:00 - 12:00", program: "Explosão Matinal", host: "Carlos Menezes" },
    { time: "12:00 - 13:00", program: "Espaço Empresarial", host: "Teresa Machava" },
    { time: "13:00 - 15:00", program: "Música ao Seu Gosto", host: "Paulo Santos" },
    { time: "15:00 - 16:00", program: "A Voz do Povo", host: "Helena Buque" },
    { time: "16:00 - 17:00", program: "Personalidade Académica", host: "Alexandre Maputo" },
    { time: "17:00 - 19:00", program: "Trânsito Seguro", host: "João Mutondo" },
    { time: "19:40 - 20:30", program: "Jornal TVA", host: "Equipa de Jornalismo" },
    { time: "20:30 - 22:00", program: "Músicas Variadas", host: "DJ Académico" },
    { time: "22:00 - 23:00", program: "Jornal TVA (Repetição)", host: "Equipa de Jornalismo" },
    { time: "23:00 - 00:00", program: "Músicas Variadas", host: "DJ Académico" },
    { time: "00:00 - 04:00", program: "Fecho de Emissão", host: "" }
  ],
  "Terça": [
    { time: "04:00", program: "Abertura de Emissão", host: "" },
    { time: "07:00 - 10:00", program: "Bom Dia Beira", host: "Ana Silva" },
    { time: "10:00 - 12:00", program: "Explosão Matinal", host: "Carlos Menezes" },
    { time: "12:00 - 13:00", program: "Espaço Empresarial", host: "Teresa Machava" },
    { time: "13:00 - 15:00", program: "Música ao Seu Gosto", host: "Paulo Santos" },
    { time: "15:00 - 16:00", program: "A Voz do Povo", host: "Helena Buque" },
    { time: "16:00 - 17:00", program: "Desporto Total", host: "João Mutondo" },
    { time: "17:00 - 19:00", program: "Trânsito Seguro", host: "Maria José" },
    { time: "19:40 - 20:30", program: "Jornal TVA", host: "Equipa de Jornalismo" },
    { time: "20:30 - 22:00", program: "Amor Além da Palavra", host: "Joana Tembe" },
    { time: "22:00 - 23:00", program: "Jornal TVA (Repetição)", host: "Equipa de Jornalismo" },
    { time: "23:00 - 00:00", program: "Músicas Variadas", host: "DJ Académico" },
    { time: "00:00 - 04:00", program: "Fecho de Emissão", host: "" }
  ],
  "Quarta": [
    { time: "04:00", program: "Abertura de Emissão", host: "" },
    { time: "07:00 - 10:00", program: "Bom Dia Beira", host: "Ana Silva" },
    { time: "10:00 - 12:00", program: "Explosão Matinal", host: "Carlos Menezes" },
    { time: "12:00 - 13:00", program: "Espaço Empresarial", host: "Teresa Machava" },
    { time: "13:00 - 15:00", program: "Música ao Seu Gosto", host: "Paulo Santos" },
    { time: "15:00 - 16:00", program: "A Voz do Povo", host: "Helena Buque" },
    { time: "16:00 - 17:00", program: "Personalidades Académicas", host: "Alexandre Maputo" },
    { time: "17:00 - 19:00", program: "Trânsito Seguro", host: "Maria José" },
    { time: "19:40 - 20:30", program: "Jornal TVA", host: "Equipa de Jornalismo" },
    { time: "20:30 - 22:00", program: "Amor Além da Palavra", host: "Joana Tembe" },
    { time: "22:00 - 23:00", program: "Jornal TVA (Repetição)", host: "Equipa de Jornalismo" },
    { time: "23:00 - 00:00", program: "Músicas Variadas", host: "DJ Académico" },
    { time: "00:00 - 04:00", program: "Fecho de Emissão", host: "" }
  ],
  "Quinta": [
    { time: "04:00", program: "Abertura de Emissão", host: "" },
    { time: "07:00 - 10:00", program: "Bom Dia Beira", host: "Ana Silva" },
    { time: "10:00 - 12:00", program: "Explosão Matinal", host: "Carlos Menezes" },
    { time: "12:00 - 13:00", program: "Espaço Empresarial", host: "Teresa Machava" },
    { time: "13:00 - 15:00", program: "Música ao Seu Gosto", host: "Paulo Santos" },
    { time: "15:00 - 16:00", program: "A Voz do Povo", host: "Helena Buque" },
    { time: "16:00 - 17:00", program: "Consultório Psicológico", host: "Marta Luís" },
    { time: "17:00 - 19:00", program: "Trânsito Seguro", host: "Maria José" },
    { time: "19:40 - 20:30", program: "Jornal TVA", host: "Equipa de Jornalismo" },
    { time: "20:30 - 22:00", program: "Debate Acadêmico", host: "Filipe Costa" },
    { time: "22:00 - 23:00", program: "Jornal TVA (Repetição)", host: "Equipa de Jornalismo" },
    { time: "23:00 - 00:00", program: "Músicas Variadas", host: "DJ Académico" },
    { time: "00:00 - 04:00", program: "Fecho de Emissão", host: "" }
  ],
  "Sexta": [
    { time: "04:00", program: "Abertura de Emissão", host: "" },
    { time: "07:00 - 10:00", program: "Bom Dia Beira", host: "Ana Silva" },
    { time: "10:00 - 12:00", program: "Explosão Matinal", host: "Carlos Menezes" },
    { time: "12:00 - 13:00", program: "Espaço Empresarial", host: "Teresa Machava" },
    { time: "13:00 - 15:00", program: "Música ao Seu Gosto", host: "Paulo Santos" },
    { time: "15:00 - 16:00", program: "A Voz do Povo", host: "Helena Buque" },
    { time: "16:00 - 17:00", program: "Figuras Acadêmicas que Marcam", host: "Alexandre Maputo" },
    { time: "17:00 - 19:00", program: "Trânsito Seguro", host: "Maria José" },
    { time: "19:40 - 20:30", program: "Jornal TVA", host: "Equipa de Jornalismo" },
    { time: "20:30 - 22:00", program: "Noitada Acadêmica", host: "Joana Tembe" },
    { time: "22:00 - 23:00", program: "Jornal TVA (Repetição)", host: "Equipa de Jornalismo" },
    { time: "23:00 - 00:00", program: "Músicas Variadas", host: "DJ Académico" },
    { time: "00:00 - 04:00", program: "Fecho de Emissão", host: "" }
  ],
  "Sábado": [
    { time: "04:00", program: "Abertura de Emissão", host: "" },
    { time: "07:00 - 10:00", program: "Giro 88", host: "Paulo Santos" },
    { time: "10:00 - 12:00", program: "Emissão", host: "DJ Académico" },
    { time: "12:00 - 13:30", program: "Artista da Semana", host: "André Matola" },
    { time: "13:30 - 15:00", program: "Andhu Athu (Nossa Gente)", host: "Rosa Mateus" },
    { time: "15:00 - 17:30", program: "Sábado à Tarde", host: "Joana Tembe" },
    { time: "18:00 - 19:30", program: "As Mais Ouvidas da Semana", host: "Maria José" },
    { time: "19:40 - 20:30", program: "Jornal TVA", host: "Equipa de Jornalismo" },
    { time: "20:30 - 23:00", program: "Acadêmica In The Mix", host: "DJ Académico" },
    { time: "23:00 - 00:00", program: "Músicas Variadas", host: "Fábio Murima" },
    { time: "00:00 - 04:00", program: "Fecho de Emissão", host: "" }
  ],
  "Domingo": [
    { time: "04:00", program: "Abertura de Emissão", host: "" },
    { time: "07:00 - 09:30", program: "Intensidade Acadêmica", host: "Fábio Murima" },
    { time: "09:30 - 12:00", program: "Alô Amiguinho", host: "Maria José" },
    { time: "12:00 - 14:00", program: "Impacto Semanal", host: "Filipe Costa" },
    { time: "14:00 - 16:00", program: "Conexão Jovem", host: "Joana Tembe" },
    { time: "16:00 - 18:00", program: "Emissão", host: "DJ Académico" },
    { time: "18:00 - 19:30", program: "Figuras que Marcam", host: "Alexandre Maputo" },
    { time: "19:30 - 21:00", program: "Amor Além da Palavra", host: "Helena Buque" },
    { time: "21:00 - 00:00", program: "Músicas Variadas", host: "DJ Académico" },
    { time: "00:00 - 04:00", program: "Fecho de Emissão", host: "" }
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

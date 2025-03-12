
import React, { useState, useEffect } from 'react';
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
import { List, Grid, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Dados de exemplo para a grelha de programação
const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const weeklySchedule = {
  "Segunda": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "João Silva", image: "/placeholder.svg" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva", image: "/placeholder.svg" },
    { time: "09:00 - 12:00", program: "Aula Aberta", host: "Carlos Menezes", image: "/placeholder.svg" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo", image: "/placeholder.svg" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos", image: "/placeholder.svg" },
    { time: "15:00 - 17:00", program: "Ciência e Cultura", host: "Marta Luís", image: "/placeholder.svg" },
    { time: "17:00 - 19:00", program: "Desporto Universitário", host: "João Mutondo", image: "/placeholder.svg" },
    { time: "19:00 - 20:30", program: "Debate Académico", host: "Filipe Costa", image: "/placeholder.svg" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe", image: "/placeholder.svg" },
    { time: "22:00 - 00:00", program: "Jazz e Blues", host: "André Matola", image: "/placeholder.svg" }
  ],
  "Terça": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "João Silva", image: "/placeholder.svg" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva", image: "/placeholder.svg" },
    { time: "09:00 - 12:00", program: "Pesquisa em Foco", host: "Rosa Mateus", image: "/placeholder.svg" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo", image: "/placeholder.svg" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos", image: "/placeholder.svg" },
    { time: "15:00 - 17:00", program: "Tecnologia e Inovação", host: "Hélio Chaves", image: "/placeholder.svg" },
    { time: "17:00 - 19:00", program: "Economia e Sociedade", host: "Teresa Machava", image: "/placeholder.svg" },
    { time: "19:00 - 20:30", program: "Debate Académico", host: "Filipe Costa", image: "/placeholder.svg" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe", image: "/placeholder.svg" },
    { time: "22:00 - 00:00", program: "Rock Alternativo", host: "Carlos Menezes", image: "/placeholder.svg" }
  ],
  "Quarta": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "João Silva", image: "/placeholder.svg" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva", image: "/placeholder.svg" },
    { time: "09:00 - 12:00", program: "Saúde e Bem-estar", host: "Laura Ngonga", image: "/placeholder.svg" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo", image: "/placeholder.svg" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos", image: "/placeholder.svg" },
    { time: "15:00 - 17:00", program: "Ambiente e Sustentabilidade", host: "Marta Luís", image: "/placeholder.svg" },
    { time: "17:00 - 19:00", program: "Artes e Letras", host: "Alexandre Maputo", image: "/placeholder.svg" },
    { time: "19:00 - 20:30", program: "Entrevista da Semana", host: "Helena Buque", image: "/placeholder.svg" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe", image: "/placeholder.svg" },
    { time: "22:00 - 00:00", program: "Música Africana", host: "André Matola", image: "/placeholder.svg" }
  ],
  "Quinta": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "João Silva", image: "/placeholder.svg" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva", image: "/placeholder.svg" },
    { time: "09:00 - 12:00", program: "Direito e Cidadania", host: "Alberto Simango", image: "/placeholder.svg" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo", image: "/placeholder.svg" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos", image: "/placeholder.svg" },
    { time: "15:00 - 17:00", program: "Tecnologia e Inovação", host: "Hélio Chaves", image: "/placeholder.svg" },
    { time: "17:00 - 19:00", program: "Desporto Universitário", host: "João Mutondo", image: "/placeholder.svg" },
    { time: "19:00 - 20:30", program: "Debate Académico", host: "Filipe Costa", image: "/placeholder.svg" },
    { time: "20:30 - 22:00", program: "Noite Académica", host: "Joana Tembe", image: "/placeholder.svg" },
    { time: "22:00 - 00:00", program: "Hip Hop e R&B", host: "Fábio Murima", image: "/placeholder.svg" }
  ],
  "Sexta": [
    { time: "04:00 - 06:00", program: "Madrugada Académica", host: "João Silva", image: "/placeholder.svg" },
    { time: "06:00 - 09:00", program: "Manhã Académica", host: "Ana Silva", image: "/placeholder.svg" },
    { time: "09:00 - 12:00", program: "Aula Aberta", host: "Carlos Menezes", image: "/placeholder.svg" },
    { time: "12:00 - 13:00", program: "Jornal Académico", host: "Equipa de Jornalismo", image: "/placeholder.svg" },
    { time: "13:00 - 15:00", program: "Tarde Académica", host: "Paulo Santos", image: "/placeholder.svg" },
    { time: "15:00 - 17:00", program: "Mundo Universitário", host: "Teresa Machava", image: "/placeholder.svg" },
    { time: "17:00 - 19:00", program: "Economia e Sociedade", host: "Teresa Machava", image: "/placeholder.svg" },
    { time: "19:00 - 20:30", program: "Top 10 Semanal", host: "Maria José", image: "/placeholder.svg" },
    { time: "20:30 - 23:00", program: "Sexta Dançante", host: "DJ Académico", image: "/placeholder.svg" },
    { time: "23:00 - 00:00", program: "Madrugada Académica", host: "Fábio Murima", image: "/placeholder.svg" }
  ],
  "Sábado": [
    { time: "04:00 - 07:00", program: "Madrugada Académica", host: "Paulo Santos", image: "/placeholder.svg" },
    { time: "07:00 - 10:00", program: "Bom Dia Fim-de-Semana", host: "Joana Tembe", image: "/placeholder.svg" },
    { time: "10:00 - 12:00", program: "Revista de Imprensa", host: "Helena Buque", image: "/placeholder.svg" },
    { time: "12:00 - 14:00", program: "Almoço Musical", host: "André Matola", image: "/placeholder.svg" },
    { time: "14:00 - 16:00", program: "Mundo dos Livros", host: "Alexandre Maputo", image: "/placeholder.svg" },
    { time: "16:00 - 18:00", program: "Desporto ao Vivo", host: "João Mutondo", image: "/placeholder.svg" },
    { time: "18:00 - 20:00", program: "Entrevista Especial", host: "Filipe Costa", image: "/placeholder.svg" },
    { time: "20:00 - 23:00", program: "Top Hits", host: "Ana Silva", image: "/placeholder.svg" },
    { time: "23:00 - 00:00", program: "Noite de Sábado", host: "DJ Académico", image: "/placeholder.svg" }
  ],
  "Domingo": [
    { time: "04:00 - 08:00", program: "Madrugada Domingueira", host: "Fábio Murima", image: "/placeholder.svg" },
    { time: "08:00 - 10:00", program: "Despertar Domingueiro", host: "Paulo Santos", image: "/placeholder.svg" },
    { time: "10:00 - 12:00", program: "Momento Espiritual", host: "Maria José", image: "/placeholder.svg" },
    { time: "12:00 - 14:00", program: "Domingo Musical", host: "André Matola", image: "/placeholder.svg" },
    { time: "14:00 - 16:00", program: "Cinema e Séries", host: "Fábio Murima", image: "/placeholder.svg" },
    { time: "16:00 - 18:00", program: "Resumo Desportivo", host: "João Mutondo", image: "/placeholder.svg" },
    { time: "18:00 - 20:00", program: "Ciência em Destaque", host: "Hélio Chaves", image: "/placeholder.svg" },
    { time: "20:00 - 22:00", program: "Jazz ao Domingo", host: "Alexandre Maputo", image: "/placeholder.svg" },
    { time: "22:00 - 00:00", program: "Preparando a Semana", host: "Marta Luís", image: "/placeholder.svg" }
  ]
};

enum ViewType {
  LIST = 'list',
  GRID = 'grid'
}

const RadioSchedule = () => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [viewType, setViewType] = useState<ViewType>(ViewType.LIST);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Get current day of the week
    const date = new Date();
    const dayIndex = date.getDay();
    // Convert from 0-6 (Sunday-Saturday) to our format
    const dayMapping: Record<number, string> = {
      0: "Domingo",
      1: "Segunda",
      2: "Terça",
      3: "Quarta",
      4: "Quinta",
      5: "Sexta",
      6: "Sábado"
    };
    setSelectedDay(dayMapping[dayIndex]);
    
    // Format current date
    setCurrentDate(format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR }));
  }, []);

  const toggleViewType = (type: ViewType) => {
    setViewType(type);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="section-title mb-2">Grelha de Programação</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => toggleViewType(ViewType.LIST)}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewType === ViewType.LIST 
                ? "bg-rtam-blue text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <List className="w-5 h-5" />
          </button>
          <button 
            onClick={() => toggleViewType(ViewType.GRID)}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewType === ViewType.GRID
                ? "bg-rtam-blue text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-2">
          <Calendar className="w-4 h-4 mr-2 text-rtam-blue" />
          <span className="font-medium">{selectedDay}</span>
        </div>
        <p className="text-sm text-gray-500">{currentDate}</p>
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
      
      {viewType === ViewType.LIST ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableCaption>Programação de {selectedDay}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Horário</TableHead>
                <TableHead>Programa</TableHead>
                <TableHead className="hidden md:table-cell">Apresentador</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedDay && weeklySchedule[selectedDay as keyof typeof weeklySchedule]?.map((slot, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <TableCell className="font-medium">{slot.time}</TableCell>
                  <TableCell>{slot.program}</TableCell>
                  <TableCell className="hidden md:table-cell">{slot.host}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedDay && weeklySchedule[selectedDay as keyof typeof weeklySchedule]?.map((slot, index) => (
            <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-100">
                <img src={slot.image} alt={slot.program} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-rtam-blue">{slot.time}</p>
                <h3 className="font-bold text-lg mt-1">{slot.program}</h3>
                <p className="text-gray-600 text-sm mt-1">{slot.host}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>A programação está sujeita a alterações sem aviso prévio.</p>
        <p className="mt-1">Para mais informações, contacte-nos: +258 21 123 456</p>
      </div>
    </div>
  );
};

export default RadioSchedule;

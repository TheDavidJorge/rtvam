
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

// Dados atualizados para a grelha de programação
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
              <div className="p-4">
                <p className="text-sm font-medium text-rtam-blue">{slot.time}</p>
                <h3 className="font-bold text-lg mt-1">{slot.program}</h3>
                {slot.host && <p className="text-gray-600 text-sm mt-1">{slot.host}</p>}
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

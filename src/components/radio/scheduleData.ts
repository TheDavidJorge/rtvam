
// Weekly schedule data for the radio programs

export const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export interface ScheduleSlot {
  time: string;
  program: string;
  host: string;
}

export const weeklySchedule: Record<string, ScheduleSlot[]> = {
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

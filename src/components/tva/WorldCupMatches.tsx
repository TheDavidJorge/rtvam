
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for upcoming World Cup qualification matches
const wcQualificationMatches = [
  { date: '7 Jun 2024', homeTeam: 'Moçambique', awayTeam: 'Somália', competition: 'Qualificação Mundial', venue: 'Estádio do Zimpeto' },
  { date: '10 Jun 2024', homeTeam: 'Botswana', awayTeam: 'Moçambique', competition: 'Qualificação Mundial', venue: 'Botswana National Stadium' },
  { date: '21 Mar 2025', homeTeam: 'Moçambique', awayTeam: 'Argélia', competition: 'Qualificação Mundial', venue: 'Estádio do Zimpeto' },
  { date: '24 Mar 2025', homeTeam: 'Gana', awayTeam: 'Moçambique', competition: 'Qualificação Mundial', venue: 'Cape Coast Stadium' },
  { date: '6 Jun 2024', homeTeam: 'Egito', awayTeam: 'Burkina Faso', competition: 'Qualificação Mundial', venue: 'Cairo International Stadium' },
  { date: '7 Jun 2024', homeTeam: 'Marrocos', awayTeam: 'Zâmbia', competition: 'Qualificação Mundial', venue: 'Stade Mohamed V' },
  { date: '8 Jun 2024', homeTeam: 'Nigéria', awayTeam: 'África do Sul', competition: 'Qualificação Mundial', venue: 'Godswill Akpabio Stadium' }
];

const WorldCupMatches = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Data</TableHead>
            <TableHead>Casa</TableHead>
            <TableHead>Fora</TableHead>
            <TableHead className="hidden md:table-cell">Competição</TableHead>
            <TableHead className="hidden md:table-cell">Local</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wcQualificationMatches.map((match, index) => {
            const isMozambique = match.homeTeam === 'Moçambique' || match.awayTeam === 'Moçambique';
            return (
              <TableRow 
                key={index} 
                className={isMozambique ? "bg-yellow-50 hover:bg-yellow-100" : "hover:bg-gray-50"}
              >
                <TableCell>{match.date}</TableCell>
                <TableCell className={match.homeTeam === 'Moçambique' ? "font-bold text-rtam-red" : ""}>
                  {match.homeTeam}
                </TableCell>
                <TableCell className={match.awayTeam === 'Moçambique' ? "font-bold text-rtam-red" : ""}>
                  {match.awayTeam}
                </TableCell>
                <TableCell className="hidden md:table-cell">{match.competition}</TableCell>
                <TableCell className="hidden md:table-cell">{match.venue}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorldCupMatches;

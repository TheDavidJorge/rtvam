
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for Premier League standings
const premierLeagueTeams = [
  { position: 1, name: 'Manchester City', played: 32, won: 23, drawn: 5, lost: 4, goalsFor: 72, goalsAgainst: 28, points: 74 },
  { position: 2, name: 'Arsenal', played: 32, won: 23, drawn: 4, lost: 5, goalsFor: 77, goalsAgainst: 26, points: 73 },
  { position: 3, name: 'Liverpool', played: 32, won: 21, drawn: 8, lost: 3, goalsFor: 72, goalsAgainst: 31, points: 71 },
  { position: 4, name: 'Aston Villa', played: 33, won: 17, drawn: 6, lost: 10, goalsFor: 65, goalsAgainst: 49, points: 57 },
  { position: 5, name: 'Tottenham', played: 32, won: 16, drawn: 5, lost: 11, goalsFor: 61, goalsAgainst: 49, points: 53 },
  { position: 6, name: 'Newcastle', played: 33, won: 15, drawn: 6, lost: 12, goalsFor: 69, goalsAgainst: 52, points: 51 },
  { position: 7, name: 'Manchester United', played: 31, won: 15, drawn: 5, lost: 11, goalsFor: 49, goalsAgainst: 46, points: 50 },
  { position: 8, name: 'Chelsea', played: 31, won: 13, drawn: 9, lost: 9, goalsFor: 57, goalsAgainst: 51, points: 48 },
  { position: 9, name: 'West Ham', played: 32, won: 11, drawn: 8, lost: 13, goalsFor: 49, goalsAgainst: 61, points: 41 },
  { position: 10, name: 'Bournemouth', played: 32, won: 11, drawn: 8, lost: 13, goalsFor: 46, goalsAgainst: 58, points: 41 }
];

const PremierLeagueTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-14 text-center">Pos</TableHead>
            <TableHead>Equipa</TableHead>
            <TableHead className="w-14 text-center">J</TableHead>
            <TableHead className="w-14 text-center">V</TableHead>
            <TableHead className="w-14 text-center">E</TableHead>
            <TableHead className="w-14 text-center">D</TableHead>
            <TableHead className="w-14 text-center">GM</TableHead>
            <TableHead className="w-14 text-center">GS</TableHead>
            <TableHead className="w-14 text-center">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {premierLeagueTeams.map((team) => (
            <TableRow key={team.name} className="hover:bg-gray-50">
              <TableCell className="text-center font-medium">{team.position}</TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell className="text-center">{team.played}</TableCell>
              <TableCell className="text-center">{team.won}</TableCell>
              <TableCell className="text-center">{team.drawn}</TableCell>
              <TableCell className="text-center">{team.lost}</TableCell>
              <TableCell className="text-center">{team.goalsFor}</TableCell>
              <TableCell className="text-center">{team.goalsAgainst}</TableCell>
              <TableCell className="text-center font-bold">{team.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PremierLeagueTable;

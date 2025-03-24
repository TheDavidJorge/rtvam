
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';

// Mock data for Moçambola standings
const mocambolaTeams = [
  { position: 1, name: 'Black Bulls', played: 14, won: 10, drawn: 3, lost: 1, goalsFor: 25, goalsAgainst: 7, points: 33 },
  { position: 2, name: 'Ferroviário Maputo', played: 14, won: 9, drawn: 3, lost: 2, goalsFor: 19, goalsAgainst: 8, points: 30 },
  { position: 3, name: 'Costa do Sol', played: 14, won: 8, drawn: 4, lost: 2, goalsFor: 18, goalsAgainst: 10, points: 28 },
  { position: 4, name: 'União Desportiva do Songo', played: 14, won: 8, drawn: 3, lost: 3, goalsFor: 17, goalsAgainst: 9, points: 27 },
  { position: 5, name: 'Ferroviário Beira', played: 14, won: 7, drawn: 4, lost: 3, goalsFor: 15, goalsAgainst: 11, points: 25 },
  { position: 6, name: 'Liga Desportiva', played: 14, won: 6, drawn: 4, lost: 4, goalsFor: 14, goalsAgainst: 12, points: 22 },
  { position: 7, name: 'Incomáti', played: 14, won: 5, drawn: 4, lost: 5, goalsFor: 12, goalsAgainst: 13, points: 19 },
  { position: 8, name: 'Matchedje de Maputo', played: 14, won: 5, drawn: 2, lost: 7, goalsFor: 11, goalsAgainst: 15, points: 17 },
  { position: 9, name: 'Ferroviário Lichinga', played: 14, won: 4, drawn: 3, lost: 7, goalsFor: 10, goalsAgainst: 16, points: 15 },
  { position: 10, name: 'Desportivo Maputo', played: 14, won: 3, drawn: 3, lost: 8, goalsFor: 9, goalsAgainst: 18, points: 12 }
];

const FootballStandings = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="bg-rtam-blue text-white rounded-t-lg py-3">
          <CardTitle className="text-lg md:text-xl">Classificação Moçambola</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-12 text-center">Pos</TableHead>
                  <TableHead>Equipa</TableHead>
                  <TableHead className="w-12 text-center">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mocambolaTeams.slice(0, 5).map((team) => (
                  <TableRow key={team.name} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium p-2">{team.position}</TableCell>
                    <TableCell className="font-medium p-2">{team.name}</TableCell>
                    <TableCell className="text-center font-bold p-2">{team.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="p-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-rtam-blue hover:text-rtam-blue-dark flex items-center gap-1"
            onClick={() => setOpen(true)}
          >
            Ver classificação completa <ExternalLink size={16} />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Classificação Completa Moçambola</DialogTitle>
          </DialogHeader>
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
                {mocambolaTeams.map((team) => (
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FootballStandings;

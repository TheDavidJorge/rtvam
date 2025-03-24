
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';

// Mock data for currency exchange rates
const exchangeRates = [
  { currency: 'USD (Dólar Americano)', buying: 63.82, selling: 65.10 },
  { currency: 'EUR (Euro)', buying: 68.45, selling: 69.82 },
  { currency: 'GBP (Libra Esterlina)', buying: 80.15, selling: 81.75 },
  { currency: 'ZAR (Rand Sul-Africano)', buying: 3.45, selling: 3.52 },
  { currency: 'CNY (Yuan Chinês)', buying: 8.82, selling: 9.01 },
];

const CurrencyExchange = () => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-PT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="bg-rtam-blue text-white rounded-t-lg py-3">
          <CardTitle className="text-lg md:text-xl">Câmbio do Metical</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="text-sm text-muted-foreground mb-2">
            Taxas atualizadas: {formattedDate}
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Moeda</TableHead>
                  <TableHead className="text-right">Compra</TableHead>
                  <TableHead className="text-right">Venda</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exchangeRates.slice(0, 3).map((rate) => (
                  <TableRow key={rate.currency} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{rate.currency}</TableCell>
                    <TableCell className="text-right">{rate.buying.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{rate.selling.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-rtam-blue hover:text-rtam-blue-dark flex items-center gap-1"
            onClick={() => setOpen(true)}
          >
            Ver todas as taxas <ExternalLink size={16} />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Taxas de Câmbio do Metical</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground mb-4">
            Taxas de câmbio atualizadas em: {formattedDate}
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Moeda</TableHead>
                  <TableHead className="text-right">Compra</TableHead>
                  <TableHead className="text-right">Venda</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exchangeRates.map((rate) => (
                  <TableRow key={rate.currency} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{rate.currency}</TableCell>
                    <TableCell className="text-right">{rate.buying.toFixed(2)} MZN</TableCell>
                    <TableCell className="text-right">{rate.selling.toFixed(2)} MZN</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Fonte: Banco de Moçambique (valores ilustrativos)</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CurrencyExchange;

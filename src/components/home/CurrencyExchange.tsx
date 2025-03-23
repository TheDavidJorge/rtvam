
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

// Mock data for currency exchange rates
const exchangeRates = [
  { currency: 'USD (Dólar Americano)', buying: 63.82, selling: 65.10 },
  { currency: 'EUR (Euro)', buying: 68.45, selling: 69.82 },
  { currency: 'GBP (Libra Esterlina)', buying: 80.15, selling: 81.75 },
  { currency: 'ZAR (Rand Sul-Africano)', buying: 3.45, selling: 3.52 },
  { currency: 'CNY (Yuan Chinês)', buying: 8.82, selling: 9.01 },
];

const CurrencyExchange = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-PT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Card className="shadow-md">
          <CardHeader className="bg-rtam-blue text-white rounded-t-lg">
            <CardTitle className="text-xl md:text-2xl">Câmbio do Metical</CardTitle>
          </CardHeader>
          <CardContent>
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
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground">
              <p>Fonte: Banco de Moçambique (valores ilustrativos)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CurrencyExchange;

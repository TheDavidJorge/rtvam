
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ScheduleSlot {
  time: string;
  program: string;
  host: string;
}

interface ScheduleListViewProps {
  selectedDay: string;
  scheduleData: ScheduleSlot[];
}

const ScheduleListView: React.FC<ScheduleListViewProps> = ({
  selectedDay,
  scheduleData
}) => {
  return (
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
          {scheduleData.map((slot, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <TableCell className="font-medium">{slot.time}</TableCell>
              <TableCell>{slot.program}</TableCell>
              <TableCell className="hidden md:table-cell">{slot.host}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleListView;

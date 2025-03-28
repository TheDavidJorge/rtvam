
import React from 'react';
import { Calendar } from 'lucide-react';

interface ScheduleInfoProps {
  selectedDay: string;
  currentDate: string;
}

const ScheduleInfo: React.FC<ScheduleInfoProps> = ({
  selectedDay,
  currentDate
}) => {
  return (
    <div className="text-center mb-4">
      <div className="flex items-center justify-center mb-2">
        <Calendar className="w-4 h-4 mr-2 text-rtam-blue" />
        <span className="font-medium">{selectedDay}</span>
      </div>
      <p className="text-sm text-gray-500">{currentDate}</p>
    </div>
  );
};

export default ScheduleInfo;

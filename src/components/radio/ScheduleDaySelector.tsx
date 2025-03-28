
import React from 'react';
import { cn } from '@/lib/utils';

interface ScheduleDaySelectorProps {
  weekDays: string[];
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const ScheduleDaySelector: React.FC<ScheduleDaySelectorProps> = ({
  weekDays,
  selectedDay,
  setSelectedDay
}) => {
  return (
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
  );
};

export default ScheduleDaySelector;


import React from 'react';

interface ScheduleSlot {
  time: string;
  program: string;
  host: string;
}

interface ScheduleGridViewProps {
  scheduleData: ScheduleSlot[];
}

const ScheduleGridView: React.FC<ScheduleGridViewProps> = ({
  scheduleData
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {scheduleData.map((slot, index) => (
        <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-4">
            <p className="text-sm font-medium text-rtam-blue">{slot.time}</p>
            <h3 className="font-bold text-lg mt-1">{slot.program}</h3>
            {slot.host && <p className="text-gray-600 text-sm mt-1">{slot.host}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleGridView;

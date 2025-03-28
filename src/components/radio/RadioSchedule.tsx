
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ScheduleDaySelector from './ScheduleDaySelector';
import { ScheduleViewToggler, ViewType } from './ScheduleViewToggler';
import ScheduleListView from './ScheduleListView';
import ScheduleGridView from './ScheduleGridView';
import ScheduleInfo from './ScheduleInfo';
import ScheduleFooter from './ScheduleFooter';
import { weekDays, weeklySchedule } from './scheduleData';

const RadioSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [viewType, setViewType] = useState<ViewType>(ViewType.LIST);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Get current day of the week
    const date = new Date();
    const dayIndex = date.getDay();
    // Convert from 0-6 (Sunday-Saturday) to our format
    const dayMapping: Record<number, string> = {
      0: "Domingo",
      1: "Segunda",
      2: "Terça",
      3: "Quarta",
      4: "Quinta",
      5: "Sexta",
      6: "Sábado"
    };
    setSelectedDay(dayMapping[dayIndex]);
    
    // Format current date
    setCurrentDate(format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR }));
  }, []);

  const toggleViewType = (type: ViewType) => {
    setViewType(type);
  };

  // Get the schedule data for the selected day
  const getDaySchedule = () => {
    if (!selectedDay) return [];
    return weeklySchedule[selectedDay] || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="section-title mb-2">Grelha de Programação</h2>
        <ScheduleViewToggler 
          viewType={viewType} 
          toggleViewType={toggleViewType} 
        />
      </div>
      
      <ScheduleInfo 
        selectedDay={selectedDay} 
        currentDate={currentDate} 
      />
      
      <ScheduleDaySelector 
        weekDays={weekDays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      
      {viewType === ViewType.LIST ? (
        <ScheduleListView 
          selectedDay={selectedDay}
          scheduleData={getDaySchedule()}
        />
      ) : (
        <ScheduleGridView 
          scheduleData={getDaySchedule()}
        />
      )}
      
      <ScheduleFooter />
    </div>
  );
};

export default RadioSchedule;

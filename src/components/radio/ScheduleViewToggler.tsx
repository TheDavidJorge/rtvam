
import React from 'react';
import { cn } from '@/lib/utils';
import { List, Grid } from 'lucide-react';

enum ViewType {
  LIST = 'list',
  GRID = 'grid'
}

interface ScheduleViewTogglerProps {
  viewType: ViewType;
  toggleViewType: (type: ViewType) => void;
}

const ScheduleViewToggler: React.FC<ScheduleViewTogglerProps> = ({
  viewType,
  toggleViewType
}) => {
  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => toggleViewType(ViewType.LIST)}
        className={cn(
          "p-2 rounded-md transition-colors",
          viewType === ViewType.LIST 
            ? "bg-rtam-blue text-white" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        <List className="w-5 h-5" />
      </button>
      <button 
        onClick={() => toggleViewType(ViewType.GRID)}
        className={cn(
          "p-2 rounded-md transition-colors",
          viewType === ViewType.GRID
            ? "bg-rtam-blue text-white" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        <Grid className="w-5 h-5" />
      </button>
    </div>
  );
};

export { ScheduleViewToggler, ViewType };

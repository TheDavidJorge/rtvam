
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { NewsItem } from '@/types/news';

interface PublicationTimelineProps {
  news: (NewsItem & { categoryTitle?: string })[];
  formatDate: (dateString: string) => string;
}

const PublicationTimeline = ({ news, formatDate }: PublicationTimelineProps) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  // Group news by date
  const groupedByDate = useMemo(() => {
    const groups: Record<string, (NewsItem & { categoryTitle?: string })[]> = {};
    
    news.forEach(item => {
      const date = item.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    
    // Sort dates in descending order (newest first)
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
  }, [news]);

  const toggleDate = (date: string) => {
    if (expandedDate === date) {
      setExpandedDate(null);
    } else {
      setExpandedDate(date);
    }
  };

  return (
    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
      {groupedByDate.map(([date, items]) => (
        <div key={date} className="border-l-2 border-rtam-blue pl-4 pb-4">
          <div 
            className="flex justify-between items-center cursor-pointer group"
            onClick={() => toggleDate(date)}
          >
            <div className="flex items-center">
              <div className="absolute -ml-6 w-4 h-4 rounded-full bg-rtam-blue"></div>
              <span className="font-medium">{formatDate(date)}</span>
            </div>
            <div className="text-gray-500">
              {expandedDate === date ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </div>
          
          {expandedDate === date && (
            <div className="mt-2 space-y-2 animate-fade-in">
              {items.map(item => (
                <Link 
                  key={`${item.category}-${item.id}`}
                  to={`/noticias/${item.category}/${item.id}`}
                  className="block bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-rtam-blue-dark">{item.categoryTitle}: </span>
                  <span className="text-sm">{item.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PublicationTimeline;

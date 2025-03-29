import React from 'react';
import { cn } from '../../lib/utils';

interface SimpleBarChartProps {
  data: {
    label: string;
    value: number;
  }[];
  height?: number;
  className?: string;
}

export function SimpleBarChart({ 
  data,
  height = 200,
  className
}: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div 
        className="flex items-end space-x-2 mt-4"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          
          return (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center"
            >
              <div 
                className="w-full bg-primary rounded-t-md transition-all duration-300 ease-in-out"
                style={{ height: `${percentage}%` }}
                title={`${item.label}: ${item.value}`}
              />
              <span className="text-xs text-muted-foreground mt-2 truncate max-w-full">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

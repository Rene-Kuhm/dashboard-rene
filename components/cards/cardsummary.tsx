import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CustomTooltip } from '../customtooltip';
import { cn } from '../../lib/utils';

interface CardSummaryProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  tooltipContent?: React.ReactNode;
  className?: string;
}

export const CardSummary: React.FC<CardSummaryProps> = ({
  title,
  value,
  icon,
  trend,
  tooltipContent,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          {tooltipContent ? (
            <CustomTooltip 
              content={tooltipContent} 
              showIcon={true} 
              iconSize={14}
              position="top"
            >
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CustomTooltip>
          ) : (
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          )}
        </div>
        {icon && <div className="h-4 w-4 text-muted-foreground" aria-hidden="true">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
            "text-xs flex items-center gap-1",
            trend.isPositive 
              ? "text-emerald-500 dark:text-emerald-400" 
              : "text-rose-500 dark:text-rose-400"
          )}>
            <span aria-hidden="true">{trend.isPositive ? '↑' : '↓'}</span> 
            <span>{Math.abs(trend.value)}%</span>
            <span className="sr-only">
              {trend.isPositive ? 'Increase' : 'Decrease'} of {Math.abs(trend.value)} percent
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

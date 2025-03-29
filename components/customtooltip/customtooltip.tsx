import React from 'react';
import { CustomTooltipProps } from './customtooltip.types';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info } from "lucide-react";

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
  className,
  contentClassName,
  showIcon = false,
  iconSize = 16,
  iconClassName,
  position = 'top',
  delayDuration = 300,
  ...props
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip {...props}>
        <TooltipTrigger asChild className={cn("inline-flex items-center", className)}>
          <span>
            {children}
            {showIcon && (
              <Info 
                size={iconSize} 
                className={cn("ml-1 text-muted-foreground cursor-help", iconClassName)} 
                aria-hidden="true"
              />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          className={contentClassName} 
          side={position}
          sideOffset={5}
        >
          {typeof content === 'string' ? <p>{content}</p> : content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

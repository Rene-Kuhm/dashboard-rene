import { ReactNode } from 'react';
import { TooltipProps } from '@radix-ui/react-tooltip';

export interface CustomTooltipProps extends Omit<TooltipProps, 'content'> {
  /**
   * The element that triggers the tooltip
   */
  children: ReactNode;
  
  /**
   * The content to display in the tooltip
   */
  content: ReactNode;
  
  /**
   * Additional CSS classes for the wrapper element
   */
  className?: string;
  
  /**
   * Additional CSS classes for the tooltip content
   */
  contentClassName?: string;

  /**
   * Whether to show the info icon
   */
  showIcon?: boolean;

  /**
   * Size of the info icon (if shown)
   */
  iconSize?: number;

  /**
   * Additional CSS classes for the info icon
   */
  iconClassName?: string;
  
  /**
   * Position of the tooltip relative to the trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Delay before showing the tooltip (in ms)
   */
  delayDuration?: number;
}

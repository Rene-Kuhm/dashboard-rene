import { SVGProps } from 'react';

export interface CustomIconProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon name or key identifier
   */
  name: string;
  
  /**
   * Size of the icon (width and height)
   */
  size?: number | string;
  
  /**
   * CSS class names to apply to the icon
   */
  className?: string;
  
  /**
   * Icon stroke width
   */
  strokeWidth?: number;
  
  /**
   * Icon color
   */
  color?: string;
}

export type IconComponent = React.FC<Omit<CustomIconProps, 'name'>>;

export interface IconsRegistry {
  [key: string]: IconComponent;
}

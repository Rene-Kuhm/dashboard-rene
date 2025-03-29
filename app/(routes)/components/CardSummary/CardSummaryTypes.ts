import { LucideIcon } from "lucide-react";
import type { IconType } from 'react-icons';

export interface TendenciaProps {
  valor: number;
  esPositivo: boolean;
}

export interface CardSummaryProps {
  /**
   * Card title
   */
  title: string;
  
  /**
   * Total value to display
   */
  total: string | number;
  
  /**
   * Average value (optional)
   */
  average?: number;
  
  /**
   * Tooltip text for information icon
   */
  tooltipText: string;
  
  /**
   * Icon to display - can be a Lucide icon component, React Icons component, or a string name for CustomIcon
   */
  icon?: LucideIcon | IconType | string;
  
  /**
   * Icon color class
   */
  colorIcono?: string;
  
  /**
   * Trend data (optional)
   */
  tendencia?: {
    valor: number;
    esPositivo: boolean;
  };
  
  /**
   * Footer content (optional)
   */
  piePagina?: React.ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Loading state
   */
  cargando?: boolean;
  
  /**
   * Indicates if the data is real or estimated
   */
  datoReal?: boolean;
}

export interface DatosEstadisticas {
  total: number;
  average: number;
  tendencia: number;
  esPositivo: boolean;
  tooltipText: string;
}

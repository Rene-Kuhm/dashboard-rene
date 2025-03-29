import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils";
import { CardSummaryProps } from './CardSummaryTypes';
import { InfoIcon } from 'lucide-react';
import { CustomIcon } from '../../../../components/customicons';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

// Type guard function to check if an icon is a string
const isStringIcon = (icon: LucideIcon | IconType | string | undefined): icon is string => {
  return typeof icon === 'string';
};

// Type guard function to check if an icon is a LucideIcon
const isLucideIcon = (icon: LucideIcon | IconType | string | undefined): icon is LucideIcon => {
  return typeof icon === 'function' && 
         'displayName' in icon && 
         !!icon.displayName && 
         icon.displayName.startsWith('Lucide');
};

const CardSumary: React.FC<CardSummaryProps> = ({
  title,
  total,
  average,
  tooltipText,
  icon: Icon,
  colorIcono = "text-gray-500",
  tendencia,
  piePagina,
  className,
  cargando = false,
  datoReal = false,
}) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md", 
      className,
      datoReal ? "border-green-400 dark:border-green-600" : "",
      cargando ? "animate-pulse" : ""
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="group relative inline-block">
            <InfoIcon className="h-3 w-3 ml-1 text-gray-400 cursor-help" />
            <div className="absolute z-10 invisible group-hover:visible bg-black text-white text-xs rounded p-1 left-1/2 transform -translate-x-1/2 -bottom-8 w-max max-w-xs">
              {tooltipText}
            </div>
          </div>
          {datoReal && <span className="ml-2 text-xs text-green-500 font-normal">(Dato real)</span>}
        </div>
        {Icon && (
          <div className={cn("rounded-md p-2 bg-opacity-20", colorIcono.replace('text', 'bg'))}>
            {isStringIcon(Icon) ? (
              <CustomIcon name={Icon} className={cn("h-4 w-4", colorIcono)} />
            ) : (
              <Icon className={cn("h-4 w-4", colorIcono)} />
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {cargando ? (
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        ) : (
          <div className="text-2xl font-bold">{total}</div>
        )}
        {average !== undefined && (
          <CardDescription className="text-xs text-gray-500 mt-1">
            Promedio: {average.toLocaleString('es-ES')}
          </CardDescription>
        )}
        {tendencia && (
          <div className="flex items-center mt-2">
            <span 
              className={cn(
                "text-xs font-medium mr-1",
                tendencia.esPositivo ? "text-green-500" : "text-red-500"
              )}
            >
              {tendencia.esPositivo ? "+" : ""}{tendencia.valor}%
            </span>
            <span className="text-xs text-gray-500">respecto al período anterior</span>
          </div>
        )}
      </CardContent>
      {piePagina && (
        <CardFooter className="pt-1 pb-3 px-4 border-t">
          {piePagina}
        </CardFooter>
      )}
    </Card>
  );
};

export default CardSumary;

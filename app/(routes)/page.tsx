"use client";

import React, { useState } from 'react';
import { Users, TrendingUp, Activity, DollarSign } from "lucide-react";
import { DashboardLayout } from '../../components/layout';
import { CardSummary } from '../../components/cards';
import { SimpleBarChart } from '../../components/charts/simple-bar-chart';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ErrorBoundary } from '../../components/error-boundary';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { cn } from '../../lib/utils';

interface TrendType {
  value: number;
  isPositive: boolean;
}

interface CardData {
  titulo: string;
  valor: string | number;
  icono: React.ReactNode;
  tendencia?: TrendType;
  tooltipTexto?: string;
  cargando?: boolean;
}

interface ChartDataItem {
  label: string;
  value: number;
}

interface ActivityItem {
  id: string;
  usuario: string;
  accion: string;
  fecha: Date;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  // Card data definition with proper typing
  const CardResumen = ({ 
    titulo, 
    valor, 
    icono, 
    tendencia, 
    tooltipTexto, 
    cargando = false 
  }: CardData) => {
    return (
      <CardSummary
        title={titulo}
        value={valor}
        icon={icono}
        trend={tendencia}
        tooltipContent={tooltipTexto}
        className={cn(cargando && "animate-pulse pointer-events-none")}
      />
    );
  };

  // Mock chart data
  const datosGrafico: ChartDataItem[] = [
    { label: "Ene", value: 65 },
    { label: "Feb", value: 59 },
    { label: "Mar", value: 80 },
    { label: "Abr", value: 81 },
    { label: "May", value: 56 },
    { label: "Jun", value: 55 },
    { label: "Jul", value: 40 },
  ];

  // Mock activity data
  const actividadReciente: ActivityItem[] = [
    {
      id: '1',
      usuario: 'Juan Pérez',
      accion: 'Completó una compra',
      fecha: new Date('2023-04-28T14:22:01'),
    },
    {
      id: '2',
      usuario: 'María López',
      accion: 'Creó una cuenta',
      fecha: new Date('2023-04-28T13:49:37'),
    },
    {
      id: '3',
      usuario: 'Carlos Gómez',
      accion: 'Actualizó su perfil',
      fecha: new Date('2023-04-28T12:55:21'),
    },
  ];

  // Render activity items with proper typing
  const renderActividad = (datos: ActivityItem[]) => {
    if (!datos || datos.length === 0) {
      return <p className="text-muted-foreground">No hay actividad reciente.</p>;
    }
    
    return (
      <ul className="space-y-4">
        {datos.map((item, index) => (
          <li
            key={item.id || index}
            className="flex items-center justify-between border-b pb-2 last:border-0"
          >
            <div>
              <p className="font-medium">{item.usuario}</p>
              <p className="text-sm text-muted-foreground">{item.accion}</p>
            </div>
            <time className="text-sm text-muted-foreground">
              {/* Fix: Use a fixed date format that will be consistent between server and client */}
              {formatTimeConsistently(item.fecha)}
            </time>
          </li>
        ))}
      </ul>
    );
  };

  // Helper function for consistent date formatting
  const formatTimeConsistently = (date: Date): string => {
    // Use explicit formatting that doesn't rely on locale
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Principal</h1>
        <p className="text-muted-foreground">
          ¡Bienvenido de nuevo! Aquí tienes un resumen de tus datos.
        </p>
      </div>

      <ErrorBoundary>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <CardResumen
            titulo="Total Usuarios"
            valor="10,482"
            icono={<Users size={16} />}
            tendencia={{ value: 12.5, isPositive: true }}
            tooltipTexto="Número total de usuarios registrados en la plataforma"
          />

          <CardResumen
            titulo="Ingresos"
            valor="$45,231.89"
            icono={<DollarSign size={16} />}
            tendencia={{ value: 8.2, isPositive: true }}
            tooltipTexto="Ingresos totales del mes actual"
          />

          <CardResumen
            titulo="Sesiones Activas"
            valor="2,315"
            icono={<Activity size={16} />}
            tendencia={{ value: 5.1, isPositive: true }}
            tooltipTexto="Número de sesiones de usuario activas actualmente"
          />

          <CardResumen
            titulo="Tasa de Conversión"
            valor="3.24%"
            icono={<TrendingUp size={16} />}
            tendencia={{ value: 1.8, isPositive: false }}
            tooltipTexto="Porcentaje de visitantes que completaron una acción deseada"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tendencia Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={datosGrafico} height={250} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              {renderActividad(actividadReciente)}
            </CardContent>
          </Card>
        </div>
      </ErrorBoundary>
    </DashboardLayout>
  );
}

// Custom loading spinner component with typed props
// This is a local version to fix import errors - normally you would use the imported one
function CustomLoadingSpinner({ 
  size = "md", 
  className 
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses: Record<string, string> = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div 
      className={cn(
        "animate-spin rounded-full border-t-transparent border-primary",
        sizeClasses[size as keyof typeof sizeClasses],
        className
      )}
      aria-label="Loading"
    />
  );
}
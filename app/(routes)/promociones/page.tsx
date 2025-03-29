"use client";

import React from 'react';
import { DashboardLayout } from '../../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Search, Plus, Percent, Calendar, Tag, BarChart } from 'lucide-react';
import { Input } from '../../../components/ui/input';

export default function PromocionesPage() {
  const promociones = [
    {
      id: 'PROMO-001',
      nombre: 'Descuento Verano',
      tipo: 'Porcentaje',
      valor: 20,
      fechaInicio: new Date('2024-06-01'),
      fechaFin: new Date('2024-08-31'),
      estado: 'Programada',
      usos: 0
    },
    {
      id: 'PROMO-002',
      nombre: 'Envío Gratis',
      tipo: 'Envío',
      valor: 0,
      fechaInicio: new Date('2024-01-01'),
      fechaFin: new Date('2024-12-31'),
      estado: 'Activa',
      usos: 156
    },
    // ...más promociones
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES').format(date);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Activa': 'bg-emerald-100 text-emerald-800',
      'Programada': 'bg-blue-100 text-blue-800',
      'Finalizada': 'bg-gray-100 text-gray-800',
      'Pausada': 'bg-amber-100 text-amber-800',
    };
    
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Promociones</h1>
          <p className="text-muted-foreground">
            Gestiona las promociones y descuentos de tu tienda.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Promoción
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Promociones Activas</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-emerald-500" />
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Programadas</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Usos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-violet-500" />
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Descuento Promedio</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-amber-500" />
            <div className="text-2xl font-bold">15%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Lista de Promociones</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar promoción..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Código</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Nombre</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Tipo</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Valor</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Fecha Inicio</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Fecha Fin</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {promociones.map((promo) => (
                  <tr key={promo.id} className="border-b">
                    <td className="p-3 font-medium">{promo.id}</td>
                    <td className="p-3">{promo.nombre}</td>
                    <td className="p-3">{promo.tipo}</td>
                    <td className="p-3 text-right">
                      {promo.tipo === 'Porcentaje' ? `${promo.valor}%` : 'N/A'}
                    </td>
                    <td className="p-3 text-center">{formatDate(promo.fechaInicio)}</td>
                    <td className="p-3 text-center">{formatDate(promo.fechaFin)}</td>
                    <td className="p-3">
                      <div className="flex justify-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(promo.estado)}`}>
                          {promo.estado}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                          Pausar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

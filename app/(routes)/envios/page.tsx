"use client";

import React from 'react';
import { DashboardLayout } from '../../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Search, ArrowUpDown, Truck, MapPin, Package, Box } from 'lucide-react';
import { Input } from '../../../components/ui/input';

export default function EnviosPage() {
  const envios = [
    { 
      id: 'ENV-001', 
      pedido: 'PED-002',
      cliente: 'María López', 
      direccion: 'Calle Principal 123, Madrid',
      fechaEnvio: new Date('2024-01-15'), 
      fechaEstimada: new Date('2024-01-18'), 
      transportista: 'DHL',
      tracking: '1234567890',
      estado: 'En tránsito'
    },
    { 
      id: 'ENV-002', 
      pedido: 'PED-003',
      cliente: 'Carlos Ruiz',
      direccion: 'Av. Central 456, Barcelona',
      fechaEnvio: new Date('2024-01-14'), 
      fechaEstimada: new Date('2024-01-17'), 
      transportista: 'MRW',
      tracking: '0987654321',
      estado: 'Entregado'
    },
    // ...más envíos
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES').format(date);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Entregado': 'bg-emerald-100 text-emerald-800',
      'En tránsito': 'bg-blue-100 text-blue-800',
      'Pendiente': 'bg-amber-100 text-amber-800',
      'Retrasado': 'bg-rose-100 text-rose-800',
    };
    
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestión de Envíos</h1>
        <p className="text-muted-foreground">
          Controla y realiza seguimiento de todos los envíos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Envíos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Box className="h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En Tránsito</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-blue-500" />
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Entregados</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Package className="h-4 w-4 text-emerald-500" />
            <div className="text-2xl font-bold">128</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Retrasados</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-rose-500" />
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Lista de Envíos</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar envío..."
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
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">ID Envío</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Pedido</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Transportista</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Fecha Envío</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {envios.map((envio) => (
                  <tr key={envio.id} className="border-b">
                    <td className="p-3 font-medium">{envio.id}</td>
                    <td className="p-3">{envio.pedido}</td>
                    <td className="p-3">{envio.cliente}</td>
                    <td className="p-3">{envio.transportista}</td>
                    <td className="p-3 text-center">{formatDate(envio.fechaEnvio)}</td>
                    <td className="p-3">
                      <div className="flex justify-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(envio.estado)}`}>
                          {envio.estado}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Ver Detalles
                        </Button>
                        <Button size="sm" variant="outline">
                          Tracking
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

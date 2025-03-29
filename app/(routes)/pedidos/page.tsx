"use client";

import React from 'react';
import { DashboardLayout } from '../../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Search, ArrowUpDown, Eye, Package, TrendingUp } from 'lucide-react';
import { Input } from '../../../components/ui/input';

export default function PedidosPage() {
  // Mock order data
  const pedidos = [
    { 
      id: 'PED-001', 
      cliente: 'Juan Pérez', 
      fecha: new Date('2023-05-10'), 
      total: 129.99, 
      estado: 'Completado',
      productos: 3
    },
    { 
      id: 'PED-002', 
      cliente: 'María López', 
      fecha: new Date('2023-05-11'), 
      total: 259.50, 
      estado: 'Enviado',
      productos: 2
    },
    { 
      id: 'PED-003', 
      cliente: 'Carlos Ruiz', 
      fecha: new Date('2023-05-12'), 
      total: 89.99, 
      estado: 'Pendiente',
      productos: 1
    },
    { 
      id: 'PED-004', 
      cliente: 'Ana Martínez', 
      fecha: new Date('2023-05-12'), 
      total: 324.75, 
      estado: 'Procesando',
      productos: 5
    },
    { 
      id: 'PED-005', 
      cliente: 'Roberto Fernández', 
      fecha: new Date('2023-05-13'), 
      total: 149.99, 
      estado: 'Cancelado',
      productos: 2
    },
    { 
      id: 'PED-006', 
      cliente: 'Laura Gómez', 
      fecha: new Date('2023-05-14'), 
      total: 75.50, 
      estado: 'Enviado',
      productos: 3
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES').format(date);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Completado': 'bg-emerald-100 text-emerald-800',
      'Enviado': 'bg-blue-100 text-blue-800',
      'Pendiente': 'bg-amber-100 text-amber-800',
      'Procesando': 'bg-purple-100 text-purple-800',
      'Cancelado': 'bg-rose-100 text-rose-800',
    };
    
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <p className="text-muted-foreground">
          Gestiona y haz seguimiento de todos los pedidos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pedidos.length}</div>
            <p className="text-xs text-muted-foreground mt-1">En el último mes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pedidos.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 flex items-center gap-1">
                <TrendingUp size={12} /> +12.5% respecto al mes anterior
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendientes de Envío</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pedidos.filter(order => ['Pendiente', 'Procesando'].includes(order.estado)).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Pedidos Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Lista de Pedidos</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar pedido..."
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
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground flex items-center gap-1">
                    Pedido # <ArrowUpDown size={14} />
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Fecha</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Total</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Productos</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-b">
                    <td className="p-3 font-medium">{pedido.id}</td>
                    <td className="p-3">{pedido.cliente}</td>
                    <td className="p-3 text-center text-sm">{formatDate(pedido.fecha)}</td>
                    <td className="p-3 text-right">${pedido.total.toFixed(2)}</td>
                    <td className="p-3 text-center">{pedido.productos}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(pedido.estado)}`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Eye size={14} className="mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline" disabled={pedido.estado === 'Cancelado' || pedido.estado === 'Completado'}>
                          <Package size={14} className="mr-1" />
                          Actualizar
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

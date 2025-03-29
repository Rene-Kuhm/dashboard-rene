"use client";

import React from 'react';
import { DashboardLayout } from '../../../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Save, Search, PlusCircle, MinusCircle, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

export default function InventarioPage() {
  const inventario = [
    { id: '1', producto: 'Camiseta Básica', sku: 'TSHIRT-001', stock: 150, minimo: 20, estado: 'En stock' },
    { id: '2', producto: 'Zapatillas Deportivas', sku: 'SHOES-002', stock: 75, minimo: 15, estado: 'En stock' },
    { id: '3', producto: 'Auriculares Bluetooth', sku: 'HDPH-003', stock: 200, minimo: 30, estado: 'En stock' },
    { id: '4', producto: 'Laptop 15"', sku: 'LPTP-004', stock: 5, minimo: 10, estado: 'Bajo stock' },
    { id: '5', producto: 'Mochila', sku: 'BKPK-005', stock: 120, minimo: 25, estado: 'En stock' },
    { id: '6', producto: 'Reloj Inteligente', sku: 'SWTCH-006', stock: 8, minimo: 15, estado: 'Bajo stock' },
    { id: '7', producto: 'Monitor 24"', sku: 'MNTR-007', stock: 0, minimo: 5, estado: 'Sin stock' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <p className="text-muted-foreground">
          Gestiona el stock e inventario de tus productos.
        </p>
      </div>

      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inventario.length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Productos Bajo Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {inventario.filter(item => item.estado === 'Bajo stock').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Productos Sin Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-500">
                {inventario.filter(item => item.estado === 'Sin stock').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Lista de Inventario</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar producto..."
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
                      Producto <ArrowUpDown size={14} />
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">SKU</th>
                    <th className="text-right p-3 text-sm font-medium text-muted-foreground">Stock Actual</th>
                    <th className="text-right p-3 text-sm font-medium text-muted-foreground">Stock Mínimo</th>
                    <th className="text-center p-3 text-sm font-medium text-muted-foreground">Estado</th>
                    <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {inventario.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.producto}</td>
                      <td className="p-3 text-sm text-muted-foreground">{item.sku}</td>
                      <td className="p-3 text-right">{item.stock}</td>
                      <td className="p-3 text-right text-sm text-muted-foreground">{item.minimo}</td>
                      <td className="p-3">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.estado === 'En stock' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : item.estado === 'Bajo stock'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                          }`}>
                            {item.estado === 'Bajo stock' && <AlertTriangle size={12} className="mr-1" />}
                            {item.estado}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <PlusCircle size={14} className="mr-1" />
                            Añadir
                          </Button>
                          <Button size="sm" variant="outline" disabled={item.stock <= 0}>
                            <MinusCircle size={14} className="mr-1" />
                            Restar
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
      </div>
    </DashboardLayout>
  );
}

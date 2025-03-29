"use client";

import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Search, Save, ArrowUpDown, Percent } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

export default function ActualizarPreciosPage() {
  const [productos, setProductos] = useState([
    { id: '1', nombre: 'Camiseta Básica', precioOriginal: 29.99, precioNuevo: 29.99, categoria: 'Ropa' },
    { id: '2', nombre: 'Zapatillas Deportivas', precioOriginal: 89.99, precioNuevo: 89.99, categoria: 'Calzado' },
    { id: '3', nombre: 'Auriculares Bluetooth', precioOriginal: 59.99, precioNuevo: 59.99, categoria: 'Electrónica' },
    { id: '4', nombre: 'Laptop 15"', precioOriginal: 899.99, precioNuevo: 899.99, categoria: 'Electrónica' },
    { id: '5', nombre: 'Mochila', precioOriginal: 45.99, precioNuevo: 45.99, categoria: 'Accesorios' },
  ]);

  // Use refs instead of dataset
  const incrementValueRef = useRef<string>('0');
  const discountValueRef = useRef<string>('0');

  const aplicarIncremento = (porcentaje: number) => {
    const actualizados = productos.map(producto => ({
      ...producto,
      precioNuevo: +(producto.precioOriginal * (1 + porcentaje / 100)).toFixed(2)
    }));
    setProductos(actualizados);
  };

  const aplicarDescuento = (porcentaje: number) => {
    const actualizados = productos.map(producto => ({
      ...producto,
      precioNuevo: +(producto.precioOriginal * (1 - porcentaje / 100)).toFixed(2)
    }));
    setProductos(actualizados);
  };

  const actualizarPrecioIndividual = (id: string, precio: number) => {
    const actualizados = productos.map(producto => 
      producto.id === id ? { ...producto, precioNuevo: precio } : producto
    );
    setProductos(actualizados);
  };

  const guardarCambios = () => {
    // Aquí se implementaría la lógica para guardar los cambios en la base de datos
    alert('Precios actualizados correctamente');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Actualizar Precios</h1>
        <p className="text-muted-foreground">
          Gestiona y actualiza los precios de tus productos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aplicar Incremento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                type="number" 
                min="0" 
                placeholder="%" 
                className="w-20"
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    incrementValueRef.current = val.toString();
                  }
                }}
              />
              <Button variant="secondary" onClick={() => {
                const value = parseFloat(incrementValueRef.current);
                if (value > 0) {
                  aplicarIncremento(value);
                }
              }}>
                Aplicar Incremento
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aplicar Descuento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                type="number" 
                min="0" 
                max="100" 
                placeholder="%" 
                className="w-20" 
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0 && val <= 100) {
                    discountValueRef.current = val.toString();
                  }
                }}
              />
              <Button variant="secondary" onClick={() => {
                const value = parseFloat(discountValueRef.current);
                if (value > 0 && value <= 100) {
                  aplicarDescuento(value);
                }
              }}>
                Aplicar Descuento
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Guardar Cambios</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={guardarCambios}>
              <Save size={16} className="mr-2" />
              Guardar Todos los Cambios
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Lista de Precios</CardTitle>
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
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Categoría</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Precio Original</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Precio Nuevo</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Diferencia</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acción</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => {
                  const diferencia = +(producto.precioNuevo - producto.precioOriginal).toFixed(2);
                  const porcentajeDiferencia = +((diferencia / producto.precioOriginal) * 100).toFixed(1);
                  
                  return (
                    <tr key={producto.id} className="border-b">
                      <td className="p-3">{producto.nombre}</td>
                      <td className="p-3 text-sm text-muted-foreground">{producto.categoria}</td>
                      <td className="p-3 text-right">${producto.precioOriginal.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01"
                          value={producto.precioNuevo} 
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val) && val >= 0) {
                              actualizarPrecioIndividual(producto.id, +val.toFixed(2));
                            }
                          }}
                          className="w-24 h-8 inline-block text-right"
                        />
                      </td>
                      <td className={`p-3 text-right ${diferencia > 0 ? 'text-emerald-600' : diferencia < 0 ? 'text-rose-600' : ''}`}>
                        {diferencia !== 0 && (
                          <div className="flex items-center justify-end gap-1">
                            <span>{diferencia > 0 ? '+' : ''}{diferencia.toFixed(2)}</span>
                            <span className="text-xs">
                              ({porcentajeDiferencia > 0 ? '+' : ''}{porcentajeDiferencia}%)
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <Button size="sm" variant="outline">
                          <Percent size={14} className="mr-1" />
                          Ajustar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

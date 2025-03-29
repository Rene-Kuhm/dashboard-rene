"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../../components/layout';
import { ProductService } from '../../../lib/services/product.service';
import { Product } from '../../../types';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona todos tus productos desde aquí.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filtrar
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      <div className="mb-6 w-full md:w-1/3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : error ? (
          <div className="text-destructive">{error}</div>
        ) : (
          products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div 
                className="w-full h-48 bg-gray-100 relative"
                style={{
                  backgroundImage: `url(${product.imagen})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.nombre}</CardTitle>
                    <p className="text-muted-foreground text-sm">{product.categoria}</p>
                  </div>
                  <p className="font-bold">${product.precio}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex justify-between">
                <p className="text-sm">Stock: <span className="font-medium">{product.stock}</span></p>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">Editar</Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">Eliminar</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

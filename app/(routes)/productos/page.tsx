"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../../components/layout';
import { ProductService } from '../../../lib/services/product.service';
import type { Product } from '../../../types';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/hooks/useAuth'; // We'll create this hook

interface ApiResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function ProductosPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth(); // Get auth state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductService.getProducts();
      
      // Check if the response is in the new format with data/meta properties
      if (response && typeof response === 'object' && 'data' in response) {
        setProducts(response.data as Product[]);
      } else {
        // If it's the old format (direct array)
        setProducts(response as Product[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) { // Only load products if user is authenticated
      loadProducts();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    
    try {
      await ProductService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Error al eliminar el producto');
    }
  };

  // If still checking auth or not authenticated, show loading
  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  // Make sure products is always an array before filtering
  const filteredProducts = Array.isArray(products) 
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Show user info if available
  const userInfo = user ? (
    <div className="text-sm text-muted-foreground mb-4">
      Logged in as: {user.name || user.email} 
      {user.provider && <span className="ml-2">(via {user.provider})</span>}
    </div>
  ) : null;

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted-foreground">
            Gestiona todos tus productos desde aquí.
          </p>
          {userInfo}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : error ? (
          <div className="text-destructive">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-muted-foreground col-span-full text-center py-10">
            No se encontraron productos
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div 
                className="w-full h-48 bg-gray-100 relative"
                style={{
                  backgroundImage: `url(${product.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{product.category}</p>
                  </div>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex justify-between">
                <p className="text-sm">Stock: <span className="font-medium">{product.stock}</span></p>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/productos/${product.id}`)}>
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive border-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

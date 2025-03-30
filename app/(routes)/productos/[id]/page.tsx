"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '../../../../components/layout';
import { ProductService } from '../../../../lib/services/product.service';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { LoadingSpinner } from '../../../../components/ui/loading-spinner';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '../../../../types';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    sku: '',
    images: [] as string[]
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await ProductService.getProductById(params.id);
        setProduct(productData);
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          stock: productData.stock,
          sku: productData.sku,
          images: productData.images
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await ProductService.updateProduct(params.id, formData);
      router.push('/productos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
      return;
    }
    
    try {
      setSaving(true);
      await ProductService.deleteProduct(params.id);
      router.push('/productos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-md mx-auto text-center">
          <h1 className="text-xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error || 'No se encontró el producto'}</p>
          <Button onClick={() => router.push('/productos')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/productos">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Volver a Productos
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Editar Producto</h1>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={saving}
          >
            <Trash2 size={16} className="mr-2" />
            Eliminar Producto
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información del Producto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium leading-none block mb-2">
                    Nombre del Producto
                  </label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium leading-none block mb-2">
                      Precio (€)
                    </label>
                    <Input 
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none block mb-2">
                      Stock
                    </label>
                    <Input 
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium leading-none block mb-2">
                      Categoría
                    </label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Ropa">Ropa</option>
                      <option value="Calzado">Calzado</option>
                      <option value="Electrónica">Electrónica</option>
                      <option value="Accesorios">Accesorios</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium leading-none block mb-2">
                      SKU
                    </label>
                    <Input 
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium leading-none block mb-2">
                    Descripción
                  </label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Imágenes del Producto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {formData.images.map((imageUrl, index) => (
                    <div key={index} className="relative aspect-square">
                      <img 
                        src={imageUrl} 
                        alt={`Imagen ${index + 1} de ${formData.name}`}
                        className="rounded-lg object-cover w-full h-full" 
                      />
                    </div>
                  ))}
                  {formData.images.length === 0 && (
                    <div className="text-center p-4 border-2 border-dashed border-border rounded-lg">
                      <p className="text-muted-foreground">No hay imágenes disponibles</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

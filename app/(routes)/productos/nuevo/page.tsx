"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '../../../../components/layout';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Save, ArrowLeft, ImagePlus } from 'lucide-react';
import Link from 'next/link';
import { uploadImage } from '../../../../lib/services/upload.service';
import { ProductService } from '../../../../lib/services/product.service';

export default function NuevoProductoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    images: [] as string[]
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }));
      setSelectedImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      
      await ProductService.createProduct(productData);
      router.push('/productos');
      router.refresh();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold">Crear Nuevo Producto</h1>
        <p className="text-muted-foreground">
          Rellena los campos para crear un nuevo producto.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información del Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                      Nombre del Producto
                    </label>
                    <Input 
                      placeholder="Introduzca el nombre del producto"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                        Precio (€)
                      </label>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        min="0" 
                        step="0.01" 
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                        Stock
                      </label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        min="0" 
                        value={formData.stock}
                        onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                      Categoría
                    </label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="ropa">Ropa</option>
                      <option value="calzado">Calzado</option>
                      <option value="electronica">Electrónica</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                      Descripción
                    </label>
                    <textarea 
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Describe el producto..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">⭕</span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Guardar Producto
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Imagen del Producto</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={url}
                        alt={`Product image ${index + 1}`}
                        className="rounded-lg object-cover w-full h-full"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-4 bg-muted rounded-full">
                      <ImagePlus size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Arrastra una imagen o</p>
                      <Button size="sm" variant="outline" disabled={loading}>
                        {loading ? 'Subiendo...' : 'Seleccionar Archivo'}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">PNG, JPG o WEBP (Max. 2MB)</p>
                    </div>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

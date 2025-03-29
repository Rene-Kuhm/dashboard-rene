"use client";

import React from 'react';
import { DashboardLayout } from '../../../../components/layout';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Save, ArrowLeft, ImagePlus } from 'lucide-react';
import Link from 'next/link';

export default function NuevoProductoPage() {
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
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                      Nombre del Producto
                    </label>
                    <Input placeholder="Introduzca el nombre del producto" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                        Precio (€)
                      </label>
                      <Input type="number" placeholder="0.00" min="0" step="0.01" />
                    </div>
                    <div>
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                        Stock
                      </label>
                      <Input type="number" placeholder="0" min="0" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                      Categoría
                    </label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save size={16} className="mr-2" />
                    Guardar Producto
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
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-4 bg-muted rounded-full">
                    <ImagePlus size={24} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Arrastra una imagen o</p>
                    <Button size="sm" variant="outline">Seleccionar Archivo</Button>
                    <p className="text-xs text-muted-foreground mt-2">PNG, JPG o WEBP (Max. 2MB)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Search, UserPlus, UserCheck, Mail, Phone, MoreVertical, Shield } from 'lucide-react';
import { Input } from '../../../components/ui/input';

export default function UsuariosPage() {
  const usuarios = [
    {
      id: '1',
      nombre: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      telefono: '+34 612 345 678',
      rol: 'Admin',
      estado: 'Activo',
      fechaRegistro: new Date('2023-12-01'),
    },
    {
      id: '2',
      nombre: 'María López',
      email: 'maria@ejemplo.com',
      telefono: '+34 623 456 789',
      rol: 'Usuario',
      estado: 'Activo',
      fechaRegistro: new Date('2024-01-15'),
    },
    // ...más usuarios
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES').format(date);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <p className="text-muted-foreground">
            Gestiona los usuarios y sus permisos.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">{usuarios.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            <div className="text-2xl font-bold">
              {usuarios.filter(user => user.estado === 'Activo').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <div className="text-2xl font-bold">
              {usuarios.filter(user => user.rol === 'Admin').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Lista de Usuarios</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuario..."
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
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Usuario</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Teléfono</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Rol</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-center p-3 text-sm font-medium text-muted-foreground">Fecha Registro</th>
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b">
                    <td className="p-3 font-medium">{usuario.nombre}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {usuario.email}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {usuario.telefono}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        usuario.rol === 'Admin' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        usuario.estado === 'Activo'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="p-3 text-center text-sm">{formatDate(usuario.fechaRegistro)}</td>
                    <td className="p-3">
                      <div className="flex justify-end">
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
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

"use client";

import React, { useEffect, useState } from 'react';
import { UserService } from '../../../lib/services/user.service';
import { DashboardLayout } from '../../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Search, UserPlus, UserCheck, Mail, Phone, MoreVertical, Shield } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: string;
  status: string;
  phone?: string;
  createdAt: string;
  lastSignInAt?: string;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await UserService.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            <div className="text-2xl font-bold">
              {users.filter(user => user.status === 'Activo').length}
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
              {users.filter(user => user.role === 'Admin').length}
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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      <LoadingSpinner size="sm" />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-destructive">
                      {error}
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3 font-medium">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.imageUrl} 
                            alt={user.firstName} 
                            className="w-8 h-8 rounded-full"
                          />
                          {user.firstName} {user.lastName}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {user.email}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {user.phone}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Admin' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Activo'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 text-center text-sm">{formatDate(new Date(user.createdAt))}</td>
                      <td className="p-3">
                        <div className="flex justify-end">
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Obtén los usuarios de tu base de datos en lugar de Clerk
    const dbUsers = await prisma.user.findMany({
      select: {
        id: true,
        clerkId: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Añade otros campos que necesites
      }
    });
    
    // Devuelve solo la información de la base de datos
    // Esto es una solución temporal hasta resolver el problema con la API de Clerk
    return NextResponse.json(dbUsers);
  } catch (error) {
    console.error('Error loading users:', error);
    return NextResponse.json(
      { error: 'Error loading users' },
      { status: 500 }
    );
  }
}
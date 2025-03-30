import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.product.deleteMany({});

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta Básica',
        description: 'Camiseta de algodón 100% de alta calidad',
        price: 29.99,
        category: 'Ropa',
        stock: 100,
        sku: 'ROPA-001',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'
        ]
      },
      {
        name: 'Zapatillas Running',
        description: 'Zapatillas deportivas para running con tecnología de amortiguación',
        price: 89.99,
        category: 'Calzado',
        stock: 50,
        sku: 'CALZ-001',
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'
        ]
      },
      {
        name: 'Auriculares Bluetooth',
        description: 'Auriculares inalámbricos con cancelación de ruido',
        price: 159.99,
        category: 'Electrónica',
        stock: 30,
        sku: 'ELEC-001',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'
        ]
      },
      {
        name: 'Mochila Impermeable',
        description: 'Mochila resistente al agua con compartimento para laptop',
        price: 49.99,
        category: 'Accesorios',
        stock: 75,
        sku: 'ACC-001',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
          'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800'
        ]
      },
      {
        name: 'Smartwatch Pro',
        description: 'Reloj inteligente con monitor de actividad física',
        price: 199.99,
        category: 'Electrónica',
        stock: 25,
        sku: 'ELEC-002',
        images: [
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
          'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800'
        ]
      },
      {
        name: 'Jeans Clásicos',
        description: 'Jeans de corte regular en denim premium',
        price: 79.99,
        category: 'Ropa',
        stock: 60,
        sku: 'ROPA-002',
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
          'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800'
        ]
      }
    ]
  });

  console.log('Seed completado: Base de datos poblada con productos de ejemplo');
}

main()
  .catch((e) => {
    console.error('Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

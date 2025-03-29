import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta Básica',
        description: 'Camiseta de algodón 100%',
        price: 29.99,
        category: 'Ropa',
        stock: 100,
        sku: 'CAM-001',
        images: ['https://example.com/camiseta.jpg']
      },
      // Add more products as needed
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

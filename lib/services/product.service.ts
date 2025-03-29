import { prisma } from '../db';
import { Product } from '../../types';

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    return await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return await prisma.product.create({
      data
    });
  },

  async updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    return await prisma.product.update({
      where: { id },
      data
    });
  },

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id }
    });
  }
};

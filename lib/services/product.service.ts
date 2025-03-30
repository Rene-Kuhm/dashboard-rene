import { prisma } from '../db';
import type { Product } from '../../types';

export const ProductService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch('/api/products', {
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      if (!response.ok) throw new Error('Error fetching products');
      return response.json();
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  },

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creating product');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error in createProduct:', error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Error deleting product');
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  },

  async updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Error updating product');
      return response.json();
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Producto no encontrado');
        }
        throw new Error('Error al cargar el producto');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  }
};

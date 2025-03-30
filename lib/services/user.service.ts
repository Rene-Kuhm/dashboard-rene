import { prisma } from '../db';
import axios from 'axios';

// Define interfaces
interface User {
  id: string;
  name?: string;
  email: string;
  provider?: 'google' | 'facebook' | 'credentials';
  image?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Create API client
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session cookies
});

export class UserService {
  // Get the currently logged-in user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/users/me');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  // Get all users (for admin)
  static async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<ApiResponse<User[]>>('/users');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Error fetching users');
    }
  }

  // Login with email and password
  static async login(email: string, password: string): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<User>>('/auth/login', { email, password });
      return response.data.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Authentication failed');
    }
  }

  // Login with social provider
  static async loginWithProvider(provider: 'google' | 'facebook'): Promise<User> {
    // For client-side social auth, we typically redirect to the auth endpoint
    // This is a placeholder for the actual implementation
    window.location.href = `/api/auth/${provider}`;
    // This won't actually execute since we're redirecting
    return {} as User;
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  }

  // Register a new user
  static async register(userData: Partial<User> & { password: string }): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<User>>('/auth/register', userData);
      return response.data.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  }

  static async getUsersByClerkIds(clerkIds: string[]) {
    try {
      const users = await prisma.user.findMany({
        where: {
          clerkId: {
            in: clerkIds
          }
        }
      });
      return users;
    } catch (error) {
      console.error('Error fetching users by clerk IDs:', error);
      throw error;
    }
  }
}

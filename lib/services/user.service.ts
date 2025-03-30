import { prisma } from '../db';

export const UserService = {
  async getUsers() {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Error fetching users');
      return response.json();
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw error;
    }
  },

  async getUsersByClerkIds(clerkIds: string[]) {
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
};

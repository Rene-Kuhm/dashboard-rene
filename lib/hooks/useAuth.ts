import { useState, useEffect } from 'react';
import { UserService } from '../services/user.service'; // We'll create this service

// Define user interface
interface User {
  id: string;
  name?: string;
  email: string;
  provider?: 'google' | 'facebook' | 'credentials';
  image?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await UserService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Failed to load user:', err);
        setError(err instanceof Error ? err.message : 'Failed to authenticate');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await UserService.login(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      const userData = await UserService.loginWithProvider(provider);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : `Login with ${provider} failed`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await UserService.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  return { user, isLoading, error, login, loginWithProvider, logout };
}

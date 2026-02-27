import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'joke_app_auth';
const ADMIN_ROLE = 'admin';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.role === ADMIN_ROLE && parsed.isAuthenticated && parsed.token) {
          setUser(parsed);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.auth.login(credentials);
      const { token, user: userData } = response;
      
      const authData = {
        ...userData,
        token,
        isAuthenticated: true,
        role: ADMIN_ROLE,
      };
      setUser(authData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const isAdmin = user?.role === ADMIN_ROLE && user?.isAuthenticated && user?.token;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

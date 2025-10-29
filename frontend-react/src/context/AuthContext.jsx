import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('pharma_token');
    const storedUser = localStorage.getItem('pharma_user');
    
    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });
      
      const { access_token, user: userData } = response.data;
      
      setToken(access_token);
      setUser(userData);
      localStorage.setItem('pharma_token', access_token);
      localStorage.setItem('pharma_user', JSON.stringify(userData));
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });
      
      const { access_token, user: userData } = response.data;
      
      setToken(access_token);
      setUser(userData);
      localStorage.setItem('pharma_token', access_token);
      localStorage.setItem('pharma_user', JSON.stringify(userData));
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(
          `${API_BASE}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('pharma_token');
      localStorage.removeItem('pharma_user');
      setError(null);
    }
  };

  const verifyAuth = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/auth/verify`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data.authenticated;
    } catch {
      return false;
    }
  };

  const getAuthHeader = () => {
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
    return {};
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    register,
    login,
    logout,
    verifyAuth,
    getAuthHeader,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

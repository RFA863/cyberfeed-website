import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true); // State untuk loading awal
  const navigate = useNavigate();

  // Cek status login saat aplikasi dimuat
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }
    // Verifikasi token dengan backend (opsional tapi direkomendasikan)
    api.get('/users/profile')
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        // Jika token tidak valid, hapus
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, accessToken, refreshToken } = response.data;

    // Simpan semuanya di localStorage dan state
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    setUser(user);
    setAccessToken(accessToken);
    
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setAccessToken(null);
    navigate('/login');
  };

  const value = {
    user,
    accessToken,
    isAuthenticated: !!accessToken,
    loading,
    login,
    logout,
  };

  if (loading) {
    return <div>Loading application...</div>; 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
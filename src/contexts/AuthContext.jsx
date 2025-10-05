import { useNavigate } from 'react-router-dom';
import { createContext, useState, useEffect, useCallback } from 'react';

import { loginSrv } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setAccessToken(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
   
    if (!token) {
      setLoading(false);
      return;
     
    }

    setAccessToken(token);
    setUser(JSON.parse(localStorage.getItem('user')));
    setLoading(false);

    // api.get('/users/profile')
    //   .catch(() => {
        
    //     logout();
    //   })
    //   .finally(() => {
       
    //     setLoading(false);
    //   });
  }, []);

  const login = async (username, password) => {

    const data = await loginSrv(username, password);

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.token.token);
    localStorage.setItem('refreshToken', data.token.refreshToken);

    setUser(data.user);
    setAccessToken(data.token.token);
    
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
    return (
      <div>lagi loading</div>
    ); 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
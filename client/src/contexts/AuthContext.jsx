import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('drivefleet_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    setUser(data.user);
    localStorage.setItem('drivefleet_user', JSON.stringify(data.user));
    return data;
  };

  const googleLogin = async (userData) => {
    const { data } = await API.post('/auth/google', userData);
    setUser(data.user);
    localStorage.setItem('drivefleet_user', JSON.stringify(data.user));
    return data;
  };

  const register = async (name, email, photoURL, password) => {
    const { data } = await API.post('/auth/register', { name, email, photoURL, password });
    return data;
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (e) { }
    setUser(null);
    localStorage.removeItem('drivefleet_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

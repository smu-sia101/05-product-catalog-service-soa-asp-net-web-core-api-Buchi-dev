import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app starts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Get user data from the server
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setUser(response.data);
      }
    } catch {
      // If there's an error, clear the token and user data
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
    
    localStorage.setItem('token', response.data.token);
    setUser(response.data);
    return response.data;
  };

  // Register new user
  const register = async (username, email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: username,
      email,
      password,
    });
    
    localStorage.setItem('token', response.data.token);
    setUser(response.data);
    return response.data;
  };

  // Update user profile
  const updateUser = async (userData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      'http://localhost:5000/api/auth/update-details',
      userData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setUser(response.data);
    return response.data;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Values to share across the app
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 
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
    // Use a local storage flag to check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Get user data from the server
  const loadUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me');
      if (response.data) {
        setUser(response.data);
      }
    } catch {
      // If there's an error, clear the login state
      localStorage.removeItem('isLoggedIn');
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
    
    // Store login status in local storage
    localStorage.setItem('isLoggedIn', 'true');
    setUser(response.data.user);
    return response.data;
  };

  // Register new user
  const register = async (username, email, password) => {
    try {
      console.log('Attempting to register with:', { username, email, password: '***hidden***' });
      
      if (!username || !email || !password) {
        throw new Error('All fields are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: username,
        email,
        password,
      });
      
      // Store login status in local storage
      localStorage.setItem('isLoggedIn', 'true');
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      // Re-throw the error for the component to handle
      throw error;
    }
  };

  // Update user profile
  const updateUser = async (userData) => {
    const response = await axios.put(
      'http://localhost:5000/api/auth/update-details',
      userData
    );
    setUser(response.data);
    return response.data;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
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
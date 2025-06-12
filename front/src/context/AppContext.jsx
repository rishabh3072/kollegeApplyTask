import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ isAdmin: true }); // Demo admin user
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '', 
    author: '', 
    dateRange: { start: '', end: '' }, 
    type: 'all'
  });
  const [payoutRates, setPayoutRates] = useState({});

  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const value = {
    user,
    isAuthenticated,
    articles,
    loading,
    error,
    filters,
    payoutRates,
    loginUser,
    logoutUser,
    setArticles,
    setLoading,
    setError,
    updateFilters,
    setPayoutRates
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
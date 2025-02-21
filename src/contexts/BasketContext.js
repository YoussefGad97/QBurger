import React, { createContext, useContext, useState, useEffect } from 'react';

const BasketContext = createContext();
const STORAGE_KEY = 'qburger_basket';

export function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load basket from localStorage on initial render
  useEffect(() => {
    try {
      const savedBasket = localStorage.getItem(STORAGE_KEY);
      if (savedBasket) {
        const parsedBasket = JSON.parse(savedBasket);
        // Validate the parsed data
        if (Array.isArray(parsedBasket)) {
          setBasketItems(parsedBasket);
        }
      }
    } catch (error) {
      console.error('Error loading basket from storage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    try {
      if (!isLoading) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(basketItems));
      }
    } catch (error) {
      console.error('Error saving basket to storage:', error);
    }
  }, [basketItems, isLoading]);

  const addToBasket = (item) => {
    setBasketItems(prev => {
      // Check if the item already exists (for non-custom burgers)
      if (!item.isCustom) {
        const existingItem = prev.find(i => i.id === item.id);
        if (existingItem) {
          return prev.map(i => 
            i.id === item.id 
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
      }
      return [...prev, item];
    });
  };

  const removeFromBasket = (itemId) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromBasket(itemId);
      return;
    }
    
    setBasketItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearBasket = () => {
    setBasketItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing basket from storage:', error);
    }
  };

  const getTotalItems = () => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <BasketContext.Provider value={{
      basketItems,
      addToBasket,
      removeFromBasket,
      updateQuantity,
      clearBasket,
      getTotalItems,
      getTotalPrice,
      isLoading
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
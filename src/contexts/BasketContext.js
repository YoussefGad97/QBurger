import React, { createContext, useContext, useState, useEffect } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState([]);
  
  // Load basket from localStorage on initial render
  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      setBasketItems(JSON.parse(savedBasket));
    }
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketItems));
  }, [basketItems]);

  const addToBasket = (item) => {
    setBasketItems(prev => [...prev, item]);
  };

  const removeFromBasket = (itemId) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const getTotalItems = () => {
    return basketItems.length;
  };

  return (
    <BasketContext.Provider value={{
      basketItems,
      addToBasket,
      removeFromBasket,
      clearBasket,
      getTotalItems
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext); 
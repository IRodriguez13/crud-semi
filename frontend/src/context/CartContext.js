import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState(null);
  const { currentUser } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!currentUser) {
      setCartCount(0);
      setCart(null);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/carrito/');
      setCart(response.data);
      setCartCount(response.data.cantidad_items || 0);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      setCartCount(0);
      setCart(null);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const refreshCart = () => {
    fetchCart();
  };

  const value = {
    cartCount,
    cart,
    refreshCart,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};


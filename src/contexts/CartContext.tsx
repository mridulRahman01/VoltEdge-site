'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CART_ITEMS_MOCK, Product } from '@/lib/mockData';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  brand: string;
  qty: number;
}

const INITIAL_CART: CartItem[] = CART_ITEMS_MOCK.map((item) => ({
  ...item,
  qty: 1,
}));

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addToCart: (product: Product | CartItem, qty?: number) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  cartCount: 0,
  subtotal: 0,
  deliveryFee: 0,
  total: 0,
  addToCart: () => {},
  updateQty: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('voltedge_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Fallback to default mock cart
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem('voltedge_cart', JSON.stringify(items));
    } catch {
      // Storage error fallback
    }
  }, [items, initialized]);

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 50000 || items.length === 0 ? 0 : 120;
  const total = subtotal + deliveryFee;

  const addToCart = (product: Product | CartItem, qty: number = 1) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += qty;
        return updated;
      }
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        alt: product.alt || product.name,
        brand: product.brand || 'VoltEdge',
        qty,
      };
      return [...prev, newItem];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQty = item.qty + delta;
              return newQty > 0 ? { ...item, qty: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        deliveryFee,
        total,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

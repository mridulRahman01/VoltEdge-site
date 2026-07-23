'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, Product } from '@/lib/mockData';

const INITIAL_WISHLIST = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[3]];

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  wishlistCount: 0,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>(INITIAL_WISHLIST);
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('voltedge_wishlist');
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch {
      // Keep default initial wishlist on storage error
    } finally {
      setInitialized(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem('voltedge_wishlist', JSON.stringify(wishlist));
    } catch {
      // Storage error fallback
    }
  }, [wishlist, initialized]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

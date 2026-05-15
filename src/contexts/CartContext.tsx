'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { Product } from '@/types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (product: Product) => void;

  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | null>(
  null,
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used within CartProvider',
    );
  }

  return context;
}
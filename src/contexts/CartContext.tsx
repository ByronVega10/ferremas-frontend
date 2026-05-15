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

  increaseQuantity: (productId: number) => void;

  decreaseQuantity: (productId: number) => void;
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
    setCart((prevCart) => {

      const existingProduct =
        prevCart.find(
          (item) => item.id === product.id,
        );

      if (existingProduct) {

        return prevCart.map((item) => {

          if (item.id === product.id) {

            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {

        if (item.id === productId) {

          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

          return item;
      }),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) => {

      return prevCart
        .map((item) => {

          if (item.id === productId) {

            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0);
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
        increaseQuantity,
        decreaseQuantity,
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
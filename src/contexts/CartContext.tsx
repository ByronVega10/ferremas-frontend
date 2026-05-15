'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { Product } from '@/types/product';
import axios from '@/lib/axios';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

interface CartItem extends Product {
  quantity: number;
  cartItemId: number; // ID del item en el carrito (opcional, para futuras mejoras)
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
  const { user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {

      try {
        if (!user) return;

        const response = await axios.get(
          `/cart/${user.sub}`,
        );

        const formattedCart = response.data.items.map(
          (item: any) => ({
            ...item.product,
            quantity: item.quantity,
            cartItemId: item.id,
          }),
        );

        setCart(formattedCart);

      } catch (error) {
        console.error(error);
      }
    };

    loadCart();

  }, [user]);

  const addToCart = async (product: Product) => {

    try {

      if (!user) {
        alert('Debes iniciar sesión');
        return;
      }

      // 🔥 guardar en backend
      await axios.post('/cart/add', {
        userId: user.sub,
        productId: product.id,
        quantity: 1,
      });

      // 🔥 mantener UI actual
      const response = await axios.get(
        `/cart/${user.sub}`,
      );

      const formattedCart = response.data.items.map(
        (item: any) => ({
          ...item.product,
          quantity: item.quantity,
          cartItemId: item.id,
        }),
      );

      setCart(formattedCart);

    } catch (error) {
      console.error(error);
    }
  };

  const increaseQuantity = async (
    productId: number,
  ) => {

    try {
      const item = cart.find(
        (item) => item.id === productId,
      );

      if (!item) return;

      await axios.patch(
        `/cart/${item.cartItemId}`,
        {
          quantity: item.quantity + 1,
        },
      );

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

    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQuantity = async (
    productId: number,
  ) => {

    try {
      const item = cart.find(
        (item) => item.id === productId,
      );

      if (!item) return;

      // eliminar si llega a 0
      if (item.quantity === 1) {

        await axios.delete(
          `/cart/${item.cartItemId}`,
        );

        setCart((prev) =>
          prev.filter(
            (item) => item.id !== productId,
          ),
        );

        return;
      }

      // actualizar DB
      await axios.patch(
        `/cart/${item.cartItemId}`,
        {
          quantity: item.quantity - 1,
        },
      );

      // actualizar frontend
      setCart((prevCart) =>
        prevCart.map((item) => {

          if (item.id === productId) {

            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        }),
      );

    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      
      const item = cart.find(
        (item) => item.id === productId,
      );

      if (!item) return;

      await axios.delete(
        `/cart/${item.cartItemId}`,
      );

      setCart((prev) =>
        prev.filter((item) => item.id !== productId),
      );

    } catch (error) {
      console.error(error);
    }
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
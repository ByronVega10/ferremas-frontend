'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          FERREMAS
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
            <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
                Productos
            </Link>

            <Link
                href="/categories"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
                Categorías
            </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 text-gray-700">
          
          <Link
            href="/cart"
            className="relative"
          >
            <ShoppingCart className="w-6 h-6" />

            {cart.length > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-red-500
                  text-white
                  text-xs
                  rounded-full
                  w-5
                  h-5
                  flex
                  items-center
                  justify-center
                "
              >
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">

              <div className="text-sm">
              <p className="font-semibold text-gray-800">
                {user.email}
              </p>

              <p className="text-gray-500">
                {user.role}
              </p>
            </div>

            <button
              onClick={logout}
              className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-red-600
                transition
              "
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <User className="w-6 h-6" />
          </Link>
        )}
        </div>
      </div>
    </nav>
  );
}
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
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
          </Link>

          <Link
            href="/login"
          >
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
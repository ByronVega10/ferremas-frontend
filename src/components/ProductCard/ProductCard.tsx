'use client';

import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface Props {
  product: Product;
}


export default function ProductCard({
  product,
}: Props) {

  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">
      
      {/* Fake Image */}
      <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-gray-500">
          Imagen Producto
        </span>
      </div>

      <h2 className="text-xl font-semibold text-gray-800">
        {product.name}
      </h2>

      <p className="text-gray-600 mt-2 line-clamp-2">
        {product.description}
      </p>

      <div className="mt-4">
        <p className="text-2xl font-bold text-blue-600">
          ${product.price}
        </p>

        <p className="text-sm text-gray-500">
          Stock: {product.stock}
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="
          mt-4
          w-full
          bg-blue-600
          text-white
          py-2
          rounded-lg
          hover:bg-blue-700
          transition
        "
      >
        Agregar al carrito
      </button>
    </div>
  );
}
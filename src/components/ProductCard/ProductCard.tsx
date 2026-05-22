'use client';

import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface Props {
  product: Product;
  usdValue?: number; 
  euroValue?: number;
}


export default function ProductCard({
  product,
  usdValue,
  euroValue
}: Props) {

  const { addToCart } = useCart();

  const priceInUsd = 
    usdValue 
      ? (product.price / usdValue).toFixed(2) 
      : null; 
    
  const priceInEuro = 
    euroValue 
      ? (product.price / euroValue).toFixed(2) 
      : null;

  return (
    <div 
      className="
        bg-white 
        rounded-xl 
        shadow-md 
        p-4 
        hover:shadow-xl 
        transition
      "
    >
      
      {/* Fake Image */}
      
      <div 
        className="
          h-48 
          bg-gray-200 
          rounded-lg 
          mb-4 
          flex 
          items-center 
          justify-center
        "
      >
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
        
        {/* Precio CLP */} 
        <p className="text-2xl font-bold text-blue-600"> 
          ${product.price.toLocaleString('es-CL')} CLP 
        </p> 
        
        {/* USD */} 
        {priceInUsd && ( 
          <p className="text-sm text-gray-600 mt-1"> 
            USD ${priceInUsd} 
          </p> 
        )}

        {/* EUR */} 
        {priceInEuro && (
          <p className="text-sm text-gray-600"> 
            EUR €{priceInEuro} 
          </p> 
        )} 
        
        <p className="text-sm text-gray-500 mt-2"> 
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
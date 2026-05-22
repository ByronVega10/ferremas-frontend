'use client';

import { useEffect, useState } from 'react';

import ProductCard from '@/components/ProductCard/ProductCard';

import { getProducts } from '@/services/products.service';

import { Product } from '@/types/product';

import api from '@/lib/axios';

export default function ProductsPage() {

  const [products, setProducts] = 
    useState<Product[]>([]);
  
  const [usdValue, setUsdValue] =
    useState<number | null>(null);

  const [euroValue, setEuroValue] =
    useState<number | null>(null);


  useEffect(() => {
    loadProducts();
    loadExchangeRates();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);

    } catch (error) {
      console.error(error);
    }
  };

  const loadExchangeRates = async () => {

    try {

      const usdResponse =
        await api.get('/exchange/usd');

      const euroResponse =
        await api.get('/exchange/euro');

      setUsdValue(usdResponse.data.value);

      setEuroValue(euroResponse.data.value);

    } catch (error) {

      console.error(
        'Error cargando divisas',
        error,
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      
      <h1 
        className="
          text-4xl 
          font-bold 
          mb-8 
          text-gray-800
        "
      >
        Productos
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            usdValue={usdValue ?? undefined}
            euroValue={euroValue ?? undefined}
          />
        ))}
      </div>
    </main>
  );
}
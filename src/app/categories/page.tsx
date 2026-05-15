'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  getCategories,
} from '@/services/category.service';

import {
  getProductsByCategory,
} from '@/services/product.service';

import ProductCard from '@/components/ProductCard/ProductCard';

export default function CategoriesPage() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [products, setProducts] =
    useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadCategories();

  }, []);

  const loadCategories = async () => {

    try {

      const data =
        await getCategories();

      setCategories(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleCategoryClick =
    async (
      categoryId: number,
    ) => {

      try {

        setLoading(true);

        setSelectedCategory(categoryId);

        const data =
          await getProductsByCategory(
            categoryId,
          );

        setProducts(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1
        className="
          text-4xl
          font-bold
          text-gray-800
          mb-10
        "
      >
        Categorías
      </h1>

      {/* Categories */}

    <div
        className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
            mb-12
        "
    >

        {categories.map((category) => (

            <button
                key={category.id}
                onClick={() =>
                    handleCategoryClick(
                        category.id,
                    )
                }
                className={`
                    rounded-2xl
                    shadow-md
                    p-10
                    text-2xl
                    font-bold
                    transition
                    hover:scale-105

                    ${
                        selectedCategory ===
                        category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800 hover:bg-blue-100'
                    }
                `}
            >
                {category.name}
            </button>

    ))}

    </div>

      {/* Products */}

      {loading ? (

        <p className="text-gray-600">
          Cargando productos...
        </p>

      ) : products.length > 0 ? (

        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      ) : (

        <div
          className="
            bg-white
            p-8
            rounded-xl
            shadow-md
          "
        >

          <p className="text-gray-600">
            Selecciona una categoría.
          </p>

        </div>

      )}

    </main>
  );
}
'use client';

import {
  useEffect,
  useState,
} from 'react';

import ProtectedAdmin from '@/components/ProtectedAdmin/ProtectedAdmin';

import {
  createProduct,
  deleteProduct,
  getProducts,
} from '@/services/product.service';

export default function AdminProductsPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [name, setName] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [price, setPrice] =
    useState('');

  const [stock, setStock] =
    useState('');

  const [imageUrl, setImageUrl] =
    useState('');

  const [categoryId, setCategoryId] =
    useState('');

  const loadProducts = async () => {

    const data = await getProducts();

    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      await createProduct({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
        categoryId: Number(categoryId),
      });

      alert('Producto creado');

      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setImageUrl('');
      setCategoryId('');

      loadProducts();

    } catch (error) {

      console.error(error);

      alert('Error al crear producto');
    }
  };

  const handleDelete = async (
    id: number,
  ) => {

    try {

      await deleteProduct(id);

      loadProducts();

    } catch (error) {

      console.error(error);

      alert('Error eliminando producto');
    }
  };

  return (
    <ProtectedAdmin>

      <main className="min-h-screen bg-gray-100 p-10">

        <h1
          className="
            text-4xl
            font-bold
            text-gray-800
            mb-10
          "
        >
          Administrar Productos
        </h1>

        {/* Formulario */}

        <form
          onSubmit={handleCreate}
          className="
            bg-white
            p-6
            rounded-xl
            shadow-md
            mb-10
            grid
            gap-4
          "
        >

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              border
              p-3
              rounded-lg
              text-gray-800
            "
            required
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="
              border
              p-3
              rounded-lg
              text-gray-800
            "
            required
          />

          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="
              border
              p-3
              rounded-lg
              text-gray-800
            "
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="
              border
              p-3
              rounded-lg
              text-gray-800
            "
            required
          />

          <input
            type="text"
            placeholder="URL Imagen"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            className="
              border
              p-3
              rounded-lg
              text-gray-800
            "
            required
          />

          <input
            type="number"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            className="
              border
              p-3
              rounded-lg
              text-gray-800
            "
            required
          />

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              py-3
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            Crear Producto
          </button>

        </form>

        {/* Productos */}

        <div className="grid gap-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="
                bg-white
                rounded-xl
                shadow-md
                p-4
                flex
                justify-between
                items-center
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-800
                  "
                >
                  {product.name}
                </h2>

                <p className="text-gray-600">
                  ${product.price}
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(product.id)
                }
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
                Eliminar
              </button>

            </div>
          ))}

        </div>

      </main>

    </ProtectedAdmin>
  );
}
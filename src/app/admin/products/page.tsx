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
  updateProduct,
} from '@/services/product.service';

export default function AdminProductsPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [sku, setSku] = useState('');
  const [name, setName] =
    useState('');
  const [brand, setBrand] =
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

  const resetForm = () => {
    setEditingId(null);
    setSku('');
    setName('');
    setBrand('');
    setDescription('');
    setPrice('');
    setStock('');
    setImageUrl('');
    setCategoryId('');
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setSku(product.sku || '');
    setName(product.name || '');
    setBrand(product.brand || '');
    setDescription(product.description || '');
    setPrice(String(product.price ?? ''));
    setStock(String(product.stock ?? ''));
    setImageUrl(product.imageUrl || '');
    setCategoryId(String(product.categoryId ?? ''));
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      const payload = {
        sku,
        name,
        brand,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
        categoryId: Number(categoryId),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        alert('Producto actualizado');
      } else {
        await createProduct(payload);
        alert('Producto creado');
      }

      resetForm();
      loadProducts();
    } catch (error) {
      console.error(error);
      alert(
        editingId
          ? 'Error al actualizar producto'
          : 'Error al crear producto',
      );
    }
  };

  const handleDelete = async (
    id: number,
  ) => {
    try {
      await deleteProduct(id);
      loadProducts();

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      alert('Error eliminando producto');
    }
  };

  return (
    <ProtectedAdmin>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold">
          Administrar Productos
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-xl font-semibold">
            {editingId
              ? 'Editar producto'
              : 'Crear producto'}
          </h2>

          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) =>
              setSku(e.target.value)
            }
            className="border p-3 rounded-lg text-gray-800"
            required
          />

          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-3 rounded-lg text-gray-800"
            required
          />

          <input
            type="text"
            placeholder="Marca"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
            className="border p-3 rounded-lg text-gray-800"
            required
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border p-3 rounded-lg text-gray-800"
          />

          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="border p-3 rounded-lg text-gray-800"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="border p-3 rounded-lg text-gray-800"
            required
          />

          <div className="space-y-3">
            <input
              type="text"
              placeholder="URL de la imagen"
              value={imageUrl}
              onChange={(e) =>
                setImageUrl(e.target.value)
              }
              className="border p-3 rounded-lg text-gray-800 w-full"
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Vista previa del producto"
                className="w-40 h-40 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://placehold.co/300x300?text=Sin+imagen';
                }}
              />
            )}
          </div>

          <input
            type="number"
            placeholder="ID de categoría"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            className="border p-3 rounded-lg text-gray-800"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editingId
                ? 'Guardar cambios'
                : 'Crear producto'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex gap-4 items-start">
                <img
                  src={
                    product.imageUrl ||
                    'https://placehold.co/120x120?text=Sin+imagen'
                  }
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/120x120?text=Sin+imagen';
                  }}
                />

                <div>
                  <h3 className="text-lg font-bold">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">
                    SKU: {product.sku}
                  </p>
                  <p className="text-gray-600">
                    Marca: {product.brand}
                  </p>
                  <p className="text-gray-600">
                    Precio: ${product.price}
                  </p>
                  <p className="text-gray-600">
                    Stock: {product.stock}
                  </p>
                  {product.imageUrl && (
                    <p className="text-sm text-blue-600 break-all">
                      {product.imageUrl}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedAdmin>
  );
}
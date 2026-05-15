'use client';

import {
  useEffect,
  useState,
} from 'react';

import ProtectedAdmin from '@/components/ProtectedAdmin/ProtectedAdmin';

import {
  createCategory,
  deleteCategory,
  getCategories,
} from '@/services/category.service';

export default function AdminCategoriesPage() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [name, setName] =
    useState('');

  const loadCategories = async () => {

    const data =
      await getCategories();

    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      await createCategory({
        name,
      });

      setName('');

      loadCategories();

      alert('Categoría creada');

    } catch (error) {

      console.error(error);

      alert('Error creando categoría');
    }
  };

  const handleDelete = async (
    id: number,
  ) => {

    try {

      await deleteCategory(id);

      loadCategories();

    } catch (error) {

      console.error(error);

      alert(
        'No se puede eliminar categoría con productos',
      );
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
          Administrar Categorías
        </h1>

        {/* Form */}

        <form
          onSubmit={handleCreate}
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
            mb-10
            flex
            gap-4
          "
        >

          <input
            type="text"
            placeholder="Nombre categoría"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
              flex-1
              border
              rounded-lg
              p-3
              text-gray-800
            "
            required
          />

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              px-6
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            Crear
          </button>

        </form>

        {/* Categories */}

        <div className="grid gap-4">

          {categories.map((category) => (

            <div
              key={category.id}
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

              <h2
                className="
                  text-xl
                  font-semibold
                  text-gray-800
                "
              >
                {category.name}
              </h2>

              <button
                onClick={() =>
                  handleDelete(category.id)
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
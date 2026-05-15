'use client';

import Link from 'next/link';

import ProtectedAdmin from '@/components/ProtectedAdmin/ProtectedAdmin';

export default function AdminPage() {
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
          Panel Administrador
        </h1>

        <div
          className="
            grid
            md:grid-cols-2
            gap-6
          "
        >

          <Link
            href="/admin/products"
            className="
              bg-white
              rounded-xl
              shadow-md
              p-8
              hover:shadow-xl
              transition
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
                mb-4
              "
            >
              Productos
            </h2>

            <p className="text-gray-600">
              Administrar productos
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="
              bg-white
              rounded-xl
              shadow-md
              p-8
              hover:shadow-xl
              transition
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
                mb-4
              "
            >
              Categorías
            </h2>

            <p className="text-gray-600">
              Administrar categorías
            </p>
          </Link>

        </div>

      </main>

    </ProtectedAdmin>
  );
}
'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import {
  registerRequest,
} from '@/services/auth.service';

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState('');

  const [lastname, setLastname] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await registerRequest({
        name,
        lastname,
        email,
        password,
      });

      alert(
        'Cuenta creada correctamente',
      );

      router.push('/login');

    } catch (error) {

      console.error(error);

      alert(
        'Error al crear la cuenta',
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-gray-100
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          bg-white
          shadow-xl
          rounded-xl
          p-8
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-center
            text-gray-800
            mb-8
          "
        >
          Crear Cuenta
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-6"
        >

          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-gray-700
              "
            >
              Nombre
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                text-gray-800
              "
              required
            />
          </div>

          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-gray-700
              "
            >
              Apellido
            </label>

            <input
              type="text"
              value={lastname}
              onChange={(e) =>
                setLastname(e.target.value)
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                text-gray-800
              "
              required
            />
          </div>

          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-gray-700
              "
            >
              Correo
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                text-gray-800
              "
              required
            />
          </div>

          <div>
            <label
              className="
                block
                mb-2
                text-sm
                font-medium
                text-gray-700
              "
            >
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                text-gray-800
              "
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              hover:bg-blue-700
              transition
              font-semibold
            "
          >
            {loading
              ? 'Creando cuenta...'
              : 'Crear Cuenta'}
          </button>
        </form>

        <p
          className="
            text-center
            text-sm
            text-gray-600
            mt-6
          "
        >
          ¿Ya tienes cuenta?{' '}

          <Link
            href="/login"
            className="
              text-blue-600
              hover:underline
              font-medium
            "
          >
            Inicia sesión
          </Link>
        </p>

      </div>

    </main>
  );
}
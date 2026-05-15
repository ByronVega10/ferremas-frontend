'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { loginRequest } from '@/services/auth.service';

import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await loginRequest({
          email,
          password,
        });

      login(response.access_token);

      router.push('/');
    } catch (error) {
      console.error(error);

      alert('Credenciales incorrectas');
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
          Iniciar Sesión
        </h1>

        <form
          onSubmit={handleLogin}
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
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                text-gray-800
              "
              placeholder="correo@ejemplo.com"
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
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                text-gray-800
              "
              placeholder="********"
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
              ? 'Ingresando...'
              : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  );
}
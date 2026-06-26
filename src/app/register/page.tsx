'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import {
  registerRequest,
} from '@/services/auth.service';

type ValidationErrors = {
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  general?: string;
};

const nameRegex =
  /^[A-Za-zÀ-ÿ\s'-]+$/;

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegisterData = (
  name: string,
  lastname: string,
  email: string,
  password: string,
): ValidationErrors => {

  const errors: ValidationErrors = {};

  const cleanName = name.trim();
  const cleanLastname = lastname.trim();
  const cleanEmail = email.trim();

  if (!cleanName) {
    errors.name = 'El nombre es obligatorio';
  } else if (cleanName.length < 2) {
    errors.name =
      'El nombre debe tener al menos 2 caracteres';
  } else if (!nameRegex.test(cleanName)) {
    errors.name =
      'El nombre solo puede contener letras';
  }

  if (!cleanLastname) {
    errors.lastname =
      'El apellido es obligatorio';
  } else if (cleanLastname.length < 2) {
    errors.lastname =
      'El apellido debe tener al menos 2 caracteres';
  } else if (!nameRegex.test(cleanLastname)) {
    errors.lastname =
      'El apellido solo puede contener letras';
  }

  if (!cleanEmail) {
    errors.email = 'El correo es obligatorio';
  } else if (!emailRegex.test(cleanEmail)) {
    errors.email = 'Ingresa un correo valido';
  }

  if (!password) {
    errors.password =
      'La contraseña es obligatoria';
  } else if (password.length < 8) {
    errors.password =
      'La contraseña debe tener al menos 8 caracteres';
  } else if (!/[A-Z]/.test(password)) {
    errors.password =
      'Debe incluir al menos una letra mayuscula';
  } else if (!/[a-z]/.test(password)) {
    errors.password =
      'Debe incluir al menos una letra minuscula';
  } else if (!/\d/.test(password)) {
    errors.password =
      'Debe incluir al menos un numero';
  }

  return errors;
};

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

  const [errors, setErrors] =
    useState<ValidationErrors>({});

  const handleRegister = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      const validationErrors =
        validateRegisterData(
          name,
          lastname,
          email,
          password,
        );

      if (
        Object.keys(validationErrors).length >
        0
      ) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});

      setLoading(true);

      await registerRequest({
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password,
      });

      alert(
        'Cuenta creada correctamente',
      );

      router.push('/login');

    } catch (error) {

      console.error(error);

      setErrors({
        general:
          'No fue posible crear la cuenta. Intenta nuevamente.',
      });

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

          {errors.general && (
            <p
              className="
                rounded-lg
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
              "
            >
              {errors.general}
            </p>
          )}

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
                {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors((prev) => ({
                      ...prev,
                      name: undefined,
                    }));
                  }
                }
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

            {errors.name && (
              <p
                className="
                  mt-2
                  text-sm
                  text-red-600
                "
              >
                {errors.name}
              </p>
            )}
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
                {
                  setLastname(e.target.value);

                  if (errors.lastname) {
                    setErrors((prev) => ({
                      ...prev,
                      lastname: undefined,
                    }));
                  }
                }
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

            {errors.lastname && (
              <p
                className="
                  mt-2
                  text-sm
                  text-red-600
                "
              >
                {errors.lastname}
              </p>
            )}
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
                {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }
                }
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

            {errors.email && (
              <p
                className="
                  mt-2
                  text-sm
                  text-red-600
                "
              >
                {errors.email}
              </p>
            )}
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
                {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }));
                  }
                }
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

            {errors.password && (
              <p
                className="
                  mt-2
                  text-sm
                  text-red-600
                "
              >
                {errors.password}
              </p>
            )}
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
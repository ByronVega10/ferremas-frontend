'use client';

import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
  } = useCart();

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Carrito de Compras
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-gray-600">
            Tu carrito está vacío.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Productos */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
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
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="text-gray-600">
                    Cantidad: {item.quantity}
                  </p>

                  <p className="text-blue-600 font-bold mt-2">
                    ${item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
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

          {/* Resumen */}
          <div
            className="
              bg-white
              rounded-xl
              shadow-md
              p-6
              h-fit
            "
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Resumen
            </h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">
                Productos
              </span>

              <span className="font-semibold text-gray-800">
                {cart.length}
              </span>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-gray-600">
                Total
              </span>

              <span className="text-2xl font-bold text-blue-700">
                ${total}
              </span>
            </div>

            <button
              className="
                w-full
                bg-green-600
                text-white
                py-3
                rounded-lg
                hover:bg-green-700
                transition
              "
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
'use client';

import { useCart } from '@/contexts/CartContext';
import axios from '@/lib/axios';

export default function CartPage() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const handleCheckout = async () => {
  try {
    // 1. crear orden (backend usa JWT, no userId)
    const orderRes = await axios.post('/orders/checkout');
    console.log('ORDER RESPONSE:', orderRes.data);

    const orderId = orderRes.data.orderId;

    // 2. crear pago en MercadoPago
    const paymentRes = await axios.post('/payments/create', {
      orderId,
    });
    console.log('PAYMENT RESPONSE:', paymentRes.data);

    // 3. redirigir a MercadoPago
    window.location.href = paymentRes.data.init_point;

  } catch (error: any) {
    console.log('ERROR COMPLETO:', error);
    console.log('ERROR DATA:', error.response?.data);
    console.log('ERROR STATUS:', error.response?.status);
  }
};

  // Total dinero

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // Total productos REAL

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

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

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mt-3
                    "
                  >

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="
                        bg-gray-300
                        px-3
                        py-1
                        rounded-lg
                        hover:bg-gray-400
                        transition
                      "
                    >
                      -
                    </button>

                    <span className="text-gray-700 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="
                        bg-blue-600
                        text-white
                        px-3
                        py-1
                        rounded-lg
                        hover:bg-blue-700
                        transition
                      "
                    >
                      +
                    </button>
                  </div>

                  <p className="text-blue-600 font-bold mt-2">
                    ${item.price}
                  </p>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
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
                {totalItems}
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
              onClick={handleCheckout}
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
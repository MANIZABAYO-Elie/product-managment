import { useCart } from "../contexts/CartContext";
import Button from "../components/Button";

export default function CartPage() {
  const { state, remove, clear } = useCart();

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {state.items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {state.items.map((item) => (
                <li key={item.product.id} className="flex justify-between py-3">
                  <div>
                    <p className="font-semibold">{item.product.title}</p>
                    <p className="text-gray-600">
                      ${item.product.price} × {item.quantity}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => remove(item.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
              <Button variant="primary" onClick={clear}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

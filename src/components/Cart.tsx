import { useCart } from "../contexts/CartContext";
import Button from "../components/Button";

export default function CartSidebar() {
  const { state, remove, clear } = useCart();

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      {state.items.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          <ul className="space-y-2">
            {state.items.map((item) => (
              <li key={item.product.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.product.title}</div>
                  <div className="text-sm text-gray-600">x{item.quantity}</div>
                </div>
                <Button variant="danger" onClick={() => remove(item.product.id)}>Remove</Button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={clear}>Clear Cart</Button>
            <Button variant="primary">Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}
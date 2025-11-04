"use client";

import { useCart } from "@/context/CartContext";

export default function CartModal({ onClose }: { onClose: () => void }) {
  const { items, getTotalPrice, removeItem, clearCart } = useCart();
  const total = getTotalPrice();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-24 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Cart ({items.length})</h2>

        {items.length === 0 ? (
          <p className="text-gray-600 text-sm">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600 text-sm">TOTAL</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded mb-3 hover:bg-gray-300 transition-colors"
            >
              Clear Cart
            </button>

            <a
              href="/checkout"
              className="block w-full bg-orange-500 text-white text-center py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Checkout
            </a>
          </>
        )}
      </div>
    </div>
  );
}

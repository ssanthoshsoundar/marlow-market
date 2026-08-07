import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate("/"), 2500);
  }

  if (cartItems.length === 0 && !placed) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <p className="text-neutral-500">
          Your cart is empty — nothing to check out.
        </p>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h1 className="font-[Fraunces] text-2xl mb-2">Order placed!</h1>
        <p className="text-sm text-neutral-500">
          This is a demo — no real payment was processed. Taking you back home...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-[Fraunces] text-2xl sm:text-3xl mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2 space-y-3">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
            Shipping details
          </h2>
          <input
            required
            type="text"
            placeholder="Full name"
            className="w-full border border-[#E4E1D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]"
          />
          <input
            required
            type="text"
            placeholder="Address"
            className="w-full border border-[#E4E1D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="text"
              placeholder="City"
              className="border border-[#E4E1D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]"
            />
            <input
              required
              type="text"
              placeholder="ZIP code"
              className="border border-[#E4E1D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]"
            />
          </div>
        </div>

        <div className="sm:col-span-2 space-y-3">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
            Payment (demo only)
          </h2>
          <input
            required
            type="text"
            placeholder="Card number"
            className="w-full border border-[#E4E1D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="text"
              placeholder="MM/YY"
              className="border border-[#E4E1D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]"
            />
            <input
              required
              type="text"
              placeholder="CVC"
              className="border border-[#E4E1D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]"
            />
          </div>
        </div>

        <div className="sm:col-span-2 bg-white border border-[#E4E1D8] rounded-lg p-4 flex items-center justify-between">
          <span className="text-sm text-neutral-600">Total</span>
          <span className="font-mono text-lg font-semibold text-[#14213D]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          className="sm:col-span-2 bg-[#FF6B35] hover:bg-[#e85e2b] text-white font-medium py-3 rounded-md transition-colors"
        >
          Place order
        </button>
      </form>
    </div>
  );
}

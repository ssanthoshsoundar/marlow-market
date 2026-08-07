import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-[Fraunces] text-2xl sm:text-3xl mb-6">Your cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3 animate-float inline-block">🛍️</div>
          <p className="text-neutral-500 mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block bg-[#14213D] text-white px-5 py-2.5 rounded-md text-sm hover:bg-[#1e2f52] transition-colors"
          >
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-2 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white border border-[#E4E1D8] rounded-lg p-3"
              >
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-md bg-[#F5F3EC] p-2"
                  />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-sm font-medium leading-snug hover:text-[#FF6B35] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2 border border-[#E4E1D8] rounded-md px-1.5 py-0.5">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-mono w-4 text-center">
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#14213D]">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="text-neutral-400 hover:text-[#FF6B35] self-start"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#E4E1D8] rounded-lg p-4 h-fit">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-mono font-semibold text-base">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Shipping & taxes calculated at checkout.
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#FF6B35] hover:bg-[#e85e2b] text-white font-medium py-2.5 rounded-md transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

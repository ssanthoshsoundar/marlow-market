import { Link, useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";

export default function CartDrawer({ open, items, onClose, onUpdateQty, onRemove }) {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#FAFAF7] z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#E4E1D8]">
          <h2 className="font-[Fraunces] text-xl text-[#1A1A18]">Your cart</h2>
          <button onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {items.length === 0 && (
            <div className="mt-14 text-center">
              <div className="text-4xl mb-3 animate-float inline-block">🛍️</div>
              <p className="text-sm text-neutral-500">
                Nothing in here yet.
                <br />
                Go find something good.
              </p>
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 bg-white border border-[#E4E1D8] rounded-lg p-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain rounded-md bg-[#F5F3EC] p-1.5"
              />
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-sm font-medium leading-snug line-clamp-2">
                  {item.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2 border border-[#E4E1D8] rounded-md px-1.5 py-0.5">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)}>
                      <Minus size={13} />
                    </button>
                    <span className="text-xs font-mono w-4 text-center">
                      {item.qty}
                    </span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)}>
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-mono text-sm font-semibold text-[#14213D]">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.name}`}
                className="text-neutral-400 hover:text-[#FF6B35] self-start"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E4E1D8] p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-mono font-semibold text-base">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link
              to="/cart"
              onClick={onClose}
              className="block text-center text-xs text-neutral-500 hover:text-[#14213D] underline"
            >
              View full cart
            </Link>
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="w-full bg-[#FF6B35] hover:bg-[#e85e2b] text-white font-medium py-2.5 rounded-md transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

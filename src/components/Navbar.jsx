import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, MapPin, Menu, X } from "lucide-react";

export default function Navbar({ cartCount, onCartClick }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="sticky top-0 z-40 bg-[#14213D] text-white">
      {/* utility bar */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1.5 text-xs bg-[#0F1A30] text-white/70">
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          Deliver to your address
        </span>
        <span>Free returns within 30 days</span>
      </div>

      {/* main row */}
      <div className="flex items-center gap-4 px-4 sm:px-6 py-3">
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link
          to="/"
          className="shrink-0 font-[Fraunces] text-2xl tracking-tight inline-block transition-transform hover:-rotate-2"
        >
          Marlow<span className="text-[#FF6B35]">.</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-4 text-sm shrink-0">
          <Link to="/" className="hover:text-[#FF6B35] transition-colors">
            Shop
          </Link>
          <Link to="/about" className="hover:text-[#FF6B35] transition-colors">
            About
          </Link>
        </nav>

        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, categories"
              className="w-full px-3 py-2 text-sm text-[#1A1A18] placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#FF6B35] hover:bg-[#e85e2b] transition-colors"
            >
              <Search size={18} className="text-white" />
            </button>
          </div>
        </form>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 shrink-0 px-2 py-1.5 rounded-md hover:bg-white/10 transition-colors"
        >
          <ShoppingCart size={22} />
          <span className="hidden sm:inline text-sm">Cart</span>
          {cartCount > 0 && (
            <span
              key={cartCount}
              className="absolute -top-1 -right-1 sm:static sm:ml-0 bg-[#FF6B35] text-white text-[11px] font-mono font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pop"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="sm:hidden flex flex-col gap-1 px-4 pb-3 text-sm bg-[#14213D]">
          <Link to="/" onClick={() => setMenuOpen(false)} className="py-1.5">
            Shop
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="py-1.5">
            About
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="py-1.5">
            View cart
          </Link>
        </nav>
      )}
    </header>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import WaveDivider from "../components/WaveDivider";
import CategoryRail from "../components/CategoryRail";
import ProductGrid from "../components/ProductGrid";
import { fetchAllProducts } from "../api/dummyJsonApi";
import { normalizeProduct } from "../utils/normalizeProduct";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAllProducts(100)
      .then((data) => {
        if (cancelled) return;
        setProducts(data.map(normalizeProduct));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.categoryLabel)));
    return ["All", ...unique.sort()];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.categoryLabel === activeCategory;
      const matchesQuery = p.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, activeCategory]);

  return (
    <>
      <Hero />
      <WaveDivider />
      <CategoryRail
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <div className="max-w-6xl mx-auto w-full">
        {query && !loading && (
          <p className="px-4 sm:px-6 pt-4 text-sm text-neutral-500">
            Showing results for <span className="font-medium text-[#1A1A18]">"{query}"</span>
          </p>
        )}

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 py-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-[#E4E1D8] overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-[#F0EEE6]" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-[#F0EEE6] rounded w-3/4" />
                  <div className="h-3 bg-[#F0EEE6] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="px-6 py-16 text-center">
            <p className="text-neutral-600 mb-1">Couldn't load products.</p>
            <p className="text-sm text-neutral-400">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <ProductGrid products={filtered} onAdd={addToCart} />
        )}
      </div>
    </>
  );
}

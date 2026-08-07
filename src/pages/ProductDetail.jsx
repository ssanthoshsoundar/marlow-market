import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import { fetchProductById, fetchProductsByCategory } from "../api/dummyJsonApi";
import { normalizeProduct } from "../utils/normalizeProduct";
import { useCart } from "../context/CartContext";
import ReviewCard from "../components/ReviewCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setProduct(null);

    fetchProductById(id)
      .then(async (data) => {
        if (cancelled) return;
        const normalized = normalizeProduct(data);
        setProduct(normalized);
        setActiveImage(0);

        const sameCategory = await fetchProductsByCategory(data.category);
        if (cancelled) return;
        setRelated(
          sameCategory
            .filter((p) => String(p.id) !== String(id))
            .slice(0, 4)
            .map(normalizeProduct)
        );
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
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-2 gap-8 animate-pulse">
          <div className="aspect-square bg-[#F0EEE6] rounded-lg" />
          <div className="space-y-3">
            <div className="h-6 bg-[#F0EEE6] rounded w-3/4" />
            <div className="h-4 bg-[#F0EEE6] rounded w-1/2" />
            <div className="h-8 bg-[#F0EEE6] rounded w-1/3 mt-4" />
            <div className="h-24 bg-[#F0EEE6] rounded w-full mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="font-[Fraunces] text-2xl mb-2">Couldn't find that one.</p>
        {error && <p className="text-sm text-neutral-400 mb-3">{error}</p>}
        <Link to="/" className="text-[#FF6B35] text-sm underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const reviewList = product.reviewList || [];
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => reviewList.filter((r) => r.rating === star).length
  );
  const maxCount = Math.max(...ratingCounts, 1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-[#14213D] mb-6"
      >
        <ArrowLeft size={15} />
        Back to shop
      </Link>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square bg-[#F5F3EC] rounded-lg overflow-hidden flex items-center justify-center p-8">
            <img
              src={product.images[activeImage] || product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-14 h-14 rounded-md overflow-hidden border p-1 bg-[#F5F3EC] transition-colors ${
                    activeImage === i
                      ? "border-[#FF6B35]"
                      : "border-[#E4E1D8] hover:border-neutral-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {product.badge && (
            <span className="self-start bg-[#14213D] text-white text-[11px] font-medium px-2 py-0.5 rounded -rotate-3 mb-3">
              {product.badge}
            </span>
          )}
          <h1 className="font-[Fraunces] text-2xl sm:text-3xl text-[#1A1A18] leading-tight">
            {product.name}
          </h1>

          <a href="#reviews" className="flex items-center gap-1 text-sm text-neutral-500 mt-2 hover:text-[#14213D] w-fit">
            <Star size={15} className="fill-[#FF6B35] text-[#FF6B35]" />
            <span>{product.rating}</span>
            <span className="text-neutral-300">·</span>
            <span className="underline">{product.reviews.toLocaleString()} reviews</span>
          </a>

          <p className="text-sm text-neutral-500 mt-1">{product.categoryLabel}</p>

          <div className="mt-5 relative inline-flex items-center gap-1 bg-[#FFF1E8] border border-[#FF6B35]/40 rounded-r-md pl-4 pr-3 py-2 self-start">
            <span className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-[#FAFAF7] border border-[#FF6B35]/40" />
            <span className="font-mono text-xl font-semibold text-[#14213D]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-sm text-neutral-600 mt-6 leading-relaxed max-w-md">
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 bg-[#FF6B35] hover:bg-[#e85e2b] text-white font-medium py-3 rounded-md transition-colors max-w-xs"
          >
            Add to cart
          </button>

          {product.specs && (
            <div className="mt-8 border-t border-[#E4E1D8] pt-5">
              <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">
                Specifications
              </h2>
              <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                {product.specs.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="text-neutral-500">{s.label}</dt>
                    <dd className="text-[#1A1A18] font-medium capitalize">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Reviews section */}
      <div id="reviews" className="mt-14 border-t border-[#E4E1D8] pt-10 scroll-mt-20">
        <h2 className="font-[Fraunces] text-2xl mb-6">Reviews</h2>

        <div className="grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl font-semibold text-[#14213D]">
                {product.rating}
              </span>
              <span className="text-neutral-400 text-sm">/ 5</span>
            </div>
            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={
                    i < Math.round(product.rating)
                      ? "fill-[#FF6B35] text-[#FF6B35]"
                      : "text-neutral-200"
                  }
                />
              ))}
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Based on {product.reviews.toLocaleString()} ratings
            </p>

            <div className="mt-4 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-neutral-500">{star}</span>
                  <div className="flex-1 h-1.5 bg-[#F0EEE6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF6B35] rounded-full"
                      style={{
                        width: `${(ratingCounts[idx] / maxCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            {reviewList.length === 0 ? (
              <p className="text-sm text-neutral-500">No written reviews yet.</p>
            ) : (
              reviewList.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-[Fraunces] text-xl mb-4">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white rounded-lg border border-[#E4E1D8] overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="aspect-square bg-[#F5F3EC] flex items-center justify-center p-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-2">{p.name}</p>
                  <p className="font-mono text-sm font-semibold text-[#14213D] mt-1">
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

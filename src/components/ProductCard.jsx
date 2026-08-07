import { Link } from "react-router-dom";
import { Star, Plus } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-lg border border-[#E4E1D8] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <Link to={`/product/${product.id}`} className="relative aspect-square bg-[#F5F3EC] overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#14213D] text-white text-[11px] font-medium px-2 py-0.5 rounded -rotate-3 shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex-1 flex flex-col p-3 gap-1.5">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-[#1A1A18] leading-snug line-clamp-2 hover:text-[#FF6B35] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Star size={13} className="fill-[#FF6B35] text-[#FF6B35]" />
          <span>{product.rating}</span>
          <span className="text-neutral-300">·</span>
          <span>{product.reviews.toLocaleString()}</span>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="relative inline-flex items-center gap-1 bg-[#FFF1E8] border border-[#FF6B35]/40 rounded-r-md pl-3 pr-2 py-1">
            <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-[#FAFAF7] border border-[#FF6B35]/40" />
            <span className="font-mono text-sm font-semibold text-[#14213D]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAdd(product)}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#14213D] text-white hover:bg-[#1e2f52] hover:rotate-90 transition-all duration-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

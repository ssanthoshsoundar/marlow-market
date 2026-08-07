import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-500">
        <p className="text-lg font-[Fraunces]">No products match your search.</p>
        <p className="text-sm mt-1">Try a different keyword or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 py-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}

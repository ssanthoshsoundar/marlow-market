function formatCategoryName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function normalizeProduct(apiProduct) {
  const rating = apiProduct.rating ?? 4.0;
  const reviewList = (apiProduct.reviews || []).map((r) => ({
    author: r.reviewerName,
    rating: r.rating,
    date: formatDate(r.date),
    text: r.comment,
  }));

  let badge;
  if (apiProduct.discountPercentage >= 15) badge = "Deal";
  else if (rating >= 4.7) badge = "Best seller";
  else if (apiProduct.availabilityStatus === "Low Stock") badge = "Low stock";

  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    category: apiProduct.category,
    categoryLabel: formatCategoryName(apiProduct.category),
    price: apiProduct.price,
    discountPercentage: apiProduct.discountPercentage,
    rating,
    reviews: reviewList.length,
    image: apiProduct.thumbnail,
    images: apiProduct.images || [apiProduct.thumbnail],
    description: apiProduct.description,
    badge,
    stock: apiProduct.stock,
    specs: [
      { label: "Brand", value: apiProduct.brand || "—" },
      { label: "Category", value: formatCategoryName(apiProduct.category) },
      { label: "Stock", value: `${apiProduct.stock} available` },
      { label: "Warranty", value: apiProduct.warrantyInformation || "—" },
      { label: "Shipping", value: apiProduct.shippingInformation || "—" },
      { label: "Return policy", value: apiProduct.returnPolicy || "—" },
    ],
    reviewList,
  };
}
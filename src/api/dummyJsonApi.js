const BASE_URL = "https://dummyjson.com";

export async function fetchAllProducts(limit = 100) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load products");
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

export async function fetchCategoryList() {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json(); // array of plain slug strings
}

export async function fetchProductsByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`
  );
  if (!res.ok) throw new Error("Failed to load related products");
  const data = await res.json();
  return data.products;
}

export async function searchProducts(query) {
  const res = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.products;
}
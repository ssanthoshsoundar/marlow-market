import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id, qty) {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = useMemo(
    () => ({
      cartItems,
      cartOpen,
      setCartOpen,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      cartCount,
      subtotal,
    }),
    [cartItems, cartOpen, cartCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}

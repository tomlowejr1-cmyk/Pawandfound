import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product, CartItem } from "./types";
import { SUBSCRIPTION_DISCOUNT } from "./types";

const CART_STORAGE_KEY = "pawandfound-cart";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, isSubscription?: boolean) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSubscription: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  getItemPrice: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | null>(null);

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const persist = useCallback((updater: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    setItems((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveCart(next);
      return next;
    });
  }, []);

  const addItem = useCallback((product: Product, isSubscription = false) => {
    persist((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.isSubscription === isSubscription
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, isSubscription }];
    });
  }, [persist]);

  const removeItem = useCallback((productId: string) => {
    persist((prev) => prev.filter((item) => item.product.id !== productId));
  }, [persist]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      persist((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    persist((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [persist]);

  const toggleSubscription = useCallback((productId: string) => {
    persist((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, isSubscription: !item.isSubscription }
          : item
      )
    );
  }, [persist]);

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const getItemPrice = useCallback((item: CartItem): number => {
    const basePrice = item.product.price;
    return item.isSubscription ? basePrice * (1 - SUBSCRIPTION_DISCOUNT) : basePrice;
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        toggleSubscription,
        clearCart,
        itemCount,
        total,
        getItemPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
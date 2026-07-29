export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Apparel" | "Essentials" | "Supplies" | "Accessories";
  price: number;
  description: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription?: boolean;
}

export const CATEGORIES = [
  { id: "Apparel", name: "Apparel", description: "T-shirts, sweaters, raincoats & more", icon: "👕" },
  { id: "Essentials", name: "Essentials", description: "Food, treats, litter & daily needs", icon: "🛒" },
  { id: "Supplies", name: "Supplies", description: "Beds, bowls, grooming & cleanup", icon: "🧹" },
  { id: "Accessories", name: "Accessories", description: "Leashes, toys, tags & harnesses", icon: "🎾" },
] as const;

// Products that are eligible for subscription/auto-delivery
export const SUBSCRIBABLE_CATEGORIES = ["Essentials", "Supplies"];

export const SUBSCRIPTION_DISCOUNT = 0.10; // 10% off
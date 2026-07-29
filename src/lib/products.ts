import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";
import type { Product } from "./types";
import productsData from "./products-data.json";
import paymentLinksData from "./payment-links-data.json";

// Server function to load products — reads from the bundled JSON
const loadProducts = createServerFn({ method: "GET" }).handler(async () => {
  return productsData as Product[];
});

// Server function to load payment links
const loadPaymentLinks = createServerFn({ method: "GET" }).handler(async () => {
  return paymentLinksData as Record<string, string>;
});

export { loadProducts, loadPaymentLinks };

// Client-side helpers
export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((p) => p.featured);
}

export function getPaymentLink(links: Record<string, string>, slug: string): string | undefined {
  return links[slug];
}
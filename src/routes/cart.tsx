import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import type { Product } from "~/lib/types";
import { useCart } from "~/lib/cart-context";
import { getCartUpsells } from "~/lib/cross-sells";
import { loadProducts, loadPaymentLinks, getPaymentLink } from "~/lib/products";

const SITE_URL = "https://pawandfound.store";

interface CartData {
  paymentLinks: Record<string, string>;
  allProducts: Product[];
}

export const Route = createFileRoute("/cart")({
  loader: async (): Promise<CartData> => {
    const paymentLinks = await loadPaymentLinks();
    const allProducts = await loadProducts();
    return { paymentLinks, allProducts };
  },
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Shopping Cart — Paw & Found" },
      {
        name: "description",
        content:
          "Review your pet supplies shopping cart at Paw & Found. Check out with Stripe for secure payment.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Shopping Cart — Paw & Found" },
      { property: "og:url", content: `${SITE_URL}/cart` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cart` }],
  }),
});

function CartPage() {
  const { paymentLinks, allProducts } = Route.useLoaderData();
  const { items, removeItem, updateQuantity, toggleSubscription, clearCart, itemCount, total, getItemPrice } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const handleStripeCheckout = (slug: string) => {
    const url = getPaymentLink(paymentLinks, slug);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCheckoutAll = () => {
    if (items.length === 0) return;

    if (items.length === 1) {
      handleStripeCheckout(items[0].product.slug);
    } else {
      setCheckoutMessage(checkoutMessage ? null : "multi");
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 bg-[#FFF8F0] px-6 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="font-heading text-2xl font-bold text-[#2D2D2D]">Your cart is empty</h1>
        <p className="text-[#6B7280]">Time to find something for your furry friend!</p>
        <a href="/products" className="btn-primary mt-2">
          Browse Pet Products
        </a>
      </div>
    );
  }

  const multiCheckout = checkoutMessage === "multi";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="section-title">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-[#6B7280] hover:text-[#FF7F5C]">
          Clear Cart
        </button>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="mt-4 rounded-xl border border-[#E9EDDE] bg-white p-4">
        {total >= 50 ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div className="flex-1">
              <p className="font-heading text-sm font-semibold text-[#2A9D8F]">
                You qualify for free shipping!
              </p>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-[#E9EDDE] overflow-hidden">
                <div className="h-full rounded-full bg-[#2A9D8F] w-full transition-all duration-500" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-medium text-[#2D2D2D]">
                Add <strong className="text-[#FF7F5C]">${(50 - total).toFixed(2)}</strong> more for free shipping!
              </p>
              <span className="text-xs text-[#6B7280]">${total.toFixed(2)} of $50.00</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#E9EDDE] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#FF7F5C] transition-all duration-500"
                style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        {items.map((item) => {
          const itemPrice = getItemPrice(item);
          const savings = item.isSubscription
            ? (item.product.price - itemPrice) * item.quantity
            : 0;
          const stripeUrl = getPaymentLink(paymentLinks, item.product.slug);

          return (
            <div
              key={`${item.product.id}-${item.isSubscription ? "sub" : "once"}`}
              className="card flex items-center gap-4 p-4 sm:gap-6"
            >
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#FFF8F0] sm:h-24 sm:w-24">
                <img
                  src={item.product.image}
                  alt={`${item.product.name} — Paw & Found`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <a
                    href={`/products/${item.product.slug}`}
                    className="font-heading font-semibold text-[#2D2D2D] hover:text-[#FF7F5C]"
                  >
                    {item.product.name}
                  </a>
                  {item.isSubscription && (
                    <span className="inline-flex items-center rounded-full bg-[#2A9D8F]/10 px-2 py-0.5 text-xs font-medium text-[#2A9D8F]">
                      🔄 Subscribe & Save
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B7280]">{item.product.category}</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="font-bold text-[#FF7F5C]">
                    ${(itemPrice * item.quantity).toFixed(2)}
                  </p>
                  {item.isSubscription && (
                    <p className="text-xs text-[#6B7280]">
                      <span className="line-through">${(item.product.price * item.quantity).toFixed(2)}</span>
                      {" "}you save ${savings.toFixed(2)}
                    </p>
                  )}
                </div>
                {item.isSubscription && (
                  <p className="mt-0.5 text-xs text-[#2A9D8F]">
                    Auto-delivery every 4 weeks
                  </p>
                )}
                {stripeUrl && (
                  <button
                    onClick={() => handleStripeCheckout(item.product.slug)}
                    className="mt-1 text-xs font-medium text-[#FF7F5C] hover:underline"
                  >
                    ⚡ Buy Now with Stripe
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {!item.isSubscription && item.product.category !== "Apparel" && item.product.category !== "Accessories" && (
                  <button
                    onClick={() => toggleSubscription(item.product.id)}
                    className="whitespace-nowrap rounded-lg px-2 py-1 text-xs font-medium text-[#2A9D8F] hover:bg-[#2A9D8F]/10"
                  >
                    🔄 Subscribe
                  </button>
                )}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="flex-shrink-0 rounded-full p-2 text-[#6B7280] hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-lg">
          <span className="font-heading font-semibold text-[#2D2D2D]">Total ({itemCount} items)</span>
          <span className="text-2xl font-bold text-[#FF7F5C]">${total.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-sm text-[#6B7280]">
          {total >= 50
            ? "✓ You qualify for free shipping!"
            : `$${(50 - total).toFixed(2)} away from free shipping`}
        </p>

        {/* Multi-item checkout buttons */}
        {multiCheckout && items.length > 1 && (
          <div className="mt-4 space-y-2 rounded-lg border border-[#E9EDDE] bg-[#FFF8F0] p-4">
            <p className="text-sm font-medium text-[#2D2D2D]">
              Purchase items individually via Stripe:
            </p>
            <div className="space-y-2">
              {items.map((item) => {
                const stripeUrl = getPaymentLink(paymentLinks, item.product.slug);
                return (
                  <div key={item.product.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
                    <span className="text-[#2D2D2D]">
                      {item.product.name} x{item.quantity}
                    </span>
                    {stripeUrl ? (
                      <button
                        onClick={() => handleStripeCheckout(item.product.slug)}
                        className="rounded-lg bg-[#FF7F5C] px-3 py-1 text-xs font-medium text-white hover:bg-[#FF7F5C]/90"
                      >
                        ⚡ Buy Now
                      </button>
                    ) : (
                      <span className="text-xs text-[#6B7280]">No payment link</span>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setCheckoutMessage(null)}
              className="text-xs text-[#6B7280] hover:text-[#FF7F5C]"
            >
              ← Back to summary
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="/products" className="btn-secondary flex-1 text-center">
            Continue Shopping
          </a>
          <button
            onClick={handleCheckoutAll}
            className="btn-primary flex-1"
          >
            {items.length === 1 ? "⚡ Checkout with Stripe" : "⚡ Proceed to Checkout"}
          </button>
        </div>

  
      {/* You Might Also Like — Upsells */}
      <YouMightAlsoLike items={items} allProducts={allProducts} />

      {/* Blog Tips Sidebar */}
        <aside className="mt-12 border-t border-[#E9EDDE] pt-6 text-center">
          <h3 className="font-heading text-lg font-semibold text-[#2D2D2D]">🐾 While You Wait</h3>
          <p className="mt-1 text-sm text-[#6B7280]">Check out our latest pet care tips!</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a href="/blog" className="btn-secondary text-xs">Dog Food Guide</a>
            <a href="/blog" className="btn-secondary text-xs">Cat Litter Tips</a>
            <a href="/blog" className="btn-secondary text-xs">Dog Toys Guide</a>
            <a href="/blog" className="btn-secondary text-xs">All Tips →</a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function YouMightAlsoLike({ items, allProducts }: { items: { product: Product }[]; allProducts: Product[] }) {
  const cartSlugs = items.map((i) => i.product.slug);
  const upsellSlugs = useMemo(() => getCartUpsells(cartSlugs), [cartSlugs]);
  const upsellProducts = upsellSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 4);

  if (upsellProducts.length === 0) return null;

  const { addItem } = useCart();

  return (
    <section className="mt-8 rounded-2xl border border-[#E9EDDE] bg-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎁</span>
        <h2 className="font-heading text-lg font-bold text-[#2D2D2D]">
          You Might Also Like
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {upsellProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl border border-[#E9EDDE] bg-[#FFF8F0] overflow-hidden hover:shadow-md transition-shadow"
          >
            <a href={`/product/${product.slug}`} className="block">
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </a>
            <div className="p-3">
              <a
                href={`/product/${product.slug}`}
                className="block font-heading text-xs font-semibold text-[#2D2D2D] hover:text-[#FF7F5C] line-clamp-2"
              >
                {product.name}
              </a>
              <p className="mt-1 text-sm font-bold text-[#FF7F5C]">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addItem(product, false)}
                className="mt-2 w-full rounded-lg bg-[#FF7F5C] px-2 py-1.5 text-xs font-semibold text-white hover:bg-[#FF7F5C]/90 transition-colors"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

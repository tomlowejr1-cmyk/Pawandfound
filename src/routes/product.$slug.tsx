import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { loadProducts, loadPaymentLinks, getProductBySlug, getPaymentLink } from "~/lib/products";
import { useCart } from "~/lib/cart-context";
import { ProductReviews } from "~/components/product-reviews";
import type { Product } from "~/lib/types";
import { SUBSCRIBABLE_CATEGORIES, SUBSCRIPTION_DISCOUNT } from "~/lib/types";
import subscriptionLinks from "~/lib/subscription-links.json";

const SITE_URL = "https://pawandfound.store";

interface ProductDetailData {
  product: Product;
  related: Product[];
  stripeUrl: string | undefined;
}

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }): Promise<ProductDetailData> => {
    const products = await loadProducts();
    const product = getProductBySlug(products, params.slug);
    if (!product) throw notFound();

    const paymentLinks = await loadPaymentLinks();
    const stripeUrl = getPaymentLink(paymentLinks, params.slug);

    const related = products.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);

    return { product, related, stripeUrl };
  },
  component: ProductDetailPage,
  head: ({ loaderData }: { loaderData: ProductDetailData }) => {
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — ${product.category} | Paw & Found` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — ${product.category} | Paw & Found` },
        { property: "og:description", content: product.description },
        { property: "og:image", content: `${SITE_URL}${product.image}` },
        { property: "og:url", content: `${SITE_URL}/product/${product.slug}` },
        { property: "og:type", content: "product" },
        { property: "product:price:amount", content: String(product.price) },
        { property: "product:price:currency", content: "USD" },
        { property: "product:availability", content: "instock" },
        { property: "og:price:amount", content: String(product.price) },
        { property: "og:price:currency", content: "USD" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${product.name} | Paw & Found` },
        { name: "twitter:description", content: product.description },
        { name: "twitter:image", content: `${SITE_URL}${product.image}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/product/${product.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: `${SITE_URL}${product.image}`,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: product.price,
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/product/${product.slug}`,
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
                shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
              },
            },
            brand: { "@type": "Brand", name: "Paw & Found" },
            category: product.category,
          }),
        },
      ],
    };
  },
  staleTime: 60_000,
});

function ProductDetailPage() {
  const { product, related, stripeUrl } = Route.useLoaderData();
  const { addItem } = useCart();
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time");
  const [reviewSummary, setReviewSummary] = useState<{ avg: string; count: number } | null>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(`pawandfound-reviews-${product.id}`);
      if (stored) {
        const reviews = JSON.parse(stored) as { rating: number }[];
        if (reviews.length > 0) {
          const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
          setReviewSummary({ avg, count: reviews.length });
        }
      }
    } catch {}
  }, [product.id]);
  const [addedToCart, setAddedToCart] = useState(false);

  const isSubscribable = SUBSCRIBABLE_CATEGORIES.includes(product.category);
  const discountedPrice = product.price * (1 - SUBSCRIPTION_DISCOUNT);
  const subscriptionUrl = (subscriptionLinks as Record<string, string>)[product.slug] || null;

  const handleAddToCart = () => {
    const isSubscription = purchaseType === "subscription";
    addItem(product, isSubscription);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    const checkoutUrl = purchaseType === "subscription" && subscriptionUrl ? subscriptionUrl : stripeUrl;
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#6B7280]" aria-label="Breadcrumb">
        <a href="/products" className="hover:text-[#2A9D8F]">
          Products
        </a>
        <span className="mx-2">/</span>
        <span className="text-[#2D2D2D]">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-[#2D2D2D]" aria-current="page">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-xl bg-[#FFF8F0] shadow-sm">
          <img
            src={product.image}
            alt={`${product.name} — Paw & Found pet ${product.category.toLowerCase()}`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="badge w-fit">{product.category}</span>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-[#2D2D2D] sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
          {reviewSummary && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-[#F4A261]">{"★".repeat(Math.round(parseFloat(reviewSummary.avg)))}</span>
              <span className="text-sm text-[#6B7280]">{reviewSummary.avg} ({reviewSummary.count} {reviewSummary.count === 1 ? "review" : "reviews"})</span>
            </div>
          )}
          <p className="mt-4 leading-relaxed text-[#6B7280]">{product.description}</p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#E9EDDE] px-3 py-1 text-xs font-medium text-[#6B7280]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Subscribe & Save option (for eligible products) */}
          {isSubscribable && (
            <div className="mt-6 rounded-xl border border-[#E9EDDE] bg-[#FFF8F0] p-4">
              <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">
                💰 Subscribe & Save
              </h3>
              <div className="mt-3 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#E9EDDE] bg-white p-3 transition-colors hover:border-[#FF7F5C]/30 has-checked:border-[#FF7F5C] has-checked:bg-[#FF7F5C]/5">
                  <input
                    type="radio"
                    name="purchase-type"
                    value="one-time"
                    checked={purchaseType === "one-time"}
                    onChange={() => setPurchaseType("one-time")}
                    className="h-4 w-4 accent-[#FF7F5C]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-[#2D2D2D]">One-time purchase</span>
                    <p className="text-sm font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#E9EDDE] bg-white p-3 transition-colors hover:border-[#2A9D8F]/30 has-checked:border-[#2A9D8F] has-checked:bg-[#2A9D8F]/5">
                  <input
                    type="radio"
                    name="purchase-type"
                    value="subscription"
                    checked={purchaseType === "subscription"}
                    onChange={() => setPurchaseType("subscription")}
                    className="h-4 w-4 accent-[#2A9D8F]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#2D2D2D]">Subscribe & Save</span>
                      <span className="badge-sale">Save 10%</span>
                    </div>
                    <p className="text-sm font-bold text-[#2A9D8F]">
                      ${discountedPrice.toFixed(2)} <span className="text-xs font-normal text-[#6B7280] line-through">${product.price.toFixed(2)}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-[#6B7280]">Auto-delivery every 4 weeks. You can manage, pause, or cancel anytime from your Stripe customer portal.</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button onClick={handleAddToCart} className="btn-primary">
              {addedToCart ? "✓ Added to Cart!" : `Add to Cart`}
            </button>
            <Link to="/cart" className="btn-secondary">
              View Cart
            </Link>
            {stripeUrl && (
              <a href={purchaseType === "subscription" && subscriptionUrl ? subscriptionUrl : stripeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary border-[#FF7F5C] text-[#FF7F5C] hover:bg-[#FF7F5C]/5 inline-block text-center">
                ⚡ Buy Now with Stripe
              </a>
            )}
          </div>

          <p className="mt-4 text-sm text-[#6B7280]">
            ✓ Free shipping on orders over $50 &bull; 30-day returns
            {(stripeUrl || subscriptionUrl) && <><br />⚡ Secure checkout via Stripe</>}
          </p>
        </div>
      </div>

      {/* Blog Tips */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-[#E9EDDE] mt-12">
        <h2 className="section-title text-center">Pet Care Tips {/* Related Products */}amp; Guides</h2>
        <p className="text-center text-sm text-[#6B7280] mt-2 mb-6">Helpful reads for pet parents</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/blog" className="card p-4 text-sm font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">🐕 Top 5 Dog Breeds</a>
          <a href="/blog" className="card p-4 text-sm font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">🐱 Top 5 Cat Breeds</a>
          <a href="/blog" className="card p-4 text-sm font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">🍖 Picking the Best Dog Food</a>
          <a href="/blog" className="card p-4 text-sm font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">📝 See All Guides →</a>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title">Related Pet Products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <a
                key={r.id}
                href={`/product/${r.slug}`}
                className="card group"
              >
                <div className="aspect-square overflow-hidden bg-[#FFF8F0]">
                  <img
                    src={r.image}
                    alt={`${r.name} — Paw & Found pet product`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                    {r.name}
                  </h3>
                  <p className="mt-1 font-bold text-[#FF7F5C]">${r.price.toFixed(2)}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
      <ProductReviews productId={product.id} productName={product.name} />
    </div>
  );
}

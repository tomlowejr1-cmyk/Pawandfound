import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { loadProducts } from "~/lib/products";
import type { Product } from "~/lib/types";
import { SEED_REVIEWS, type Review } from "~/components/product-reviews";

const SITE_URL = "https://pawandfound.store";

interface ReviewItem {
  product: Product;
  review: Review;
}

interface ReviewsData {
  items: ReviewItem[];
  stats: {
    total: number;
    average: number;
    fiveStar: number;
    categories: number;
  };
}

export const Route = createFileRoute("/reviews")({
  loader: async (): Promise<ReviewsData> => {
    const products = await loadProducts();
    const byId = new Map(products.map((p) => [p.id, p]));
    const items: ReviewItem[] = [];
    for (const [pid, reviews] of Object.entries(SEED_REVIEWS)) {
      const product = byId.get(pid);
      if (!product) continue;
      for (const review of reviews) items.push({ product, review });
    }
    const total = items.length;
    const sum = items.reduce((acc, i) => acc + i.review.rating, 0);
    const average = total ? Math.round((sum / total) * 10) / 10 : 0;
    const fiveStar = items.filter((i) => i.review.rating === 5).length;
    const categories = new Set(items.map((i) => i.product.category)).size;
    return { items, stats: { total, average, fiveStar, categories } };
  },
  head: () => ({
    meta: [
      { title: "Reviews & Testimonials — Paw & Found | Real Words From Pet Parents" },
      {
        name: "description",
        content:
          "See why pet parents love Paw & Found. Star ratings and reviews across apparel, essentials, supplies, and accessories — read what happy dog and cat owners say about our products.",
      },
      { property: "og:title", content: "Reviews & Testimonials — Paw & Found ⭐" },
      {
        property: "og:description",
        content:
          "Real words from happy pet parents: read the reviews behind our 4.8-star rating across apparel, supplies, and everyday essentials.",
      },
      { property: "og:url", content: `${SITE_URL}/reviews` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/reviews` }],
  }),
  component: ReviewsPage,
});

const CATEGORY_ICONS: Record<string, string> = {
  Apparel: "👕",
  Essentials: "🛒",
  Supplies: "🧹",
  Accessories: "🎾",
};

const AVATAR_COLORS = [
  "bg-[#2A9D8F]",
  "bg-[#FF7F5C]",
  "bg-[#F4A261]",
  "bg-[#6C7BD9]",
  "bg-[#E76F51]",
  "bg-[#457B9D]",
];

function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(name: string): string {
  const parts = name.replace(/[^a-zA-Z ]/g, "").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "P") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function Stars({ rating, size = "text-lg" }: { rating: number; size?: string }) {
  return (
    <div
      className={`${size} tracking-wide text-[#F4A261]`}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

function ReviewCard({ item, featured = false }: { item: ReviewItem; featured?: boolean }) {
  const { product, review } = item;
  return (
    <div
      className={`flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#E9EDDE] transition hover:shadow-md ${
        featured ? "gap-3" : "gap-2"
      }`}
    >
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} size={featured ? "text-xl" : "text-base"} />
        <span className="text-xs text-[#B0B7A3]">{review.date}</span>
      </div>
      <p className={`text-[#2D2D2D] ${featured ? "text-[15px] leading-relaxed" : "text-sm leading-relaxed"}`}>
        {featured ? `"${review.text}"` : review.text}
      </p>
      <div className="mt-auto flex items-center gap-3 border-t border-[#E9EDDE] pt-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${avatarColor(
            review.name
          )}`}
          aria-hidden="true"
        >
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#2D2D2D]">{review.name}</p>
          <a
            href={`/product/${product.slug}`}
            className="flex items-center gap-1.5 text-xs text-[#2A9D8F] hover:underline"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-4 w-4 rounded object-cover"
              loading="lazy"
            />
            <span className="truncate">{product.name}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ReviewsPage() {
  const { items, stats } = Route.useLoaderData();
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.product.category))),
    [items]
  );

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.product.category === category)),
    [items, category]
  );

  const featured = useMemo(
    () =>
      items
        .filter((i) => i.review.rating === 5)
        .sort((a, b) => b.review.text.length - a.review.text.length)
        .slice(0, 3),
    [items]
  );

  const pctFive = stats.total ? Math.round((stats.fiveStar / stats.total) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-[#FFF6EC] to-white p-8 text-center shadow-sm ring-1 ring-[#E9EDDE] sm:p-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#FF7F5C]">
          Reviews & Testimonials
        </p>
        <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          What Pet Parents Are Saying 💬
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Real words from the dog moms, cat dads, and small-animal lovers who shop with us.
          If they love it, your pet probably will too.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm ring-1 ring-[#E9EDDE]">
          <span className="text-2xl" aria-hidden="true">⭐</span>
          <span className="font-heading text-2xl font-bold text-[#2D2D2D]">
            {stats.average.toFixed(1)} / 5
          </span>
          <span className="text-sm text-[#6B7280]">from {stats.total} reviews</span>
        </div>
      </section>

      {/* Stats band */}
      <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: "📝", label: "Total reviews", value: String(stats.total) },
          { icon: "⭐", label: "Average rating", value: stats.average.toFixed(1) },
          { icon: "🌟", label: "5-star reviews", value: `${stats.fiveStar} (${pctFive}%)` },
          { icon: "🐾", label: "Product categories", value: String(stats.categories) },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-[#E9EDDE]"
          >
            <p className="text-2xl" aria-hidden="true">{s.icon}</p>
            <p className="mt-1 font-heading text-xl font-bold text-[#2A9D8F]">{s.value}</p>
            <p className="text-xs text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Featured testimonials */}
      {featured.length > 0 && (
        <section className="mt-10">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">
            ⭐ Featured Testimonials
          </h2>
          <p className="mt-1 text-sm text-[#6B7280]">
            A few of our favorite five-star stories.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {featured.map((item) => (
              <ReviewCard key={`${item.product.id}-${item.review.name}`} item={item} featured />
            ))}
          </div>
        </section>
      )}

      {/* All reviews with category filter */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">All Reviews</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("All")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                category === "All"
                  ? "bg-[#2A9D8F] text-white"
                  : "bg-white text-[#2D2D2D] ring-1 ring-[#E9EDDE] hover:bg-[#E8F8F5]"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  category === c
                    ? "bg-[#2A9D8F] text-white"
                    : "bg-white text-[#2D2D2D] ring-1 ring-[#E9EDDE] hover:bg-[#E8F8F5]"
                }`}
              >
                {CATEGORY_ICONS[c] ?? ""} {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-6 text-center text-[#6B7280]">No reviews in this category yet.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <ReviewCard key={`${item.product.id}-${item.review.name}`} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* CTA band */}
      <section className="mt-12 rounded-3xl bg-[#E8F8F5] p-8 text-center ring-1 ring-[#CFE8E2] sm:p-10">
        <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">
          Ready to see what the fuss is about? 🛍️
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[#6B7280]">
          Browse our curated collection of apparel, essentials, supplies, and accessories —
          your pet's new favorite everything is one click away.
        </p>
        <a
          href="/products"
          className="btn-primary mt-5 inline-flex items-center gap-2 rounded-full bg-[#2A9D8F] px-6 py-3 font-semibold text-white transition hover:bg-[#238579]"
        >
          Shop All Products →
        </a>
      </section>
    </div>
  );
}

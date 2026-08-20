import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { loadProducts, getProductsByCategory } from "~/lib/products";
import type { Product } from "~/lib/types";
import { CATEGORIES } from "~/lib/types";

const SITE_URL = "https://pawandfound.store";

interface ProductsSearch {
  category?: string;
  search?: string;
}

interface ProductsData {
  products: Product[];
  selectedCategory: string | null;
  searchQuery: string | null;
}

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
    search: typeof search.search === "string" ? search.search : undefined,
  }),
  loaderDeps: ({ search }: { search: ProductsSearch }) => ({ search }),
  loader: async ({ deps }): Promise<ProductsData> => {
    const allProducts = await loadProducts();
    let filtered = allProducts;

    if (deps.search.category) {
      filtered = getProductsByCategory(allProducts, deps.search.category);
    }

    if (deps.search.search) {
      const q = deps.search.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return {
      products: filtered,
      selectedCategory: deps.search.category ?? null,
      searchQuery: deps.search.search ?? null,
    };
  },
  component: ProductsPage,
  head: () => {
    const search = Route.useSearch();
    const category = typeof search.category === "string" ? search.category : null;
    const categoryName = category ?? "All Products";
    const canonical = category
      ? `${SITE_URL}/products?category=${encodeURIComponent(category)}`
      : `${SITE_URL}/products`;
    const metaTitle = `Shop Pet Supplies — ${categoryName} | Paw & Found`;
    const metaDesc = category
      ? `Shop the ${category} collection at Paw & Found — tees, bandanas, litter, grooming tools, and more for your dog and cat.`
      : "Browse our full selection of pet supplies, apparel, and accessories. From dog t-shirts and bandanas to cat litter and grooming tools — find quality pet products at Paw & Found.";
    const ogDesc = category
      ? `Shop the ${category} collection at Paw & Found for dogs and cats.`
      : "Browse our full selection of pet supplies, apparel, and accessories for dogs and cats.";
    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDesc },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: ogDesc },
        { property: "og:url", content: canonical },
        { property: "og:image", content: `${SITE_URL}/images/logo.png` },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  staleTime: 60_000,
});

function ProductsPage() {
  const { products, selectedCategory, searchQuery } = Route.useLoaderData();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(searchQuery ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const categoryName = selectedCategory
    ? CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? selectedCategory
    : "All Products";

  // Sync URL search param to input when navigating via back/forward
  useEffect(() => {
    setSearchInput(searchQuery ?? "");
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params: Record<string, string> = {};
      if (selectedCategory) params.category = selectedCategory;
      if (value.trim()) params.search = value.trim();

      const searchParams = new URLSearchParams(params).toString();
      navigate({ to: "/products", search: searchParams ? `?${searchParams}` : undefined });
    }, 300);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="section-title">{categoryName}</h1>
          <p className="section-subtitle mt-1">
            {products.length} {products.length === 1 ? "product" : "products"}
            {searchQuery && <> for &ldquo;{searchQuery}&rdquo;</>}
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="mt-6">
        <div className="relative max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search pet products..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border border-[#E9EDDE] bg-white py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder-[#6B7280] transition-colors focus:border-[#FF7F5C] focus:outline-none focus:ring-2 focus:ring-[#FF7F5C]/20"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput("");
                const params: Record<string, string> = {};
                if (selectedCategory) params.category = selectedCategory;
                const searchParams = new URLSearchParams(params).toString();
                navigate({ to: "/products", search: searchParams ? `?${searchParams}` : undefined });
              }}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#6B7280] hover:text-[#FF7F5C]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="/products"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            !selectedCategory && !searchQuery
              ? "bg-[#FF7F5C] text-white"
              : "bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30 hover:text-[#2D2D2D]"
          }`}
        >
          All
        </a>
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`/products?category=${cat.id}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-[#FF7F5C] text-white"
                : "bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30 hover:text-[#2D2D2D]"
            }`}
          >
            {cat.icon} {cat.name}
          </a>
        ))}
        <a
          href="/products/pet-calendar"
          className="rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30 hover:text-[#2D2D2D]"
        >
          🗓️ 2027 Pet Calendar
        </a>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="mt-16 text-center">
          <span className="text-5xl">🔍</span>
          <p className="mt-4 text-lg text-[#6B7280]">No products found</p>
          <p className="mt-1 text-sm text-[#6B7280]">Try a different search term or browse our categories</p>
          <a href="/products" className="btn-primary mt-4 inline-block">
            View All Products
          </a>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    {/* Quiz CTA */}
      <div className="mt-10">
        <a href="/quiz" className="card group flex items-center justify-center gap-3 p-5 text-center bg-gradient-to-r from-[#FF7F5C]/10 to-[#2A9D8F]/10 border-2 border-dashed border-[#FF7F5C]/30 hover:border-[#FF7F5C] transition-all hover:-translate-y-1">
          <span className="text-2xl">🐾</span>
          <span className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">Find the Perfect Products for Your Pet →</span>
        </a>
      </div>

      {/* Suggest a Product Banner */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-[#2A9D8F]/30 bg-gradient-to-br from-[#FFF8F0] to-white p-6 text-center sm:p-8">
        <span className="text-3xl">🐾</span>
        <h3 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D]">
          Didn't find what you're looking for?
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          We'd love to hear what you need — drop a suggestion below!
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector("input") as HTMLInputElement;
            const textarea = form.querySelector("textarea") as HTMLTextAreaElement;
            if (!input.value.trim() || !textarea.value.trim()) return;
            const key = "pawandfound-suggestions";
            try {
              const existing = JSON.parse(localStorage.getItem(key) || "[]");
              existing.push({
                productName: input.value.trim(),
                description: textarea.value.trim(),
                category: "Other",
                name: "",
                email: "",
                date: new Date().toISOString(),
              });
              localStorage.setItem(key, JSON.stringify(existing));
            } catch { /* ignore */ }
            input.value = "";
            textarea.value = "";
            const msg = form.querySelector(".suggest-success") as HTMLElement;
            if (msg) { msg.style.display = "block"; setTimeout(() => { msg.style.display = "none"; }, 4000); }
          }}
          className="mt-4 mx-auto max-w-md"
        >
          <input
            type="text"
            required
            placeholder="Product name (e.g., 'Cooling mat for large dogs')"
            className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30 mb-3"
          />
          <textarea
            required
            rows={2}
            placeholder="Brief description — brand, size, why your pet needs it..."
            className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30 resize-none mb-3"
          />
          <button type="submit" className="btn-primary text-sm px-6 py-2.5">
            Submit Suggestion 🐾
          </button>
          <p className="suggest-success mt-2 text-sm font-medium text-[#2A9D8F]" style={{ display: "none" }}>
            ✅ Thanks! We'll look into it.
          </p>
        </form>
        <p className="mt-3 text-xs text-[#6B7280]">
          Want more room?{" "}
          <a href="/suggest" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
            Use the full suggestion form →
          </a>
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a href={`/product/${product.slug}`} className="card group">
      <div className="aspect-square overflow-hidden bg-[#FFF8F0]">
        <img
          src={product.image}
          alt={`${product.name} — Paw & Found pet product`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <span className="badge">{product.category}</span>
        <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
      </div>
    </a>
  );
}
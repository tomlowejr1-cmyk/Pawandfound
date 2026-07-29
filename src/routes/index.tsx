import { createFileRoute } from "@tanstack/react-router";
import { loadProducts } from "~/lib/products";
import type { Product } from "~/lib/types";
import { CATEGORIES } from "~/lib/types";
import { NewsletterSignup } from "~/components/newsletter-signup";
const SITE_URL = "https://pawandfound.store";

/** Deterministic shuffle using week number as seed */
function seededShuffle(arr: Product[], seed: number): Product[] {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Get week number for rotation (resets Monday) */
function getWeekSeed(): number {
  return Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
}

interface HomeData {
  featured: Product[];
  categories: typeof CATEGORIES;
}

export const Route = createFileRoute("/")({
  loader: async (): Promise<HomeData> => {
    const products = await loadProducts();
    const seed = getWeekSeed();
    const shuffled = seededShuffle(products, seed);
    const featured = shuffled.slice(0, 6);
    return { featured, categories: CATEGORIES };
  },
  component: Home,
  head: () => ({
    meta: [
      { title: "Paw & Found — Pet Supplies & Apparel for Dogs & Cats" },
      {
        name: "description",
        content:
          "Shop Paw & Found for the best pet supplies, apparel, and accessories. From trendy dog t-shirts to premium cat litter, find everything your pet needs in one place. Free shipping over $50.",
      },
      { property: "og:title", content: "Paw & Found — Pet Supplies & Apparel for Dogs & Cats" },
      {
        property: "og:description",
        content:
          "Shop the best pet supplies, apparel, and accessories. From dog t-shirts to cat litter, find everything your pet needs.",
      },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/images/logo.png` },
      { name: "twitter:title", content: "Paw & Found — Pet Supplies & Apparel" },
      {
        name: "twitter:description",
        content:
          "Shop the best pet supplies, apparel, and accessories. From dog t-shirts to cat litter, find everything your pet needs.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  staleTime: 60_000,
});

function Home() {
  const { featured, categories } = Route.useLoaderData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF7F5C] via-[#FF7F5C] to-[#F4A261]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMTBhMjAgMjAgMCAwMTAgNDAgMjAgMjAgMCAwMTAtNDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-white/30 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              🐾 New arrivals every week
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Everything your
              <span className="text-white/80"> pet </span>
              needs, all in one place
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              From trendy pet T-shirts to everyday essentials like cat litter — find exactly what
              you need with zero fuss. Spend less time searching, more time with your pet.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/products" className="btn-primary bg-white text-[#FF7F5C] hover:bg-white/90">
                Shop Pet Supplies Now
              </a>
              <a href="/products?category=Apparel" className="btn-secondary border-white/50 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
                Browse Pet Apparel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <a href="/quiz" className="card group flex items-center justify-center gap-3 p-5 text-center bg-gradient-to-r from-[#FF7F5C]/10 to-[#2A9D8F]/10 border-2 border-dashed border-[#FF7F5C]/30 hover:border-[#FF7F5C] transition-all hover:-translate-y-1">
          <span className="text-2xl">🐾</span>
          <span className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">Find the Perfect Products for Your Pet →</span>
        </a>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Shop Pet Supplies by Category</h2>
          <p className="section-subtitle mt-2">Find exactly what your pet needs — from apparel to essentials</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className="card group p-6 text-center transition-all hover:-translate-y-1"
            >
              <span className="inline-block text-4xl">{cat.icon}</span>
              <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-[#6B7280]">{cat.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      {featured.length > 0 && (
        <section className="bg-[#E9EDDE]/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="section-title">This Week's Picks</h2>
              <p className="section-subtitle mt-2">Our top products for your furry friend — fresh every Monday</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="/products" className="btn-secondary">
                View All Pet Products
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Latest Pet Tips & Guides</h2>
          <p className="section-subtitle mt-2">Helpful advice from our team to keep your pet happy and healthy</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <a href="/blog" className="card group p-6 text-left transition-all hover:-translate-y-1">
            <span className="text-3xl">🐕</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">Top 5 Dog Breeds</h3>
            <p className="mt-2 text-sm text-[#6B7280]">Which breed is right for your home and lifestyle?</p>
            <span className="mt-3 inline-block text-sm font-medium text-[#2A9D8F]">Read more →</span>
          </a>
          <a href="/blog" className="card group p-6 text-left transition-all hover:-translate-y-1">
            <span className="text-3xl">🐱</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">Top 5 Cat Breeds</h3>
            <p className="mt-2 text-sm text-[#6B7280]">From Maine Coons to Siamese — find your perfect match.</p>
            <span className="mt-3 inline-block text-sm font-medium text-[#2A9D8F]">Read more →</span>
          </a>
          <a href="/blog" className="card group p-6 text-left transition-all hover:-translate-y-1">
            <span className="text-3xl">🍖</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">Picking the Best Dog Food</h3>
            <p className="mt-2 text-sm text-[#6B7280]">Learn to decode labels and choose the best nutrition.</p>
            <span className="mt-3 inline-block text-sm font-medium text-[#2A9D8F]">Read more →</span>
          </a>
        </div>
        <div className="mt-8 text-center">
          <a href="/blog" className="btn-secondary">See All Tips & Guides →</a>
        </div>
      </section>

      {/* Digital Products Section */}
      <section className="bg-[#E9EDDE]/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Digital Products</h2>
            <p className="section-subtitle mt-2">Instant download guides — pet care knowledge at your fingertips</p>
          </div>

          {/* Bundle Row */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Puppy Starter Pack */}
            <div className="relative overflow-hidden rounded-xl bg-white shadow-md" style={{ border: "2px solid transparent", borderImage: "linear-gradient(135deg, #FF7F5C, #F4A261) 1" }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7F5C] to-[#F4A261]" />
              <div className="flex flex-col sm:flex-row p-5 gap-5">
                <div className="flex-shrink-0 flex justify-center">
                  <img
                    src="/images/puppy-training-checklist-preview.png"
                    alt="Puppy Starter Pack"
                    className="w-32 h-32 rounded-xl object-contain bg-[#FFF8F0] shadow-sm"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center rounded-full bg-[#FF7F5C] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                    SAVE $4.98
                  </span>
                  <h3 className="font-heading mt-2 text-lg font-bold text-[#2D2D2D]">
                    Puppy Starter Pack
                  </h3>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    Training checklist, treat recipes & first aid guide — everything a new puppy parent needs.
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="text-[#2A9D8F] text-xs">✓</span> Puppy Training Checklist
                      <span className="text-[#9CA3AF] ml-auto">$4.99</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="text-[#2A9D8F] text-xs">✓</span> Homemade Pet Treats Recipe Guide
                      <span className="text-[#9CA3AF] ml-auto">$4.99</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="text-[#2A9D8F] text-xs">✓</span> Pet First Aid Guide
                      <span className="text-[#9CA3AF] ml-auto">$7.99</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-sm text-[#6B7280] line-through">$17.97</span>
                    <span className="font-heading text-xl font-bold text-[#FF7F5C]">$12.99</span>
                  </div>
                  <a
                    href="https://buy.stripe.com/4gM7sL7vM2qcc779iw2cg0w"
                    className="btn-primary mt-3 text-sm px-4 py-2 inline-flex"
                  >
                    Buy Bundle
                  </a>
                </div>
              </div>
            </div>

            {/* Cat Essentials Kit */}
            <div className="relative overflow-hidden rounded-xl bg-white shadow-md" style={{ border: "2px solid transparent", borderImage: "linear-gradient(135deg, #2A9D8F, #F4A261) 1" }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2A9D8F] to-[#F4A261]" />
              <div className="flex flex-col sm:flex-row p-5 gap-5">
                <div className="flex-shrink-0 flex justify-center">
                  <img
                    src="/images/cat-behavior-decoder-preview.png"
                    alt="Cat Essentials Kit"
                    className="w-32 h-32 rounded-xl object-contain bg-[#FFF8F0] shadow-sm"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-flex items-center rounded-full bg-[#FF7F5C] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                    SAVE $4.98
                  </span>
                  <h3 className="font-heading mt-2 text-lg font-bold text-[#2D2D2D]">
                    Cat Essentials Kit
                  </h3>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    Behavior decoder, care planner & vet prep kit — the ultimate cat care bundle.
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="text-[#2A9D8F] text-xs">✓</span> Cat Behavior Decoder
                      <span className="text-[#9CA3AF] ml-auto">$5.99</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="text-[#2A9D8F] text-xs">✓</span> Ultimate Pet Care Planner
                      <span className="text-[#9CA3AF] ml-auto">$9.99</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className="text-[#2A9D8F] text-xs">✓</span> Vet Visit Prep Kit
                      <span className="text-[#9CA3AF] ml-auto">$4.99</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-sm text-[#6B7280] line-through">$16.97</span>
                    <span className="font-heading text-xl font-bold text-[#FF7F5C]">$11.99</span>
                  </div>
                  <a
                    href="https://buy.stripe.com/5kQdR9g2i1m84EF2U82cg0x"
                    className="btn-primary mt-3 text-sm px-4 py-2 inline-flex"
                  >
                    Buy Bundle
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Product 1: Treat Recipes */}
            <div className="card group flex flex-col transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-[#FFF8F0]">
                <img
                  src="/images/pet-treat-recipes-preview.png"
                  alt="Homemade Pet Treats Recipe Guide"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="badge-sale">Digital Download</span>
                <h3 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                  Homemade Pet Treats Recipe Guide
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#6B7280]">
                  7 simple, safe recipes for homemade dog and cat treats.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#E9EDDE] pt-4">
                  <span className="font-heading text-xl font-bold text-[#FF7F5C]">$4.99</span>
                  <a href="/downloads" className="btn-primary text-sm px-4 py-2">Learn More</a>
                </div>
              </div>
            </div>

            {/* Product 2: Pet First Aid */}
            <div className="card group flex flex-col transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-[#FFF8F0]">
                <img
                  src="/images/pet-first-aid-preview.png"
                  alt="Pet First Aid: Emergency Care Guide"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="badge-sale">Digital Download</span>
                <h3 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                  Pet First Aid: Emergency Care Guide
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#6B7280]">
                  Be prepared for pet emergencies. Covers choking, poisoning, wounds, CPR, and more.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#E9EDDE] pt-4">
                  <span className="font-heading text-xl font-bold text-[#FF7F5C]">$7.99</span>
                  <a href="/downloads" className="btn-primary text-sm px-4 py-2">Learn More</a>
                </div>
              </div>
            </div>

            {/* Product 3: Sticker Pack */}
            <div className="card group flex flex-col transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-[#FFF8F0]">
                <img
                  src="/images/sticker-cover.png"
                  alt="Paw & Found Digital Sticker Pack"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="badge-sale">Digital Download</span>
                <h3 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                  Paw & Found Digital Sticker Pack
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#6B7280]">
                  24 hand-drawn pet-themed digital stickers for tablet journaling apps.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#E9EDDE] pt-4">
                  <span className="font-heading text-xl font-bold text-[#FF7F5C]">$5.99</span>
                  <a href="/downloads" className="btn-primary text-sm px-4 py-2">Learn More</a>
                </div>
              </div>
            </div>

            {/* Product 4: Pet Care Planner */}
            <div className="card group flex flex-col transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-[#FFF8F0]">
                <img
                  src="/images/pet-care-planner-preview.png"
                  alt="The Ultimate Pet Care Planner"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="badge-sale">Digital Download</span>
                <h3 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                  The Ultimate Pet Care Planner
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#6B7280]">
                  24-page undated printable planner for tracking your pet's health and care.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#E9EDDE] pt-4">
                  <span className="font-heading text-xl font-bold text-[#FF7F5C]">$9.99</span>
                  <a href="/downloads" className="btn-primary text-sm px-4 py-2">Learn More</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="/downloads" className="btn-secondary">View Digital Guides →</a>
          </div>
        </div>
      </section>

      {/* Pet Community Section */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#FF7F5C] via-[#FF7F5C] to-[#F4A261] p-8 text-center text-white shadow-lg sm:p-12">
          <span className="text-4xl">📸</span>
          <h2 className="font-heading mt-4 text-2xl font-bold sm:text-3xl">
            Share Your Pet!
          </h2>
          <p className="mt-3 max-w-md mx-auto text-white/80">
            Tag your photos with <strong className="text-white">#PawAndFoundPets</strong> on Instagram for a chance to be featured.
          </p>
          <a
            href="https://instagram.com/explore/tags/pawandfoundpets"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 inline-flex items-center gap-2 bg-white text-[#FF7F5C] hover:bg-white/90"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            View on Instagram
          </a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup variant="homepage" />

      {/* Trust Banner */}
      <section className="border-t border-[#E9EDDE] bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <span className="text-3xl">🚚</span>
              <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">Free Shipping</h3>
              <p className="mt-1 text-sm text-[#6B7280]">On orders over $50</p>
            </div>
            <div>
              <span className="text-3xl">🔄</span>
              <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">Easy Returns</h3>
              <p className="mt-1 text-sm text-[#6B7280]">30-day satisfaction guarantee</p>
            </div>
            <div>
              <span className="text-3xl">💚</span>
              <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">Pet-Loved</h3>
              <p className="mt-1 text-sm text-[#6B7280]">Curated by pet owners</p>
            </div>
          </div>
        </div>
      </section>
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
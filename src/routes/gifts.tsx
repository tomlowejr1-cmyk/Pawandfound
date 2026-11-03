import { createFileRoute } from "@tanstack/react-router";
import { loadProducts, loadPaymentLinks, getPaymentLink } from "~/lib/products";
import type { Product } from "~/lib/types";
import { CATEGORIES } from "~/lib/types";

const SITE_URL = "https://www.pawandfound.store";

// Curated gift picks — the holiday-season shortlist from the catalog.
// Halloween and Thanksgiving-only items are deliberately left out.
const GIFT_PICK_SLUGS = [
  "holiday-plaid-bowtie-collar",
  "cozy-hoodie-pullover",
  "adventure-pup-graphic-tee",
  "good-dog-club-tshirt",
  "paw-found-logo-tee",
  "classic-plaid-bandana",
  "stainless-steel-bowl-set",
  "adjustable-collar-leather",
  "plush-squeaky-fox-toy",
  "squeaky-tennis-ball-3-pack",
  "nylon-reflective-leash",
  "orthopedic-pet-bed-medium",
  "ventilated-travel-carrier",
  "personalized-engraved-id-tag",
  "gentle-pet-shampoo-16oz",
  "slicker-grooming-brush",
  "eco-friendly-poop-bags-120ct",
  "premium-clumping-cat-litter",
];

const SAFETY_POST = {
  slug: "christmas-pet-safety",
  image: "/images/blog-christmas-pet.jpg",
  title: "Christmas Pet Safety: Tinsel, Trees, and Holiday Hazards",
  excerpt:
    "Tinsel, poinsettias, tree water, and batteries — Christmas is full of hidden dangers for dogs and cats. Here's how to decorate safely.",
};

interface GiftsSearch {
  category?: string;
}

interface GiftsData {
  picks: { product: Product; stripeUrl: string | undefined }[];
  selectedCategory: string | null;
  totalPicks: number;
}

export const Route = createFileRoute("/gifts")({
  validateSearch: (search: Record<string, unknown>): GiftsSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  loaderDeps: ({ search }: { search: GiftsSearch }) => ({ search }),
  loader: async ({ deps }): Promise<GiftsData> => {
    const products = await loadProducts();
    const paymentLinks = await loadPaymentLinks();
    const bySlug = new Map(products.map((p) => [p.slug, p]));

    const allPicks = GIFT_PICK_SLUGS.map((slug) => bySlug.get(slug)).filter(
      (p): p is Product => Boolean(p)
    );
    const category = deps.search.category;
    const picks = (category ? allPicks.filter((p) => p.category === category) : allPicks).map(
      (product) => ({ product, stripeUrl: getPaymentLink(paymentLinks, product.slug) })
    );

    return {
      picks,
      selectedCategory: category ?? null,
      totalPicks: allPicks.length,
    };
  },
  component: GiftsPage,
  head: ({ match }) => {
    const category = match.loaderData?.selectedCategory ?? null;
    const categoryName = category ? CATEGORIES.find((c) => c.id === category)?.name ?? category : null;
    const canonical = category
      ? `${SITE_URL}/gifts?category=${encodeURIComponent(category)}`
      : `${SITE_URL}/gifts`;
    const metaTitle = categoryName
      ? `Christmas Gifts — ${categoryName} | Paw & Found 🎁`
      : "Christmas Gift Guide | Paw & Found 🎁";
    const metaDesc = categoryName
      ? `Pet gifts for Christmas in the ${categoryName} category — plus gift cards and instant digital guides from Paw & Found.`
      : "Paw & Found's Christmas gift guide — curated pet gift picks, gift cards from $25, and instant digital guides for the pet parent on your list.";
    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDesc },
        { property: "og:title", content: metaTitle },
        {
          property: "og:description",
          content:
            "Curated Christmas gift picks, gift cards, and instant digital guides for dogs, cats, and the people who love them.",
        },
        { property: "og:image", content: `${SITE_URL}/images/product-bowtie-holiday.jpg` },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        {
          name: "twitter:description",
          content: "Curated Christmas gift picks, gift cards, and digital guides for pet parents.",
        },
        { name: "twitter:image", content: `${SITE_URL}/images/product-bowtie-holiday.jpg` },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
});

function GiftsPage() {
  const { picks, selectedCategory, totalPicks } = Route.useLoaderData();
  const categoryName = selectedCategory
    ? CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? selectedCategory
    : null;

  return (
    <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">
              🎁 Gifts for pets &amp; pet parents
            </span>
            <h1 className="font-heading mt-4 text-4xl font-bold text-[#2D2D2D] sm:text-5xl">
              The Christmas <span className="text-[#FF7F5C]">Gift Guide</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#6B7280] lg:mx-0">
              Our holiday shortlist — the festive bowtie, cozy hoodies, beds, toys and everyday
              essentials that actually get used. Add a gift card or an instant digital guide and
              you're done shopping.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#picks" className="btn-primary">
                Shop Gift Picks
              </a>
              <a
                href="#gift-cards"
                className="rounded-full border border-[#2A9D8F] px-6 py-3 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
              >
                Gift Cards &amp; Digital Gifts
              </a>
            </div>
          </div>
          <div className="w-full max-w-md flex-shrink-0 lg:w-1/3">
            <img
              src="/images/product-bowtie-holiday.jpg"
              alt="Holiday Plaid Bowtie Collar — Paw & Found Christmas gift guide"
              className="w-full rounded-3xl shadow-2xl shadow-[#FF7F5C]/20 ring-1 ring-[#F4E3CD]"
            />
          </div>
        </div>
      </section>

      {/* Curated gift picks + category filter pills */}
      <section id="picks" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">
              🎄 {categoryName ? `${categoryName} Gift Picks` : "Gift Picks"}
            </h2>
            <p className="mt-2 text-[#6B7280]">
              {picks.length} of {totalPicks} hand-picked gifts
              {categoryName ? ` in ${categoryName}` : " across the store"}.
            </p>
          </div>
          <a href="/products" className="text-sm font-semibold text-[#2A9D8F] hover:text-[#FF7F5C]">
            Browse all products →
          </a>
        </div>

        {/* Category filter pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="/gifts"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-[#FF7F5C] text-white"
                : "bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30 hover:text-[#2D2D2D]"
            }`}
          >
            All
          </a>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/gifts?category=${cat.id}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#FF7F5C] text-white"
                  : "bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30 hover:text-[#2D2D2D]"
              }`}
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>

        {picks.length === 0 ? (
          <div className="mt-16 text-center">
            <span className="text-5xl">🎁</span>
            <p className="mt-4 text-lg text-[#6B7280]">No gift picks in this category yet</p>
            <a href="/gifts" className="btn-primary mt-4 inline-block">
              See All Gift Picks
            </a>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {picks.map(({ product, stripeUrl }) => (
              <div key={product.id} className="card group flex flex-col overflow-hidden">
                <a
                  href={`/product/${product.slug}`}
                  className="block aspect-square overflow-hidden bg-[#FFF8F0]"
                >
                  <img
                    src={product.image}
                    alt={`${product.name} — Paw & Found pet product`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </a>
                <div className="flex flex-1 flex-col p-4">
                  <span className="badge">{product.category}</span>
                  <a href={`/product/${product.slug}`}>
                    <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                      {product.name}
                    </h3>
                  </a>
                  <p className="mt-1 text-lg font-bold text-[#FF7F5C]">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="mt-auto flex gap-2 pt-4">
                    {stripeUrl && (
                      <a
                        href={stripeUrl}
                        target="_blank"
                        rel="noopener"
                        className="btn-primary flex-1 text-center text-xs px-3 py-2.5"
                      >
                        Buy Now
                      </a>
                    )}
                    <a
                      href={`/product/${product.slug}`}
                      className="rounded-full border border-[#2A9D8F] px-4 py-2.5 text-xs font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Gift cards */}
      <section id="gift-cards" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">🎁 Gift Cards</h2>
        <p className="mt-2 max-w-2xl text-[#6B7280]">
          Not sure what they need? Let them choose. Digital gift cards arrive by email right after
          checkout and work on everything in the store.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/gift-cards" className="card group flex flex-col p-6">
            <span className="text-3xl">💳</span>
            <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              Gift Cards — $25 to $100
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
              Pick any amount from $25 to $100. Delivered digitally, no expiry date, redeemable on
              every product in the shop.
            </p>
            <span className="mt-4 text-sm font-semibold text-[#2A9D8F] group-hover:text-[#FF7F5C]">
              Choose an amount →
            </span>
          </a>
          <a href="/downloads" className="card group flex flex-col p-6">
            <span className="text-3xl">📚</span>
            <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              Digital Guides &amp; Bundles
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
              Instant-download guides from $3.99, starter bundles, and premium eBooks for the pet
              parent on your list — nothing to ship, nothing to wrap.
            </p>
            <span className="mt-4 text-sm font-semibold text-[#2A9D8F] group-hover:text-[#FF7F5C]">
              Browse the library →
            </span>
          </a>
          <a href="/downloads" className="card group flex flex-col p-6">
            <span className="text-3xl">🐶</span>
            <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              New Puppy or New Cat Starter Kits
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
              Puppy Starter Pack and Cat Essentials Kit bundle three guides each at 20% off —
              a gift for someone who just brought a pet home.
            </p>
            <span className="mt-4 text-sm font-semibold text-[#2A9D8F] group-hover:text-[#FF7F5C]">
              See the bundles →
            </span>
          </a>
        </div>
      </section>

      {/* Safety guide */}
      <section id="safety" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">
          🛡️ Before You Wrap: Christmas Pet Safety
        </h2>
        <p className="mt-2 max-w-2xl text-[#6B7280]">
          The gifts are the fun part — the hazards are the part nobody warns you about.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={`/blog?post=${SAFETY_POST.slug}`}
            className="card group flex flex-col overflow-hidden"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#FFF8F0]">
              <img
                src={SAFETY_POST.image}
                alt={SAFETY_POST.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                {SAFETY_POST.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280] line-clamp-3">
                {SAFETY_POST.excerpt}
              </p>
              <span className="mt-auto pt-3 text-sm font-semibold text-[#2A9D8F] group-hover:text-[#FF7F5C]">
                Read the guide →
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#FF7F5C] to-[#FF9F80] p-8 text-center sm:p-12">
          <h2 className="font-heading text-3xl font-bold text-white">
            🐾 One List, Everyone Covered
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            A gift pick for the pet, a gift card for the parent, and a guide they'll keep — then go
            enjoy the holidays.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#picks"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#FF7F5C] transition-transform hover:scale-105"
            >
              Shop Gift Picks
            </a>
            <a
              href="/christmas"
              className="rounded-full border-2 border-white/70 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Christmas Collection
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

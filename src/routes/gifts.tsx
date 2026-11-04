import { createFileRoute } from "@tanstack/react-router";
import { bundles, digitalProducts } from "~/lib/digital-catalog";

const SITE_URL = "https://www.pawandfound.store";

/**
 * /gifts is the Christmas gift guide and the destination for every December
 * social caption and Pinterest pin. Paw & Found is a digital-only store, so
 * every pick below is an instant download pulled straight from the live
 * catalogue (`~/lib/digital-catalog`) — prices come from the same objects that
 * power /downloads, so they can never drift from Stripe.
 */

const GIFT_GROUPS = [
  { id: "bundles", label: "Bundles", icon: "🎁" },
  { id: "guides", label: "Guides", icon: "📘" },
  { id: "planners", label: "Planners", icon: "🗓️" },
  { id: "printables", label: "Printables", icon: "🖨️" },
  { id: "kids", label: "Coloring & Kids", icon: "🖍️" },
] as const;

// 18 gift picks: 2 bundles + 16 individual downloads, all live on Stripe.
const PICKS_BY_GROUP: Record<string, string[]> = {
  bundles: ["bundle-001", "bundle-002"],
  guides: [
    "pet-first-aid-emergency-care-guide",
    "cat-behavior-decoder",
    "basic-obedience-training-guide",
    "small-pet-starter-kit",
    "homemade-pet-treats-recipe-guide",
    "pet-travel-checklist",
  ],
  planners: [
    "ultimate-pet-care-planner",
    "vet-visit-prep-kit",
    "pet-sitter-planner-checklist",
    "pet-calendar-2027",
  ],
  printables: [
    "paw-and-found-digital-sticker-pack",
    "pet-gift-tags-wrapping-set",
    "diy-dog-birthday-party-kit",
  ],
  kids: [
    "paws-and-relax-coloring-book",
    "my-first-pet-coloring-book",
    "colorful-wishes-valentine-coloring-book",
  ],
};

// Short gift-framing lines. Everything described here is stated in the
// catalogue listing for that product — no new claims.
const GIFT_BLURBS: Record<string, string> = {
  "bundle-001": "Three downloads in one purchase — a training schedule, treat recipes, and emergency know-how for a new puppy.",
  "bundle-002": "Three downloads in one purchase — behaviour decoding, care planning, and vet-visit prep for a new cat.",
  "pet-first-aid-emergency-care-guide": "Choking, poisoning, wounds, heatstroke — step-by-step guidance for the minutes before you reach a vet.",
  "cat-behavior-decoder": "Turns confusing cat behaviour into something you can actually read.",
  "basic-obedience-training-guide": "A structured training plan for the basics, with printable training logs.",
  "small-pet-starter-kit": "For rabbits, guinea pigs and hamsters — housing, feeding, health and enrichment for each species.",
  "homemade-pet-treats-recipe-guide": "Seven simple homemade treat recipes for dogs and cats, with allergy-friendly options.",
  "pet-travel-checklist": "A printable packing and prep checklist for trips with your pet.",
  "ultimate-pet-care-planner": "A printable planner covering vet visits, vaccinations, medication and feeding schedules.",
  "vet-visit-prep-kit": "Walk into the vet's office with notes, questions and history ready.",
  "pet-sitter-planner-checklist": "Leave your sitter feeding schedules, emergency contacts, vet details and daily checklists.",
  "pet-calendar-2027": "A printable 2027 calendar for the pet-obsessed desk or kitchen wall.",
  "paw-and-found-digital-sticker-pack": "24 hand-drawn pet stickers for digital journaling apps like GoodNotes and Notability.",
  "pet-gift-tags-wrapping-set": "Printable gift tags and wrapping set — for the present, not the pet.",
  "diy-dog-birthday-party-kit": "Everything for a dog birthday party at home: printables, games and party-planning pages.",
  "paws-and-relax-coloring-book": "A relaxing pet-themed coloring book — print the pages you want.",
  "my-first-pet-coloring-book": "A first coloring book for young pet lovers.",
  "colorful-wishes-valentine-coloring-book": "A Valentine's coloring book that doubles as a birthday-card book.",
};

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

interface GiftPick {
  id: string;
  group: string;
  title: string;
  blurb: string;
  price: number;
  image: string;
  buyUrl: string;
  detailsHref: string;
}

interface GiftsData {
  picks: GiftPick[];
  selectedCategory: string | null;
  totalPicks: number;
}

function buildPicks(): GiftPick[] {
  const productsBySlug = new Map(digitalProducts.map((p) => [p.slug, p]));
  const bundlesById = new Map(bundles.map((b) => [b.id, b]));
  const picks: GiftPick[] = [];

  for (const group of GIFT_GROUPS) {
    for (const key of PICKS_BY_GROUP[group.id] ?? []) {
      const bundle = bundlesById.get(key);
      if (bundle) {
        picks.push({
          id: bundle.id,
          group: group.id,
          title: bundle.title,
          blurb: GIFT_BLURBS[bundle.id] ?? bundle.description,
          price: bundle.price,
          image: bundle.image,
          buyUrl: bundle.stripePaymentLink,
          detailsHref: "/downloads",
        });
        continue;
      }
      const product = productsBySlug.get(key);
      if (product) {
        picks.push({
          id: product.id,
          group: group.id,
          title: product.title,
          blurb: GIFT_BLURBS[product.slug] ?? product.description,
          price: product.price,
          image: product.image,
          buyUrl: product.stripePaymentLink,
          detailsHref: "/downloads",
        });
      }
    }
  }
  return picks;
}

export const Route = createFileRoute("/gifts")({
  validateSearch: (search: Record<string, unknown>): GiftsSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  loaderDeps: ({ search }: { search: GiftsSearch }) => ({ search }),
  loader: async ({ deps }): Promise<GiftsData> => {
    const allPicks = buildPicks();
    const category = deps.search.category;
    const picks = category ? allPicks.filter((p) => p.group === category) : allPicks;
    return {
      picks,
      selectedCategory: category ?? null,
      totalPicks: allPicks.length,
    };
  },
  component: GiftsPage,
  head: ({ match }) => {
    const category = match.loaderData?.selectedCategory ?? null;
    const groupName = category
      ? GIFT_GROUPS.find((g) => g.id === category)?.label ?? category
      : null;
    const canonical = category
      ? `${SITE_URL}/gifts?category=${encodeURIComponent(category)}`
      : `${SITE_URL}/gifts`;
    const metaTitle = groupName
      ? `Digital Gifts — ${groupName} | Paw & Found 🎁`
      : "Christmas Gift Guide — Instant Digital Gifts | Paw & Found 🎁";
    const metaDesc = groupName
      ? `Instant-download pet gifts for Christmas in the ${groupName} category — every pick is a digital download from Paw & Found.`
      : "Paw & Found's Christmas gift guide — 18 instant-download pet gifts, from $3.99 starter guides to bundles for new puppy and cat parents. Nothing to ship, nothing to wrap.";
    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: metaDesc },
        { property: "og:title", content: metaTitle },
        {
          property: "og:description",
          content:
            "18 instant-download pet gifts for Christmas — guides, planners, printables and bundles for dogs, cats and the people who love them.",
        },
        { property: "og:image", content: `${SITE_URL}/images/pet-care-planner-preview.png` },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        {
          name: "twitter:description",
          content: "18 instant-download pet gifts for Christmas — nothing to ship, nothing to wrap.",
        },
        { name: "twitter:image", content: `${SITE_URL}/images/pet-care-planner-preview.png` },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
});

function GiftsPage() {
  const { picks, selectedCategory, totalPicks } = Route.useLoaderData();
  const groupName = selectedCategory
    ? GIFT_GROUPS.find((g) => g.id === selectedCategory)?.label ?? selectedCategory
    : null;

  return (
    <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">
              🎁 Digital gifts for pets &amp; pet parents
            </span>
            <h1 className="font-heading mt-4 text-4xl font-bold text-[#2D2D2D] sm:text-5xl">
              The Christmas <span className="text-[#FF7F5C]">Gift Guide</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#6B7280] lg:mx-0">
              Every gift in this guide is an instant download — a guide, a planner, a printable or a
              bundle that lands in their inbox minutes after checkout. Nothing to ship, nothing to
              wrap, nothing to wait for.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#picks" className="btn-primary">
                See the Gift Picks
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-[#2A9D8F] px-6 py-3 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
              >
                How Digital Gifts Work
              </a>
            </div>
          </div>
          <div className="w-full max-w-md flex-shrink-0 lg:w-1/3">
            <div className="relative flex justify-center gap-2">
              <img
                src="/images/puppy-training-checklist-preview.png"
                alt="Puppy Training Checklist — instant download gift from Paw & Found"
                className="w-28 -rotate-3 rounded-2xl shadow-2xl shadow-[#FF7F5C]/20 ring-1 ring-[#F4E3CD] sm:w-32"
              />
              <img
                src="/images/pet-care-planner-preview.png"
                alt="The Ultimate Pet Care Planner — instant download gift from Paw & Found"
                className="z-10 -ml-4 w-32 rotate-2 rounded-2xl shadow-2xl shadow-[#FF7F5C]/20 ring-1 ring-[#F4E3CD] sm:w-36"
              />
              <img
                src="/images/sticker-preview.png"
                alt="Paw & Found Digital Sticker Pack — instant download gift"
                className="w-28 -ml-4 rotate-3 rounded-2xl shadow-2xl shadow-[#FF7F5C]/20 ring-1 ring-[#F4E3CD] sm:w-32"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Curated gift picks + category filter pills */}
      <section id="picks" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">
              🎄 {groupName ? `${groupName} Gift Picks` : "Gift Picks"}
            </h2>
            <p className="mt-2 text-[#6B7280]">
              {picks.length} of {totalPicks} hand-picked digital gifts
              {groupName ? ` in ${groupName}` : " across the library"}.
            </p>
          </div>
          <a href="/downloads" className="text-sm font-semibold text-[#2A9D8F] hover:text-[#FF7F5C]">
            Browse the full library →
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
          {GIFT_GROUPS.map((group) => (
            <a
              key={group.id}
              href={`/gifts?category=${group.id}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === group.id
                  ? "bg-[#FF7F5C] text-white"
                  : "bg-[#E9EDDE] text-[#6B7280] hover:bg-[#F4A261]/30 hover:text-[#2D2D2D]"
              }`}
            >
              {group.icon} {group.label}
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
            {picks.map((pick) => (
              <div key={pick.id} className="card group flex flex-col overflow-hidden">
                <div className="block aspect-square overflow-hidden bg-[#FFF8F0]">
                  <img
                    src={pick.image}
                    alt={`${pick.title} — instant download gift from Paw & Found`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="badge">Instant download</span>
                  <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                    {pick.title}
                  </h3>
                  <p className="mt-1 text-lg font-bold text-[#FF7F5C]">
                    ${pick.price.toFixed(2)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280] line-clamp-3">
                    {pick.blurb}
                  </p>
                  <div className="mt-auto flex gap-2 pt-4">
                    <a
                      href={pick.buyUrl}
                      target="_blank"
                      rel="noopener"
                      className="btn-primary flex-1 text-center text-xs px-3 py-2.5"
                    >
                      Buy Now
                    </a>
                    <a
                      href={pick.detailsHref}
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

      {/* How digital gifting works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">📬 How Digital Gifts Work</h2>
        <p className="mt-2 max-w-2xl text-[#6B7280]">
          Every item here is a file, not a parcel — which makes it the easiest gift you'll send
          this year.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="card flex flex-col p-6">
            <span className="text-3xl">🛒</span>
            <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D]">1. Check out</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              Pay securely with Stripe — card, Apple Pay or PayPal.
            </p>
          </div>
          <div className="card flex flex-col p-6">
            <span className="text-3xl">📥</span>
            <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D]">2. Download instantly</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              Your download link arrives by email the moment payment clears. No delivery window.
            </p>
          </div>
          <div className="card flex flex-col p-6">
            <span className="text-3xl">🎁</span>
            <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D]">3. Pass it on</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              Forward the file to the pet parent on your list — it's theirs to keep and print.
            </p>
          </div>
        </div>
      </section>

      {/* Gift cards */}
      <section id="gift-cards" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">🎁 Gift Cards</h2>
        <p className="mt-2 max-w-2xl text-[#6B7280]">
          Gift cards are not on sale yet — we'd rather not sell a card than sell one that has
          nothing to spend it on. When they launch, this is where you'll find them.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card flex flex-col p-6">
            <span className="text-3xl">💳</span>
            <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D]">
              Gift Cards — coming soon
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
              $25 to $100, delivered by email. Not available for purchase yet.
            </p>
            <a
              href="/gift-cards"
              className="mt-4 text-sm font-semibold text-[#2A9D8F] hover:text-[#FF7F5C]"
            >
              See gift card details →
            </a>
          </div>
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
              Puppy Starter Pack and Cat Essentials Kit each bundle three guides — a gift for
              someone who just brought a pet home.
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
            A guide for the new puppy parent, a planner for the organised one, a coloring book for
            the kid — all delivered instantly, all under $13.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#picks"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#FF7F5C] transition-transform hover:scale-105"
            >
              See the Gift Picks
            </a>
            <a
              href="/downloads"
              className="rounded-full border-2 border-white/70 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Browse All Digital Guides
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

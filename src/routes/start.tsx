import { createFileRoute } from "@tanstack/react-router";
import { NewsletterSignup } from "~/components/newsletter-signup";

const SITE_URL = "https://pawandfound.store";

// Lightweight "link in bio" landing page. The bio link on Instagram/TikTok/Pinterest
// points to /start so ONE static URL serves every seasonal post across the whole
// posting schedule — whether a caption says "shop the [Holiday] Collection", points
// at a specific product, or says "full guide on the blog". Cold seasonal interest
// gets routed to shop + content + email in one mobile-first screen.

const HOLIDAYS = [
  {
    slug: "halloween",
    label: "Halloween",
    emoji: "🎃",
    title: "Spooky Pet Style",
    copy: "Boo tees, Pumpkin Spice bandanas & Halloween safety guides.",
    image: "/images/product-tshirt-halloween.jpg",
    cta: "Shop Halloween",
  },
  {
    slug: "thanksgiving",
    label: "Thanksgiving",
    emoji: "🦃",
    title: "Gobble-Ready Gear",
    copy: "The bandana for the holiday photo + what's safe to share.",
    image: "/images/product-bandana-pumpkin.jpg",
    cta: "Shop Thanksgiving",
  },
  {
    slug: "christmas",
    label: "Christmas",
    emoji: "🎄",
    title: "Holiday Cozy",
    copy: "Plaid bowties & festive style + tinsel-and-tree safety.",
    image: "/images/product-bowtie-holiday.jpg",
    cta: "Shop Christmas",
  },
];

const CATEGORIES = [
  { name: "Apparel", slug: "Apparel" },
  { name: "Accessories", slug: "Accessories" },
  { name: "Essentials", slug: "Essentials" },
  { name: "Supplies", slug: "Supplies" },
];

export const Route = createFileRoute("/start")({
  component: StartPage,
  head: () => ({
    meta: [
      { title: "Paw & Found — Shop Pet Style, Supplies & Safety Guides" },
      {
        name: "description",
        content:
          "Welcome to Paw & Found. Shop the seasonal pet collections, daily essentials, digital guides, and holiday pet-safety advice for your dog, cat, or small pet.",
      },
      { property: "og:title", content: "Paw & Found — Shop Pet Style, Supplies & Safety Guides" },
      {
        property: "og:description",
        content:
          "One place for seasonal pet style, everyday supplies, and the safety guides every pet parent needs.",
      },
      { property: "og:image", content: `${SITE_URL}/images/logo.png` },
      { property: "og:url", content: `${SITE_URL}/start` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Paw & Found — Shop Pet Style, Supplies & Safety Guides" },
      {
        name: "twitter:description",
        content:
          "One place for seasonal pet style, everyday supplies, and pet-safety guides.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/start` }],
  }),
});

function StartPage() {
  return (
    <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Compact hero */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">
            🐾 Welcome to Paw & Found
          </span>
          <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight text-[#2D2D2D] sm:text-4xl">
            Pet style, everyday supplies &{" "}
            <span className="text-[#FF7F5C]">safety guides</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-[#6B7280]">
            The one-stop shop for trendy pet tees, bandanas, and bowties — plus cat litter,
            daily essentials, and the guides that keep your dog, cat, or small pet safe all
            year.
          </p>
        </div>

        {/* Seasonal collections */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">🎉 Shop the Season</h2>
            <a
              href="/products"
              className="text-sm font-semibold text-[#2A9D8F] hover:text-[#FF7F5C]"
            >
              Browse all →
            </a>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {HOLIDAYS.map((h) => (
              <a
                key={h.slug}
                href={`/${h.slug}`}
                className="card group flex flex-col overflow-hidden text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden bg-[#FFF1E7]">
                  <img
                    src={h.image}
                    alt={`${h.label} collection — ${h.title} — Paw & Found`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="text-2xl">{h.emoji}</div>
                  <h3 className="font-heading mt-1 text-base font-bold text-[#2D2D2D]">
                    {h.label}
                  </h3>
                  <p className="mt-1 text-sm text-[#6B7280]">{h.copy}</p>
                  <span className="btn-primary mt-3 inline-block w-full px-4 py-2 text-center text-sm">
                    {h.cta}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Shop everything */}
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#F4E3CD]">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Shop Everything</h2>
          <p className="mt-1 text-[#6B7280]">
            Trending tees, bandanas, bowties, litter, and daily essentials.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/products" className="btn-primary px-5 py-2.5 text-sm">
              All Products →
            </a>
            {CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="rounded-full border border-[#2A9D8F] px-4 py-2 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
              >
                {c.name}
              </a>
            ))}
          </div>
        </section>

        {/* Learning */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <a href="/blog" className="card group flex flex-col gap-1 p-6 transition-all hover:-translate-y-1">
            <div className="text-2xl">📚</div>
            <h3 className="font-heading text-lg font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              Pet Care Tips & Safety Guides
            </h3>
            <p className="text-sm text-[#6B7280]">
              Everyday training + the seasonal guides that keep pets out of the candy bowl, off
              the table, and out of the ER.
            </p>
            <span className="mt-2 text-sm font-semibold text-[#2A9D8F]">Read the blog →</span>
          </a>
          <a
            href="/downloads"
            className="card group flex flex-col gap-1 p-6 transition-all hover:-translate-y-1"
          >
            <div className="text-2xl">🎁</div>
            <h3 className="font-heading text-lg font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              Digital Guides & Printables
            </h3>
            <p className="text-sm text-[#6B7280]">
              Instant-download guides, planners, and coloring books — plus the Seasonal Pet
              Starter Kit and small-pet care.
            </p>
            <span className="mt-2 text-sm font-semibold text-[#2A9D8F]">See downloads →</span>
          </a>
        </section>

        {/* Tool / quiz */}
        <section className="mt-6">
          <a
            href="/quiz"
            className="card group flex items-center justify-between gap-3 border-2 border-dashed border-[#FF7F5C]/30 p-5 text-left transition-all hover:border-[#FF7F5C] hover:bg-[#FFF8F0]"
          >
            <span className="font-heading font-semibold text-[#2D2D2D]">
              Not sure what to shop? Take the 60-second pet quiz →
            </span>
            <span className="shrink-0 text-2xl">🐶</span>
          </a>
        </section>

        {/* Email signup */}
        <div className="mt-8">
          <NewsletterSignup variant="homepage" />
        </div>
      </div>
    </div>
  );
}

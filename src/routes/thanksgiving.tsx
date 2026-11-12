import { createFileRoute } from "@tanstack/react-router";
import { getProductBySlug, isAvailable } from "~/lib/digital-catalog";
import type { DigitalProduct } from "~/lib/digital-catalog";

const SITE_URL = "https://www.pawandfound.store";

// Thanksgiving picks — every one of these is a real, deliverable download with a
// live Stripe price. Nothing here ships.
const FEATURED: { slug: string; blurb: string }[] = [
  {
    slug: "homemade-pet-treats-recipe-guide",
    blurb: "Dog- and cat-safe treats you can make ahead — and what never to share from the table.",
  },
  {
    slug: "pet-first-aid-emergency-care-guide",
    blurb: "What to do in the ten minutes before the vet when a pet eats something they shouldn't.",
  },
  {
    slug: "pet-gift-tags-wrapping-set",
    blurb: "Printable tags and wrapping sheets for the host gift — or the pet's own present.",
  },
];

const featured = FEATURED.map(({ slug, blurb }) => {
  const product = getProductBySlug(slug);
  return product && isAvailable(product) ? { product, blurb } : null;
}).filter((x): x is { product: DigitalProduct; blurb: string } => x !== null);

const SAFETY_POSTS = [
  {
    slug: "thanksgiving-pet-safety",
    image: "/images/blog-thanksgiving-pet.jpg",
    title: "Thanksgiving Pet Safety: Foods to Avoid and Safe Treats to Share",
    excerpt:
      "Some table scraps can land your pet in the ER. What's safe to share, what's dangerous, and how to keep your dog and cat happy during the feast.",
  },
];

export const Route = createFileRoute("/thanksgiving")({
  component: ThanksgivingPage,
  head: () => ({
    meta: [
      { title: "Thanksgiving Downloads for Pet Parents | Paw & Found 🦃" },
      {
        name: "description",
        content:
          "Thanksgiving downloads for dog and cat owners — homemade pet treat recipes, the Pet First Aid guide and printable gift tags, from $4.99. Instant download, nothing ships.",
      },
      { property: "og:title", content: "Thanksgiving Downloads for Pet Parents | Paw & Found 🦃" },
      {
        property: "og:description",
        content:
          "Pet-safe treat recipes, the first-aid guide and printable gift tags — instant downloads for the holiday.",
      },
      { property: "og:image", content: `${SITE_URL}/images/pet-treat-recipes-preview.png` },
      { property: "og:url", content: `${SITE_URL}/thanksgiving` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Thanksgiving Downloads for Pet Parents | Paw & Found 🦃" },
      {
        name: "twitter:description",
        content: "Pet-safe treat recipes, first aid and printable gift tags — instant downloads.",
      },
      { name: "twitter:image", content: `${SITE_URL}/images/pet-treat-recipes-preview.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/thanksgiving` }],
  }),
});

function ThanksgivingPage() {
  return (
    <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">
              🦃 Gather, give thanks, stay safe
            </span>
            <h1 className="font-heading mt-4 text-4xl font-bold text-[#2D2D2D] sm:text-5xl">
              The Thanksgiving <span className="text-[#FF7F5C]">Downloads</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#6B7280] lg:mx-0">
              Three downloads for a calmer feast day: pet-safe treat recipes you can make ahead, the
              first-aid guide for when somebody raids the table, and printable tags for the host
              gift. Bought in two clicks, downloaded instantly — nothing ships.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#shop" className="btn-primary">
                See the Downloads
              </a>
              <a
                href="#safety"
                className="rounded-full border border-[#2A9D8F] px-6 py-3 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
              >
                Thanksgiving Safety Guide
              </a>
            </div>
          </div>
          <div className="w-full max-w-md flex-shrink-0 lg:w-1/3">
            <img
              src="/images/pet-treat-recipes-preview.png"
              alt="Homemade Pet Treats Recipe Guide — Paw & Found Thanksgiving downloads"
              className="w-full rounded-3xl shadow-2xl shadow-[#FF7F5C]/20 ring-1 ring-[#F4E3CD]"
            />
          </div>
        </div>
      </section>

      {/* Seasonal downloads */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">🦃 Seasonal Downloads</h2>
            <p className="mt-2 text-[#6B7280]">
              Instant downloads for the holiday — every price below is live.
            </p>
          </div>
          <a href="/downloads" className="text-sm font-semibold text-[#2A9D8F] hover:text-[#FF7F5C]">
            See all downloads →
          </a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(({ product, blurb }) => (
            <div key={product.id} className="card group flex flex-col overflow-hidden">
              <a
                href={`/downloads#${product.slug}`}
                className="block aspect-square overflow-hidden bg-[#FFF8F0]"
              >
                <img
                  src={product.image}
                  alt={`${product.title} — Paw & Found download`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
              <div className="flex flex-1 flex-col p-4">
                <span className="badge">Instant download</span>
                <a href={`/downloads#${product.slug}`}>
                  <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                    {product.title}
                  </h3>
                </a>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{blurb}</p>
                <p className="mt-2 text-lg font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
                <div className="mt-auto flex gap-2 pt-4">
                  <a
                    href={product.stripePaymentLink}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary flex-1 text-center text-xs px-3 py-2.5"
                  >
                    Buy now — ${product.price.toFixed(2)}
                  </a>
                  <a
                    href={`/downloads#${product.slug}`}
                    className="rounded-full border border-[#2A9D8F] px-4 py-2.5 text-xs font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
                  >
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal safety blog cards */}
      <section id="safety" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">
          🛡️ Keep Them Safe This Thanksgiving
        </h2>
        <p className="mt-2 max-w-2xl text-[#6B7280]">
          Turkey, stuffing, and gravy are full of hidden hazards for dogs and cats. Read the guide
          before the big meal.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_POSTS.map((post) => (
            <a
              key={post.slug}
              href={`/blog?post=${post.slug}`}
              className="card group flex flex-col overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#FFF8F0]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280] line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-auto pt-3 text-sm font-semibold text-[#2A9D8F] group-hover:text-[#FF7F5C]">
                  Read the guide →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#FF7F5C] to-[#FF9F80] p-8 text-center sm:p-12">
          <h2 className="font-heading text-3xl font-bold text-white">
            🐾 Make This Thanksgiving Their Best One Yet
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Grab the treat recipes, keep the first-aid guide on your phone, and enjoy a thankful
            season with your favorite furry friend.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#shop" className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#FF7F5C] transition-transform hover:scale-105">
              See the Downloads
            </a>
            <a href="/blog" className="rounded-full border-2 border-white/70 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
              Browse All Safety Guides
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

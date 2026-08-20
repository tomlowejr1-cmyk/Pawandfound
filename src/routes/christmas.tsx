import { createFileRoute } from "@tanstack/react-router";
import { loadProducts, loadPaymentLinks, getProductBySlug, getPaymentLink } from "~/lib/products";
import type { Product } from "~/lib/types";

const SITE_URL = "https://pawandfound.store";

const SEASONAL_SLUGS = ["holiday-plaid-bowtie-collar"];

const SAFETY_POSTS = [
  {
    slug: "christmas-pet-safety",
    image: "/images/blog-christmas-pet.jpg",
    title: "Christmas Pet Safety: Tinsel, Trees, and Holiday Hazards",
    excerpt:
      "Tinsel, poinsettias, tree water, and batteries — Christmas is full of hidden dangers for dogs and cats. Here's how to decorate safely.",
  },
];

const PRODUCT_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Holiday Plaid Bowtie Collar",
  image: `${SITE_URL}/images/product-bowtie-holiday.jpg`,
  description:
    "A festive red-and-green plaid bowtie that attaches to any collar. Makes your pet holiday-photo ready in seconds. Fits most collar widths.",
  brand: { "@type": "Brand", name: "Paw & Found" },
  offers: {
    "@type": "Offer",
    price: "16.99",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://buy.stripe.com/aFafZh8zQ7Kw4EFbqE2cg1p",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
    },
  },
});

interface ChristmasData {
  seasonal: { product: Product; stripeUrl: string | undefined }[];
}

export const Route = createFileRoute("/christmas")({
  loader: async (): Promise<ChristmasData> => {
    const products = await loadProducts();
    const paymentLinks = await loadPaymentLinks();
    const seasonal = SEASONAL_SLUGS.map((slug) => ({
      product: getProductBySlug(products, slug),
      stripeUrl: getPaymentLink(paymentLinks, slug),
    }))
      .filter((x): x is { product: Product; stripeUrl: string | undefined } => Boolean(x.product))
      .map((x) => ({ product: x.product as Product, stripeUrl: x.stripeUrl }));
    return { seasonal };
  },
  component: ChristmasPage,
  head: () => ({
    meta: [
      { title: "Christmas Collection | Paw & Found 🎄" },
      {
        name: "description",
        content:
          "Shop Paw & Found's Christmas Collection — the Holiday Plaid bowtie for holiday photos — plus seasonal pet-safety guides for your dog and cat.",
      },
      { property: "og:title", content: "Christmas Collection | Paw & Found 🎄" },
      {
        property: "og:description",
        content:
          "Festive pet gear for Christmas plus seasonal safety tips — one destination for holiday shopping.",
      },
      { property: "og:image", content: `${SITE_URL}/images/product-bowtie-holiday.jpg` },
      { property: "og:url", content: `${SITE_URL}/christmas` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Christmas Collection | Paw & Found 🎄" },
      {
        name: "twitter:description",
        content: "Festive pet gear for Christmas plus seasonal pet-safety tips.",
      },
      { name: "twitter:image", content: `${SITE_URL}/images/product-bowtie-holiday.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/christmas` }],
    scripts: [{ type: "application/ld+json", children: PRODUCT_JSON_LD }],
  }),
});

function ChristmasPage() {
  const { seasonal } = Route.useLoaderData();

  return (
    <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">
              🎄 Deck the halls, safely
            </span>
            <h1 className="font-heading mt-4 text-4xl font-bold text-[#2D2D2D] sm:text-5xl">
              The Christmas <span className="text-[#FF7F5C]">Collection</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[#6B7280] lg:mx-0">
              A red-and-green plaid bowtie for the holiday card, plus the safety guide that keeps
              tinsel, trees, and treats from turning into a trip to the ER. Fa la la la la, safely.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#shop" className="btn-primary">
                Shop the Collection
              </a>
              <a
                href="#safety"
                className="rounded-full border border-[#2A9D8F] px-6 py-3 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
              >
                Christmas Safety Guide
              </a>
            </div>
          </div>
          <div className="w-full max-w-md flex-shrink-0 lg:w-1/3">
            <img
              src="/images/product-bowtie-holiday.jpg"
              alt="Holiday Plaid Bowtie Collar — Paw & Found Christmas Collection"
              className="w-full rounded-3xl shadow-2xl shadow-[#FF7F5C]/20 ring-1 ring-[#F4E3CD]"
            />
          </div>
        </div>
      </section>

      {/* Seasonal product */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">🎄 Seasonal Pick</h2>
            <p className="mt-2 text-[#6B7280]">
              Limited-edition Christmas gear — while the season lasts.
            </p>
          </div>
          <a href="/products" className="text-sm font-semibold text-[#2A9D8F] hover:text-[#FF7F5C]">
            Browse all products →
          </a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {seasonal.map(({ product, stripeUrl }) => (
            <div key={product.id} className="card group flex flex-col overflow-hidden">
              <a href={`/product/${product.slug}`} className="block aspect-square overflow-hidden bg-[#FFF8F0]">
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
                <p className="mt-1 text-lg font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
                <div className="mt-auto flex gap-2 pt-4">
                  <a
                    href={stripeUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary flex-1 text-center text-xs px-3 py-2.5"
                  >
                    Buy Now
                  </a>
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
      </section>

      {/* Seasonal safety blog cards */}
      <section id="safety" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-[#2D2D2D]">
          🛡️ Keep Them Safe This Christmas
        </h2>
        <p className="mt-2 max-w-2xl text-[#6B7280]">
          Tinsel, poinsettias, tree water, and batteries — learn the hidden dangers before you
          decorate.
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
            🐾 Make This Christmas Their Best One Yet
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Grab the festive bowtie, brush up on the safety basics, and enjoy a merry season with
            your favorite furry friend.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#shop" className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#FF7F5C] transition-transform hover:scale-105">
              Shop the Collection
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

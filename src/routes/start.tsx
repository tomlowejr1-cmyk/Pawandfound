import { createFileRoute } from "@tanstack/react-router";
import { NewsletterSignup } from "~/components/newsletter-signup";

const SITE_URL = "https://www.pawandfound.store";

// Lightweight "link in bio" landing page. The bio link on Instagram/TikTok/Pinterest
// points to /start so ONE static URL serves every seasonal post across the whole
// posting schedule. Every destination below sells a real, downloadable file — the
// shop holds no stock and ships nothing, so nothing here may point at a product
// page without a file behind it.

const STARTERS = [
  {
    slug: "puppy-training-checklist",
    title: "Puppy Training Checklist",
    price: "$4.99",
    copy: "A week-by-week schedule and milestone tracker for a new puppy.",
    image: "/images/puppy-training-checklist-preview.png",
  },
  {
    slug: "cat-behavior-decoder",
    title: "Cat Behavior Decoder",
    price: "$5.99",
    copy: "What the tail, ears and meow are actually telling you.",
    image: "/images/cat-behavior-decoder-preview.png",
  },
  {
    slug: "pet-gift-tags-wrapping-set",
    title: "Gift Tags & Wrapping Set",
    price: "$4.99",
    copy: "Printable pet gift tags and wrapping paper — ready before the birthday.",
    image: "/downloads/pet-gift-tags-set/Pet-Gift-Tags-Wrapping-Set-preview.png",
  },
];

const KINDS = [
  { name: "All downloads", href: "/downloads" },
  { name: "Guides", href: "/downloads#pet-first-aid-emergency-care-guide" },
  { name: "Printables", href: "/downloads#pet-gift-tags-wrapping-set" },
  { name: "Coloring books", href: "/downloads#my-first-pet-coloring-book" },
  { name: "Bundles", href: "/downloads" },
];

export const Route = createFileRoute("/start")({
  component: StartPage,
  head: () => ({
    meta: [
      { title: "Paw & Found — Instant Pet Downloads & Printables" },
      {
        name: "description",
        content:
          "Downloadable pet guides, planners, printables and coloring books for dog, cat and small-pet owners. Everything is an instant download — nothing ships.",
      },
      { property: "og:title", content: "Paw & Found — Instant Pet Downloads & Printables" },
      {
        property: "og:description",
        content:
          "Instant-download pet guides, printables and coloring books. Bought in two clicks, delivered straight away — nothing ships.",
      },
      { property: "og:image", content: `${SITE_URL}/images/logo.png` },
      { property: "og:url", content: `${SITE_URL}/start` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Paw & Found — Instant Pet Downloads & Printables" },
      {
        name: "twitter:description",
        content:
          "Instant-download pet guides, printables and coloring books. Nothing ships.",
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
            Instant pet guides, printables &{" "}
            <span className="text-[#FF7F5C]">coloring books</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-[#6B7280]">
            Everything in this shop is a download. Pay by card through Stripe and your file is
            ready on the download page straight away — <strong className="text-[#2D2D2D]">nothing
            ships, so there is nothing to wait for.</strong>
          </p>
        </div>

        {/* Start here */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">🎉 Start Here</h2>
            <a
              href="/downloads"
              className="text-sm font-semibold text-[#2A9D8F] hover:text-[#FF7F5C]"
            >
              Browse all →
            </a>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {STARTERS.map((s) => (
              <a
                key={s.slug}
                href={`/downloads#${s.slug}`}
                className="card group flex flex-col overflow-hidden text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden bg-[#FFF1E7]">
                  <img
                    src={s.image}
                    alt={`${s.title} — Paw & Found instant download`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-heading text-base font-bold text-[#2D2D2D]">{s.title}</h3>
                  <p className="mt-1 text-sm text-[#6B7280]">{s.copy}</p>
                  <span className="btn-primary mt-3 inline-block w-full px-4 py-2 text-center text-sm">
                    {s.price} — Download
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Shop by kind */}
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#F4E3CD]">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Shop by Kind</h2>
          <p className="mt-1 text-[#6B7280]">
            Guides, planners, printables and coloring books — every one an instant PDF download.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/downloads" className="btn-primary px-5 py-2.5 text-sm">
              All Downloads →
            </a>
            {KINDS.filter((k) => k.name !== "All downloads").map((k) => (
              <a
                key={k.name}
                href={k.href}
                className="rounded-full border border-[#2A9D8F] px-4 py-2 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
              >
                {k.name}
              </a>
            ))}
          </div>
        </section>

        {/* Gifting + learning */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <a href="/gifts" className="card group flex flex-col gap-1 p-6 transition-all hover:-translate-y-1">
            <div className="text-2xl">🎁</div>
            <h3 className="font-heading text-lg font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              Gift Guide
            </h3>
            <p className="text-sm text-[#6B7280]">
              Last-minute gifts that still arrive on time — pick a download and it is ready to
              give in minutes.
            </p>
            <span className="mt-2 text-sm font-semibold text-[#2A9D8F]">See the gift guide →</span>
          </a>
          <a href="/blog" className="card group flex flex-col gap-1 p-6 transition-all hover:-translate-y-1">
            <div className="text-2xl">📚</div>
            <h3 className="font-heading text-lg font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              Pet Care Tips & Safety Guides
            </h3>
            <p className="text-sm text-[#6B7280]">
              Free advice on training, food and seasonal safety for your dog, cat or small pet.
            </p>
            <span className="mt-2 text-sm font-semibold text-[#2A9D8F]">Read the blog →</span>
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

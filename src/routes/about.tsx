import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://www.pawandfound.store";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Paw & Found — Instant Pet Downloads" },
      {
        name: "description",
        content:
          "Paw & Found is a digital pet shop: downloadable guides, planners, printables and coloring books for dog, cat and small-pet owners. Everything is an instant download — nothing ships.",
      },
      { property: "og:title", content: "About Paw & Found — Instant Pet Downloads" },
      {
        property: "og:description",
        content:
          "A digital pet shop of downloadable guides, planners, printables and coloring books. Everything is an instant download — nothing ships.",
      },
      { property: "og:url", content: `${SITE_URL}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="inline-block text-5xl">🐾</span>
        <h1 className="font-heading mt-4 text-4xl font-extrabold tracking-tight text-[#2D2D2D] sm:text-5xl">
          About Paw & Found
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
          We make practical pet guides you can download the moment you buy — for dog, cat and
          small-pet owners who would rather have the answer now than wait for a parcel.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base font-semibold text-[#2A9D8F]">
          Everything here is an instant download. Nothing ships.
        </p>
      </div>

      {/* Story */}
      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Our Story</h2>
          <p className="mt-4 leading-relaxed text-[#6B7280]">
            Paw & Found started with a simple frustration: good pet advice is scattered all over
            the internet — half of it vague, most of it buried under ads. Pet owners were
            spending more time searching than actually helping their animals.
          </p>
          <p className="mt-4 leading-relaxed text-[#6B7280]">
            So we write it up properly and sell it as a file. A training checklist, a care
            planner, a coloring book, a set of printable gift tags — a finished PDF you download,
            print if you want, and keep.
          </p>
          <p className="mt-4 leading-relaxed text-[#6B7280]">
            The shop is digital only. There is no warehouse, no stock and no courier. You pay by
            card through Stripe, and the download page opens the moment the payment clears, with
            the file ready to save.
          </p>
          <p className="mt-4 leading-relaxed text-[#6B7280]">
            Our mission is simple: <strong className="text-[#FF7F5C]">spend less time searching,
            more time with your pet.</strong>
          </p>
        </div>
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#FF7F5C] to-[#F4A261] p-8 text-white">
          <div className="flex h-full flex-col justify-center">
            <span className="text-6xl">🐶🐱</span>
            <h3 className="font-heading mt-4 text-2xl font-bold">Why pet owners like it here</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2">
                <span>✓</span> Instant delivery — the file is there when you pay
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Nothing ships, so nothing to wait for
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> A real, finished file behind every listing
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Print at home as often as you like
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Secure checkout via Stripe
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-16">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What We Stand For</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <article className="card p-6 text-center">
            <span className="text-3xl">🐕</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Pet-First</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Written for the animal in front of you — a new puppy, a cat, a senior or a small pet.
            </p>
          </article>
          <article className="card p-6 text-center">
            <span className="text-3xl">📄</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Honest Catalogue</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              If a product has no finished file, it is not for sale. We would rather list a short
              shelf of real downloads than a long one of maybes.
            </p>
          </article>
          <article className="card p-6 text-center">
            <span className="text-3xl">🤝</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Straight Answers</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              A question about a file, a download or a refund reaches us directly at
              hello@pawandfound.store.
            </p>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section className="mt-16 rounded-xl bg-[#E9EDDE] p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Get in Touch</h2>
        <p className="mt-2 text-[#6B7280]">
          Questions about a download, or an idea for a guide we should write? We would love to
          hear from you.
        </p>
        <div className="mt-4 flex justify-center text-sm text-[#6B7280]">
          <span>📧 hello@pawandfound.store</span>
        </div>
      </section>

      {/* Blog Highlight */}
      <section className="mt-12 border-t border-[#E9EDDE] pt-8 text-center">
        <h2 className="section-title">Caring for Your Pet</h2>
        <p className="section-subtitle mt-2">Read our tips & guides</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/blog" className="btn-secondary text-sm">🐕 Dog Breeds Guide</a>
          <a href="/blog" className="btn-secondary text-sm">🐱 Cat Breeds Guide</a>
          <a href="/blog" className="btn-secondary text-sm">🍖 Dog Food Tips</a>
          <a href="/downloads" className="btn-secondary text-sm">📥 Shop the Downloads</a>
        </div>
      </section>
    </div>
  );
}

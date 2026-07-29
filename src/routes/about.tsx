import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Paw & Found — Pet Store for Dogs & Cats" },
      {
        name: "description",
        content:
          "Learn about Paw & Found, the pet store that makes it simple to find quality pet supplies, apparel, and accessories. Pet-first, sustainable, and community-driven.",
      },
      { property: "og:title", content: "About Paw & Found — Pet Store for Dogs & Cats" },
      {
        property: "og:description",
        content:
          "Learn about Paw & Found — making it simple to find quality pet supplies, apparel, and accessories.",
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
          We make it dead simple to find exactly what your pet needs — from trendy pet T-shirts
          to everyday essentials like cat litter.
        </p>
      </div>

      {/* Story */}
      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Our Story</h2>
          <p className="mt-4 leading-relaxed text-[#6B7280]">
            Paw & Found was born from a simple frustration: shopping for pet supplies
            shouldn't be complicated. We noticed that pet owners were spending too much
            time searching through endless options, trying to find quality products at
            fair prices.
          </p>
          <p className="mt-4 leading-relaxed text-[#6B7280]">
            So we created a curated one-stop shop. Every product in our catalog is
            selected by pet owners who know what matters — durability, comfort, safety,
            and style. Whether you're looking for a cozy sweater for winter walks or
            reliable cat litter that actually controls odor, we've got you covered.
          </p>
          <p className="mt-4 leading-relaxed text-[#6B7280]">
            Our mission is simple: <strong className="text-[#FF7F5C]">spend less time shopping, more time
            with your pet.</strong>
          </p>
        </div>
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#FF7F5C] to-[#F4A261] p-8 text-white">
          <div className="flex h-full flex-col justify-center">
            <span className="text-6xl">🐶🐱</span>
            <h3 className="font-heading mt-4 text-2xl font-bold">Why pet owners love us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2">
                <span>✓</span> Curated selection — no endless scrolling
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Clear categories that make sense
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Fast shopping, easy checkout
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Products tested by real pet owners
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Free shipping on orders over $50
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
            <span className="text-3xl">❤️</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Pet-First</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Every product is chosen with your pet's happiness and safety in mind.
            </p>
          </article>
          <article className="card p-6 text-center">
            <span className="text-3xl">🌱</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Sustainable</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              We prioritize eco-friendly options and sustainable packaging.
            </p>
          </article>
          <article className="card p-6 text-center">
            <span className="text-3xl">🤝</span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Community</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              We partner with local shelters and donate a portion of every sale.
            </p>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section className="mt-16 rounded-xl bg-[#E9EDDE] p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Get in Touch</h2>
        <p className="mt-2 text-[#6B7280]">
          Have questions or suggestions? We'd love to hear from you!
        </p>
        <div className="mt-4 flex justify-center gap-8 text-sm text-[#6B7280]">
          <span>📧 hello@pawandfound.com</span>
          <span>📞 (555) 123-PAWS</span>
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
          <a href="/blog" className="btn-secondary text-sm">📝 See All →</a>
        </div>
      </section>
    </div>
  );
}
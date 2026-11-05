import { createFileRoute } from "@tanstack/react-router";
import { bundles, digitalProducts, isAvailable, isBundleAvailable } from "~/lib/digital-catalog";

const SITE_URL = "https://www.pawandfound.store";


export const Route = createFileRoute("/downloads")({
  component: DownloadsPage,
  head: () => ({
    meta: [
      { title: "Digital Guides — Paw & Found" },
      {
        name: "description",
        content:
          "Download helpful digital pet care guides and recipe books from Paw & Found. Instant access after purchase.",
      },
      { property: "og:title", content: "Digital Guides — Paw & Found" },
      {
        property: "og:description",
        content:
          "Download helpful digital pet care guides and recipe books from Paw & Found.",
      },
      { property: "og:url", content: `${SITE_URL}/downloads` },
      { property: "og:image", content: `${SITE_URL}/images/logo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/downloads` }],
  }),
});

function DownloadsPage() {
  return (
    <div>
      {/* Header */}
      <div className="border-b border-[#E9EDDE] bg-[#FFF8F0] py-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="section-title">Digital Guides</h1>
          <p className="section-subtitle mt-2">
            Pet care knowledge at your fingertips. Download immediately after purchase.
          </p>
        </div>
      </div>

      {/* Premium eBooks */}
      <div id="premium-ebooks" className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center rounded-full bg-[#2D2D2D] px-3 py-1 text-xs font-bold text-[#F4A261]">📚 PREMIUM eBOOKS</span>
          <h2 className="section-title mt-3">Premium Pet Care eBooks</h2>
          <p className="section-subtitle mt-2">In-depth guides written by pet experts. One purchase, lifetime access.</p>
          <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-[#F4A261]/40 bg-[#FFF8F0] p-4 text-sm text-[#6B7280]">
            <p className="font-semibold text-[#2D2D2D]">Our eBooks are off sale for now</p>
            <p className="mt-1">
              We're finishing the book files. Until a finished eBook can actually be downloaded the
              moment you pay, we're not selling it. The guides, planners, printables and coloring
              books further down this page are live and ready to download.
            </p>
          </div>
        </div>

        {/* Bundle Card — Featured */}
        <div className="mb-6 overflow-hidden rounded-2xl border-2 border-[#F4A261] bg-white shadow-lg relative">
          <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-xl bg-[#F4A261] px-6 py-1 text-xs font-bold text-white shadow-md z-10">
            ⭐ BEST VALUE
          </div>
          <div className="grid gap-0 md:grid-cols-5">
            <div className="flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] to-[#F4A261]/10 p-6 md:col-span-2">
              <div className="relative flex gap-2">
                <img src="/images/ebook-puppy-handbook.jpg" alt="The Complete Puppy Handbook — Paw & Found" className="w-20 rounded-lg shadow-md md:w-24 -rotate-3" />
                <img src="/images/ebook-cat-care.jpg" alt="The Ultimate Cat Care Guide — Paw & Found" className="w-20 rounded-lg shadow-md md:w-24 rotate-3 z-10 -ml-4" />
                <img src="/images/ebook-survival-guide.jpg" alt="Pet Parent's Survival Guide — Paw & Found" className="w-20 rounded-lg shadow-md md:w-24 -rotate-2 -ml-4" />
              </div>
            </div>
            <div className="p-6 md:col-span-3">
              <h3 className="font-heading text-xl font-bold text-[#2D2D2D]">Complete Pet Library — eBook Bundle</h3>
              <p className="mt-2 text-sm text-[#6B7280]">
                All four premium eBooks in one purchase. The Complete Puppy Handbook, The Ultimate Cat Care Guide, Pet Parent's Survival Guide, and The Senior Pet Care Guide — everything you need for every stage of your pet's life.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-[#4A4A4A]">
                <li className="flex items-center gap-2"><span className="text-[#2A9D8F]">✓</span> The Complete Puppy Handbook ($19.99)</li>
                <li className="flex items-center gap-2"><span className="text-[#2A9D8F]">✓</span> The Ultimate Cat Care Guide ($19.99)</li>
                <li className="flex items-center gap-2"><span className="text-[#2A9D8F]">✓</span> Pet Parent's Survival Guide ($24.99)</li>
                <li className="flex items-center gap-2"><span className="text-[#2A9D8F]">✓</span> The Senior Pet Care Guide ($14.99)</li>
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-lg text-[#6B7280] line-through">$79.96</span>
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$49.99</span>
                <span className="inline-flex items-center rounded-full bg-[#2A9D8F]/10 px-3 py-1 text-xs font-bold text-[#2A9D8F]">Save $29.97</span>
              </div>
              <p className="mt-4 inline-block rounded-full bg-[#E9EDDE] px-4 py-2 text-sm font-semibold text-[#6B7280]">
                Not available yet — eBook bundle off sale
              </p>
            </div>
          </div>
        </div>

        {/* Individual eBook Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "The Complete Puppy Handbook",
              price: "$19.99",
              desc: "Week-by-week roadmap for raising a happy, healthy puppy. Training, health, nutrition — 12 chapters.",
              img: "/images/ebook-puppy-handbook.jpg",
              slug: "/ebooks/puppy-handbook",
            },
            {
              title: "The Ultimate Cat Care Guide",
              price: "$19.99",
              desc: "Master cat behavior, health, and enrichment. 10 chapters covering everything from litter boxes to senior care.",
              img: "/images/ebook-cat-care.jpg",
              slug: "/ebooks/cat-care-guide",
            },
            {
              title: "Pet Parent's Survival Guide",
              price: "$24.99",
              desc: "The comprehensive reference for dogs and cats. Emergencies, travel, multi-pet homes — 14 chapters.",
              img: "/images/ebook-survival-guide.jpg",
              slug: "/ebooks/survival-guide",
            },
            {
              title: "The Senior Pet Care Guide",
              price: "$14.99",
              desc: "Compassionate guidance for your pet's golden years. Health, mobility, nutrition, and end-of-life care — 8 chapters.",
              img: "/images/ebook-senior-pet-care.jpg",
              slug: "/ebooks/senior-pet-care",
            },
            {
              title: "The Dog Encyclopedia for Kids",
              price: "$12.99",
              desc: "40+ dog breeds A to Z, fun facts, a family breed quiz, dog jobs, and amazing records — a playful guide for young dog lovers.",
              img: "/images/ebook-dog-encyclopedia-kids.jpg",
              slug: "/ebooks/dog-encyclopedia-for-kids",
            },
            {
              title: "The Cat Encyclopedia for Kids",
              price: "$12.99",
              desc: "25+ cat breeds A to Z, fun facts, a family breed quiz, famous cats in history, and amazing records — a purr-fect guide for young cat fans.",
              img: "/images/ebook-cat-encyclopedia-kids.jpg",
              slug: "/ebooks/cat-encyclopedia-for-kids",
            },
            {
              title: "Cat vs. Cat: Multi-Cat Harmony Guide",
              price: "$12.99",
              desc: "Stop the hissing and restore peace. Introductions, territory, resource sharing, stress signals, and safe fight interventions — 8 chapters.",
              img: "/images/ebook-cat-vs-cat.jpg",
              slug: "/ebooks/cat-vs-cat",
            },
            {
              title: "Reactive Dog Guidebook",
              price: "$14.99",
              desc: "Understand and manage leash reactivity, barking, and fear-based responses. Threshold management, counter-conditioning, and confidence building — for walks you both enjoy.",
              img: "/images/ebook-reactive-dog.jpg",
              slug: "/downloads",
            },
            {
              title: "Cat Training Handbook",
              price: "$14.99",
              desc: "Yes, cats CAN be trained! Clicker training, harness walking, tricks, and solving problem behaviors with positive reinforcement adapted for felines.",
              img: "/images/ebook-cat-training.jpg",
              slug: "/downloads",
            },
          ].map((ebook) => (
            <div key={ebook.title} className="group rounded-xl border border-[#E9EDDE] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md overflow-hidden">
              <a href={ebook.slug} className="block">
                <div className="flex justify-center bg-[#FFF8F0] py-5">
                  <img src={ebook.img} alt={ebook.title} className="h-48 rounded-lg shadow-md transition-transform group-hover:scale-105" />
                </div>
              </a>
              <div className="p-5">
                <a href={ebook.slug} className="block">
                  <h3 className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C] transition-colors">{ebook.title}</h3>
                </a>
                <p className="mt-1 text-xs text-[#6B7280] leading-relaxed">{ebook.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-[#FF7F5C]">{ebook.price}</span>
                  <div className="flex gap-2">
                    <a href={ebook.slug} className="text-xs font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">Details</a>
                    <span className="rounded-full bg-[#E9EDDE] px-3 py-1.5 text-xs font-semibold text-[#6B7280]">Not available yet</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured: Senior Pet Care Guide */}
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFF8F0] to-[#F4A261]/10 border border-[#F4A261]/30 shadow-md">
          <div className="flex flex-col items-center gap-6 p-6 sm:flex-row">
            <div className="flex-shrink-0">
              <img
                src="/images/ebook-senior-pet-care.jpg"
                alt="The Senior Pet Care Guide"
                className="w-32 rounded-xl shadow-lg"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">
                ⭐ NEW & FEATURED
              </span>
              <h3 className="font-heading mt-2 text-xl font-bold text-[#2D2D2D]">
                The Senior Pet Care Guide
              </h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Compassionate, practical guidance for your pet's golden years. Health changes, mobility, nutrition, cognitive care, and end-of-life planning — 8 chapters of expert support.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                <span className="font-heading text-2xl font-bold text-[#FF7F5C]">$14.99</span>
                <a href="/ebooks/senior-pet-care" className="text-sm font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">
                  Learn more →
                </a>
                <span className="rounded-full bg-[#E9EDDE] px-4 py-2 text-sm font-semibold text-[#6B7280]">
                  Not available yet
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured: Kids' Encyclopedias */}
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF7F5C] via-[#FF9F7E] to-[#2A9D8F] shadow-lg">
          <span className="absolute left-4 top-4 text-3xl opacity-50 select-none" aria-hidden="true">⭐</span>
          <span className="absolute right-6 bottom-4 text-2xl opacity-40 select-none" aria-hidden="true">🐾</span>
          <span className="absolute right-16 top-6 text-xl opacity-40 select-none" aria-hidden="true">✨</span>
          <div className="p-6 sm:p-8">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-[#FF7F5C] shadow-sm">
              🧒 NEW! FOR KIDS AGES 6-12
            </span>
            <h3 className="font-heading mt-3 text-xl font-bold text-white sm:text-2xl">
              The Dog & Cat Encyclopedias for Kids
            </h3>
            <p className="mt-1 max-w-xl text-sm text-white/90">
              Bright, playful, and packed with fun — breeds A to Z, amazing facts, family quizzes, and record-breaking pets. Perfect first reference books for young animal lovers.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "The Dog Encyclopedia for Kids",
                  img: "/images/ebook-dog-encyclopedia-kids.jpg",
                  price: "$12.99",
                  slug: "/ebooks/dog-encyclopedia-for-kids",
                },
                {
                  title: "The Cat Encyclopedia for Kids",
                  img: "/images/ebook-cat-encyclopedia-kids.jpg",
                  price: "$12.99",
                  slug: "/ebooks/cat-encyclopedia-for-kids",
                },
              ].map((book) => (
                <div key={book.title} className="flex items-center gap-4 rounded-xl bg-white/95 p-4 shadow-md">
                  <img src={book.img} alt={book.title} className="w-16 h-20 object-cover rounded-lg shadow-sm sm:w-20 sm:h-24" />
                  <div className="min-w-0">
                    <h4 className="font-heading text-sm font-bold text-[#2D2D2D] leading-snug">{book.title}</h4>
                    <p className="mt-1 font-heading text-lg font-bold text-[#FF7F5C]">{book.price}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <a href={book.slug} className="text-xs font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">
                        Details
                      </a>
                      <span className="rounded-full bg-[#E9EDDE] px-3 py-1.5 text-xs font-semibold text-[#6B7280]">
                        Not available yet
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bundle & Save */}
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <span className="badge-sale text-sm px-4 py-1.5">🎉 Save 20%+</span>
          <h2 className="section-title mt-3">Bundle & Save</h2>
          <p className="section-subtitle mt-2">Get multiple guides at a discount — perfect for new pet parents</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="relative overflow-hidden rounded-xl bg-white shadow-md border-2 border-transparent"
              style={{
                borderImageSource: "linear-gradient(135deg, #FF7F5C, #F4A261, #2A9D8F)",
                borderImageSlice: 1,
              }}
            >
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7F5C] to-[#F4A261]" />
              <div className="p-6">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#FF7F5C] px-3 py-1 text-xs font-bold text-white shadow-sm">
                    SAVE ${bundle.savings.toFixed(2)}
                  </span>
                </div>

                {/* Image */}
                <div className="mb-4 flex justify-center">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-40 h-40 rounded-xl object-contain bg-[#FFF8F0] shadow-sm"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="font-heading text-xl font-bold text-[#2D2D2D] text-center">
                  {bundle.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B7280] text-center leading-relaxed">
                  {bundle.description}
                </p>

                {/* Included Products */}
                <div className="mt-5 rounded-lg bg-[#FFF8F0] p-4">
                  <h4 className="font-heading text-xs font-semibold text-[#2D2D2D] uppercase tracking-wider mb-3">
                    Includes:
                  </h4>
                  <ul className="space-y-2">
                    {bundle.includedProducts.map((item) => (
                      <li key={item.title} className="flex items-center justify-between text-sm">
                        <span className="flex items-start gap-2 text-[#4A4A4A]">
                          <span className="mt-0.5 flex-shrink-0 text-[#2A9D8F]">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>{item.title}</span>
                        </span>
                        <span className="flex-shrink-0 text-xs text-[#6B7280] font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="text-lg text-[#6B7280] line-through">
                    ${bundle.originalPrice.toFixed(2)}
                  </span>
                  <span className="font-heading text-3xl font-bold text-[#FF7F5C]">
                    ${bundle.price.toFixed(2)}
                  </span>
                </div>

                {/* CTA — gated on every component guide having a real file */}
                <div className="mt-5">
                  {isBundleAvailable(bundle) ? (
                    <a
                      href={bundle.stripePaymentLink}
                      className="btn-primary w-full text-center text-base py-3"
                    >
                      Buy Bundle — Instant Download
                    </a>
                  ) : (
                    <p className="w-full rounded-lg bg-[#E9EDDE] px-4 py-3 text-center text-sm font-semibold text-[#6B7280]">
                      Not available yet — one of these guides has no file to download
                    </p>
                  )}
                </div>
                <p className="mt-2 text-center text-xs text-[#6B7280]">
                  {isBundleAvailable(bundle)
                    ? "Secure payment via Stripe. All 3 guides included."
                    : "This bundle comes back on sale when all three guides are ready."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Products */}
      <div className="mx-auto max-w-4xl px-4 pt-8 pb-12 sm:px-6 lg:px-8">
        {digitalProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-8 md:flex-row md:items-start"
          >
            {/* Cover Image */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-64 h-64 rounded-xl object-contain shadow-lg md:w-72 md:h-72 bg-white"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <span className="badge-sale text-xs">Digital Download</span>
              <h2 className="font-heading mt-2 text-2xl font-bold text-[#2D2D2D] md:text-3xl">
                {product.title}
              </h2>
              <p className="mt-2 text-[#6B7280] leading-relaxed">
                {product.longDescription}
              </p>

              {/* What's Included */}
              <div className="mt-6">
                <h3 className="font-heading text-sm font-semibold text-[#2D2D2D] uppercase tracking-wider">
                  What's Included
                </h3>
                <ul className="mt-3 space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[#6B7280]"
                    >
                      <span className="mt-0.5 flex-shrink-0 text-[#2A9D8F]">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Buy — the Buy button exists only if there is a file to deliver */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">
                  ${product.price.toFixed(2)}
                </span>
                {isAvailable(product) ? (
                  <a
                    href={product.stripePaymentLink}
                    className="btn-primary text-base px-8 py-3"
                  >
                    Buy Now — Instant Download
                  </a>
                ) : (
                  <span className="rounded-full bg-[#E9EDDE] px-5 py-2.5 text-sm font-semibold text-[#6B7280]">
                    Not available yet — no file to download
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">
                {isAvailable(product)
                  ? "Secure payment via Stripe. Refunds within 30 days if unsatisfied."
                  : "We'd rather not sell a download we can't hand over. This one comes back when its file is ready."}
              </p>
              {isAvailable(product) && (
                <a
                  href={`/access/${product.slug}`}
                  className="mt-1 inline-block text-xs font-medium text-[#2A9D8F] hover:text-[#FF7F5C]"
                >
                  Already bought it? Get your download →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Colourful Wishes card books — no files yet, so not on sale */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#FFF8F0] to-white p-6 ring-1 ring-[#F4E3CD] sm:p-8">
          <div className="text-center">
            <span className="text-3xl">🎨</span>
            <h2 className="font-heading mt-2 text-2xl font-bold text-[#2D2D2D] sm:text-3xl">
              Colorful Wishes card books — <span className="text-[#FF7F5C]">back soon</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[#6B7280]">
              The Birthday, Dinosaur and Ocean Party card books aren't on sale at the moment — the
              print-at-home files aren't finished. When they are, they'll be right here. The
              Colorful Wishes Valentine's card book is live on this page and ready to download.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <div className="border-t border-[#E9EDDE] bg-[#FFF8F0]/50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-center text-lg font-semibold text-[#2D2D2D]">
            How It Works
          </h3>
          <div className="mt-6 grid gap-6 text-center sm:grid-cols-3">
            <div>
              <span className="text-2xl">💳</span>
              <p className="mt-2 text-sm text-[#6B7280]">
                Securely pay with credit card through Stripe
              </p>
            </div>
            <div>
              <span className="text-2xl">⬇️</span>
              <p className="mt-2 text-sm text-[#6B7280]">
                You land on your download page straight after payment — your file is there to grab
              </p>
            </div>
            <div>
              <span className="text-2xl">📱</span>
              <p className="mt-2 text-sm text-[#6B7280]">
                View your guide on any device — phone, tablet, or computer
              </p>
            </div>
          </div>
        </div>

        {/* Freebies cross-promo */}
        <div className="mt-12 rounded-2xl border-2 border-dashed border-[#FF7F5C]/40 bg-[#FFF8F0] p-6 text-center">
          <span className="text-3xl">🎁</span>
          <h3 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D]">
            Looking for freebies?
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Grab a free printable pet birthday card — perfect for any pet-loving friend!
          </p>
          <a
            href="/freebies/pet-birthday-card"
            className="btn-primary mt-3 inline-block"
          >
            🎂 Get Free Birthday Card
          </a>
        </div>

      </div>
    </div>
  );
}
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
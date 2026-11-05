import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://www.pawandfound.store";

/**
 * Honest empty state.
 *
 * This page used to render invented testimonials — named "customers", star
 * ratings and dated quotes for products that had never been sold. They were
 * fabricated, and they are gone. Only reviews from real buyers will ever
 * appear here, so until the first one arrives the page says exactly that.
 */
export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [
      { title: "Customer Reviews — Paw & Found" },
      {
        name: "description",
        content:
          "Customer reviews of Paw & Found digital downloads. We publish real reviews only — and we haven't had our first one yet.",
      },
      { property: "og:title", content: "Customer Reviews — Paw & Found" },
      {
        property: "og:description",
        content:
          "We publish real reviews only. Paw & Found hasn't had its first customer review yet — this page will hold them when we do.",
      },
      { property: "og:url", content: `${SITE_URL}/reviews` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/reviews` }],
  }),
});

function ReviewsPage() {
  return (
    <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-4xl">⭐</span>
          <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
            Customer reviews
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[#6B7280]">
            We publish reviews from real buyers only. Paw &amp; Found hasn't had its first customer
            review yet, so there's nothing to show here — and we're not going to invent one.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-[#E9EDDE] bg-white p-8 text-center">
          <p className="font-heading text-lg font-semibold text-[#2D2D2D]">
            No reviews yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6B7280]">
            Every review on this page will come from someone who actually bought and downloaded
            something. When that happens, what they said goes here — unedited.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/downloads" className="btn-primary">
              Browse the digital guides
            </a>
            <a
              href="/contact"
              className="rounded-full border border-[#2A9D8F] px-6 py-3 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
            >
              Tell us how we did
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-[#6B7280]">
          Bought something and want to say how it went? Email{" "}
          <a
            href="mailto:hello@pawandfound.store"
            className="font-semibold text-[#2A9D8F] underline"
          >
            hello@pawandfound.store
          </a>
          .
        </p>
      </div>
    </div>
  );
}

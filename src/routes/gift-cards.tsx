import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://www.pawandfound.store";

/**
 * Gift cards are NOT on sale yet. Every physical product is off sale, so a
 * gift card would have nothing to be redeemed against — the amounts below are
 * shown for reference and marked "coming soon" until the store has something
 * to spend them on. Add a live Stripe link to GIFT_CARD_LINKS only when that
 * is true again.
 */
const GIFT_CARD_LINKS: Record<number, string> = {};

const GIFT_CARD_AMOUNTS = [
  {
    amount: 25,
    emoji: "🐾",
    highlight: "Perfect for a first treat",
  },
  {
    amount: 50,
    emoji: "🦴",
    highlight: "Great for toys & treats",
    featured: true,
  },
  {
    amount: 75,
    emoji: "🛁",
    highlight: "Covers supplies & grooming",
  },
  {
    amount: 100,
    emoji: "🎉",
    highlight: "The full pamper package",
  },
];

const FEATURES = [
  "Delivered by email — no plastic, no postage",
  "No expiry date",
  "Not on sale yet",
];

const STEPS = [
  {
    emoji: "🛒",
    title: "Pick an amount",
    text: "Amounts will run from $25 to $100. Checkout opens once the store has more to redeem against.",
  },
  {
    emoji: "📧",
    title: "Get your code",
    text: "The code arrives by email — easy to forward to the lucky pet parent. No plastic, no postage.",
  },
  {
    emoji: "🎁",
    title: "They shop",
    text: "The recipient spends it on whatever is on sale at pawandfound.store at the time.",
  },
];

const FAQS = [
  {
    q: "Can I buy a gift card right now?",
    a: "No — gift cards are coming soon. Our physical products are off sale while we find a supplier, so a gift card would have almost nothing to be spent on. We'd rather not sell one we can't make good on.",
  },
  {
    q: "When will gift cards go on sale?",
    a: "Once there's a range to redeem against. Until then, the digital guides, planners and bundles on the Downloads page are the real, instantly-delivered gift option.",
  },
  {
    q: "What will the gift card be worth?",
    a: "The plan is $25, $50, $75 and $100. Nothing is being charged for them today.",
  },
  {
    q: "What can I give instead?",
    a: "A digital guide, a planner, a printable pack or a starter bundle — every one is an instant download and most are under $10.",
  },
];

export const Route = createFileRoute("/gift-cards")({
  component: GiftCardsPage,
  head: () => ({
    meta: [
      { title: "Gift Cards — Coming Soon | Paw & Found 🎁" },
      {
        name: "description",
        content:
          "Paw & Found gift cards are coming soon — not on sale yet. Shop instant digital pet guides, planners and bundles from $3.99 in the meantime.",
      },
      { property: "og:title", content: "Gift Cards — Coming Soon | Paw & Found 🎁" },
      {
        property: "og:description",
        content:
          "Gift cards are coming soon and are not on sale yet. Instant digital pet guides and bundles are available today.",
      },
      { property: "og:url", content: `${SITE_URL}/gift-cards` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/gift-cards` }],
  }),
});

function GiftCardsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">🎁</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Paw & Found Gift Cards
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Paw &amp; Found gift cards are coming soon. We're not selling them yet: with our
          physical products off sale, a gift card wouldn't have much to be spent on. In the
          meantime, the digital guides below are instant, real, and ready to gift today. 🐶🐱
        </p>
      </div>

      {/* Amount cards */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {GIFT_CARD_AMOUNTS.map((card) => {
          const link = GIFT_CARD_LINKS[card.amount];
          return (
            <div
              key={card.amount}
              className={`flex flex-col rounded-2xl border-2 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md ${
                card.featured ? "border-[#2A9D8F]" : "border-[#E9EDDE]"
              }`}
            >
              {card.featured && (
                <span className="mx-auto -mt-9 rounded-full bg-[#E9EDDE] px-3 py-1 text-xs font-semibold text-[#6B7280]">
                  Coming soon
                </span>
              )}
              <span className="text-3xl">{card.emoji}</span>
              <p className="font-heading mt-3 text-4xl font-bold text-[#2D2D2D]">
                ${card.amount}
              </p>
              <p className="mt-1 text-sm text-[#6B7280]">{card.highlight}</p>

              <ul className="mt-4 flex-1 space-y-1.5 text-left text-xs text-[#6B7280]">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <span className="text-[#2A9D8F]">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary block w-full"
                  >
                    Buy ${card.amount} Gift Card →
                  </a>
                ) : (
                  <span
                    className="block w-full rounded-lg border border-[#E9EDDE] bg-[#F9FAF5] px-4 py-2.5 text-sm text-[#B0B7A3]"
                    title="Gift cards are not on sale yet"
                  >
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* How it works */}
      <section className="mt-12 rounded-2xl bg-[#FFF8F0] p-6 sm:p-10">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          How It Works
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="relative mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                {step.emoji}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7F5C] text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">{step.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Perfect for */}
      <section className="mt-12 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">
          Perfect For…
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["New pet parents", "Dog & cat birthdays", "Adoption-day celebrations", "Holiday gifts", "Thank-you gifts for pet sitters", "Just because 🐾"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-[#E9EDDE] bg-white px-4 py-2 text-sm font-medium text-[#6B7280]"
              >
                {t}
              </span>
            ),
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-2xl">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          Gift Card FAQ
        </h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-[#E9EDDE] bg-white px-5 py-4"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-[#2D2D2D]">
                {faq.q}
                <span className="text-[#2A9D8F] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-[#6B7280]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#1E7A6F] p-8 text-center text-white sm:p-10">
        <h2 className="font-heading text-2xl font-bold">Not sure what they'd love?</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">
          A gift card will let them pick their own favourite — but you can gift a guide
          today, and it lands in their inbox straight away.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/downloads" className="btn-primary bg-white text-[#2A9D8F] hover:bg-white/90">
            Shop Digital Guides
          </a>
          <a
            href="/downloads"
            className="inline-flex items-center rounded-lg border border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
          >
            Browse Digital Guides
          </a>
        </div>
      </section>
    </div>
  );
}

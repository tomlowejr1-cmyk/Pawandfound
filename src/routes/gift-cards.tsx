import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

/**
 * ⚠️ OWNER ACTION NEEDED — one-time setup (~2 minutes):
 * Create 4 Stripe Payment Links in the Stripe Dashboard
 * (dashboard.stripe.com → Payment Links → Create payment link → one-time price).
 * Paste the resulting buy.stripe.com URLs below. The matching "Buy" button on
 * the /gift-cards page activates automatically as soon as a link is present.
 */
const GIFT_CARD_LINKS: Record<number, string> = {
  25: "",
  50: "",
  75: "",
  100: "",
};

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
  "Instant email delivery",
  "Redeemable on everything in the store",
  "No expiry date",
];

const STEPS = [
  {
    emoji: "🛒",
    title: "Pick an amount",
    text: "Choose a gift card amount below and check out securely with Stripe.",
  },
  {
    emoji: "📧",
    title: "We email it",
    text: "Your digital gift card code is delivered straight to your inbox — no plastic, no postage.",
  },
  {
    emoji: "🎁",
    title: "They shop",
    text: "The lucky recipient redeems it on anything at pawandfound.store — products or digital guides.",
  },
];

const FAQS = [
  {
    q: "How do I receive my gift card?",
    a: "Immediately after checkout, your gift card code is emailed to the address you use at checkout. If it's a gift, you can forward the email to the lucky pet parent.",
  },
  {
    q: "What can the gift card be used for?",
    a: "Anything in the store — pet apparel, supplies, accessories, cat litter, and digital guides like the Ultimate Pet Care Planner.",
  },
  {
    q: "Do gift cards expire?",
    a: "No. Your gift card never expires, so it can be saved for a birthday, adoption day, or just because.",
  },
  {
    q: "Can I use my gift card with Subscribe & Save?",
    a: "Yes — gift card balance can be applied toward recurring essentials purchases too.",
  },
];

export const Route = createFileRoute("/gift-cards")({
  component: GiftCardsPage,
  head: () => ({
    meta: [
      { title: "Gift Cards — Paw & Found 🎁" },
      {
        name: "description",
        content:
          "Give the gift of treats, toys, and tail wags. Paw & Found digital gift cards from $25 — delivered instantly by email, redeemable on everything in the store.",
      },
      { property: "og:title", content: "Gift Cards — Paw & Found 🎁" },
      {
        property: "og:description",
        content:
          "Digital Paw & Found gift cards in $25, $50, $75, and $100 — delivered by email, redeemable on everything in the store.",
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
          The perfect gift for every pet parent — treats, toys, apparel, and digital guides.
          Delivered instantly by email, redeemable on anything in the store. No physical
          card needed. 🐶🐱
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
                <span className="mx-auto -mt-9 rounded-full bg-[#2A9D8F] px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
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
                    title="Checkout for this amount is being set up"
                  >
                    Checkout link coming soon
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
          A gift card lets them pick their own favorite — but you can also browse the
          store for inspiration first.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/products" className="btn-primary bg-white text-[#2A9D8F] hover:bg-white/90">
            Shop All Products
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

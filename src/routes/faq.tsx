import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://www.pawandfound.store";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Digital Downloads, Refunds & Pet Questions | Paw & Found" },
      {
        name: "description",
        content:
          "Find answers about Paw & Found digital downloads: how instant delivery works, refunds, payment, bundles, and what is (and is not) on sale right now.",
      },
      { property: "og:title", content: "FAQ — Digital Downloads, Refunds & Pet Questions | Paw & Found" },
      {
        property: "og:description",
        content:
          "Find answers about Paw & Found digital downloads: instant delivery, refunds, payment, bundles, and what is currently on sale.",
      },
      { property: "og:url", content: `${SITE_URL}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSections.flatMap((section) =>
            section.questions.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            }))
          ),
        }),
      },
    ],
  }),
});

// ... rest of FAQ content stays the same
const faqSections = [
  {
    title: "Delivery & Downloads",
    questions: [
      {
        q: "How do I get what I ordered?",
        a: "Everything Paw & Found sells is a digital download. The moment your Stripe payment clears, the download link is emailed to the address you used at checkout — there is no shipping step and no delivery address to enter.",
      },
      {
        q: "How long does delivery take?",
        a: "There is no delivery window: your file is available immediately after checkout. If the email hasn't arrived within a few minutes, check your spam or promotions folder first, then email hello@pawandfound.store and we'll send the link again.",
      },
      {
        q: "Do you sell physical products?",
        a: "Not currently. Our physical range — apparel, toys, beds, bowls, litter and grooming supplies — is not on sale while we sort out a supplier. Those product pages stay up so you can browse them, and each one is marked as not available for purchase yet.",
      },
      {
        q: "Do you ship internationally?",
        a: "There is no shipping at all right now, so there are no country restrictions either. Digital downloads work anywhere — you just need an email address and a device to open the file on.",
      },
      {
        q: "What format are the downloads in?",
        a: "PDF files you can read on any phone, tablet or computer and print at home if you prefer paper. Digital sticker packs are PNG images for journaling apps.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    questions: [
      {
        q: "What is your refund policy?",
        a: "If a download won't open, isn't what the listing described, or you bought it by mistake, email hello@pawandfound.store within 30 days and we'll make it right. There's nothing to post back — digital files can't be returned.",
      },
      {
        q: "How do I get a refund?",
        a: "Email us at hello@pawandfound.store with the email address you used at checkout. Refunds go back to the original payment method through Stripe.",
      },
      {
        q: "I bought the wrong guide — can I swap it?",
        a: "Get in touch and we'll help you swap to the guide you meant to buy. Because everything is a file, a swap costs nobody a return label.",
      },
      {
        q: "What about subscription items?",
        a: "Subscribe & Save applied to physical essentials, so it's paused while those products are off sale. Nothing recurring is being billed, and nothing needs cancelling.",
      },
    ],
  },
  {
    title: "Products & Guides",
    questions: [
      {
        q: "What can I actually buy today?",
        a: "Digital guides, planners, printable packs, coloring books, sticker packs and bundles — from $3.99. You can browse the full library on the Downloads page, and the gift guide has 18 hand-picked options for the holidays.",
      },
      {
        q: "Do you sell apparel, beds or litter?",
        a: "Not right now. Every physical item in the catalogue is off sale until we have a supplier who can fulfil orders. Nothing on the site can be ordered as a physical delivery today.",
      },
      {
        q: "Do you carry guides for both dogs and cats?",
        a: "Yes — the library covers dogs, cats, and small pets like rabbits, guinea pigs and hamsters. Each listing says which pets it's written for.",
      },
      {
        q: "Is the advice in your guides a substitute for a vet?",
        a: "No. Our guides are written for pet owners to plan, prepare and understand — they don't replace veterinary advice. If your pet is unwell or injured, contact your vet or an emergency clinic.",
      },
    ],
  },
  {
    title: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "Checkout runs through Stripe, which accepts all major credit and debit cards (Visa, Mastercard, American Express, Discover), plus Apple Pay and Google Pay where your device supports them.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. Payment details are entered on Stripe's secure checkout, not on our site — we never see or store your full card number.",
      },
      {
        q: "When will my card be charged?",
        a: "Once, at checkout. There are no recurring charges on the store right now.",
      },
      {
        q: "Do I get a receipt?",
        a: "Stripe emails a receipt to the address you used at checkout. Keep it — it's also the fastest way for us to find your order if a download link goes missing.",
      },
    ],
  },
  {
    title: "Gift Cards & Bundles",
    questions: [
      {
        q: "Can I buy a gift card?",
        a: "Not yet. Gift cards are marked coming soon: with physical products off sale, a gift card wouldn't have much to be spent on, and we'd rather not sell one we can't make good on.",
      },
      {
        q: "What are the bundles?",
        a: "The Puppy Starter Pack ($12.99) and Cat Essentials Kit ($11.99) each collect three guides in one download — a cheaper way to buy the set than picking them up one at a time.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block text-5xl">❓</span>
        <h1 className="font-heading mt-4 text-4xl font-extrabold tracking-tight text-[#2D2D2D] sm:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
          Everything you need to know about buying from Paw & Found. Can't find what you're looking for?{" "}
          <a href="/about" className="text-[#2A9D8F] hover:underline">Contact us</a>.
        </p>
      </div>

      {/* Quick links */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {faqSections.map((section) => (
          <a
            key={section.title}
            href={`#${section.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-lg bg-[#E9EDDE] px-4 py-2 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#FF7F5C] hover:text-white"
          >
            {section.title}
          </a>
        ))}
      </div>

      {/* FAQ Sections */}
      <div className="mt-12 space-y-12">
        {faqSections.map((section) => (
          <section
            key={section.title}
            id={section.title.toLowerCase().replace(/\s+/g, "-")}
          >
            <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">
              {section.title}
            </h2>
            <div className="mt-6 space-y-4">
              {section.questions.map((item, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-[#E9EDDE] bg-white transition-colors open:border-[#FF7F5C]/30 open:bg-[#FFF8F0]"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium text-[#2D2D2D]">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-[#6B7280] transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-[#E9EDDE] px-6 py-4">
                    <p className="text-sm leading-relaxed text-[#6B7280]">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Still have questions? */}
      <section className="mt-16 rounded-xl bg-gradient-to-br from-[#FF7F5C] to-[#F4A261] p-8 text-center text-white">
        <h2 className="font-heading text-2xl font-bold">Still have questions?</h2>
        <p className="mt-2 text-white/80">
          We're here to help! Reach out and we'll get back to you within 24 hours.
        </p>
        <div className="mt-4 flex justify-center gap-8 text-sm">
          <span>📧 hello@pawandfound.store</span>
        </div>
      </section>

      {/* Blog Help */}
      <section className="mt-12 border-t border-[#E9EDDE] pt-8 text-center">
        <p className="text-[#6B7280]">Want more detailed guides? Check out our blog!</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a href="/blog" className="btn-secondary text-sm">🐕 Dog Breeds</a>
          <a href="/blog" className="btn-secondary text-sm">🐱 Cat Care Tips</a>
          <a href="/blog" className="btn-secondary text-sm">📝 All Guides →</a>
        </div>
      </section>
    </div>
  );
}
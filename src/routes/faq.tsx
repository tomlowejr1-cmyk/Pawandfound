import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Shipping, Returns & Pet Product Questions | Paw & Found" },
      {
        name: "description",
        content:
          "Find answers to common questions about Paw & Found pet supplies: shipping, returns, sizing, subscriptions, payment, and pet safety. Free shipping over $50.",
      },
      { property: "og:title", content: "FAQ — Shipping, Returns & Pet Product Questions | Paw & Found" },
      {
        property: "og:description",
        content:
          "Find answers about Paw & Found pet supplies: shipping, returns, sizing, subscriptions, payment, and pet safety.",
      },
      { property: "og:url", content: `${SITE_URL}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
  }),
});

// ... rest of FAQ content stays the same
const faqSections = [
  {
    title: "Shipping & Delivery",
    questions: [
      {
        q: "How much does shipping cost?",
        a: "We offer free shipping on all orders over $50. For orders under $50, shipping is a flat rate of $5.99 within the continental US.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3-7 business days within the continental US. We also offer expedited shipping (2-3 business days) for an additional $12.99.",
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order anytime by visiting your account page.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we ship within the United States only. We're working on expanding to Canada and other countries — stay tuned!",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase for any reason, return it within 30 days for a full refund or exchange.",
      },
      {
        q: "How do I return an item?",
        a: "Simply email us at returns@pawandfound.com with your order number and the items you'd like to return. We'll send you a prepaid return label. Refunds are processed within 5-7 business days after we receive the return.",
      },
      {
        q: "Can I exchange an item for a different size?",
        a: "Absolutely! We want your pet to be comfortable. If the size isn't right, just let us know and we'll exchange it for the correct size free of charge.",
      },
      {
        q: "What about subscription items?",
        a: "You can cancel or modify your subscription anytime before the next billing date. For subscription items already shipped, our standard 30-day return policy applies.",
      },
    ],
  },
  {
    title: "Products & Sizing",
    questions: [
      {
        q: "How do I find the right size for apparel?",
        a: "Each product page has a size guide. As a general rule, measure your pet's chest girth (just behind the front legs) and back length (from neck to tail base). If you're between sizes, we recommend sizing up for a comfortable fit.",
      },
      {
        q: "Do you offer subscriptions for repeat purchases?",
        a: "Yes! For eligible essentials (cat litter, dog food, treats, poop bags, etc.), you can subscribe and save 10%. Choose your delivery frequency (every 4 weeks by default), and you can cancel or change anytime.",
      },
      {
        q: "Are your products safe for my pet?",
        a: "Absolutely. Every product in our catalog is vetted by pet owners. We prioritize non-toxic materials, durable construction, and pet-safe designs. All apparel is tested for comfort and freedom of movement.",
      },
      {
        q: "Do you carry products for both dogs and cats?",
        a: "Yes! We carry products for both dogs and cats, and many of our accessories and supplies work for both. Check the tags on each product to see which pets it's suitable for.",
      },
    ],
  },
  {
    title: "Payment & Security",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), as well as PayPal and Apple Pay. All payments are processed securely.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. We use industry-standard SSL encryption to protect your data. We never store your full credit card details on our servers.",
      },
      {
        q: "When will my card be charged?",
        a: "For one-time purchases, your card is charged when you place the order. For subscription items, your card is charged at the start of each delivery cycle.",
      },
    ],
  },
  {
    title: "Pet Safety & Product Quality",
    questions: [
      {
        q: "How do you ensure product quality?",
        a: "Every product is tested by our team of pet owners before it makes it to our catalog. We check for durability, safety, comfort, and ease of use. We only stock products we'd use with our own pets.",
      },
      {
        q: "What if my pet has an allergic reaction?",
        a: "Your pet's health is our top priority. If your pet has a reaction to any product, stop use immediately and contact your veterinarian. Then reach out to us and we'll make it right.",
      },
      {
        q: "Are your products eco-friendly?",
        a: "We prioritize sustainable options wherever possible. Our poop bags are compostable, our packaging is recyclable, and we're constantly working to reduce our environmental footprint.",
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
          Everything you need to know about shopping at Paw & Found. Can't find what you're looking for?{" "}
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
          <span>📧 hello@pawandfound.com</span>
          <span>📞 (555) 123-PAWS</span>
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
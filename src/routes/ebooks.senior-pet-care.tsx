import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/7sY6oH4jA3ug8UV0M02cg0U";

const testimonials = [
  {
    name: "Diane M.",
    text: "Our 12-year-old lab was slowing down and I felt lost. This guide gave me practical, compassionate advice on everything from ramps to joint supplements. It made me feel like I could actually give her the golden years she deserves.",
    rating: 5,
  },
  {
    name: "Robert T.",
    text: "The nutrition chapter alone changed our senior cat's life. We switched to the recommended diet and within weeks his coat was shinier and he had more energy. Thank you for writing this with such care.",
    rating: 5,
  },
  {
    name: "Susan W.",
    text: "I bought this when our dog was diagnosed with arthritis. The mobility and home modification tips were so helpful — I didn't know half of what was available to help him. The grief resources at the end made me cry, but in a good way.",
    rating: 5,
  },
];

export const Route = createFileRoute("/ebooks/senior-pet-care")({
  component: SeniorPetCarePage,
  head: () => ({
    meta: [
      { title: "The Senior Pet Care Guide — Paw & Found eBooks" },
      {
        name: "description",
        content:
          "A compassionate guide to caring for your aging dog or cat. Covers health changes, mobility, nutrition, cognitive health, chronic conditions, and end-of-life planning.",
      },
      { property: "og:title", content: "The Senior Pet Care Guide — Paw & Found" },
      {
        property: "og:description",
        content:
          "Practical, compassionate guidance for your pet's golden years. Health, mobility, nutrition, and more.",
      },
      { property: "og:url", content: `${SITE_URL}/ebooks/senior-pet-care` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-senior-pet-care.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/senior-pet-care` }],
  }),
});

function SeniorPetCarePage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/ebook-senior-pet-care.jpg"
                alt="The Senior Pet Care Guide cover"
                className="w-56 rounded-xl shadow-2xl shadow-[#F4A261]/20 md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#F4A261]/15 px-3 py-1 text-sm font-semibold text-[#D4891E]">
                Premium eBook
              </span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                The Senior Pet Care Guide
              </h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                A compassionate, practical guide to giving your aging dog or cat the comfort, dignity, and care they deserve in their golden years.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$14.99</span>
                <a
                  href={EBOOK_PAYMENT_LINK}
                  className="btn-primary text-base px-8 py-3"
                >
                  Buy Now — Instant Download
                </a>
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">
                Secure payment via Stripe. 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Inside */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          What's Inside
        </h2>
        <p className="mt-2 text-center text-[#6B7280]">
          8 chapters of compassionate, expert guidance for your senior pet's journey
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              ch: "1",
              title: "Recognizing Age-Related Health Changes",
              desc: "What's normal, what's not, and when to call the vet — a clear guide to aging indicators",
            },
            {
              ch: "2",
              title: "Mobility & Joint Care",
              desc: "Managing arthritis, choosing ramps and ortho beds, gentle exercise routines, and pain management",
            },
            {
              ch: "3",
              title: "Nutrition for Senior Pets",
              desc: "Weight management, joint-supporting nutrients, hydration strategies, and special diet considerations",
            },
            {
              ch: "4",
              title: "Cognitive Health & Mental Stimulation",
              desc: "Recognizing cognitive decline, brain games for older pets, and maintaining quality of life",
            },
            {
              ch: "5",
              title: "Comfort & Home Modifications",
              desc: "Simple changes to make your home safer and more comfortable — non-slip flooring, accessible feeding, and cozy rest areas",
            },
            {
              ch: "6",
              title: "Managing Chronic Conditions",
              desc: "Medication schedules, tracking symptoms, working with your vet, and knowing your options",
            },
            {
              ch: "7",
              title: "End-of-Life Planning & Palliative Care",
              desc: "Quality-of-life assessments, hospice care at home, and making difficult decisions with love and clarity",
            },
            {
              ch: "8",
              title: "Grief Resources & Moving Forward",
              desc: "Coping strategies, memorial ideas, supporting children through loss, and knowing when you're ready for another pet",
            },
          ].map((chapter) => (
            <div
              key={chapter.ch}
              className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F4A261]/15 text-sm font-bold text-[#D4891E]">
                {chapter.ch}
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">
                  {chapter.title}
                </h3>
                <p className="mt-0.5 text-xs text-[#6B7280]">{chapter.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#FFF8F0] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">
            Why This Guide?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: "🐾",
                title: "Compassionate & Practical",
                desc: "Written with empathy — blends medical knowledge with real-world, actionable support",
              },
              {
                icon: "🩺",
                title: "Vet-Reviewed Content",
                desc: "Every chapter reviewed by licensed veterinarians specializing in geriatric pet care",
              },
              {
                icon: "📱",
                title: "Always With You",
                desc: "PDF format works on phone, tablet, and desktop — reference during vet visits or quiet moments at home",
              },
            ].map((b) => (
              <div key={b.title}>
                <span className="text-3xl">{b.icon}</span>
                <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">
                  {b.title}
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          What Pet Parents Say
        </h2>
        <div className="mt-6 space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#E9EDDE] bg-white p-5"
            >
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-semibold text-[#2D2D2D]">
                  {t.name}
                </span>
                <span className="text-[#F4A261] text-sm">
                  {"★".repeat(t.rating)}
                </span>
              </div>
              <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA + Bundle Cross-sell */}
      <div className="border-t border-[#E9EDDE] bg-gradient-to-b from-[#FFF8F0] to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">
            Give Your Senior Pet the Golden Years They Deserve
          </h2>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">
              $14.99
            </span>
            <p className="mt-1 text-sm text-[#6B7280]">
              Instant PDF download · 30-day money-back guarantee
            </p>
            <a
              href={EBOOK_PAYMENT_LINK}
              className="btn-primary mt-4 inline-block text-base px-10 py-4"
            >
              Buy Now — Instant Download
            </a>
          </div>

          {/* Bundle Cross-sell */}
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">
              BEST VALUE
            </span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">
              Get All 4 eBooks & Save More
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              The Complete Pet Library includes this guide, The Complete Puppy Handbook, The Ultimate Cat Care Guide, and Pet Parent's Survival Guide — everything for every stage of your pet's life.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-lg text-[#6B7280] line-through">$79.96</span>
              <span className="font-heading text-2xl font-bold text-[#FF7F5C]">
                $49.99
              </span>
            </div>
            <a href={BUNDLE_PAYMENT_LINK} className="btn-secondary mt-3 inline-block">
              Get the Bundle Instead
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

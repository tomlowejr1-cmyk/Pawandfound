import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/14AdR94jA0i45IJ2U82cg0J";

const testimonials = [
  { name: "Amanda L.", text: "This is the book I wish existed when I adopted my first dog. It covers everything — training, health, travel, emergencies. I keep the PDF on my phone and reference it constantly.", rating: 5 },
  { name: "Ryan C.", text: "We have two dogs and a cat, and this guide handles multi-pet households beautifully. The emergency section alone gave us so much peace of mind. Worth every penny.", rating: 5 },
  { name: "Sofia G.", text: "The travel checklist saved us on our cross-country move with two cats. The pet sitter instructions template is brilliant — our sitter said it was the most organized pet info she'd ever received.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/survival-guide")({
  component: SurvivalGuidePage,
  head: () => ({
    meta: [
      { title: "Pet Parent's Survival Guide — Paw & Found eBooks" },
      { name: "description", content: "The ultimate reference for every pet parent. Covers dogs, cats, emergencies, travel, multi-pet households, and everything in between." },
      { property: "og:title", content: "Pet Parent's Survival Guide — Paw & Found" },
      { property: "og:description", content: "Your go-to reference for every pet situation — emergencies, travel, training, health, and more." },
      { property: "og:url", content: `${SITE_URL}/ebooks/survival-guide` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-survival-guide.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/survival-guide` }],
  }),
});

function SurvivalGuidePage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/ebook-survival-guide.jpg"
                alt="Pet Parent's Survival Guide cover"
                className="w-56 rounded-xl shadow-2xl shadow-[#F4A261]/20 md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="badge-sale text-sm">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                Pet Parent's Survival Guide
              </h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                The comprehensive reference every pet parent needs — covering dogs, cats, emergencies, travel, and everything in between. Your go-to manual for confident pet ownership.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$24.99</span>
                <a href={EBOOK_PAYMENT_LINK} className="btn-primary text-base px-8 py-3">
                  Buy Now — Instant Download
                </a>
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">Secure payment via Stripe. 30-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Inside */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What's Inside</h2>
        <p className="mt-2 text-center text-[#6B7280]">14 chapters of comprehensive pet care for dogs and cats</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "Choosing the Right Pet", desc: "Breed matching, lifestyle considerations, adoption vs breeder" },
            { ch: "2", title: "Pet-Proofing Your Home", desc: "Room-by-room safety checklist for dogs and cats" },
            { ch: "3", title: "Nutrition Masterclass", desc: "Decoding pet food, homemade diets, and special dietary needs" },
            { ch: "4", title: "Training Foundations", desc: "Positive reinforcement techniques for dogs and litter training for cats" },
            { ch: "5", title: "Health & Wellness", desc: "Preventive care, vaccination schedules, and recognizing illness" },
            { ch: "6", title: "Emergency Response Guide", desc: "Step-by-step protocols for choking, poisoning, injuries, and heatstroke" },
            { ch: "7", title: "Behavior Troubleshooting", desc: "Anxiety, aggression, destructive behavior — causes and evidence-based solutions" },
            { ch: "8", title: "Multi-Pet Households", desc: "Introducing new pets, managing resources, and preventing conflict" },
            { ch: "9", title: "Traveling with Pets", desc: "Road trips, flights, hotels, and pet-friendly destinations" },
            { ch: "10", title: "Pet Sitter & Boarding Guide", desc: "Templates, instructions, and vetting checklists for caregivers" },
            { ch: "11", title: "Grooming & Hygiene", desc: "Coat care, dental health, nail trimming, and ear cleaning for dogs and cats" },
            { ch: "12", title: "Senior Pet Care", desc: "Aging considerations, comfort adjustments, and end-of-life planning" },
            { ch: "13", title: "Budgeting for Pet Care", desc: "Annual cost breakdowns, insurance comparisons, and emergency fund planning" },
            { ch: "14", title: "Pet First Aid Kit", desc: "Complete inventory, where to buy, and how to use each item" },
          ].map((chapter) => (
            <div key={chapter.ch} className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F4A261]/10 text-sm font-bold text-[#F4A261]">
                {chapter.ch}
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">{chapter.title}</h3>
                <p className="mt-0.5 text-xs text-[#6B7280]">{chapter.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#FFF8F0] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Why This Guide?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🐶🐱", title: "Both Dogs & Cats", desc: "One guide that covers every pet in your household" },
              { icon: "🚑", title: "Emergency Ready", desc: "Detailed protocols for the most common pet emergencies" },
              { icon: "📋", title: "Ready-to-Use Templates", desc: "Pet sitter forms, budget planners, and health trackers included" },
            ].map((b) => (
              <div key={b.title}>
                <span className="text-3xl">{b.icon}</span>
                <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">{b.title}</h3>
                <p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Pet Parents Say</h2>
        <div className="mt-6 space-y-4">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-[#E9EDDE] bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-semibold text-[#2D2D2D]">{t.name}</span>
                <span className="text-[#F4A261] text-sm">{"★".repeat(t.rating)}</span>
              </div>
              <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA + Bundle Cross-sell */}
      <div className="border-t border-[#E9EDDE] bg-gradient-to-b from-[#FFF8F0] to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Be the Pet Parent You Want to Be</h2>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">$24.99</span>
            <p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p>
            <a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">
              Buy Now — Instant Download
            </a>
          </div>

          {/* Bundle Cross-sell */}
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get All 3 eBooks & Save $15</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              The Complete Pet Library includes this guide, The Complete Puppy Handbook, and The Ultimate Cat Care Guide — all for just $49.99.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-lg text-[#6B7280] line-through">$64.97</span>
              <span className="font-heading text-2xl font-bold text-[#FF7F5C]">$49.99</span>
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

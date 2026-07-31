import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/aFafZh9DUgh21stfGU2cg0I";

const testimonials = [
  { name: "Jessica M.", text: "I thought I knew cats until I read this guide. The behavior decoder alone transformed my relationship with my rescue tabby. She went from hiding under the bed to sleeping on my pillow in two weeks.", rating: 5 },
  { name: "David T.", text: "As a first-time cat owner, I was lost. This guide walked me through everything — litter box setup, feeding schedules, even how to read tail flicks. My cat and I are both happier.", rating: 5 },
  { name: "Priya N.", text: "The health section caught an early UTI in my senior cat that I would have missed. The guide literally paid for itself in avoided vet bills. I reference it constantly.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/cat-care-guide")({
  component: CatCareGuidePage,
  head: () => ({
    meta: [
      { title: "The Ultimate Cat Care Guide — Paw & Found eBooks" },
      { name: "description", content: "Master cat care with confidence. Decode feline behavior, plan nutrition, prevent health issues, and create the perfect home for your cat." },
      { property: "og:title", content: "The Ultimate Cat Care Guide — Paw & Found" },
      { property: "og:description", content: "Everything you need to give your cat their best life — behavior, health, nutrition, and enrichment." },
      { property: "og:url", content: `${SITE_URL}/ebooks/cat-care-guide` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-cat-care.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/cat-care-guide` }],
  }),
});

function CatCareGuidePage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/ebook-cat-care.jpg"
                alt="The Ultimate Cat Care Guide cover"
                className="w-56 rounded-xl shadow-2xl shadow-[#2A9D8F]/20 md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="badge-sale text-sm">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                The Ultimate Cat Care Guide
              </h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                The definitive resource for cat owners — from decoding mysterious behaviors to preventing health issues before they start.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$19.99</span>
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
        <p className="mt-2 text-center text-[#6B7280]">10 chapters covering every aspect of feline care</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "Understanding Your Cat", desc: "Feline psychology, instincts, and how cats perceive the world" },
            { ch: "2", title: "The Behavior Decoder", desc: "Body language, vocalizations, and what every signal means" },
            { ch: "3", title: "Bringing a New Cat Home", desc: "Setup, introductions to other pets, and the 3-3-3 rule" },
            { ch: "4", title: "Litter Box Mastery", desc: "Choosing, placing, and maintaining the perfect litter setup" },
            { ch: "5", title: "Feline Nutrition", desc: "Wet vs dry, feeding schedules, and decoding ingredient labels" },
            { ch: "6", title: "Health & Preventive Care", desc: "Vaccination schedules, common illnesses, and early warning signs" },
            { ch: "7", title: "Grooming & Hygiene", desc: "Brushing, nail trimming, dental care — made stress-free" },
            { ch: "8", title: "Environmental Enrichment", desc: "Creating a stimulating home with scratching posts, perches, and play" },
            { ch: "9", title: "Common Behavior Issues", desc: "Scratching, aggression, hiding — causes and solutions" },
            { ch: "10", title: "Senior Cat Care", desc: "Adjusting care for aging cats — comfort, diet, and monitoring" },
          ].map((chapter) => (
            <div key={chapter.ch} className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2A9D8F]/10 text-sm font-bold text-[#2A9D8F]">
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
              { icon: "🐱", title: "Cat-Specific Expertise", desc: "Written entirely for cats — not a generic pet book" },
              { icon: "🔍", title: "Behavior Deep Dive", desc: "Understand why your cat does what they do and how to respond" },
              { icon: "🏥", title: "Preventive Focus", desc: "Spot health issues early with our symptom recognition guide" },
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
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Cat Owners Say</h2>
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Give Your Cat Their Best Life</h2>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">$19.99</span>
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
              The Complete Pet Library includes this guide, The Complete Puppy Handbook, and the Pet Parent's Survival Guide — all for just $49.99.
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

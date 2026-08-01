import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";
const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/aFa14n9DUd4Q1stgKY2cg0W";

const testimonials = [
  { name: "Nina K.", text: "My cat was overweight and our vet was worried. This guide taught me portion control and how to read labels. Six months later she's at her ideal weight and has so much more energy.", rating: 5 },
  { name: "David L.", text: "My dog is allergic to practically everything. The special diet section helped me work with my vet to find a food that doesn't make him itchy. Finally, a guide that takes allergies seriously.", rating: 5 },
  { name: "Rachel S.", text: "I was feeding my puppy all the wrong things without knowing it. The safe vs. unsafe foods master list was eye-opening. Now I feel confident about every meal I serve.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/pet-nutrition-guide")({
  component: PetNutritionPage,
  head: () => ({
    meta: [
      { title: "The Pet Nutrition & Feeding Guide — Paw & Found eBooks" },
      { name: "description", content: "Everything you need to know about feeding your dog or cat right. Safe foods, portion control, special diets, picky eaters, and balanced nutrition — all in one guide." },
      { property: "og:title", content: "The Pet Nutrition & Feeding Guide — Paw & Found" },
      { property: "og:description", content: "Master pet nutrition: safe foods, balanced diets, portion control, picky eaters, and special diet management." },
      { property: "og:url", content: `${SITE_URL}/ebooks/pet-nutrition-guide` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-pet-nutrition.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/pet-nutrition-guide` }],
  }),
});

function PetNutritionPage() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0"><img src="/images/ebook-pet-nutrition.jpg" alt="Pet Nutrition & Feeding Guide cover" className="w-56 rounded-xl shadow-2xl shadow-[#2A9D8F]/20 md:w-64" /></div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#2A9D8F]/15 px-3 py-1 text-sm font-semibold text-[#2A9D8F]">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">The Pet Nutrition & Feeding Guide</h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">What you feed your pet shapes their health, energy, and lifespan. Get the science-backed, practical guidance you need to make every meal count.</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$14.99</span>
                <a href={EBOOK_PAYMENT_LINK} className="btn-primary text-base px-8 py-3">Buy Now — Instant Download</a>
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">Secure payment via Stripe. 30-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What's Inside</h2>
        <p className="mt-2 text-center text-[#6B7280]">8 chapters covering everything from daily feeding to special diet management</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "Safe vs. Unsafe Human Foods", desc: "A comprehensive master list of what's safe and what's toxic — includes fruits, vegetables, meats, dairy, and common pantry items" },
            { ch: "2", title: "Building a Balanced Diet", desc: "Understanding protein, fats, carbs, vitamins, and minerals — what your dog or cat actually needs at each life stage" },
            { ch: "3", title: "Feeding Schedules by Age & Size", desc: "Optimal meal frequency and timing for puppies, adults, seniors, small breeds, and large breeds" },
            { ch: "4", title: "Portion Control & Weight Management", desc: "How to calculate the right portion, read feeding guides critically, and help your pet reach their ideal weight" },
            { ch: "5", title: "Managing Picky Eaters", desc: "Why your pet is picky and proven strategies to expand their palate without creating bad habits" },
            { ch: "6", title: "Common Feeding Mistakes", desc: "Free-feeding, over-treating, wrong bowl height, rapid eating — and how to fix each one" },
            { ch: "7", title: "Special Diet Considerations", desc: "Managing food allergies, sensitive stomachs, kidney disease, diabetes, and other medical dietary needs" },
            { ch: "8", title: "Homemade & Raw Diet Safety", desc: "If you're considering homemade or raw, here's what you must know about nutritional balance and food safety" },
          ].map((chapter) => (
            <div key={chapter.ch} className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2A9D8F]/15 text-sm font-bold text-[#2A9D8F]">{chapter.ch}</span>
              <div><h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">{chapter.title}</h3><p className="mt-0.5 text-xs text-[#6B7280]">{chapter.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FFF8F0] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Why This Guide?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🥩", title: "Science-Backed", desc: "Every recommendation based on veterinary nutrition research — not fads or marketing claims" },
              { icon: "🩺", title: "Vet-Reviewed", desc: "Reviewed by licensed veterinarians for accuracy and safety across all sections" },
              { icon: "📱", title: "Always Accessible", desc: "PDF on all devices — check the safe foods list while grocery shopping or cooking at home" },
            ].map((b) => (<div key={b.title}><span className="text-3xl">{b.icon}</span><h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">{b.title}</h3><p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p></div>))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Pet Parents Say</h2>
        <div className="mt-6 space-y-4">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-[#E9EDDE] bg-white p-5">
              <div className="flex items-center gap-2"><span className="font-heading text-sm font-semibold text-[#2D2D2D]">{t.name}</span><span className="text-[#F4A261] text-sm">{"★".repeat(t.rating)}</span></div>
              <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E9EDDE] bg-gradient-to-b from-[#FFF8F0] to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Give Your Pet the Nutrition They Deserve</h2>
          <div className="mt-6"><span className="font-heading text-4xl font-bold text-[#FF7F5C]">$14.99</span><p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p><a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">Buy Now — Instant Download</a></div>
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get the Complete Pet Library</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Includes this guide plus all our premium eBooks — nutrition, training, health, breed guides, and more.</p>
            <div className="mt-3 flex items-center justify-center gap-2"><span className="text-lg text-[#6B7280] line-through">Over $120</span><span className="font-heading text-2xl font-bold text-[#FF7F5C]">$49.99</span></div>
            <a href={BUNDLE_PAYMENT_LINK} className="btn-secondary mt-3 inline-block">Get the Bundle Instead</a>
          </div>
        </div>
      </div>
    </div>
  );
}

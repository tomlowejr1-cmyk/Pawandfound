import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/fZu3cvaHY2qcb33cuI2cg18";

const chapters = [
  { ch: "1", title: "Why Cats Fight: Understanding Feline Conflict", desc: "Territorial instincts, redirected aggression, and the real reasons behind hissing standoffs" },
  { ch: "2", title: "The Perfect Cat Introduction (Step-by-Step)", desc: "A safe, proven plan for introducing new cats — from scent swapping to supervised meetings" },
  { ch: "3", title: "Territory & Space: Who Gets What", desc: "Designing vertical space, hiding spots, and perches so every cat has a place to call their own" },
  { ch: "4", title: "Resource Sharing: Food, Litter Boxes & Perches", desc: "The one-litter-box-per-cat-plus-one rule, feeding stations, and preventing resource guarding" },
  { ch: "5", title: "Reading the Room: Stress Signals & Body Language", desc: "Ears, tails, and subtle cues — spot tension before it escalates into a fight" },
  { ch: "6", title: "Breaking Up Fights Safely", desc: "Never use your hands — safe, calm interventions that protect you and both cats" },
  { ch: "7", title: "Reintroducing Cats After a Fight", desc: "Rebuilding trust with a reset plan, and how long to expect the healing process to take" },
  { ch: "8", title: "When to Call a Behaviorist", desc: "Red flags that mean professional help, and what a cat behaviorist can do for you" },
];

const testimonials = [
  { name: "Rachel M.", text: "We adopted a second cat and the first week was chaos — hissing, swatting, hiding. This guide's step-by-step introduction plan turned our home around in three weeks. They're best friends now!", rating: 5 },
  { name: "Devon & Priya", text: "Two cats who couldn't be in the same room for months. The territory and resource-sharing chapters were eye-opening — rearranging litter boxes and adding perches made all the difference.", rating: 5 },
  { name: "Tom H.", text: "Clear, practical, and reassuring. I finally understand why my cats were fighting and what to do about it. Worth every penny for the stress it saved our household.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/cat-vs-cat")({
  component: CatVsCatPage,
  head: () => ({
    meta: [
      { title: "Cat vs. Cat: Multi-Cat Harmony Guide — Paw & Found eBooks" },
      { name: "description", content: "Stop the hissing and restore peace. An 8-chapter guide to multi-cat harmony: introductions, territory, resource sharing, stress signals, and safe fight interventions." },
      { property: "og:title", content: "Cat vs. Cat: Multi-Cat Harmony Guide — Paw & Found" },
      { property: "og:description", content: "The practical 8-chapter guide to helping cats in the same home live together peacefully." },
      { property: "og:url", content: `${SITE_URL}/ebooks/cat-vs-cat` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-cat-vs-cat.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/cat-vs-cat` }],
  }),
});

function CatVsCatPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#F0FAF8] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/ebook-cat-vs-cat.jpg"
                alt="Cat vs. Cat: Multi-Cat Harmony Guide cover"
                className="w-56 rounded-xl shadow-2xl shadow-[#2A9D8F]/20 md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="badge-sale text-sm">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                Cat vs. Cat: Multi-Cat Harmony Guide
              </h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Stop the hissing and restore the peace. An 8-chapter practical guide to helping the cats in your home live together — calmly, safely, and happily.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$12.99</span>
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
        <p className="mt-2 text-center text-[#6B7280]">8 chapters covering everything from introductions to interventions</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {chapters.map((chapter) => (
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
              { icon: "🏠", title: "Peaceful Home", desc: "A calm, stress-free environment for every cat in your household" },
              { icon: "🧠", title: "Behaviorist-Backed", desc: "Strategies grounded in feline behavior science" },
              { icon: "📱", title: "Always With You", desc: "PDF format works on phone, tablet, and desktop — reference anytime" },
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
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Multi-Cat Owners Say</h2>
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Ready for a Peaceful Multi-Cat Home?</h2>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">$12.99</span>
            <p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p>
            <a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">
              Buy Now — Instant Download
            </a>
          </div>

          {/* Bundle Cross-sell */}
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get the Complete Pet Library & Save $30</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              This guide plus The Complete Puppy Handbook, The Ultimate Cat Care Guide, Pet Parent's Survival Guide, and The Senior Pet Care Guide — all for just $49.99.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-lg text-[#6B7280] line-through">$79.96</span>
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

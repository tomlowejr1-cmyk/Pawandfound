import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/bJe8wPg2i0i41stgKY2cg0V";

const testimonials = [
  {
    name: "Jamie R.",
    text: "We introduced a rescue dog to our two-cat household and it was chaos for the first month. This guide walked us through every step — the slow introduction, managing territories, reading stress signals. Now they all sleep on the same couch.",
    rating: 5,
  },
  {
    name: "Carlos M.",
    text: "Three dogs and constant resource guarding. The step-by-step protocols in this book literally changed our household. No more fights over food bowls or toys. It feels like a completely different home now.",
    rating: 5,
  },
  {
    name: "Tanya W.",
    text: "I was about to rehome one of my cats because the fighting was so bad. This guide gave me practical interventions I hadn't tried — and they worked. Six months later, they're grooming each other. Worth every penny.",
    rating: 5,
  },
];

export const Route = createFileRoute("/ebooks/multi-pet-harmony")({
  component: MultiPetHarmonyPage,
  head: () => ({
    meta: [
      { title: "The Multi-Pet Household Harmony Guide — Paw & Found eBooks" },
      {
        name: "description",
        content:
          "Create a peaceful multi-pet home. Step-by-step guides for introducing new pets, resolving conflicts, managing resources, and building harmony between cats, dogs, and more.",
      },
      { property: "og:title", content: "The Multi-Pet Household Harmony Guide — Paw & Found" },
      {
        property: "og:description",
        content: "Peaceful coexistence for cats, dogs, and other pets. Conflict resolution, introductions, and resource management.",
      },
      { property: "og:url", content: `${SITE_URL}/ebooks/multi-pet-harmony` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-multi-pet-harmony.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/multi-pet-harmony` }],
  }),
});

function MultiPetHarmonyPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/ebook-multi-pet-harmony.jpg"
                alt="The Multi-Pet Household Harmony Guide cover"
                className="w-56 rounded-xl shadow-2xl shadow-[#2A9D8F]/20 md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#2A9D8F]/15 px-3 py-1 text-sm font-semibold text-[#2A9D8F]">
                Premium eBook
              </span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                The Multi-Pet Household Harmony Guide
              </h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Your complete playbook for a peaceful, happy home with multiple pets. End the fights, manage the chaos, and build a household where every pet thrives.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$14.99</span>
                <a href={EBOOK_PAYMENT_LINK} className="btn-primary text-base px-8 py-3">
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
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What's Inside</h2>
        <p className="mt-2 text-center text-[#6B7280]">
          8 chapters of expert guidance for multi-pet households of all kinds
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "Introducing a New Pet", desc: "Step-by-step protocols for safe, stress-free introductions — whether it's dog-to-dog, cat-to-cat, or cross-species" },
            { ch: "2", title: "Cat-to-Cat Conflict Resolution", desc: "Understanding feline social dynamics and proven techniques to reduce tension and aggression" },
            { ch: "3", title: "Dog-to-Dog Tension", desc: "Managing pack dynamics, preventing fights, and building positive relationships between dogs" },
            { ch: "4", title: "Cats & Dogs Living Together", desc: "Making cross-species households work — understanding different communication styles and needs" },
            { ch: "5", title: "Resource Guarding Solutions", desc: "Food, toys, beds, and attention — preventing and resolving guarding behavior with positive methods" },
            { ch: "6", title: "Territory & Space Management", desc: "Creating a home layout that gives every pet their own safe zone while sharing common areas" },
            { ch: "7", title: "Recognizing Stress Signals", desc: "Learn to spot the subtle signs of stress in dogs, cats, and small animals before problems escalate" },
            { ch: "8", title: "When to Call a Behaviorist", desc: "Knowing when DIY isn't enough — red flags that require professional intervention and how to find the right expert" },
          ].map((chapter) => (
            <div key={chapter.ch} className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2A9D8F]/15 text-sm font-bold text-[#2A9D8F]">
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
              { icon: "🏠", title: "Real-Home Strategies", desc: "Not theory — practical solutions tested in real multi-pet households just like yours" },
              { icon: "🩺", title: "Behaviorist-Reviewed", desc: "Every protocol reviewed by certified animal behaviorists for safety and effectiveness" },
              { icon: "📱", title: "Always Accessible", desc: "PDF format works on phone, tablet, and desktop — reference during introductions or tense moments" },
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Ready to Bring Peace to Your Multi-Pet Home?</h2>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">$14.99</span>
            <p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p>
            <a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">
              Buy Now — Instant Download
            </a>
          </div>
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get the Complete Pet Library</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Includes this guide plus all our premium eBooks — The Complete Puppy Handbook, The Ultimate Cat Care Guide, Pet Parent's Survival Guide, and more — for every pet and every stage of life.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-lg text-[#6B7280] line-through">Over $120</span>
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

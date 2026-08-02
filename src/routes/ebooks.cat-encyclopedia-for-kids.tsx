import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/eVqfZh5nE6Gs1stgKY2cg17";
const DOG_ENYCLOPEDIA_LINK = "https://buy.stripe.com/14A9AT5nE0i4fjjgKY2cg16";

const chapters = [
  { icon: "🐱", title: "25+ Breeds from A to Z", desc: "Meet amazing cats from the fluffy Maine Coon to the elegant Siamese — with fun facts about every one!" },
  { icon: "🤯", title: "Fun Facts About Cats", desc: "Did you know cats can jump six times their body length? 50+ paw-some facts to amaze your friends." },
  { icon: "🧩", title: "Which Breed Is Right for Your Family?", desc: "A super-fun quiz that matches your family's home and energy with the purr-fect feline friend." },
  { icon: "🏠", title: "How to Care for Your Cat", desc: "Feeding, grooming, litter box basics, and vet visits made simple — everything a young cat owner needs to know." },
  { icon: "👑", title: "Famous Cats in History", desc: "From ship's cats and internet stars to a cat who was mayor of a town — meet legendary felines of the past and present." },
  { icon: "🏆", title: "Amazing Cat Records & Superlatives", desc: "The heaviest, fastest, loudest-purring, and longest-living cats ever — plus record-breaking felines in history." },
];

const funFacts = [
  "🐾 A cat's nose print is as unique as a human fingerprint!",
  "🐾 Cats can make more than 100 different sounds — dogs can only make about 10!",
  "🐾 A group of cats is called a clowder. How cool is that?",
  "🐾 Cats spend about 70% of their lives sleeping — that's a lot of catnaps!",
];

const testimonials = [
  { name: "Mia & Grandma Rosa", text: "My granddaughter is obsessed with our new kitten and this book made her a little cat expert. She loves the famous cats chapter — the mayor cat is her favorite!", rating: 5 },
  { name: "Daniel P.", text: "Colorful, funny, and genuinely educational. My kids fought over who got to read it first. The breed quiz helped us pick our rescue cat.", rating: 5 },
  { name: "Aunt Jenny", text: "Got this for my nephew's birthday and he hasn't put it down. Beautiful pictures, silly facts, and real substance. Perfect gift for a young cat lover.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/cat-encyclopedia-for-kids")({
  component: CatEncyclopediaKidsPage,
  head: () => ({
    meta: [
      { title: "The Cat Encyclopedia for Kids — Paw & Found eBooks" },
      { name: "description", content: "25+ cat breeds from A to Z, fun facts, a family-friendly breed quiz, famous cats in history, and amazing records — the playful cat encyclopedia young cat lovers will adore." },
      { property: "og:title", content: "The Cat Encyclopedia for Kids — Paw & Found" },
      { property: "og:description", content: "A fun, colorful cat encyclopedia for kids: breeds, facts, quizzes, famous cats, and record-breakers." },
      { property: "og:url", content: `${SITE_URL}/ebooks/cat-encyclopedia-for-kids` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-cat-encyclopedia-kids.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/cat-encyclopedia-for-kids` }],
  }),
});

function CatEncyclopediaKidsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2A9D8F] via-[#3FB3A4] to-[#F4A261]">
        {/* Decorative stars & paws */}
        <span className="absolute left-6 top-8 text-3xl opacity-40 select-none" aria-hidden="true">⭐</span>
        <span className="absolute right-10 top-16 text-2xl opacity-40 select-none" aria-hidden="true">🐾</span>
        <span className="absolute left-1/4 bottom-6 text-2xl opacity-30 select-none" aria-hidden="true">🐟</span>
        <span className="absolute right-1/4 top-4 text-xl opacity-40 select-none" aria-hidden="true">✨</span>
        <span className="absolute left-10 bottom-10 text-2xl opacity-30 select-none" aria-hidden="true">🧶</span>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0 relative">
              <span className="absolute -left-3 -top-3 text-4xl select-none" aria-hidden="true">🌟</span>
              <span className="absolute -right-3 -bottom-3 text-3xl select-none" aria-hidden="true">🐾</span>
              <img
                src="/images/ebook-cat-encyclopedia-kids.jpg"
                alt="The Cat Encyclopedia for Kids cover"
                className="w-56 rounded-2xl shadow-2xl shadow-[#2D2D2D]/30 rotate-[2deg] md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#2A9D8F] shadow-sm">
                🧒 FOR KIDS AGES 6-12
              </span>
              <h1 className="font-heading mt-4 text-3xl font-extrabold text-white sm:text-4xl drop-shadow-sm">
                The Cat Encyclopedia for Kids
              </h1>
              <p className="mt-4 text-lg text-white/90 leading-relaxed max-w-xl">
                A purr-fect journey through 25+ cat breeds, jaw-dropping fun facts, a family breed quiz, famous felines in history, and record-breaking cats — written just for young cat lovers!
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-white drop-shadow-sm">$12.99</span>
                <a href={EBOOK_PAYMENT_LINK} className="btn-primary text-base px-8 py-3 !bg-[#FF7F5C] hover:!bg-[#E96A48] !text-white">
                  Buy Now — Instant Download
                </a>
              </div>
              <p className="mt-2 text-xs text-white/70">Secure payment via Stripe. 30-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun facts strip */}
      <div className="bg-[#FF7F5C] py-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-white">
            🐾 FUN FACT: A group of cats is called a clowder! 🐾
          </p>
        </div>
      </div>

      {/* What's Inside */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-3xl font-extrabold text-[#2D2D2D]">What's Inside 🎒</h2>
        <p className="mt-2 text-center text-[#6B7280]">6 big chapters of cat-tastic knowledge</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.title}
              className={`flex gap-3 rounded-2xl border-2 p-4 transition-all hover:-translate-y-0.5 ${
                i % 3 === 0
                  ? "border-[#2A9D8F]/30 bg-[#F0FAF8]"
                  : i % 3 === 1
                    ? "border-[#FF7F5C]/30 bg-[#FFF8F0]"
                    : "border-[#F4A261]/40 bg-[#FFFBF3]"
              }`}
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                {chapter.icon}
              </span>
              <div>
                <h3 className="font-heading text-sm font-bold text-[#2D2D2D]">{chapter.title}</h3>
                <p className="mt-0.5 text-xs text-[#6B7280] leading-relaxed">{chapter.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun facts section */}
      <div className="bg-[#FFF8F0] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-center text-2xl font-extrabold text-[#2D2D2D]">Did You Know? 🤯</h2>
          <div className="mt-6 space-y-3">
            {funFacts.map((fact) => (
              <div key={fact} className="flex items-start gap-3 rounded-xl border border-[#2A9D8F]/30 bg-white p-4 shadow-sm">
                <span className="text-xl" aria-hidden="true">💡</span>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why kids love it */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl font-extrabold text-[#2D2D2D]">Why Young Cat Lovers Adore It</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { icon: "🎨", title: "Bright & Colorful", desc: "Big pictures, playful colors, and doodles on every page" },
            { icon: "📖", title: "Easy to Read", desc: "Kid-friendly words with fun facts on every spread" },
            { icon: "🎯", title: "Packed with Extras", desc: "Quizzes, famous cats, records, and amazing true stories" },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-heading mt-2 font-bold text-[#2D2D2D]">{b.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#E9EDDE]/40 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-center text-2xl font-extrabold text-[#2D2D2D]">What Parents & Kids Say</h2>
          <div className="mt-6 space-y-4">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-bold text-[#2D2D2D]">{t.name}</span>
                  <span className="text-[#F4A261] text-sm">{"★".repeat(t.rating)}</span>
                </div>
                <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA + Cross-sell */}
      <div className="border-t border-[#E9EDDE] bg-gradient-to-b from-[#FFF8F0] to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-4xl" aria-hidden="true">🐱</span>
          <h2 className="font-heading mt-3 text-3xl font-extrabold text-[#2D2D2D]">Ready for a Cat-tastic Adventure?</h2>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">$12.99</span>
            <p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p>
            <a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4 !bg-[#FF7F5C] hover:!bg-[#E96A48] !text-white">
              Buy Now — Instant Download
            </a>
          </div>

          {/* Cross-sell */}
          <div className="mt-10 overflow-hidden rounded-2xl border-2 border-[#F4A261]/50 bg-white shadow-md">
            <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:text-left">
              <div className="relative flex-shrink-0">
                <span className="absolute -right-2 -top-2 text-2xl select-none" aria-hidden="true">🐾</span>
                <img
                  src="/images/ebook-dog-encyclopedia-kids.jpg"
                  alt="The Dog Encyclopedia for Kids"
                  className="w-24 rounded-xl shadow-lg -rotate-2"
                />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">
                  BEST FRIENDS PAIR
                </span>
                <h3 className="font-heading mt-2 text-lg font-bold text-[#2D2D2D]">
                  Also for dog fans: The Dog Encyclopedia for Kids
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">
                  40+ dog breeds, fun facts, dog jobs, and amazing records — a woof-tastic gift for young dog lovers.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-heading text-xl font-bold text-[#FF7F5C]">$12.99</span>
                  <a href="/ebooks/dog-encyclopedia-for-kids" className="text-sm font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">
                    Learn more →
                  </a>
                  <a href={DOG_ENYCLOPEDIA_LINK} className="btn-primary text-sm px-4 py-2 !bg-[#2A9D8F] hover:!bg-[#23877B] !text-white">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

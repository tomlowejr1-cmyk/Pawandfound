import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/14A9AT5nE0i4fjjgKY2cg16";
const CAT_ENYCLOPEDIA_LINK = "https://buy.stripe.com/eVqfZh5nE6Gs1stgKY2cg17";

const chapters = [
  { icon: "🐕", title: "40+ Breeds from A to Z", desc: "Meet amazing dogs from the tiny Chihuahua to the giant Great Dane — with fun facts about every one!" },
  { icon: "🤯", title: "Fun Facts About Dogs", desc: "Did you know dogs can smell 100,000 times better than people? 50+ wow-worthy facts to share with friends." },
  { icon: "🧩", title: "Which Breed Is Right for Your Family?", desc: "A super-fun quiz that matches your family's home and energy with the perfect furry friend." },
  { icon: "🏠", title: "How to Care for Your Dog", desc: "Feeding, grooming, walking, and vet visits made simple — everything a young dog owner needs to know." },
  { icon: "🎓", title: "Dog Jobs & Careers", desc: "From police dogs to therapy dogs, movie stars to sled racers — discover the cool jobs dogs do every day." },
  { icon: "🏆", title: "Amazing Dog Records & Superlatives", desc: "The fastest, smallest, fluffiest, and most talented dogs ever — plus record-breaking pups in history." },
];

const funFacts = [
  "🐾 A dog's nose print is as unique as a human fingerprint!",
  "🐾 Puppies are born blind and deaf — they use their sense of smell to find their mom.",
  "🐾 The fastest dog, the Greyhound, can run faster than a car in a school zone!",
  "🐾 Dogs dream just like people — puppies dream more than adult dogs.",
];

const testimonials = [
  { name: "Sarah & Leo, age 9", text: "My son carries this book everywhere. He learned all 40+ breeds in a week and now quizzes the whole family at dinner. Best purchase for a dog-crazy kid!", rating: 5 },
  { name: "Marcus T.", text: "Bought this for my daughter before we adopted our first dog. The 'which breed fits your family' quiz was spot on — and she still re-reads the fun facts section nightly.", rating: 5 },
  { name: "Grandma Diane", text: "A birthday gift that actually got used. Colorful, funny, and packed with real info. My grandson now wants to be a veterinarian!", rating: 5 },
];

export const Route = createFileRoute("/ebooks/dog-encyclopedia-for-kids")({
  component: DogEncyclopediaKidsPage,
  head: () => ({
    meta: [
      { title: "The Dog Encyclopedia for Kids — Paw & Found eBooks" },
      { name: "description", content: "40+ dog breeds from A to Z, fun facts, a family-friendly breed quiz, dog jobs, and amazing records — the playful dog encyclopedia young dog lovers will adore." },
      { property: "og:title", content: "The Dog Encyclopedia for Kids — Paw & Found" },
      { property: "og:description", content: "A fun, colorful dog encyclopedia for kids: breeds, facts, quizzes, dog jobs, and record-breakers." },
      { property: "og:url", content: `${SITE_URL}/ebooks/dog-encyclopedia-for-kids` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-dog-encyclopedia-kids.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/dog-encyclopedia-for-kids` }],
  }),
});

function DogEncyclopediaKidsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FF7F5C] via-[#FF9F7E] to-[#F4A261]">
        {/* Decorative stars & paws */}
        <span className="absolute left-6 top-8 text-3xl opacity-40 select-none" aria-hidden="true">⭐</span>
        <span className="absolute right-10 top-16 text-2xl opacity-40 select-none" aria-hidden="true">🐾</span>
        <span className="absolute left-1/4 bottom-6 text-2xl opacity-30 select-none" aria-hidden="true">⭐</span>
        <span className="absolute right-1/4 top-4 text-xl opacity-40 select-none" aria-hidden="true">✨</span>
        <span className="absolute left-10 bottom-10 text-2xl opacity-30 select-none" aria-hidden="true">🐾</span>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0 relative">
              <span className="absolute -left-3 -top-3 text-4xl select-none" aria-hidden="true">🌟</span>
              <span className="absolute -right-3 -bottom-3 text-3xl select-none" aria-hidden="true">🐾</span>
              <img
                src="/images/ebook-dog-encyclopedia-kids.jpg"
                alt="The Dog Encyclopedia for Kids cover"
                className="w-56 rounded-2xl shadow-2xl shadow-[#2D2D2D]/30 rotate-[-2deg] md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#FF7F5C] shadow-sm">
                🧒 FOR KIDS AGES 6-12
              </span>
              <h1 className="font-heading mt-4 text-3xl font-extrabold text-white sm:text-4xl drop-shadow-sm">
                The Dog Encyclopedia for Kids
              </h1>
              <p className="mt-4 text-lg text-white/90 leading-relaxed max-w-xl">
                A woof-tastic journey through 40+ dog breeds, jaw-dropping fun facts, a family breed quiz, cool dog jobs, and record-breaking pups — written just for young dog lovers!
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-white drop-shadow-sm">$12.99</span>
                <a href={EBOOK_PAYMENT_LINK} className="btn-primary text-base px-8 py-3 !bg-[#2A9D8F] hover:!bg-[#23877B] !text-white">
                  Buy Now — Instant Download
                </a>
              </div>
              <p className="mt-2 text-xs text-white/70">Secure payment via Stripe. 30-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun facts strip */}
      <div className="bg-[#2A9D8F] py-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-white">
            🐾 FUN FACT: A dog's nose print is as unique as a human fingerprint! 🐾
          </p>
        </div>
      </div>

      {/* What's Inside */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-3xl font-extrabold text-[#2D2D2D]">What's Inside 🎒</h2>
        <p className="mt-2 text-center text-[#6B7280]">6 big chapters of dog-tastic knowledge</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.title}
              className={`flex gap-3 rounded-2xl border-2 p-4 transition-all hover:-translate-y-0.5 ${
                i % 3 === 0
                  ? "border-[#FF7F5C]/30 bg-[#FFF8F0]"
                  : i % 3 === 1
                    ? "border-[#2A9D8F]/30 bg-[#F0FAF8]"
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
              <div key={fact} className="flex items-start gap-3 rounded-xl border border-[#F4A261]/40 bg-white p-4 shadow-sm">
                <span className="text-xl" aria-hidden="true">💡</span>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why kids love it */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl font-extrabold text-[#2D2D2D]">Why Young Dog Lovers Adore It</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { icon: "🎨", title: "Bright & Colorful", desc: "Big pictures, playful colors, and doodles on every page" },
            { icon: "📖", title: "Easy to Read", desc: "Kid-friendly words with fun facts on every spread" },
            { icon: "🎯", title: "Packed with Extras", desc: "Quizzes, records, jobs, and amazing true stories" },
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
          <span className="text-4xl" aria-hidden="true">🐶</span>
          <h2 className="font-heading mt-3 text-3xl font-extrabold text-[#2D2D2D]">Ready for a Dog-tastic Adventure?</h2>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">$12.99</span>
            <p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p>
            <a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4 !bg-[#2A9D8F] hover:!bg-[#23877B] !text-white">
              Buy Now — Instant Download
            </a>
          </div>

          {/* Cross-sell */}
          <div className="mt-10 overflow-hidden rounded-2xl border-2 border-[#2A9D8F]/30 bg-white shadow-md">
            <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:text-left">
              <div className="relative flex-shrink-0">
                <span className="absolute -right-2 -top-2 text-2xl select-none" aria-hidden="true">🐾</span>
                <img
                  src="/images/ebook-cat-encyclopedia-kids.jpg"
                  alt="The Cat Encyclopedia for Kids"
                  className="w-24 rounded-xl shadow-lg rotate-2"
                />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center rounded-full bg-[#2A9D8F] px-3 py-1 text-xs font-bold text-white">
                  PURRFECT PAIR
                </span>
                <h3 className="font-heading mt-2 text-lg font-bold text-[#2D2D2D]">
                  Also for cat fans: The Cat Encyclopedia for Kids
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">
                  25+ cat breeds, fun facts, famous cats, and amazing records — a purr-fect gift for young cat lovers.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-heading text-xl font-bold text-[#FF7F5C]">$12.99</span>
                  <a href="/ebooks/cat-encyclopedia-for-kids" className="text-sm font-medium text-[#2A9D8F] hover:text-[#FF7F5C] transition-colors">
                    Learn more →
                  </a>
                  <a href={CAT_ENYCLOPEDIA_LINK} className="btn-primary text-sm px-4 py-2 !bg-[#FF7F5C] hover:!bg-[#E96A48] !text-white">
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

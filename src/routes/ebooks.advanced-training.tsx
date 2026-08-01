import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/dRmbJ12bsfcY5IJdyM2cg0X";

const testimonials = [
  {
    name: "Derek P.",
    text: "My border collie needed more than basic obedience — he was bored and acting out. The advanced trick training and scent work chapters gave us a whole new world to explore together. He's calmer, happier, and honestly, so am I.",
    rating: 5,
  },
  {
    name: "Megan T.",
    text: "I wanted to train my golden retriever as a therapy dog but had no idea where to start. The certification prep section laid out every requirement clearly. We passed our evaluation on the first try.",
    rating: 5,
  },
  {
    name: "Alex R.",
    text: "Off-leash reliability felt impossible until I followed the progressive training path in this book. My dog now has rock-solid recall even around squirrels. The troubleshooting section saved us when we hit a regression.",
    rating: 5,
  },
];

export const Route = createFileRoute("/ebooks/advanced-training")({
  component: AdvancedTrainingPage,
  head: () => ({
    meta: [
      { title: "Advanced Training Paths — Paw & Found eBooks" },
      {
        name: "description",
        content:
          "Take your dog's training to the next level. Covers off-leash reliability, trick training, scent work, therapy dog prep, service dog paths, and competition obedience.",
      },
      { property: "og:title", content: "Advanced Training Paths — Paw & Found" },
      { property: "og:description", content: "The next level of dog training: service dogs, therapy certification, scent work, off-leash mastery, and more." },
      { property: "og:url", content: `${SITE_URL}/ebooks/advanced-training` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-advanced-training.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/advanced-training` }],
  }),
});

function AdvancedTrainingPage() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img src="/images/ebook-advanced-training.jpg" alt="Advanced Training Paths cover" className="w-56 rounded-xl shadow-2xl shadow-[#FF7F5C]/20 md:w-64" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">Advanced Training Paths</h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Your dog mastered the basics. Now unlock their full potential with specialized training paths — from therapy work to off-leash mastery to competition readiness.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$16.99</span>
                <a href={EBOOK_PAYMENT_LINK} className="btn-primary text-base px-8 py-3">Buy Now — Instant Download</a>
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">Secure payment via Stripe. 30-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What's Inside</h2>
        <p className="mt-2 text-center text-[#6B7280]">8 advanced training paths for dogs ready to go beyond the basics</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "Perfecting Loose Leash Walking", desc: "Master heeling under distraction, pace changes, and automatic sits — the foundation of advanced work" },
            { ch: "2", title: "Off-Leash Reliability Training", desc: "Progressive recall training that works at distance, around wildlife, and in any environment" },
            { ch: "3", title: "Service Dog Training Path", desc: "Task training, public access preparation, and legal requirements for service dog handlers" },
            { ch: "4", title: "Therapy Dog Certification Prep", desc: "Complete roadmap to passing the AKC Canine Good Citizen test and therapy dog evaluation" },
            { ch: "5", title: "Advanced Trick Training", desc: "Complex tricks that build focus and confidence — from rolling over to fetching specific objects by name" },
            { ch: "6", title: "Scent Work & Nose Games", desc: "Tap into your dog's most powerful sense with structured scent detection exercises and games" },
            { ch: "7", title: "Competition Obedience Basics", desc: "Introduction to rally, obedience trials, and agility — what to expect and how to prepare" },
            { ch: "8", title: "Troubleshooting Regression", desc: "Why trained behaviors break down and how to rebuild them stronger — plateaus, setbacks, and fresh starts" },
          ].map((chapter) => (
            <div key={chapter.ch} className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF7F5C]/15 text-sm font-bold text-[#FF7F5C]">{chapter.ch}</span>
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
              { icon: "🎯", title: "Specialized Paths", desc: "Choose your goal — service, therapy, competition, or advanced companion — and follow a dedicated roadmap" },
              { icon: "🩺", title: "Trainer-Reviewed", desc: "Every training protocol reviewed by professional dog trainers for safety and proven results" },
              { icon: "📱", title: "Always Accessible", desc: "PDF format on all devices — reference training steps during sessions at the park or training facility" },
            ].map((b) => (
              <div key={b.title}><span className="text-3xl">{b.icon}</span><h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">{b.title}</h3><p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Dog Owners Say</h2>
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Ready to Unlock Your Dog's Full Potential?</h2>
          <div className="mt-6"><span className="font-heading text-4xl font-bold text-[#FF7F5C]">$16.99</span><p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p><a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">Buy Now — Instant Download</a></div>
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get the Complete Pet Library</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Includes this guide plus all our premium eBooks — for every pet and every training stage.</p>
            <div className="mt-3 flex items-center justify-center gap-2"><span className="text-lg text-[#6B7280] line-through">Over $120</span><span className="font-heading text-2xl font-bold text-[#FF7F5C]">$49.99</span></div>
            <a href={BUNDLE_PAYMENT_LINK} className="btn-secondary mt-3 inline-block">Get the Bundle Instead</a>
          </div>
        </div>
      </div>
    </div>
  );
}

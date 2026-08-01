import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";
const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/14A14neYefcY3AB9iw2cg10";

const testimonials = [
  { name: "Katie B.", text: "Our puppy was a nightmare the first few weeks — accidents everywhere, biting constantly. The 90-day roadmap gave us structure when we were completely overwhelmed. By month three we had a totally different dog.", rating: 5 },
  { name: "Ryan M.", text: "The house training section is the best I've read — and I've read a lot. The schedules are realistic, not aspirational. No accidents in two months. The crate training chapter was equally brilliant.", rating: 5 },
  { name: "Amanda G.", text: "I wish I'd had this book BEFORE we brought our puppy home. The mistake prevention chapter caught several things I would've done wrong. If you're getting a puppy, buy this first — trust me.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/puppy-training-fundamentals")({
  component: PuppyTrainingPage,
  head: () => ({
    meta: [
      { title: "Puppy Training Fundamentals — Paw & Found eBooks" },
      { name: "description", content: "Your complete guide to raising a well-behaved puppy. Day-by-day roadmap, house training, crate training, basic commands, socialization, and bite inhibition — everything a new puppy owner needs." },
      { property: "og:title", content: "Puppy Training Fundamentals — Paw & Found" },
      { property: "og:description", content: "The ultimate puppy training guide: 90-day roadmap, house training, crate training, basic commands, socialization, and common mistakes." },
      { property: "og:url", content: `${SITE_URL}/ebooks/puppy-training-fundamentals` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-puppy-training.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/puppy-training-fundamentals` }],
  }),
});

function PuppyTrainingPage() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0"><img src="/images/ebook-puppy-training.jpg" alt="Puppy Training Fundamentals cover" className="w-56 rounded-xl shadow-2xl shadow-[#FF7F5C]/20 md:w-64" /></div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">Puppy Training Fundamentals</h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">Everything you need to raise a happy, well-behaved puppy — from the day they come home through their first three months and beyond.</p>
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
        <p className="mt-2 text-center text-[#6B7280]">8 chapters covering everything a new puppy owner needs to know</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "The First 90 Days: A Day-by-Day Roadmap", desc: "What to do from day one through month three — schedules, milestones, and exactly what to focus on each week" },
            { ch: "2", title: "House Training That Actually Sticks", desc: "Proven potty training methods with realistic schedules, accident management, and troubleshooting regression" },
            { ch: "3", title: "Crate Training Made Simple", desc: "Step-by-step crate training that builds a positive association — your puppy's safe space, not a punishment" },
            { ch: "4", title: "Basic Commands: Sit, Stay, Come, Down", desc: "Clear training protocols for the four essential commands every puppy needs — taught with positive reinforcement" },
            { ch: "5", title: "Socialization Checklist", desc: "A comprehensive exposure list covering people, places, sounds, surfaces, and other animals — organized by age" },
            { ch: "6", title: "Biting & Mouthing Inhibition", desc: "Why puppies bite, how to redirect it, and the techniques that teach gentle mouth control without punishment" },
            { ch: "7", title: "Preventing Separation Anxiety", desc: "Building independence from day one — gradual alone-time training that prevents distress before it starts" },
            { ch: "8", title: "Common Puppy Owner Mistakes", desc: "The top mistakes new owners make — and how to avoid them — from over-exercising to inconsistent rules" },
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
              { icon: "📅", title: "Day-by-Day Structure", desc: "No guessing what to do next — follow the 90-day roadmap and always know the next step" },
              { icon: "🩺", title: "Trainer-Reviewed", desc: "Every technique reviewed by professional dog trainers using positive reinforcement methods" },
              { icon: "📱", title: "Always With You", desc: "PDF on all devices — reference training steps during sessions, at the park, or wherever you and your puppy go" },
            ].map((b) => (<div key={b.title}><span className="text-3xl">{b.icon}</span><h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">{b.title}</h3><p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p></div>))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Puppy Parents Say</h2>
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Ready to Raise an Amazing Puppy?</h2>
          <div className="mt-6"><span className="font-heading text-4xl font-bold text-[#FF7F5C]">$14.99</span><p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p><a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">Buy Now — Instant Download</a></div>
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get the Complete Pet Library</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Includes this guide plus all our premium eBooks — puppy training, advanced training, breed handbooks, nutrition, and more.</p>
            <div className="mt-3 flex items-center justify-center gap-2"><span className="text-lg text-[#6B7280] line-through">Over $120</span><span className="font-heading text-2xl font-bold text-[#FF7F5C]">$49.99</span></div>
            <a href={BUNDLE_PAYMENT_LINK} className="btn-secondary mt-3 inline-block">Get the Bundle Instead</a>
          </div>
        </div>
      </div>
    </div>
  );
}

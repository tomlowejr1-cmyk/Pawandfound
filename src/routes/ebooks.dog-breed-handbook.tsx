import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";
const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/cNi7sLbM20i48UVfGU2cg0Z";

const testimonials = [
  { name: "Tom H.", text: "We used this handbook to research breeds before getting our first dog. The 'Is This Breed Right for You?' sections were incredibly honest — helped us pick a breed that fits our apartment lifestyle perfectly.", rating: 5 },
  { name: "Priya S.", text: "I thought I knew dogs until I read this. The grooming and health breakdowns by breed are so thorough. Now I understand exactly what my cockapoo needs and why. A must-have reference.", rating: 5 },
  { name: "Marcus J.", text: "The exercise needs section saved us. We were considering a high-energy breed that would've been miserable in our situation. Switched to a breed that matches our activity level and it's been the best decision.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/dog-breed-handbook")({
  component: DogBreedHandbookPage,
  head: () => ({
    meta: [
      { title: "The Complete Dog Breed Handbook — Paw & Found eBooks" },
      { name: "description", content: "Your ultimate guide to 30+ dog breeds. Personality profiles, exercise needs, grooming requirements, health issues, and honest assessments of which breed fits your lifestyle." },
      { property: "og:title", content: "The Complete Dog Breed Handbook — Paw & Found" },
      { property: "og:description", content: "30+ dog breeds profiled: personality, exercise, grooming, health, and honest lifestyle-fit assessments." },
      { property: "og:url", content: `${SITE_URL}/ebooks/dog-breed-handbook` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-dog-breeds.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/dog-breed-handbook` }],
  }),
});

function DogBreedHandbookPage() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0"><img src="/images/ebook-dog-breeds.jpg" alt="The Complete Dog Breed Handbook cover" className="w-56 rounded-xl shadow-2xl shadow-[#FF7F5C]/20 md:w-64" /></div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/15 px-3 py-1 text-sm font-semibold text-[#FF7F5C]">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">The Complete Dog Breed Handbook</h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">From Affenpinscher to Yorkshire Terrier — your definitive guide to 30+ dog breeds. Find the perfect match for your home, lifestyle, and family.</p>
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
        <p className="mt-2 text-center text-[#6B7280]">Comprehensive profiles of 30+ dog breeds with honest, practical guidance</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "30+ Breeds Profiled", desc: "From Affenpinscher to Yorkshire Terrier — in-depth profiles covering history, traits, and unique breed characteristics" },
            { ch: "2", title: "Personality & Temperament Profiles", desc: "Honest assessments of energy level, trainability, sociability, and what daily life with each breed really looks like" },
            { ch: "3", title: "Exercise & Activity Needs", desc: "Detailed exercise requirements by breed — from couch-potato companions to marathon-running partners" },
            { ch: "4", title: "Grooming Requirements by Coat Type", desc: "What to expect: shedding levels, professional grooming needs, at-home maintenance, and coat-specific care" },
            { ch: "5", title: "Common Health Issues by Breed", desc: "Breed-specific health predispositions — know what to watch for and how to proactively manage risk" },
            { ch: "6", title: '"Is This Breed Right for You?" Quiz', desc: "Interactive decision tool matching your lifestyle, home, and preferences to the breeds that fit you best" },
            { ch: "7", title: "Puppy vs. Adult vs. Senior Considerations", desc: "How breed traits evolve across life stages — what changes and what stays the same from puppyhood to old age" },
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Why This Handbook?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🐕", title: "Honest Assessments", desc: "No rose-tinted breed descriptions — we tell you the challenges as well as the joys of every breed" },
              { icon: "🩺", title: "Vet-Reviewed", desc: "Health information reviewed by licensed veterinarians for accuracy across all breed profiles" },
              { icon: "📱", title: "Always Accessible", desc: "PDF on all devices — reference breed info while visiting breeders, shelters, or discussing with your family" },
            ].map((b) => (<div key={b.title}><span className="text-3xl">{b.icon}</span><h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">{b.title}</h3><p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p></div>))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Dog Lovers Say</h2>
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Find Your Perfect Canine Companion</h2>
          <div className="mt-6"><span className="font-heading text-4xl font-bold text-[#FF7F5C]">$14.99</span><p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p><a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">Buy Now — Instant Download</a></div>
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get the Complete Pet Library</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Includes this handbook plus all our premium eBooks — dog breeds, cat breeds, training, nutrition, and more.</p>
            <div className="mt-3 flex items-center justify-center gap-2"><span className="text-lg text-[#6B7280] line-through">Over $120</span><span className="font-heading text-2xl font-bold text-[#FF7F5C]">$49.99</span></div>
            <a href={BUNDLE_PAYMENT_LINK} className="btn-secondary mt-3 inline-block">Get the Bundle Instead</a>
          </div>
        </div>
      </div>
    </div>
  );
}

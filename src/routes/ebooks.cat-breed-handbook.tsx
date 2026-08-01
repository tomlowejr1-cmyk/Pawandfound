import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";
const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/dRmcN517o2qcc777ao2cg0Y";

const testimonials = [
  { name: "Elena V.", text: "I had no idea cat breeds varied so much in personality. The 'Which Breed Fits Your Lifestyle?' section helped me choose a Ragdoll — and she's the perfect match for our calm home.", rating: 5 },
  { name: "James F.", text: "The indoor vs. outdoor guidance was eye-opening. I always thought my Bengal needed outdoor access, but this book showed me how to create an enriching indoor environment. He's happier than ever.", rating: 5 },
  { name: "Sophie L.", text: "We were torn between a Siamese and a British Shorthair. The side-by-side comparisons in this handbook made the decision easy. Such a practical, thorough resource for cat lovers.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/cat-breed-handbook")({
  component: CatBreedHandbookPage,
  head: () => ({
    meta: [
      { title: "The Complete Cat Breed Handbook — Paw & Found eBooks" },
      { name: "description", content: "Your guide to 20+ cat breeds. Personality profiles, care requirements, health considerations, and honest lifestyle-fit assessments — from Abyssinian to Turkish Van." },
      { property: "og:title", content: "The Complete Cat Breed Handbook — Paw & Found" },
      { property: "og:description", content: "20+ cat breeds profiled: personality, care needs, health, and which breed fits your lifestyle." },
      { property: "og:url", content: `${SITE_URL}/ebooks/cat-breed-handbook` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-cat-breeds.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/cat-breed-handbook` }],
  }),
});

function CatBreedHandbookPage() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0"><img src="/images/ebook-cat-breeds.jpg" alt="The Complete Cat Breed Handbook cover" className="w-56 rounded-xl shadow-2xl shadow-[#2A9D8F]/20 md:w-64" /></div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#2A9D8F]/15 px-3 py-1 text-sm font-semibold text-[#2A9D8F]">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">The Complete Cat Breed Handbook</h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">From Abyssinian to Turkish Van — your definitive guide to 20+ cat breeds. Find the feline friend whose personality fits your life perfectly.</p>
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
        <p className="mt-2 text-center text-[#6B7280]">In-depth profiles of 20+ cat breeds with honest, practical guidance</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "20+ Breeds Profiled", desc: "From Abyssinian to Turkish Van — complete profiles covering origin, appearance, and unique breed traits" },
            { ch: "2", title: "Personality & Temperament Profiles", desc: "Are they lap cats or independent spirits? Vocal or quiet? Playful or reserved? Honest personality breakdowns for every breed" },
            { ch: "3", title: "Care Requirements by Breed", desc: "Grooming, exercise, mental stimulation, and dietary needs — what each breed really needs to thrive" },
            { ch: "4", title: "Common Health Issues", desc: "Breed-specific health predispositions and what proactive care looks like for each breed" },
            { ch: "5", title: "Indoor vs. Outdoor Considerations", desc: "Which breeds adapt well to indoor-only living and which need safe outdoor access — plus enrichment alternatives" },
            { ch: "6", title: "Which Breed Fits Your Lifestyle?", desc: "Interactive matching guide — find the breed whose personality, energy, and needs align with your home and routine" },
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Why This Handbook?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🐱", title: "Honest Assessments", desc: "We tell you the real story — which breeds are low-maintenance, which need constant attention, and everything in between" },
              { icon: "🩺", title: "Vet-Reviewed", desc: "Health information reviewed by licensed veterinarians for accuracy across all breed profiles" },
              { icon: "📱", title: "Always Accessible", desc: "PDF on all devices — reference breed info while visiting shelters, breeders, or discussing with your family" },
            ].map((b) => (<div key={b.title}><span className="text-3xl">{b.icon}</span><h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">{b.title}</h3><p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p></div>))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Cat Lovers Say</h2>
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Find Your Perfect Feline Companion</h2>
          <div className="mt-6"><span className="font-heading text-4xl font-bold text-[#FF7F5C]">$14.99</span><p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · 30-day money-back guarantee</p><a href={EBOOK_PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">Buy Now — Instant Download</a></div>
          <div className="mt-10 rounded-2xl border-2 border-[#F4A261] bg-white p-6 shadow-md">
            <span className="inline-flex items-center rounded-full bg-[#F4A261] px-3 py-1 text-xs font-bold text-white">BEST VALUE</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">Get the Complete Pet Library</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Includes this handbook plus all our premium eBooks — cat breeds, dog breeds, training, nutrition, and more.</p>
            <div className="mt-3 flex items-center justify-center gap-2"><span className="text-lg text-[#6B7280] line-through">Over $120</span><span className="font-heading text-2xl font-bold text-[#FF7F5C]">$49.99</span></div>
            <a href={BUNDLE_PAYMENT_LINK} className="btn-secondary mt-3 inline-block">Get the Bundle Instead</a>
          </div>
        </div>
      </div>
    </div>
  );
}

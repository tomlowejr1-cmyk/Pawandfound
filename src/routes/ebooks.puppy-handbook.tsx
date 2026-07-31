import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

const BUNDLE_PAYMENT_LINK = "https://buy.stripe.com/8x28wPg2i9SE6MN7ao2cg0K";
const EBOOK_PAYMENT_LINK = "https://buy.stripe.com/14A3cv5nE5Co0op1Q42cg0H";

const testimonials = [
  { name: "Laura K.", text: "This handbook saved me so much anxiety as a first-time puppy parent. The week-by-week checklists kept me on track and I finally understood what was normal and what wasn't.", rating: 5 },
  { name: "Mark R.", text: "Our golden retriever puppy was a handful until we got this book. The crate training section alone was worth every penny. Three months in and we have a happy, well-adjusted pup.", rating: 5 },
  { name: "Elena S.", text: "I've read a dozen puppy books and this is the one I actually use. The milestone tracker is brilliant — I never miss a vaccination or training milestone anymore.", rating: 5 },
];

export const Route = createFileRoute("/ebooks/puppy-handbook")({
  component: PuppyHandbookPage,
  head: () => ({
    meta: [
      { title: "The Complete Puppy Handbook — Paw & Found eBooks" },
      { name: "description", content: "Everything a new puppy parent needs — training schedules, health milestones, socialization guides, and nutrition advice. Your complete roadmap from 8 weeks to 12 months." },
      { property: "og:title", content: "The Complete Puppy Handbook — Paw & Found" },
      { property: "og:description", content: "Your complete roadmap for raising a happy, healthy puppy. Training, health, nutrition, and more." },
      { property: "og:url", content: `${SITE_URL}/ebooks/puppy-handbook` },
      { property: "og:image", content: `${SITE_URL}/images/ebook-puppy-handbook.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ebooks/puppy-handbook` }],
  }),
});

function PuppyHandbookPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/ebook-puppy-handbook.jpg"
                alt="The Complete Puppy Handbook cover"
                className="w-56 rounded-xl shadow-2xl shadow-[#FF7F5C]/20 md:w-64"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="badge-sale text-sm">Premium eBook</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                The Complete Puppy Handbook
              </h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Your week-by-week roadmap for raising a happy, healthy, well-behaved puppy — from the day they come home through their first birthday.
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
        <p className="mt-2 text-center text-[#6B7280]">12 chapters covering everything you need for your puppy's first year</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { ch: "1", title: "Bringing Your Puppy Home", desc: "First 48 hours, puppy-proofing, and establishing routines" },
            { ch: "2", title: "House Training Made Simple", desc: "Crate training, potty schedules, and accident management" },
            { ch: "3", title: "Socialization Blueprint", desc: "Critical socialization windows and exposure checklists" },
            { ch: "4", title: "Basic Commands That Stick", desc: "Sit, stay, come, leave it — taught the right way" },
            { ch: "5", title: "Leash Walking & Recall", desc: "Loose leash walking, reliable recall, and outdoor safety" },
            { ch: "6", title: "Puppy Nutrition Guide", desc: "Feeding schedules, best foods by breed size, and what to avoid" },
            { ch: "7", title: "Health & Vaccination Timeline", desc: "Shot schedules, parasite prevention, and recognizing illness" },
            { ch: "8", title: "Teething & Chewing Solutions", desc: "Managing the biting phase and redirecting destructive chewing" },
            { ch: "9", title: "Grooming from Day One", desc: "Brushing, bathing, nail trimming, and making it positive" },
            { ch: "10", title: "Common Behavior Problems", desc: "Jumping, barking, digging — causes and training fixes" },
            { ch: "11", title: "Exercise by Age & Breed", desc: "Safe exercise guidelines for growing puppies" },
            { ch: "12", title: "Month-by-Month Milestones", desc: "Development tracker from 8 weeks to 12 months" },
          ].map((chapter) => (
            <div key={chapter.ch} className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF7F5C]/10 text-sm font-bold text-[#FF7F5C]">
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Why This Handbook?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "📅", title: "Week-by-Week Plan", desc: "Never wonder what to do next — follow the structured timeline" },
              { icon: "🩺", title: "Vet-Reviewed Content", desc: "Every chapter reviewed by licensed veterinarians" },
              { icon: "📱", title: "Always With You", desc: "PDF format works on phone, tablet, and desktop — reference anywhere" },
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
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What Puppy Parents Say</h2>
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
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Ready to Raise an Amazing Puppy?</h2>
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
              The Complete Pet Library includes this handbook, The Ultimate Cat Care Guide, and the Pet Parent's Survival Guide — all for just $49.99.
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

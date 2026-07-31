import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";
const PAYMENT_LINK = "https://buy.stripe.com/00w28r2bs3ug9YZ9iw2cg0Q";

export const Route = createFileRoute("/products/pet-calendar")({
  component: PetCalendarPage,
  head: () => ({
    meta: [
      { title: "2027 Pet Lover's Printable Calendar — Paw & Found" },
      { name: "description", content: "Beautiful printable 2027 wall calendar featuring 12 illustrated pet designs. Print at home, use year after year. Perfect gift for dog and cat lovers." },
      { property: "og:title", content: "2027 Pet Lover's Printable Calendar — Paw & Found" },
      { property: "og:description", content: "12 beautifully illustrated pet designs for every month of 2027. Instant download, print at home." },
      { property: "og:url", content: `${SITE_URL}/products/pet-calendar` },
      { property: "og:image", content: `${SITE_URL}/images/pet-calendar-cover.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/products/pet-calendar` }],
  }),
});

function PetCalendarPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <img
                src="/images/pet-calendar-cover.jpg"
                alt="2027 Pet Lover's Printable Calendar"
                className="w-full max-w-sm rounded-xl shadow-2xl shadow-[#FF7F5C]/20"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center rounded-full bg-[#2A9D8F]/10 px-3 py-1 text-xs font-semibold text-[#2A9D8F]">
                🆕 Just Added
              </span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                2027 Pet Lover's Printable Calendar
              </h1>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Twelve beautifully illustrated months celebrating dogs, cats, and the joy of pet parenthood. Print at home, hang on your wall, and enjoy a year of adorable companions.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">$12.99</span>
                <a href={PAYMENT_LINK} className="btn-primary text-base px-8 py-3">
                  Buy Now — Instant Download
                </a>
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">Secure payment via Stripe. Printable PDF — print as many copies as you want.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Inside */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">What's Inside</h2>
        <p className="mt-2 text-center text-[#6B7280]">A full year of illustrated pet charm</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { month: "January", pet: "Golden Retriever puppy", theme: "Snowy winter wonderland" },
            { month: "February", pet: "Two cats cuddling", theme: "Valentine's hearts" },
            { month: "March", pet: "Playful corgi", theme: "Spring flowers blooming" },
            { month: "April", pet: "Bunny & kitten", theme: "Easter garden scene" },
            { month: "May", pet: "Border collie", theme: "Sunny meadow walk" },
            { month: "June", pet: "Labrador at the beach", theme: "Summer seaside fun" },
            { month: "July", pet: "Patriotic bulldog", theme: "Festive fireworks night" },
            { month: "August", pet: "Cat napping in a hammock", theme: "Lazy summer afternoons" },
            { month: "September", pet: "Dachshund in a sweater", theme: "Autumn leaves and pumpkins" },
            { month: "October", pet: "Black cat & dog duo", theme: "Spooky Halloween fun" },
            { month: "November", pet: "Beagle family", theme: "Cozy Thanksgiving feast" },
            { month: "December", pet: "Husky in the snow", theme: "Holiday gift-giving cheer" },
          ].map((m) => (
            <div key={m.month} className="flex gap-3 rounded-lg border border-[#E9EDDE] bg-white p-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF7F5C]/10 text-xs font-bold text-[#FF7F5C]">
                {m.month.slice(0, 3)}
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">{m.month}: {m.pet}</h3>
                <p className="mt-0.5 text-xs text-[#6B7280]">{m.theme}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bonus Features */}
        <div className="mt-8 rounded-xl border border-[#E9EDDE] bg-[#FFF8F0] p-5">
          <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">✨ Bonus Features</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-0.5">✓</span> Monthly pet care tips — flea prevention reminders, grooming schedules, seasonal safety notes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-0.5">✓</span> Important dates pre-marked — National Dog Day, Adopt a Cat Month, and more
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-0.5">✓</span> Notes section on each month for vet appointments, training milestones, and memories
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2A9D8F] mt-0.5">✓</span> US Letter size (8.5×11") — prints beautifully at home or at any print shop
            </li>
          </ul>
        </div>
      </div>

      {/* Sample Month Preview */}
      <div className="bg-[#FFF8F0] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Take a Peek Inside</h2>
          <p className="mt-2 text-[#6B7280]">Here's a preview of the January spread — every month follows this cozy, charming design</p>
          <img
            src="/images/pet-calendar-preview.jpg"
            alt="Sample month from the 2027 pet calendar"
            className="mt-6 mx-auto rounded-xl shadow-lg max-w-md w-full"
          />
        </div>
      </div>

      {/* Why Printable */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">Why Printable?</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { icon: "🖨️", title: "Print at Home", desc: "Instant download — print on your own paper, no shipping wait. Use cardstock for a premium feel." },
            { icon: "🎁", title: "Perfect Gift", desc: "Print multiple copies for friends, family, coworkers — a thoughtful gift for any pet lover." },
            { icon: "♻️", title: "Eco-Friendly", desc: "No manufacturing waste, no shipping footprint. Just a beautiful calendar when you need it." },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D]">{b.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[#E9EDDE] bg-gradient-to-b from-[#FFF8F0] to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">Make 2027 Your Most Organized Pet Year Yet</h2>
          <p className="mt-2 text-[#6B7280]">One purchase, unlimited prints. Perfect for home, office, or gifting.</p>
          <div className="mt-6">
            <span className="font-heading text-4xl font-bold text-[#FF7F5C]">$12.99</span>
            <p className="mt-1 text-sm text-[#6B7280]">Instant PDF download · Print as many copies as you want</p>
            <a href={PAYMENT_LINK} className="btn-primary mt-4 inline-block text-base px-10 py-4">
              Buy Now — Instant Download
            </a>
          </div>

          {/* Cross-sell to eBooks */}
          <div className="mt-10 rounded-2xl border border-[#E9EDDE] bg-white p-6 shadow-sm">
            <span className="text-2xl">📚</span>
            <h3 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D]">Looking for more pet content?</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Check out our premium eBooks — in-depth guides for puppy parents, cat owners, and every pet lover in between.
            </p>
            <a href="/downloads#premium-ebooks" className="btn-secondary mt-3 inline-block text-sm">
              Browse Premium eBooks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

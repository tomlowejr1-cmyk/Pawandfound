import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

interface DigitalProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  stripePaymentLink: string;
  features: string[];
}

interface Bundle {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  stripePaymentLink: string;
  includedProducts: { title: string; price: number }[];
  image: string;
}

const bundles: Bundle[] = [
  {
    id: "bundle-001",
    title: "Puppy Starter Pack",
    description:
      "Everything a new puppy parent needs — training schedule, treat recipes, and emergency know-how. Save 28% vs buying individually.",
    price: 12.99,
    originalPrice: 17.97,
    savings: 4.98,
    stripePaymentLink: "https://buy.stripe.com/4gM7sL7vM2qcc779iw2cg0w",
    image: "/images/puppy-training-checklist-preview.png",
    includedProducts: [
      { title: "Puppy Training Checklist & Milestone Tracker", price: 4.99 },
      { title: "Homemade Pet Treats Recipe Guide", price: 4.99 },
      { title: "Pet First Aid: Emergency Care Guide", price: 7.99 },
    ],
  },
  {
    id: "bundle-002",
    title: "Cat Essentials Kit",
    description:
      "The ultimate cat care bundle — decode their behavior, plan their care, and ace every vet visit. Save 29% vs buying individually.",
    price: 11.99,
    originalPrice: 16.97,
    savings: 4.98,
    stripePaymentLink: "https://buy.stripe.com/5kQdR9g2i1m84EF2U82cg0x",
    image: "/images/cat-behavior-decoder-preview.png",
    includedProducts: [
      { title: "Cat Behavior Decoder", price: 5.99 },
      { title: "The Ultimate Pet Care Planner", price: 9.99 },
      { title: "Vet Visit Prep Kit", price: 4.99 },
    ],
  },
];

const digitalProducts: DigitalProduct[] = [
  {
    id: "dig-001",
    title: "Homemade Pet Treats Recipe Guide",
    slug: "homemade-pet-treats-recipe-guide",
    price: 4.99,
    description:
      "7 simple, safe recipes for homemade dog and cat treats your pets will love. Includes grain-free and allergy-friendly options.",
    longDescription:
      "Treat your furry best friend to the healthiest, tastiest homemade snacks! This digital recipe guide includes 7 vet-approved recipes for dogs and cats — from crunchy peanut butter biscuits to frozen salmon bites. Every recipe uses simple, whole-food ingredients you probably already have in your kitchen. Bonus: includes a section on ingredients to avoid and safe substitutions for pets with allergies.",
    image: "/images/pet-treat-recipes-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRm7sLaHY3ug8UVbqE2cg0h",
    features: [
      "7 vet-approved recipes for dogs and cats",
      "Grain-free and allergy-friendly options",
      "Ingredient substitution guide",
      "Foods-to-avoid quick reference chart",
      "Printable PDF format — view on any device",
      "Lifetime access — free updates",
    ],
  },
  {
    id: "dig-002",
    title: "Pet First Aid: Emergency Care Guide",
    slug: "pet-first-aid-emergency-care-guide",
    price: 7.99,
    description:
      "Be prepared for pet emergencies with this comprehensive first aid guide. Covers choking, poisoning, wounds, heatstroke, and more.",
    longDescription:
      "Emergencies happen when you least expect them. This veterinarian-reviewed guide walks you through exactly what to do when your pet needs immediate help — from the first critical minutes until you can reach a vet. Covers choking, poisoning, wounds and bleeding, seizures, heatstroke, broken bones, and allergic reactions. Includes a quick-reference emergency checklist and a pet emergency kit shopping list. Peace of mind in your pocket — literally.",
    image: "/images/pet-first-aid-preview.png",
    stripePaymentLink: "https://buy.stripe.com/9B6eVd4jA5Co3AB0M02cg0i",
    features: [
      "Step-by-step emergency response guides",
      "Covers choking, poisoning, wounds, and more",
      "Pet CPR instructions with diagrams",
      "Emergency kit shopping checklist",
      "Printable PDF format — view on any device",
      "Veterinarian-reviewed content",
    ],
  },
  {
    id: "dig-003",
    title: "Paw & Found Digital Sticker Pack",
    slug: "paw-and-found-digital-sticker-pack",
    price: 5.99,
    description:
      "24 hand-drawn pet-themed digital stickers for tablet journaling apps. Cute, colorful designs of dogs, cats, and pet parent life.",
    longDescription:
      "Decorate your digital journal, planner, or notes with these adorable hand-drawn pet stickers! This pack includes 24 individual PNG stickers featuring dogs, cats, paw prints, pet care icons, and fun pet-parent sayings. All stickers have transparent backgrounds and high resolution — perfect for GoodNotes, Notability, Zoom whiteboards, and any app that supports image imports. Just import and start decorating!",
    image: "/images/sticker-cover.png",
    stripePaymentLink: "https://buy.stripe.com/9B6bJ19DU6Gs0op2U82cg0j",
    features: [
      "24 individual PNG stickers",
      "Dog, cat & pet parent designs",
      "Works with GoodNotes & Notability",
      "Transparent backgrounds",
      "High resolution — 300 DPI",
      "Instant download",
    ],
  },
  {
    id: "dig-004",
    title: "The Ultimate Pet Care Planner",
    slug: "ultimate-pet-care-planner",
    price: 9.99,
    description:
      "24-page undated printable planner covering vet visits, vaccination records, medication tracking, feeding schedules, grooming, training, expenses, and pet sitter instructions.",
    longDescription:
      "Stay on top of your pet's health and happiness with this comprehensive printable planner. 24 undated pages let you start any time of year and reuse year after year. Includes dedicated sections for vet visit logs, vaccination records, medication schedules, daily feeding trackers, grooming logs, training progress, expense tracking, and a full pet sitter information sheet with emergency contacts. US Letter size (8.5×11\") — print at home or at your local print shop. Perfect for busy pet parents who want to keep everything organized in one place.",
    image: "/images/pet-care-planner-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRmaEX17od4Q2wx9iw2cg0k",
    features: [
      "24 undated pages — use year after year",
      "Vet, meds, feeding & grooming logs",
      "Pet sitter instructions & emergency contacts",
      "Printable US Letter size (8.5×11\")",
      "Expense tracking included",
      "Instant download — print as many copies as you need",
    ],
  },
  {
    id: "dig-005",
    title: "Puppy Training Checklist & Milestone Tracker",
    slug: "puppy-training-checklist",
    price: 4.99,
    description:
      "Track your puppy's progress from 8 weeks to 12 months. Covers potty training, commands, socialization, and health milestones.",
    longDescription:
      "Raising a puppy is exciting — and busy! This checklist keeps you organized through every stage of your puppy's first year. Track potty training progress, basic commands mastered, socialization experiences, vaccination schedules, and growth milestones. Includes weekly checklists from 8 weeks through 12 months, plus tips for common challenges like teething and leash pulling. Print as many copies as you need — perfect for first-time puppy parents!",
    image: "/images/puppy-training-checklist-preview.png",
    stripePaymentLink: "https://buy.stripe.com/5kQeVd2bsfcY3AB3Yc2cg0l",
    features: [
      "Weekly checklists from 8 weeks to 12 months",
      "Potty training & command trackers",
      "Socialization & health milestone logs",
      "Printable — use year after year",
      "Perfect for first-time puppy parents",
      "Instant download",
    ],
  },
  {
    id: "dig-006",
    title: "Cat Behavior Decoder",
    slug: "cat-behavior-decoder",
    price: 5.99,
    description:
      "Understand what your cat is really telling you. Decode meows, tail flicks, ear positions, and body language with this visual guide.",
    longDescription:
      "Cats are mysterious — but they're always communicating. This beautifully illustrated guide helps you decode your cat's every move: what different meows mean, why their tail twitches, what ear positions signal, and how to tell if they're stressed, happy, or ready to play. Includes 30+ common behaviors with clear illustrations and explanations, plus troubleshooting tips for common issues like scratching furniture and litter box avoidance. Build a deeper bond by finally understanding what your cat is saying!",
    image: "/images/cat-behavior-decoder-preview.png",
    stripePaymentLink: "https://buy.stripe.com/9B6fZh03k2qcc77eCQ2cg0m",
    features: [
      "30+ common cat behaviors decoded",
      "Illustrated body language guide",
      "Meow & vocalization translations",
      "Troubleshooting for common issues",
      "Printable PDF — view on any device",
      "Instant download",
    ],
  },
  {
    id: "dig-007",
    title: "Pet Travel Checklist & Packing Guide",
    slug: "pet-travel-checklist",
    price: 3.99,
    description:
      "Never forget an essential again. Comprehensive packing lists for road trips, flights, camping, and boarding your pet.",
    longDescription:
      "Traveling with your pet? This comprehensive checklist covers everything you need — whether you're hitting the road, flying across the country, camping in the woods, or dropping your pet off at the boarder. Includes separate packing lists for dogs and cats, a pre-trip planning timeline, documents checklist (vaccination records, health certificates), car safety tips, airline-approved carrier guidelines, and an emergency contact sheet. Travel stress-free knowing you haven't forgotten anything!",
    image: "/images/pet-travel-checklist-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRm8wP03kaWIgnngKY2cg0n",
    features: [
      "Separate checklists for dogs & cats",
      "Road trip, flight, camping & boarding guides",
      "Pre-trip planning timeline",
      "Documents & health records checklist",
      "Emergency contact sheet included",
      "Instant download",
    ],
  },
  {
    id: "dig-008",
    title: "DIY Dog Birthday Party Kit",
    slug: "diy-dog-birthday-party-kit",
    price: 4.99,
    description:
      "Throw the ultimate dog birthday party! Includes printable invitations, decorations, a pup-friendly cake recipe, and party game ideas.",
    longDescription:
      "Your dog deserves a celebration! This printable party kit has everything you need to throw an unforgettable dog birthday bash. Includes adorable paw-print invitations, a 'Happy Barkday' banner, cupcake toppers, a dog-safe cake recipe (peanut butter & pumpkin — tested and pup-approved!), party hat templates, and 5 fun party game ideas. All printables are designed for US Letter paper. Just print, cut, and party!",
    image: "/images/dog-birthday-party-kit-preview.png",
    stripePaymentLink: "https://buy.stripe.com/cNi14n2bs3ug1steCQ2cg0p",
    features: [
      "Printable invitations & decorations",
      "Dog-safe birthday cake recipe",
      "Party hat templates & cupcake toppers",
      "5 fun party game ideas",
      "US Letter size — print at home",
      "Instant download",
    ],
  },
  {
    id: "dig-009",
    title: "Pet Photo Tips Guide",
    slug: "pet-photo-tips-guide",
    price: 6.99,
    description:
      "Take stunning photos of your dog or cat with your phone! 40+ tips covering lighting, composition, action shots, and editing tricks.",
    longDescription:
      "Want Instagram-worthy pet photos without expensive gear? This guide teaches you to take amazing photos of your pet using just your smartphone. Covers natural lighting techniques, composition rules that make any photo pop, how to capture sharp action shots, working with different coat colors, and simple editing tricks using free apps. Includes 40+ practical tips with before-and-after examples. Your pet is adorable — let's make sure your photos do them justice!",
    image: "/images/pet-photo-tips-preview.png",
    stripePaymentLink: "https://buy.stripe.com/14AcN52bs7KwgnneCQ2cg0q",
    features: [
      "40+ practical photo tips",
      "Smartphone-focused — no gear needed",
      "Lighting & composition mastery",
      "Action shot techniques",
      "Free app editing guide included",
      "Before-and-after examples",
    ],
  },
  {
    id: "dig-010",
    title: "Paws & Relax Coloring Book",
    slug: "paws-and-relax-coloring-book",
    price: 5.99,
    description:
      "20 beautifully illustrated pet-themed coloring pages for adults. Featuring dogs, cats, and whimsical animal designs to help you unwind.",
    longDescription:
      "Relax and de-stress with this beautifully illustrated pet-themed coloring book. 20 original designs featuring dogs, cats, paw prints, and whimsical animal patterns — from detailed mandalas to charming doodle-style pages. Each design is printed on its own page (no bleed-through worries). Perfect for winding down after a long day, or as a thoughtful gift for the pet lover in your life. Print your favorites as many times as you'd like!",
    image: "/images/pet-coloring-book-preview.png",
    stripePaymentLink: "https://buy.stripe.com/9B6bJ14jAe8U2wxfGU2cg0o",
    features: [
      "20 original coloring designs",
      "Dogs, cats & whimsical animal art",
      "One design per page — no bleed",
      "Print as many copies as you want",
      "US Letter size (8.5×11\")",
      "Perfect gift for pet lovers",
    ],
  },
  {
    id: "dig-011",
    title: "Vet Visit Prep Kit",
    slug: "vet-visit-prep-kit",
    price: 4.99,
    description:
      "Make every vet visit smoother. Includes a symptoms tracker, questions-to-ask checklist, medication log, and vaccination record keeper.",
    longDescription:
      "Never walk into a vet appointment unprepared again. This comprehensive prep kit helps you track symptoms before the visit, organize the questions you want to ask, log current medications and dosages, and maintain an up-to-date vaccination record. Also includes a post-visit summary sheet so you remember everything the vet told you. Designed with input from veterinary professionals. Stress less and advocate better for your pet's health!",
    image: "/images/vet-visit-prep-kit-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRm8wP9DU8OAgnndyM2cg0r",
    features: [
      "Symptom tracker & timeline",
      "Questions-to-ask checklist",
      "Medication log with dosage tracker",
      "Vaccination record keeper",
      "Post-visit summary sheet",
      "Veterinarian-reviewed format",
    ],
  },
];

export const Route = createFileRoute("/downloads")({
  component: DownloadsPage,
  head: () => ({
    meta: [
      { title: "Digital Guides — Paw & Found" },
      {
        name: "description",
        content:
          "Download helpful digital pet care guides and recipe books from Paw & Found. Instant access after purchase.",
      },
      { property: "og:title", content: "Digital Guides — Paw & Found" },
      {
        property: "og:description",
        content:
          "Download helpful digital pet care guides and recipe books from Paw & Found.",
      },
      { property: "og:url", content: `${SITE_URL}/downloads` },
      { property: "og:image", content: `${SITE_URL}/images/logo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/downloads` }],
  }),
});

function DownloadsPage() {
  return (
    <div>
      {/* Header */}
      <div className="border-b border-[#E9EDDE] bg-[#FFF8F0] py-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="section-title">Digital Guides</h1>
          <p className="section-subtitle mt-2">
            Pet care knowledge at your fingertips. Download immediately after purchase.
          </p>
        </div>
      </div>

      {/* Bundle & Save */}
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <span className="badge-sale text-sm px-4 py-1.5">🎉 Save 20%+</span>
          <h2 className="section-title mt-3">Bundle & Save</h2>
          <p className="section-subtitle mt-2">Get multiple guides at a discount — perfect for new pet parents</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="relative overflow-hidden rounded-xl bg-white shadow-md border-2 border-transparent"
              style={{
                borderImageSource: "linear-gradient(135deg, #FF7F5C, #F4A261, #2A9D8F)",
                borderImageSlice: 1,
              }}
            >
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7F5C] to-[#F4A261]" />
              <div className="p-6">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#FF7F5C] px-3 py-1 text-xs font-bold text-white shadow-sm">
                    SAVE ${bundle.savings.toFixed(2)}
                  </span>
                </div>

                {/* Image */}
                <div className="mb-4 flex justify-center">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-40 h-40 rounded-xl object-contain bg-[#FFF8F0] shadow-sm"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="font-heading text-xl font-bold text-[#2D2D2D] text-center">
                  {bundle.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B7280] text-center leading-relaxed">
                  {bundle.description}
                </p>

                {/* Included Products */}
                <div className="mt-5 rounded-lg bg-[#FFF8F0] p-4">
                  <h4 className="font-heading text-xs font-semibold text-[#2D2D2D] uppercase tracking-wider mb-3">
                    Includes:
                  </h4>
                  <ul className="space-y-2">
                    {bundle.includedProducts.map((item) => (
                      <li key={item.title} className="flex items-center justify-between text-sm">
                        <span className="flex items-start gap-2 text-[#4A4A4A]">
                          <span className="mt-0.5 flex-shrink-0 text-[#2A9D8F]">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>{item.title}</span>
                        </span>
                        <span className="flex-shrink-0 text-xs text-[#6B7280] font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="text-lg text-[#6B7280] line-through">
                    ${bundle.originalPrice.toFixed(2)}
                  </span>
                  <span className="font-heading text-3xl font-bold text-[#FF7F5C]">
                    ${bundle.price.toFixed(2)}
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-5">
                  <a
                    href={bundle.stripePaymentLink}
                    className="btn-primary w-full text-center text-base py-3"
                  >
                    Buy Bundle — Instant Download
                  </a>
                </div>
                <p className="mt-2 text-center text-xs text-[#6B7280]">
                  Secure payment via Stripe. All 3 guides included.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Products */}
      <div className="mx-auto max-w-4xl px-4 pt-8 pb-12 sm:px-6 lg:px-8">
        {digitalProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-8 md:flex-row md:items-start"
          >
            {/* Cover Image */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-64 h-64 rounded-xl object-contain shadow-lg md:w-72 md:h-72 bg-white"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <span className="badge-sale text-xs">Digital Download</span>
              <h2 className="font-heading mt-2 text-2xl font-bold text-[#2D2D2D] md:text-3xl">
                {product.title}
              </h2>
              <p className="mt-2 text-[#6B7280] leading-relaxed">
                {product.longDescription}
              </p>

              {/* What's Included */}
              <div className="mt-6">
                <h3 className="font-heading text-sm font-semibold text-[#2D2D2D] uppercase tracking-wider">
                  What's Included
                </h3>
                <ul className="mt-3 space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[#6B7280]"
                    >
                      <span className="mt-0.5 flex-shrink-0 text-[#2A9D8F]">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Buy */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="font-heading text-3xl font-bold text-[#FF7F5C]">
                  ${product.price.toFixed(2)}
                </span>
                <a
                  href={product.stripePaymentLink}
                  className="btn-primary text-base px-8 py-3"
                >
                  Buy Now — Instant Download
                </a>
              </div>
              <p className="mt-2 text-xs text-[#6B7280]">
                Secure payment via Stripe. Refunds within 30 days if unsatisfied.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="border-t border-[#E9EDDE] bg-[#FFF8F0]/50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-center text-lg font-semibold text-[#2D2D2D]">
            How It Works
          </h3>
          <div className="mt-6 grid gap-6 text-center sm:grid-cols-3">
            <div>
              <span className="text-2xl">💳</span>
              <p className="mt-2 text-sm text-[#6B7280]">
                Securely pay with credit card through Stripe
              </p>
            </div>
            <div>
              <span className="text-2xl">📧</span>
              <p className="mt-2 text-sm text-[#6B7280]">
                Check your email for your receipt and download link
              </p>
            </div>
            <div>
              <span className="text-2xl">📱</span>
              <p className="mt-2 text-sm text-[#6B7280]">
                View your guide on any device — phone, tablet, or computer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
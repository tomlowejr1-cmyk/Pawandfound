import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";

/* Jackson Galaxy-inspired cat behavior tips (bite-sized) */
const TIPS = [
  {
    emoji: "👁️",
    title: "The Slow Blink",
    body: "A slow, sleepy blink is cat for \"I trust you.\" Blink back slowly and you're speaking their language — it's the easiest way to tell a nervous cat you're a friend, not a threat.",
  },
  {
    emoji: "🐾",
    title: "Tail Talk",
    body: "Tail up like a flag? Happy and confident. Puffed and bristled? Scared. Thrashing side to side? Overstimulated — back off and give them space before the hissing starts.",
  },
  {
    emoji: "🏰",
    title: "Catify Your Home",
    body: "Cats are vertical creatures. Cat trees, shelves, and window perches turn your home into a cat paradise — and a confident cat on high ground is far less likely to act out.",
  },
  {
    emoji: "🎯",
    title: "Play Is Prey",
    body: "The hunt–catch–kill–eat cycle is hardwired. Use wand toys to mimic prey, let them \"catch\" it, then feed a meal right after — you'll tire out the predator and calm the house.",
  },
  {
    emoji: "🚽",
    title: "Litter Box Rule of Thumb",
    body: "The golden rule: one litter box per cat, plus one more. Scoop daily, keep boxes in quiet low-traffic spots, and match the box to your cat — some hate hoods, some hate liners.",
  },
  {
    emoji: "🐈",
    title: "Scratching Is a Feature, Not a Bug",
    body: "Scratching marks territory and relieves stress — never punish it. Offer sturdy vertical posts near where they already scratch, and make them the best spot in the room.",
  },
  {
    emoji: "👂",
    title: "Ears Tell All",
    body: "Forward ears = curious and content. Flat or swiveled back = scared or angry. Watch the ears before you reach in — a cat's mood is written on their head.",
  },
  {
    emoji: "🛋️",
    title: "Scent = Family",
    body: "When your cat head-bumps, cheek-rubs, or kneads you, they're marking you as family with their scent. It's not just cute — it's the deepest compliment a cat can give.",
  },
];

const VIDEOS = [
  {
    id: "WzuhuaeS0aQ",
    title: "Cat Body Language 101",
    desc: "Learn to read ears, tails, and whiskers — the basics of understanding what your cat is really saying.",
  },
  {
    id: "LxhT_q9oUf8",
    title: "Cat Vocalizations and What They Mean",
    desc: "Meows, trills, chirps, and yowls — decode the sounds your cat makes and respond like a pro.",
  },
  {
    id: "UWohxDOXsl4",
    title: "Can My Cats Get Along? Cat-to-Cat Basics",
    desc: "Introduction tips and cat-to-cat body language basics for multi-cat households.",
  },
];

const EXPERT_VIDEOS = [
  { id: "WzuhuaeS0aQ", expert: "Jackson Galaxy", title: "Cat Body Language 101", desc: "Learn to read ears, tails, and whiskers — the basics of understanding what your cat is really saying." },
  { id: "PxhJZcrh74I", expert: "Dr. Pol", title: "Kitten With a Cold", desc: "Dr. Pol treats a tiny kitten with a cold — a real-world peek at kitten care from a working vet." },
  { id: "LxhT_q9oUf8", expert: "Jackson Galaxy", title: "Cat Vocalizations and What They Mean", desc: "Meows, trills, chirps, and yowls — decode the sounds your cat makes and respond like a pro." },
  { id: "A2F04RN6DDc", expert: "Dr. Pol", title: "This Kitten Has Mittens", desc: "A polydactyl kitten (extra toes!) visits the clinic — cute and fascinating anatomy in action." },
  { id: "UWohxDOXsl4", expert: "Jackson Galaxy", title: "Can My Cats Get Along? Cat-to-Cat Basics", desc: "Introduction tips and cat-to-cat body language basics for multi-cat households." },
  { id: "a8Q9XrubDMc", expert: "Dr. Pol", title: "Kitty Needs Some Love", desc: "A shy cat gets the care and attention it needs at Pol Veterinary Services." },
  { id: "W50bQopoQic", expert: "Jackson Galaxy", title: "How to Get Your Cats to Stop... Everything You Hate", desc: "Everything-proof your home: why cats misbehave and how to redirect them with love, not punishment." },
  { id: "qtD24WTCbOw", expert: "Dr. Pol", title: "One Lucky Kitten", desc: "A lucky kitten gets a second chance — emergency care straight from the vet's chair." },
  { id: "RS5aI8zdHAY", expert: "Jackson Galaxy", title: "8 Types of Cat Aggression Explained", desc: "Play aggression, redirected aggression, fear aggression — know the type, fix the cause." },
  { id: "K7wGvxMPqtI", expert: "Dr. Pol", title: "Dr. Pol Rescues a Kitten", desc: "A roadside rescue becomes a clinic case — Dr. Pol at his most caring." },
];
/** Day of year (0-365), same pattern as Daily Pet Tip. */
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}
/** Week bucket (changes every 7 days), used to rotate the featured video weekly. */
function weekOfYear(date: Date): number {
  return Math.floor(dayOfYear(date) / 7);
}
const EBOOKS = [
  {
    title: "Cat Behavior Decoder",
    price: "$5.99",
    desc: "Why do they knock things off shelves? Decode 20+ common (and confusing) cat behaviors in plain English.",
    img: "/images/cat-behavior-decoder-preview.png",
    link: "https://buy.stripe.com/9B6fZh03k2qcc77eCQ2cg0m",
    buyLabel: "Buy & download →",
  },
  {
    title: "Cat vs. Cat: Multi-Cat Harmony Guide",
    price: "$12.99",
    desc: "Stop the hissing and restore peace — introductions, territory, resource sharing, and stress signals in 8 chapters.",
    img: "/images/ebook-cat-vs-cat.jpg",
    link: "/ebooks/cat-vs-cat",
    buyLabel: "View & download →",
  },
  {
    title: "The Cat Encyclopedia for Kids",
    price: "$12.99",
    desc: "25+ cat breeds A to Z, fun facts, a family breed quiz, famous cats in history — purr-fect for young cat fans.",
    img: "/images/ebook-cat-encyclopedia-kids.jpg",
    link: "/ebooks/cat-encyclopedia-for-kids",
    buyLabel: "View & download →",
  },
];

export const Route = createFileRoute("/cat-corner")({
  component: CatCornerPage,
  head: () => ({
    meta: [
      { title: "Cat Corner — Cat Behavior Tips & Videos | Paw & Found 🐱" },
      {
        name: "description",
        content:
          "A fun, educational hub for cat owners: bite-sized cat behavior tips in the cat-whisperer style, curated YouTube videos on body language and vocalizations, and Paw & Found's cat eBooks — Cat Behavior Decoder, Cat vs. Cat, and more.",
      },
      { property: "og:title", content: "Cat Corner — Cat Behavior Tips & Videos | Paw & Found 🐱" },
      {
        property: "og:description",
        content:
          "Speak cat in five minutes: slow blinks, tail talk, catification, and more cat-whisperer-inspired tips — plus curated videos and cat eBooks.",
      },
      { property: "og:url", content: `${SITE_URL}/cat-corner` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cat-corner` }],
  }),
});

function CatCornerPage() {
  const weekIdx = weekOfYear(new Date()) % EXPERT_VIDEOS.length;
  const videoOfWeek = EXPERT_VIDEOS[weekIdx];
  const nextVideo = EXPERT_VIDEOS[(weekIdx + 1) % EXPERT_VIDEOS.length];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">🐱</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          The Cat Corner
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Channel your inner cat whisperer. Bite-sized behavior tips in the
          Jackson Galaxy–inspired style, hand-picked videos, and Paw & Found's
          deep-dive cat eBooks — everything you need to speak fluent cat. 🐾
        </p>
      </div>

      {/* Behavior fact cards */}
      <section className="mt-10">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">😼 Cat Behavior, Explained</h2>
        </div>
        <p className="mt-1 text-sm text-[#6B7280]">
          Eight bite-sized lessons from the cat-whisperer playbook — read one a day and you'll
          understand your feline overlord in a week.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIPS.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden="true">{tip.emoji}</span>
              <h3 className="font-heading mt-2 font-bold text-[#2D2D2D]">{tip.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Expert Video of the Week (rotates weekly across experts) */}
      <section className="mt-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#E8F8F5] to-white p-6 shadow-sm ring-1 ring-[#CFE8E2] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">🎥 Featured Expert Video of the Week</h2>
            <span className="rounded-full bg-[#FF7F5C] px-3 py-1 text-xs font-semibold text-white">{videoOfWeek.expert}</span>
          </div>
          <p className="mt-1 text-sm text-[#6B7280]">
            We rotate expert picks weekly — cat behavior with Jackson Galaxy, real vet care with Dr. Pol.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#E9EDDE] bg-white shadow-sm">
            <div className="aspect-video w-full bg-[#F7FAF9]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoOfWeek.id}?rel=0`}
                title={videoOfWeek.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-bold text-[#2D2D2D]">▶ {videoOfWeek.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{videoOfWeek.desc}</p>
              <div className="mt-4 rounded-xl bg-[#FFF6EC] px-4 py-3 text-xs text-[#6B7280] ring-1 ring-[#F4E3CD]">
                <span className="font-semibold text-[#2D2D2D]">Coming next week:</span> {nextVideo.expert} — “{nextVideo.title}”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="mt-12">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">🎬 Watch & Learn</h2>
        </div>
        <p className="mt-1 text-sm text-[#6B7280]">
          Curated videos on cat body language, vocalizations, and multi-cat harmony (via Jackson
          Galaxy's YouTube channel).
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {VIDEOS.map((v) => (
            <div key={v.id} className="overflow-hidden rounded-2xl border border-[#E9EDDE] bg-white shadow-sm">
              <div className="aspect-video w-full bg-[#F7FAF9]">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-sm font-bold text-[#2D2D2D]">▶ {v.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-[#B0B7A3]">
          Videos are publicly available YouTube content and belong to their creators.
        </p>
      </section>

      {/* eBooks */}
      <section className="mt-12">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">📚 Go Deeper with Paw & Found eBooks</h2>
        </div>
        <p className="mt-1 text-sm text-[#6B7280]">
          The video tips are the appetizer — our guides are the full feast. Instant download, forever yours.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {EBOOKS.map((ebook) => (
            <a
              key={ebook.title}
              href={ebook.link}
              className="group rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex justify-center rounded-xl bg-[#FFF8F0] py-4">
                <img src={ebook.img} alt={ebook.title} className="h-36 rounded-lg shadow-md transition-transform group-hover:scale-105" />
              </div>
              <h3 className="font-heading mt-3 font-bold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                {ebook.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{ebook.desc}</p>
              <p className="mt-3 font-heading text-lg font-bold text-[#FF7F5C]">{ebook.price}</p>
              <p className="mt-1 text-xs font-semibold text-[#2A9D8F]">{ebook.buyLabel}</p>
            </a>
          ))}
        </div>

        {/* Bundle CTA */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#1E7A6F] p-6 text-white sm:flex-row">
          <div>
            <p className="font-heading text-lg font-bold">🐈 Cat Essentials Kit</p>
            <p className="mt-1 text-sm text-white/85">
              Cat Behavior Decoder + Ultimate Pet Care Planner + Vet Visit Prep Kit — save 29% vs buying individually.
            </p>
          </div>
          <a
            href="/downloads"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#2A9D8F] transition-colors hover:bg-white/90"
          >
            Get the Kit — $11.99 →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-br from-[#FF7F5C] to-[#F4A261] p-8 text-center text-white sm:p-10">
        <h2 className="font-heading text-2xl font-bold">Put the tips to work 🧶</h2>
        <p className="mx-auto mt-2 max-w-md text-white/90">
          New scratching post? Interactive wand toy? Cat trees for the vertical life? Shop cat
          essentials your feline overlord will approve of.
        </p>
        <a href="/products" className="btn-primary mt-6 inline-flex bg-white text-[#FF7F5C] hover:bg-white/90">
          Shop Cat Essentials →
        </a>
      </section>

      {/* Disclaimer */}
      <p className="mt-8 text-center text-xs text-[#B0B7A3]">
        The Cat Corner is an independent, fan-style homage to cat-whisperer techniques popularized
        by Jackson Galaxy. Paw & Found is not affiliated with, sponsored by, or endorsed by Jackson
        Galaxy or his channels. Embedded videos remain the property of their creators.
      </p>
    </div>
  );
}

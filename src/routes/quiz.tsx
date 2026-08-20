import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { loadProducts, getProductBySlug } from "~/lib/products";
import type { Product } from "~/lib/types";

const GIVEAWAY_STORAGE_KEY = "pawandfound_quiz_giveaway_seen";

const SITE_URL = "https://pawandfound.store";

interface QuizAnswer {
  pet: "dog" | "cat";
  size: "small" | "medium" | "large";
  vibe: "active" | "cozy" | "chewer" | "senior";
  lookingFor: "toys" | "apparel" | "essentials" | "accessories";
  breed: string;
}

interface Question {
  id: keyof QuizAnswer;
  question: string;
  options: { value: string; label: string; emoji: string }[];
  /** If true, this question's options depend on a previous answer (pet type) */
  dynamic?: boolean;
}

const breedOptions: Record<string, { value: string; label: string; emoji: string }[]> = {
  dog: [
    { value: "labrador", label: "Labrador Retriever", emoji: "🦮" },
    { value: "french-bulldog", label: "French Bulldog", emoji: "🥖" },
    { value: "golden-retriever", label: "Golden Retriever", emoji: "🌟" },
    { value: "german-shepherd", label: "German Shepherd", emoji: "🐺" },
    { value: "poodle", label: "Poodle", emoji: "🐩" },
    { value: "bulldog", label: "Bulldog", emoji: "💪" },
    { value: "beagle", label: "Beagle", emoji: "🐰" },
    { value: "mixed-other-dog", label: "Mixed / Other", emoji: "🐕" },
  ],
  cat: [
    { value: "maine-coon", label: "Maine Coon", emoji: "🦁" },
    { value: "siamese", label: "Siamese", emoji: "💎" },
    { value: "persian", label: "Persian", emoji: "👑" },
    { value: "british-shorthair", label: "British Shorthair", emoji: "🧸" },
    { value: "bengal", label: "Bengal", emoji: "🐆" },
    { value: "ragdoll", label: "Ragdoll", emoji: "☁️" },
    { value: "sphynx", label: "Sphynx", emoji: "👽" },
    { value: "mixed-other-cat", label: "Mixed / Other", emoji: "🐈" },
  ],
};

// Breed-specific traits that influence product recs
const breedTraits: Record<string, string[]> = {
  // Dogs
  labrador: ["active", "chewer", "outgoing"],
  "french-bulldog": ["cozy", "sensitive-skin", "small"],
  "golden-retriever": ["active", "long-hair", "outgoing"],
  "german-shepherd": ["active", "chewer", "large"],
  poodle: ["active", "curly-hair", "smart"],
  bulldog: ["cozy", "sensitive-skin", "medium"],
  beagle: ["active", "chewer", "curious"],
  // Cats
  "maine-coon": ["large", "long-hair", "gentle"],
  siamese: ["vocal", "active", "short-hair"],
  persian: ["cozy", "long-hair", "calm"],
  "british-shorthair": ["cozy", "short-hair", "chill"],
  bengal: ["active", "short-hair", "climber"],
  ragdoll: ["cozy", "long-hair", "gentle"],
  sphynx: ["cozy", "hairless", "sensitive-skin"],
};

// Product slugs mapped to breed traits
const traitProductMap: Record<string, string[]> = {
  active: ["plush-squeaky-fox-toy", "squeaky-tennis-ball-3-pack", "nylon-reflective-leash", "adventure-pup-graphic-tee"],
  chewer: ["squeaky-tennis-ball-3-pack", "plush-squeaky-fox-toy"],
  "long-hair": ["slicker-grooming-brush", "gentle-pet-shampoo-16oz"],
  "curly-hair": ["slicker-grooming-brush", "gentle-pet-shampoo-16oz"],
  cozy: ["orthopedic-pet-bed-medium", "cozy-hoodie-pullover", "paws-and-relax-coloring-book"],
  outgoing: ["good-dog-club-tshirt", "adventure-pup-graphic-tee", "classic-plaid-bandana"],
  "sensitive-skin": ["gentle-pet-shampoo-16oz"],
  large: ["adjustable-collar-leather", "orthopedic-pet-bed-medium"],
  hairless: ["gentle-pet-shampoo-16oz", "cozy-hoodie-pullover"],
  climber: ["ventilated-travel-carrier"],
};

const questions: Question[] = [
  {
    id: "pet",
    question: "Dog or cat?",
    options: [
      { value: "dog", label: "Dog", emoji: "🐕" },
      { value: "cat", label: "Cat", emoji: "🐈" },
    ],
  },
  {
    id: "breed",
    question: "What breed?",
    options: [], // dynamically populated based on pet choice
    dynamic: true,
  },
  {
    id: "size",
    question: "What size is your pet?",
    options: [
      { value: "small", label: "Small", emoji: "🐾" },
      { value: "medium", label: "Medium", emoji: "🐕" },
      { value: "large", label: "Large", emoji: "🐩" },
    ],
  },
  {
    id: "vibe",
    question: "What's their vibe?",
    options: [
      { value: "active", label: "Active & Adventurous", emoji: "🏃" },
      { value: "cozy", label: "Cozy & Cuddly", emoji: "🛋️" },
      { value: "chewer", label: "Chewer & Destroyer", emoji: "🦷" },
      { value: "senior", label: "Senior & Chill", emoji: "😌" },
    ],
  },
  {
    id: "lookingFor",
    question: "What are you looking for?",
    options: [
      { value: "toys", label: "Toys & Play", emoji: "🎾" },
      { value: "apparel", label: "Apparel & Style", emoji: "👕" },
      { value: "essentials", label: "Essentials", emoji: "🛒" },
      { value: "accessories", label: "Accessories", emoji: "🎒" },
    ],
  },
];

function getRecommendations(answers: QuizAnswer, products: Product[]) {
  const recs: Product[] = [];
  const guideSlug = getDigitalGuide(answers);

  // Breed-specific recommendations (highest priority)
  const traits = breedTraits[answers.breed] || [];
  for (const trait of traits) {
    const slugs = traitProductMap[trait] || [];
    for (const slug of slugs) {
      if (recs.length >= 5) break;
      const p = products.find(pr => pr.slug === slug);
      if (p && !recs.find(r => r.id === p.id)) recs.push(p);
    }
  }

  // Vibe-based recommendations
  if (answers.vibe === "active") {
    const toy = products.find(p => p.slug === "plush-squeaky-fox-toy");
    if (toy && !recs.find(r => r.id === toy.id)) recs.push(toy);
    const leash = products.find(p => p.slug === "nylon-reflective-leash");
    if (leash && !recs.find(r => r.id === leash.id)) recs.push(leash);
  }
  if (answers.vibe === "cozy" || answers.vibe === "senior") {
    const bed = products.find(p => p.slug === "orthopedic-pet-bed-medium");
    if (bed && !recs.find(r => r.id === bed.id)) recs.push(bed);
    const hoodie = products.find(p => p.slug === "cozy-hoodie-pullover");
    if (hoodie && !recs.find(r => r.id === hoodie.id)) recs.push(hoodie);
  }
  if (answers.vibe === "chewer") {
    const balls = products.find(p => p.slug === "squeaky-tennis-ball-3-pack");
    if (balls && !recs.find(r => r.id === balls.id)) recs.push(balls);
  }

  // Size-based recommendations
  if (answers.size === "large" && answers.pet === "dog") {
    const collar = products.find(p => p.slug === "adjustable-collar-leather");
    if (collar && !recs.find(r => r.id === collar.id)) recs.push(collar);
  }
  if (answers.size === "small") {
    const carrier = products.find(p => p.slug === "ventilated-travel-carrier");
    if (carrier && !recs.find(r => r.id === carrier.id)) recs.push(carrier);
  }

  // Category picks
  const categoryMap: Record<string, string> = {
    toys: "plush-squeaky-fox-toy",
    apparel: "good-dog-club-tshirt",
    essentials: "stainless-steel-bowl-set",
    accessories: "personalized-engraved-id-tag",
  };
  const keySlug = categoryMap[answers.lookingFor];
  const keyProduct = products.find(p => p.slug === keySlug);
  if (keyProduct && !recs.find(r => r.id === keyProduct.id)) recs.push(keyProduct);

  // Always add staples if we have room
  if (recs.length < 5) {
    const staples = ["premium-clumping-cat-litter", "gentle-pet-shampoo-16oz", "eco-friendly-poop-bags-120ct"];
    for (const s of staples) {
      if (recs.length >= 5) break;
      const p = products.find(p => p.slug === s);
      if (p && !recs.find(r => r.id === p.id)) recs.push(p);
    }
  }

  return { products: recs.slice(0, 5), guideSlug };
}

function getDigitalGuide(answers: QuizAnswer): string {
  if (answers.breed === "maine-coon" || answers.breed === "siamese" || answers.breed === "persian" || answers.breed === "british-shorthair" || answers.breed === "bengal" || answers.breed === "ragdoll" || answers.breed === "sphynx" || answers.breed === "mixed-other-cat") {
    return "cat-behavior-decoder";
  }
  if (answers.breed === "labrador" || answers.breed === "golden-retriever" || answers.breed === "beagle" || answers.breed === "mixed-other-dog") {
    return "puppy-training-checklist";
  }
  if (answers.vibe === "active") return "pet-photo-tips-guide";
  if (answers.vibe === "cozy" || answers.vibe === "senior") return "paws-and-relax-coloring-book";
  if (answers.vibe === "chewer") return "pet-first-aid-emergency-care-guide";
  return "ultimate-pet-care-planner";
}

function getBreedLabel(breed: string): string {
  for (const opts of Object.values(breedOptions)) {
    const found = opts.find(o => o.value === breed);
    if (found) return found.label;
  }
  return breed;
}

function getSummary(answers: QuizAnswer): string {
  const vibeLabels: Record<string, string> = {
    active: "active",
    cozy: "cozy & cuddly",
    chewer: "tough chewer",
    senior: "chill senior",
  };
  return `Your perfect match: a ${vibeLabels[answers.vibe]} ${getBreedLabel(answers.breed)} looking for ${answers.lookingFor}!`;
}

function GiveawayCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(GIVEAWAY_STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function handleDismiss() {
    localStorage.setItem(GIVEAWAY_STORAGE_KEY, "1");
    setVisible(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input?.value) {
      alert("🎉 You're entered! Check your inbox for a confirmation email and welcome gift.");
      input.value = "";
      localStorage.setItem(GIVEAWAY_STORAGE_KEY, "1");
      setVisible(false);
    }
  }

  if (!visible) return null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-[#FF7F5C] bg-gradient-to-br from-[#FFF8F0] via-white to-[#E8F8F5] p-6 shadow-lg relative overflow-hidden">
      {/* Decorative confetti blobs */}
      <div className="absolute -top-4 -right-4 text-5xl opacity-20 select-none pointer-events-none">🎊</div>
      <div className="absolute -bottom-2 -left-2 text-4xl opacity-20 select-none pointer-events-none">🎁</div>

      <div className="relative text-center">
        <span className="text-4xl">🎁</span>
        <h3 className="font-heading mt-3 text-xl font-bold text-[#2D2D2D]">
          Win a Paw & Found Gift Box!
        </h3>
        <p className="mt-2 text-sm text-[#6B7280] max-w-md mx-auto">
          Enter your email for a chance to win a curated box of treats, toys, and essentials — plus you'll get
          our weekly pet care tips and exclusive deals.
        </p>

        <form
          className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="you@example.com"
            required
            className="w-64 rounded-xl border border-[#E9EDDE] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#6B7280] focus:border-[#FF7F5C] focus:outline-none"
          />
          <button type="submit" className="btn-primary">
            🎉 Enter to Win
          </button>
        </form>

        <button
          onClick={handleDismiss}
          className="mt-3 text-xs text-[#6B7280] hover:text-[#FF7F5C] underline underline-offset-2"
        >
          No thanks, just show me my results
        </button>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/quiz")({
  loader: async () => {
    const products = await loadProducts();
    return { products };
  },
  component: QuizPage,
  head: () => ({
    meta: [
      { title: "Pet Product Finder Quiz — Paw & Found" },
      { name: "description", content: "Find the perfect products for your pet in 5 quick questions. Answer about your pet's breed, size, and habits to get personalized product and digital-guide recommendations from Paw & Found." },
      { property: "og:title", content: "Pet Product Finder Quiz — Paw & Found" },
      { property: "og:description", content: "Find the perfect products for your pet in 5 quick questions — plus enter to win a Paw & Found gift box!" },
      { property: "og:url", content: `${SITE_URL}/quiz` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/quiz` }],
  }),
});

function QuizPage() {
  const { products } = Route.useLoaderData();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [results, setResults] = useState<{ products: Product[]; guideSlug: string } | null>(null);
  const [animating, setAnimating] = useState(false);

  // Get the current question, resolving dynamic breed options
  const currentQuestion = (() => {
    const q = questions[step];
    if (q.dynamic && q.id === "breed" && answers.pet) {
      return {
        ...q,
        options: breedOptions[answers.pet] || [],
      };
    }
    return q;
  })();

  function handleAnswer(key: keyof QuizAnswer, value: string) {
    // If answering pet type and moving to breed, advance immediately
    const newAnswers = { ...answers, [key]: value } as Partial<QuizAnswer>;
    setAnswers(newAnswers);
    setAnimating(true);
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setResults(getRecommendations(newAnswers as QuizAnswer, products));
      }
      setAnimating(false);
    }, 300);
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResults(null);
  }

  // Results view
  if (results) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-5xl">🎉</span>
          <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D]">Your Pet Picks Are Ready!</h1>
          <p className="mt-2 text-[#6B7280]">{getSummary(answers as QuizAnswer)}</p>
        </div>

        {/* Product Recommendations */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.products.map(product => (
            <a
              key={product.id}
              href={`/product/${product.slug}`}
              className="card group flex flex-col transition-all hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden bg-[#FFF8F0]">
                <img
                  src={product.image}
                  alt={`${product.name} — Paw & Found`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="badge">{product.category}</span>
                <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
                <span className="mt-auto pt-3 text-sm font-medium text-[#FF7F5C] group-hover:underline inline-flex items-center gap-1">
                  Shop Now
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Giveaway Email Capture Card */}
        <GiveawayCard />

        {/* Why these picks */}
        <div className="mt-6 rounded-xl border border-[#E9EDDE] bg-white p-5">
          <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">
            💡 Why these picks?
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Based on your {getBreedLabel(answers.breed || "")}'s traits — we matched products that fit their energy level, size, and grooming needs.
          </p>
        </div>

        {/* Digital Guide */}
        <div className="mt-4 rounded-xl border-2 border-[#2A9D8F] bg-[#2A9D8F]/5 p-5">
          <p className="font-heading text-sm font-semibold text-[#2A9D8F]">📚 You might also like</p>
          <p className="mt-1 text-sm text-[#6B7280]">We found a digital guide that matches your pet's needs!</p>
          <a href="/downloads" className="mt-3 btn-secondary text-sm inline-flex">Browse Digital Guides</a>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            🔄 Take the Quiz Again
          </button>
          <a href="/products" className="btn-secondary">
            🛍️ Browse All Products
          </a>
        </div>
      </div>
    );
  }

  const q = currentQuestion;
  const progress = ((step) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page heading for landing + question states */}
      <h1 className="font-heading mb-6 text-center text-3xl font-bold text-[#2D2D2D]">
        Find the Perfect Products for Your Pet
      </h1>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-[#6B7280] mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#E9EDDE] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF7F5C] to-[#F4A261] transition-all duration-500"
            style={{ width: `${Math.max(progress, 8)}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className={`transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100"}`}>
        <h2 className="font-heading text-2xl font-bold text-[#2D2D2D] text-center">{q.question}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {q.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(q.id, opt.value)}
              className="card group flex items-center gap-4 p-4 text-left transition-all hover:-translate-y-1 hover:border-[#FF7F5C] border-2 border-transparent"
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span className="font-heading font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

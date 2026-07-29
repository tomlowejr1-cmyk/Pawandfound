import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loadProducts, getProductBySlug } from "~/lib/products";
import type { Product } from "~/lib/types";

const SITE_URL = "https://pawandfound.store";

interface QuizAnswer {
  pet: "dog" | "cat";
  size: "small" | "medium" | "large";
  vibe: "active" | "cozy" | "chewer" | "senior";
  lookingFor: "toys" | "apparel" | "essentials" | "accessories";
}

interface Question {
  id: keyof QuizAnswer;
  question: string;
  options: { value: string; label: string; emoji: string }[];
}

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

// Map answers to product slugs and digital guide recommendations
function getRecommendations(answers: QuizAnswer, products: Product[]) {
  const recs: Product[] = [];
  const guideSlug = getDigitalGuide(answers);

  // Find matching products by category/vibe
  if (answers.vibe === "active") {
    const toy = products.find(p => p.slug === "plush-squeaky-fox-toy");
    if (toy) recs.push(toy);
  }
  if (answers.vibe === "cozy" || answers.vibe === "senior") {
    const bed = products.find(p => p.slug === "orthopedic-pet-bed-medium");
    if (bed) recs.push(bed);
  }
  if (answers.vibe === "chewer") {
    const toy = products.find(p => p.slug === "plush-squeaky-fox-toy");
    if (toy) recs.push(toy);
  }

  // Size-based recommendations
  if (answers.size === "large" && answers.pet === "dog") {
    const collar = products.find(p => p.slug === "adjustable-collar-leather");
    if (collar && !recs.find(r => r.id === collar.id)) recs.push(collar);
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

  // Always add a staple if we have < 3
  if (recs.length < 3) {
    const staples = ["premium-clumping-cat-litter", "gentle-pet-shampoo-16oz", "ventilated-travel-carrier"];
    for (const s of staples) {
      if (recs.length >= 3) break;
      const p = products.find(p => p.slug === s);
      if (p && !recs.find(r => r.id === p.id)) recs.push(p);
    }
  }

  return { products: recs.slice(0, 4), guideSlug };
}

function getDigitalGuide(answers: QuizAnswer): string {
  if (answers.pet === "cat") return "cat-behavior-decoder";
  if (answers.vibe === "active") return "pet-photo-tips-guide";
  if (answers.vibe === "cozy" || answers.vibe === "senior") return "paws-and-relax-coloring-book";
  if (answers.vibe === "chewer") return "pet-first-aid-emergency-care-guide";
  return "ultimate-pet-care-planner";
}

function getSummary(answers: QuizAnswer): string {
  const vibeLabels: Record<string, string> = {
    active: "active",
    cozy: "cozy & cuddly",
    chewer: "tough chewer",
    senior: "chill senior",
  };
  return `Your perfect match: a${answers.vibe === "active" ? "n" : ""} ${vibeLabels[answers.vibe]} ${answers.size} ${answers.pet} looking for ${answers.lookingFor}!`;
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
      { name: "description", content: "Find the perfect products for your pet in 4 quick questions!" },
      { property: "og:title", content: "Pet Product Finder Quiz — Paw & Found" },
      { property: "og:description", content: "Find the perfect products for your pet in 4 quick questions!" },
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

  function handleAnswer(key: keyof QuizAnswer, value: string) {
    const newAnswers = { ...answers, [key]: value };
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
          <span className="text-4xl">🎉</span>
          <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D]">Your Pet Picks Are Ready!</h1>
          <p className="mt-2 text-[#6B7280]">{getSummary(answers as QuizAnswer)}</p>
        </div>

        {/* Product Recommendations */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {results.products.map(product => (
            <a key={product.id} href={`/product/${product.slug}`} className="card group flex flex-col transition-all hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-[#E9EDDE]">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="badge">{product.category}</span>
                <h3 className="font-heading mt-2 font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">{product.name}</h3>
                <p className="mt-1 text-lg font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
                <span className="mt-3 btn-primary text-sm text-center">Shop Now</span>
              </div>
            </a>
          ))}
        </div>

        {/* Digital Guide */}
        <div className="mt-6 rounded-xl border-2 border-[#2A9D8F] bg-[#2A9D8F]/5 p-5">
          <p className="font-heading text-sm font-semibold text-[#2A9D8F]">📚 You might also like</p>
          <p className="mt-1 text-sm text-[#6B7280]">We found a digital guide that matches your pet's needs!</p>
          <a href="/downloads" className="mt-3 btn-secondary text-sm">Browse Digital Guides</a>
        </div>

        <div className="mt-8 text-center">
          <button onClick={reset} className="btn-primary">Take the Quiz Again</button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const progress = ((step) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-[#6B7280] mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#E9EDDE] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#FF7F5C] transition-all duration-500"
            style={{ width: `${Math.max(progress, 8)}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className={`transition-opacity duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100"}`}>
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
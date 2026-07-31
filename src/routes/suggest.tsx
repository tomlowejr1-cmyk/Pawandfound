import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const SITE_URL = "https://pawandfound.store";
const STORAGE_KEY = "pawandfound-suggestions";

interface Suggestion {
  productName: string;
  description: string;
  category: string;
  name: string;
  email: string;
  date: string;
}

function loadSuggestions(): Suggestion[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSuggestion(suggestion: Suggestion) {
  const existing = loadSuggestions();
  existing.push(suggestion);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export const Route = createFileRoute("/suggest")({
  component: SuggestPage,
  head: () => ({
    meta: [
      { title: "Request a Product — Paw & Found 💡" },
      { name: "description", content: "Couldn't find what you're looking for? Suggest a product and we'll do our best to carry it at Paw & Found." },
      { property: "og:title", content: "Request a Product — Paw & Found 💡" },
      { property: "og:description", content: "Tell us what product would make your pet's life better — we're listening!" },
      { property: "og:url", content: `${SITE_URL}/suggest` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/suggest` }],
  }),
});

function SuggestPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setTotalCount(loadSuggestions().length);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!productName.trim() || !description.trim()) return;

    saveSuggestion({
      productName: productName.trim(),
      description: description.trim(),
      category,
      name: name.trim(),
      email: email.trim(),
      date: new Date().toISOString(),
    });

    setSubmitted(true);
    setProductName("");
    setDescription("");
    setCategory("Other");
    setName("");
    setEmail("");
    setTotalCount((c) => c + 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-5xl">💡🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Request a Product
        </h1>
        <p className="mt-3 text-[#6B7280] max-w-lg mx-auto">
          What product would make your pet's life better? We're always looking to expand our catalog — and your suggestions help us decide what to carry next.
        </p>
        {totalCount > 0 && (
          <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#2A9D8F]/10 px-4 py-1.5 text-sm font-medium text-[#2A9D8F]">
            🎉 We've received {totalCount} suggestion{totalCount !== 1 ? "s" : ""} so far!
          </p>
        )}
      </div>

      {submitted ? (
        <div className="mt-8 rounded-2xl border-2 border-[#2A9D8F] bg-[#E8F8F5] p-8 text-center">
          <span className="text-4xl">🎉</span>
          <h2 className="font-heading mt-3 text-xl font-semibold text-[#2D2D2D]">Thank you!</h2>
          <p className="mt-2 text-[#6B7280]">We'll look into it and may reach out if we have questions.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-secondary mt-4 text-sm"
          >
            Submit Another Suggestion
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-[#E9EDDE] bg-white p-6 shadow-sm sm:p-8">
          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30"
            >
              <option value="Apparel">Apparel</option>
              <option value="Essentials">Essentials</option>
              <option value="Supplies">Supplies</option>
              <option value="Accessories">Accessories</option>
              <option value="Digital">Digital / eBooks</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
              Product Name <span className="text-[#FF7F5C]">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              placeholder='e.g., "Cooling mat for large dogs"'
              className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">
              Description <span className="text-[#FF7F5C]">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              placeholder="Tell us a bit about what you're looking for — brand, features, why your pet needs it..."
              className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30 resize-none"
            />
          </div>

          {/* Name + Email (optional) */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Your Name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Email (optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary mt-6 w-full text-base py-3">
            Submit Suggestion 🐾
          </button>
          <p className="mt-2 text-center text-xs text-[#6B7280]">
            Your suggestion helps us stock what pet parents actually need.
          </p>
        </form>
      )}
    </div>
  );
}

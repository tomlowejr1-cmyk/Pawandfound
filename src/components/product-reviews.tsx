import { useState, useEffect } from "react";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const STORAGE_KEY = (productId: string) => `pawandfound-reviews-${productId}`;

function loadReviews(productId: string): Review[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY(productId));
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveReviews(productId: string, reviews: Review[]) {
  localStorage.setItem(STORAGE_KEY(productId), JSON.stringify(reviews));
}

function StarRating({ rating, onRate, interactive = true }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          className={`text-lg ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"} ${star <= rating ? "text-[#F4A261]" : "text-[#D1D5DB]"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setReviews(loadReviews(productId));
  }, [productId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const review: Review = {
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    const updated = [review, ...reviews];
    setReviews(updated);
    saveReviews(productId, updated);
    setName("");
    setRating(5);
    setText("");
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const avg = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="mt-12 border-t border-[#E9EDDE] pt-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-xl font-semibold text-[#2D2D2D]">⭐ Reviews</h2>
        {avg && (
          <span className="text-sm text-[#6B7280]">
            {avg} avg · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </span>
        )}
      </div>

      {/* Write a Review button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="btn-secondary mt-4 text-sm"
        >
          Write a Review
        </button>
      )}

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 rounded-xl border border-[#E9EDDE] bg-[#FFF8F0] p-5">
          <div className="mb-3">
            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Your Rating</label>
            <StarRating rating={rating} onRate={setRating} />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Your Review</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={3}
              placeholder="Share your experience with this product..."
              className="w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[#FF7F5C] focus:outline-none focus:ring-1 focus:ring-[#FF7F5C]/30 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary text-sm px-6 py-2">Submit Review</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm px-6 py-2">Cancel</button>
          </div>
        </form>
      )}

      {/* Success message */}
      {submitted && (
        <p className="mt-3 text-sm text-[#2A9D8F] font-medium">✅ Thank you for your review!</p>
      )}

      {/* Reviews list */}
      {reviews.length === 0 && !showForm && (
        <p className="mt-4 text-sm text-[#6B7280]">Be the first to review this product!</p>
      )}

      {reviews.length > 0 && (
        <div className="mt-6 space-y-4">
          {reviews.map((review, i) => (
            <div key={i} className="rounded-xl border border-[#E9EDDE] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-semibold text-[#2D2D2D]">{review.name}</span>
                <span className="text-xs text-[#6B7280]">{review.date}</span>
              </div>
              <div className="mt-1">
                <StarRating rating={review.rating} interactive={false} />
              </div>
              <p className="mt-2 text-sm text-[#4A4A4A]">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
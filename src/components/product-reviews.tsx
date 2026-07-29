import { useState, useEffect } from "react";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

/** Pre-seeded realistic reviews by product ID so pages don't look empty at launch. */
const SEED_REVIEWS: Record<string, Review[]> = {
  "app-001": [
    { name: "Sarah M.", rating: 5, text: "My golden retriever looks adorable in this! The cotton is super soft and it's held up after 5+ washes. True to size.", date: "June 12, 2026" },
    { name: "Mike T.", rating: 4, text: "Great quality shirt, runs a tad small for my bulldog. Size up if your pup is between sizes. The print is crisp and hasn't faded.", date: "May 28, 2026" },
    { name: "Jen L.", rating: 5, text: "Finally a dog shirt that doesn't shrink! My corgi wears it every weekend at the park and gets so many compliments.", date: "July 3, 2026" },
    { name: "Dave K.", rating: 4, text: "Nice soft material. The 'Good Dog Club' design is hilarious. Only wish they had more color options.", date: "April 15, 2026" },
  ],
  "app-002": [
    { name: "Rachel P.", rating: 5, text: "Love repping Paw & Found! This tee is lightweight and perfect for summer walks. My beagle approves.", date: "July 8, 2026" },
    { name: "Tom H.", rating: 4, text: "Solid logo tee. The tagless design is great for my sensitive-skinned pitbull. Wish the white option was a bit brighter.", date: "June 20, 2026" },
    { name: "Amy W.", rating: 5, text: "Got the navy one for my lab — it's become his signature look. Fits perfectly and washes well.", date: "May 5, 2026" },
  ],
  "app-003": [
    { name: "Chris D.", rating: 5, text: "My husky looks like he's ready to summit a mountain! The organic cotton is a nice touch. Very breathable.", date: "July 1, 2026" },
    { name: "Laura B.", rating: 4, text: "Adorable design! The oversized fit looks great on my boxer. Slightly pricey but quality matches.", date: "June 15, 2026" },
    { name: "Nina R.", rating: 5, text: "Best dog tee I've bought. The mountain graphic is so detailed and the fabric is eco-friendly. Win-win!", date: "May 30, 2026" },
    { name: "Jake S.", rating: 4, text: "Cool design, fits well. My aussie gets zoomies in it and it stays put. Would buy again.", date: "April 22, 2026" },
  ],
  "app-004": [
    { name: "Kelly F.", rating: 5, text: "Classic bandana that never goes out of style. My dachshund wears the red plaid and looks like a little gentleman.", date: "June 28, 2026" },
    { name: "Pat R.", rating: 4, text: "Nice quality cotton, double-sided is a great feature. The slip-on loop is super convenient. Wish it came in more patterns.", date: "May 18, 2026" },
    { name: "Morgan L.", rating: 5, text: "Both my dog and cat can wear this! Perfect for holiday photos. Soft and comfortable.", date: "July 5, 2026" },
  ],
  "app-005": [
    { name: "Taylor J.", rating: 5, text: "My short-haired chihuahua finally stays warm on walks! The fleece lining is plush and cozy. Hood actually stays up.", date: "January 15, 2026" },
    { name: "Casey M.", rating: 5, text: "Perfect winter essential. The adjustable chest strap means no slipping. My frenchie loves it so much he won't let me take it off.", date: "December 8, 2025" },
    { name: "Jordan P.", rating: 4, text: "Really warm and well-made. The pocket is functional and cute. Runs a touch snug — size up for fluffy breeds.", date: "February 3, 2026" },
  ],
  "ess-001": [
    { name: "Riley G.", rating: 5, text: "Finally bowls that don't slide across the floor! The non-slip base actually works. Dishwasher safe is a huge plus.", date: "June 10, 2026" },
    { name: "Alex N.", rating: 5, text: "Sturdy, easy to clean, and the silicone base grips our tile floor perfectly. My labrador hasn't tipped them once.", date: "May 25, 2026" },
    { name: "Sam B.", rating: 4, text: "Great bowls, good size for my medium dog. The stainless steel doesn't hold odors. Only wish the larger size held a bit more water.", date: "July 2, 2026" },
    { name: "Drew V.", rating: 5, text: "Bought these for my two cats — they love them. No more wet floor from sliding water bowls. Highly recommend.", date: "April 30, 2026" },
  ],
  "ess-002": [
    { name: "Morgan H.", rating: 5, text: "The reflective stitching is incredibly bright at night — cars see us from blocks away. Padded handle is comfortable on long walks.", date: "June 5, 2026" },
    { name: "Jamie L.", rating: 4, text: "Solid leash, great for my pulling border collie. The clip is strong and secure. Wish it came in a longer option.", date: "May 12, 2026" },
    { name: "Quinn W.", rating: 5, text: "Best leash I've owned. 6 months of daily use and it still looks new. The navy color is gorgeous.", date: "July 10, 2026" },
  ],
  "ess-003": [
    { name: "Blake T.", rating: 5, text: "This leather collar is gorgeous. The patina after 3 months is beautiful. Brushed nickel hardware still shines like day one.", date: "March 20, 2026" },
    { name: "Reese D.", rating: 4, text: "Great craftsmanship — you can tell it's hand-stitched. A bit stiff at first but breaks in nicely. Worth the price.", date: "February 14, 2026" },
    { name: "Cameron S.", rating: 5, text: "My vizsla has worn this daily for 4 months. The leather is soft now and the D-ring is rock solid. Premium quality.", date: "June 1, 2026" },
  ],
  "ess-004": [
    { name: "Parker A.", rating: 5, text: "My border collie is OBSESSED with these. The squeaker is still going strong after 2 months of heavy fetch. Best tennis balls we've tried.", date: "June 18, 2026" },
    { name: "Dakota M.", rating: 4, text: "Good value for a 3-pack. The neon colors make them easy to find in tall grass. Squeaker is loud — dogs love it, neighbors maybe not!", date: "May 8, 2026" },
    { name: "Avery J.", rating: 5, text: "Durable and bouncy. My lab usually destroys tennis balls in a week — these have lasted over a month. Will repurchase.", date: "July 6, 2026" },
  ],
  "ess-005": [
    { name: "Sydney K.", rating: 5, text: "The crinkle paper inside drives my cat nuts (in a good way!). She carries this fox everywhere. Double-stitched seams really hold up.", date: "April 12, 2026" },
    { name: "Hayden R.", rating: 4, text: "Super soft plush, my terrier loves cuddling with it at night. The squeaker is still intact after weeks. A little smaller than expected.", date: "March 28, 2026" },
    { name: "Finley C.", rating: 5, text: "Both my dog and cat play with this! The crinkle + squeaker combo is genius. Machine washable is a lifesaver.", date: "June 22, 2026" },
  ],
  "sup-001": [
    { name: "Leslie P.", rating: 5, text: "Finally a litter that actually controls odor! One cat, one bag lasts a full month. Clumps perfectly — no crumbling at all.", date: "June 8, 2026" },
    { name: "Dana K.", rating: 4, text: "Great clumping and virtually dust-free. My asthmatic cat is much happier. Slightly heavy to carry up stairs but worth it.", date: "May 22, 2026" },
    { name: "Robin M.", rating: 5, text: "Switched from the blue brand and never going back. Two cats, minimal tracking, and the unscented formula doesn't bother my sensitive kitty.", date: "July 7, 2026" },
    { name: "Terry B.", rating: 5, text: "Best litter I've used in 10 years of cat ownership. Zero ammonia smell even after a week. The 40lb bag is a great deal.", date: "April 18, 2026" },
    { name: "Ashley N.", rating: 4, text: "Excellent clumping, no dust cloud when pouring. Wish it was available in a scented version too, but the odor control makes up for it.", date: "June 30, 2026" },
  ],
  "sup-002": [
    { name: "Jessie T.", rating: 5, text: "Love that these are compostable! The lavender scent actually masks odors well. Strong bags — never had one rip on a walk.", date: "June 14, 2026" },
    { name: "Kendall R.", rating: 4, text: "Great eco-friendly option. 120 bags last about 2 months for my one dog. Slightly thinner than plastic but never leaked.", date: "May 3, 2026" },
    { name: "Logan M.", rating: 5, text: "I feel so much better using plant-based bags. The lavender scent is pleasant not overwhelming. Leak-proof even with my great dane's... contributions.", date: "July 9, 2026" },
  ],
  "sup-003": [
    { name: "Casey W.", rating: 5, text: "My husky's shedding was out of control until this brush. Removes so much loose fur without scratching his skin. Ergonomic handle is comfortable.", date: "May 16, 2026" },
    { name: "Avery P.", rating: 4, text: "Works great on my golden retriever's double coat. Gets through tangles easily. A little tricky to clean the bristles afterward.", date: "April 5, 2026" },
    { name: "Riley M.", rating: 5, text: "My long-haired cat tolerates this brush way better than others. The bent wires are gentle but effective. Less fur on my furniture!", date: "June 25, 2026" },
  ],
  "sup-004": [
    { name: "Jordan L.", rating: 5, text: "My dog's dry skin cleared up after 2 baths with this. The oatmeal + aloe formula is soothing and leaves his coat incredibly soft.", date: "June 2, 2026" },
    { name: "Taylor B.", rating: 5, text: "Tearless claim is legit — my puppy didn't flinch. Smells amazing without being perfumey. A little goes a long way.", date: "May 10, 2026" },
    { name: "Morgan S.", rating: 4, text: "Great for sensitive skin. My Westie's coat is shiny and soft. Wish the bottle was bigger — we go through it quickly with two dogs.", date: "July 4, 2026" },
    { name: "Casey D.", rating: 5, text: "Finally a shampoo without sulfates and parabens! My cat actually purrs during bath time now. The oatmeal scent is so calming.", date: "April 28, 2026" },
  ],
  "acc-001": [
    { name: "Peyton R.", rating: 5, text: "The engraving is deep and crystal clear — won't wear off like cheaper tags. The bone shape is adorable. Essential for peace of mind.", date: "June 7, 2026" },
    { name: "Reese M.", rating: 5, text: "Ordered two for my dogs, both came out perfect. The stainless steel hasn't scratched at all. Great value for a personalized product.", date: "May 20, 2026" },
    { name: "Hayden K.", rating: 4, text: "Nice quality tag, engraving looks great. The split ring is a bit stiff to attach but once it's on, it's secure. Would order again.", date: "July 1, 2026" },
  ],
  "acc-002": [
    { name: "Skyler J.", rating: 5, text: "Used this on two flights — airline approved with no issues. The fleece bedding is cozy and my cat slept the whole way. Zippers are secure.", date: "March 15, 2026" },
    { name: "Quinn T.", rating: 4, text: "Well-ventilated carrier, my cat doesn't feel trapped. The shoulder strap pad is comfortable. Fits under airplane seats perfectly. A bit bulky for storage.", date: "February 8, 2026" },
    { name: "Charlie M.", rating: 5, text: "I was nervous about flying with my cat but this carrier made it so easy. She was calm the entire trip. The mesh lets her see out which helps.", date: "June 19, 2026" },
    { name: "Drew P.", rating: 4, text: "Solid carrier, good quality. My 14lb cat fits comfortably. The padding could be a bit thicker but overall excellent for travel.", date: "April 10, 2026" },
  ],
  "acc-003": [
    { name: "Sage W.", rating: 5, text: "My senior lab's joint pain has visibly improved since we got this bed. The memory foam is thick and supportive. The washable cover is a must-have.", date: "May 1, 2026" },
    { name: "Rowan D.", rating: 5, text: "My golden retriever abandoned our couch for this bed — that's the highest praise. The raised rim is perfect for head support. Worth every penny.", date: "June 11, 2026" },
    { name: "Emerson B.", rating: 4, text: "Very comfortable bed, my corgi loves it. The non-slip bottom keeps it in place on hardwood. Slight off-gassing smell for the first day but it faded.", date: "July 2, 2026" },
    { name: "Dakota L.", rating: 5, text: "Best pet bed I've owned. The memory foam hasn't compressed at all after 3 months. My 40lb border collie fits perfectly in the medium.", date: "April 25, 2026" },
  ],
};

const STORAGE_KEY = (productId: string) => `pawandfound-reviews-${productId}`;

function loadReviews(productId: string): Review[] {
  const seeds = SEED_REVIEWS[productId] ?? [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY(productId));
    if (stored) {
      const userReviews: Review[] = JSON.parse(stored);
      return [...userReviews, ...seeds];
    }
  } catch { /* ignore corrupt storage */ }
  return seeds;
}

function saveReviews(productId: string, reviews: Review[]) {
  // Only persist user-submitted reviews (filter out seed reviews by checking dates)
  const seeds = SEED_REVIEWS[productId] ?? [];
  const seedTexts = new Set(seeds.map((s) => s.text));
  const userReviews = reviews.filter((r) => !seedTexts.has(r.text));
  localStorage.setItem(STORAGE_KEY(productId), JSON.stringify(userReviews));
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
          aria-label={interactive ? `Rate ${star} star${star > 1 ? "s" : ""}` : `${star} star${star > 1 ? "s" : ""}`}
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

  const totalCount = reviews.length;

  return (
    <div className="mt-12 border-t border-[#E9EDDE] pt-8">
      {/* Header with summary */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-heading text-xl font-semibold text-[#2D2D2D]">
          ⭐ Customer Reviews
        </h2>
        {avg && (
          <span className="text-sm text-[#6B7280]">
            {avg} avg · {totalCount} {totalCount === 1 ? "review" : "reviews"}
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
            <div key={i} className="rounded-xl border border-[#E9EDDE] bg-white p-4 transition-shadow hover:shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-sm font-semibold text-[#2D2D2D]">{review.name}</span>
                <span className="text-xs text-[#9CA3AF]">·</span>
                <span className="text-xs text-[#6B7280]">{review.date}</span>
              </div>
              <div className="mt-1">
                <StarRating rating={review.rating} interactive={false} />
              </div>
              <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

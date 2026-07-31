/**
 * Cross-sell product pairings for "Frequently Bought Together" widget.
 * Keys are product slugs, values are arrays of complementary product slugs.
 */
const crossSellMap: Record<string, string[]> = {
  // Apparel
  "good-dog-club-tshirt": ["classic-plaid-bandana", "nylon-reflective-leash"],
  "paw-found-logo-tee": ["personalized-engraved-id-tag", "eco-friendly-poop-bags-120ct"],
  "adventure-pup-graphic-tee": ["nylon-reflective-leash", "squeaky-tennis-ball-3-pack"],
  "classic-plaid-bandana": ["good-dog-club-tshirt", "personalized-engraved-id-tag"],
  "cozy-hoodie-pullover": ["orthopedic-pet-bed-medium", "adjustable-collar-leather"],

  // Essentials
  "stainless-steel-bowl-set": ["premium-clumping-cat-litter", "gentle-pet-shampoo-16oz"],
  "nylon-reflective-leash": ["eco-friendly-poop-bags-120ct", "squeaky-tennis-ball-3-pack"],
  "adjustable-collar-leather": ["personalized-engraved-id-tag", "nylon-reflective-leash"],
  "squeaky-tennis-ball-3-pack": ["plush-squeaky-fox-toy", "nylon-reflective-leash"],
  "plush-squeaky-fox-toy": ["squeaky-tennis-ball-3-pack", "stainless-steel-bowl-set"],

  // Supplies
  "premium-clumping-cat-litter": ["eco-friendly-poop-bags-120ct", "ventilated-travel-carrier"],
  "eco-friendly-poop-bags-120ct": ["nylon-reflective-leash", "premium-clumping-cat-litter"],
  "slicker-grooming-brush": ["gentle-pet-shampoo-16oz", "orthopedic-pet-bed-medium"],
  "gentle-pet-shampoo-16oz": ["slicker-grooming-brush", "stainless-steel-bowl-set"],

  // Accessories
  "personalized-engraved-id-tag": ["adjustable-collar-leather", "classic-plaid-bandana"],
  "ventilated-travel-carrier": ["eco-friendly-poop-bags-120ct", "stainless-steel-bowl-set"],
  "orthopedic-pet-bed-medium": ["cozy-hoodie-pullover", "slicker-grooming-brush"],
};

/**
 * Cart-based upsell suggestions — contextual to cart contents.
 * Returns up to 4 product slugs based on what's in the cart.
 */
export function getCartUpsells(cartSlugs: string[]): string[] {
  const upsells: Set<string> = new Set();

  for (const slug of cartSlugs) {
    const related = crossSellMap[slug];
    if (related) {
      for (const r of related) {
        if (!cartSlugs.includes(r)) upsells.add(r);
      }
    }
  }

  // Fallback: popular essentials
  if (upsells.size < 4) {
    const fallbacks = [
      "eco-friendly-poop-bags-120ct",
      "gentle-pet-shampoo-16oz",
      "squeaky-tennis-ball-3-pack",
      "stainless-steel-bowl-set",
      "premium-clumping-cat-litter",
    ];
    for (const f of fallbacks) {
      if (upsells.size >= 4) break;
      if (!cartSlugs.includes(f)) upsells.add(f);
    }
  }

  return Array.from(upsells).slice(0, 4);
}

export default crossSellMap;

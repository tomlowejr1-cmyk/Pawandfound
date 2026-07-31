import { useState, useMemo } from "react";
import { useCart } from "~/lib/cart-context";
import crossSellMap from "~/lib/cross-sells";
import type { Product } from "~/lib/types";

interface FBTProps {
  currentSlug: string;
  allProducts: Product[];
}

/**
 * "Frequently Bought Together" widget for product detail pages.
 * Shows 2-3 complementary products with checkboxes, a bundle discount,
 * and an "Add Selected to Cart" button.
 */
export function FrequentlyBoughtTogether({ currentSlug, allProducts }: FBTProps) {
  const { addItem } = useCart();

  const crossSellSlugs = crossSellMap[currentSlug];
  if (!crossSellSlugs || crossSellSlugs.length === 0) return null;

  const crossSellProducts = crossSellSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 3);

  if (crossSellProducts.length === 0) return null;

  const allItems = crossSellProducts;
  const [selected, setSelected] = useState<Set<string>>(
    new Set(allItems.map((p) => p.id))
  );

  const toggleProduct = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedProducts = allItems.filter((p) => selected.has(p.id));
  const allSelected = selectedProducts.length === allItems.length;
  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = allSelected ? 0.05 : 0; // 5% when all selected
  const discountedTotal = subtotal * (1 - bundleDiscount);
  const savings = subtotal * bundleDiscount;

  const handleAddSelected = () => {
    for (const product of selectedProducts) {
      addItem(product, false);
    }
  };

  return (
    <section className="mt-16 rounded-2xl border border-[#E9EDDE] bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🧺</span>
        <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">
          Frequently Bought Together
        </h2>
        {allSelected && (
          <span className="inline-flex items-center rounded-full bg-[#FF7F5C]/10 px-3 py-1 text-xs font-semibold text-[#FF7F5C]">
            Save 5% on bundle
          </span>
        )}
      </div>

      {/* Product selectors */}
      <div className="space-y-3 mb-6">
        {allItems.map((product) => {
          const isSelected = selected.has(product.id);
          return (
            <label
              key={product.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-3 transition-all ${
                isSelected
                  ? "border-[#FF7F5C]/30 bg-[#FFF8F0]"
                  : "border-[#E9EDDE] bg-white hover:border-[#FF7F5C]/20"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleProduct(product.id)}
                className="h-4 w-4 accent-[#FF7F5C] flex-shrink-0"
              />
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#FFF8F0]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={`/product/${product.slug}`}
                  className="block font-heading text-sm font-semibold text-[#2D2D2D] hover:text-[#FF7F5C] truncate"
                >
                  {product.name}
                </a>
                <p className="text-xs text-[#6B7280]">{product.category}</p>
              </div>
              <span className="flex-shrink-0 text-sm font-bold text-[#FF7F5C]">
                ${product.price.toFixed(2)}
              </span>
            </label>
          );
        })}
      </div>

      {/* Total & CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#E9EDDE]">
        <div>
          {allSelected && bundleDiscount > 0 ? (
            <div>
              <p className="text-xs text-[#6B7280]">
                <span className="line-through">${subtotal.toFixed(2)}</span>
                {" "}→ bundle price
              </p>
              <p className="font-heading text-lg font-bold text-[#FF7F5C]">
                ${discountedTotal.toFixed(2)}
                <span className="ml-2 text-xs font-medium text-[#2A9D8F]">
                  (save ${savings.toFixed(2)})
                </span>
              </p>
            </div>
          ) : (
            <p className="font-heading text-lg font-bold text-[#2D2D2D]">
              ${subtotal.toFixed(2)}
            </p>
          )}
          <p className="text-xs text-[#6B7280]">
            {selectedProducts.length} {selectedProducts.length === 1 ? "item" : "items"} selected
          </p>
        </div>

        <button
          onClick={handleAddSelected}
          disabled={selectedProducts.length === 0}
          className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🛒 Add Selected to Cart
        </button>
      </div>
    </section>
  );
}

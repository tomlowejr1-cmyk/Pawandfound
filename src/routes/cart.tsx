import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "~/lib/cart-context";

const SITE_URL = "https://www.pawandfound.store";

/**
 * Cart is intentionally checkout-free: Paw & Found is a digital-only store and
 * every physical product is off sale, so nothing here can be ordered. The page
 * stays live (noindex) so old links and stored carts land somewhere honest.
 */
export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Cart — Paw & Found" },
      {
        name: "description",
        content:
          "Paw & Found is a digital-only store — physical products are not currently available for purchase. Digital guides download instantly.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Cart — Paw & Found" },
      { property: "og:url", content: `${SITE_URL}/cart` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cart` }],
  }),
});

function CartPage() {
  const { items, removeItem, clearCart, itemCount, total } = useCart();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
        Your Cart
      </h1>

      <div className="mt-6 rounded-xl border border-[#E9EDDE] bg-[#FFF8F0] p-6">
        <p className="font-heading text-lg font-semibold text-[#2D2D2D]">
          🕒 Nothing here can be ordered yet
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
          Paw &amp; Found is a digital-only store right now. Our physical products — apparel, toys,
          beds, bowls, litter and grooming supplies — are not available for purchase while we sort
          out a supplier, so there is no checkout for them.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
          Everything we do sell is an instant download: guides, planners, printables, coloring books
          and bundles, from $3.99.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/downloads" className="btn-primary text-sm">
            Browse digital guides
          </a>
          <a
            href="/gifts"
            className="rounded-full border border-[#2A9D8F] px-6 py-3 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#E8F8F5]"
          >
            See the digital gift guide
          </a>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-[#2D2D2D]">
              Saved items ({itemCount})
            </h2>
            <button
              onClick={clearCart}
              className="text-sm text-[#6B7280] hover:text-[#FF7F5C]"
            >
              Clear list
            </button>
          </div>
          <p className="mt-1 text-sm text-[#6B7280]">
            These were saved before the store went digital-only. They can't be bought at the
            moment — you can clear them out below.
          </p>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-[#E9EDDE] bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[#2D2D2D]">{item.product.name}</p>
                  <p className="text-xs text-[#6B7280]">
                    ${item.product.price.toFixed(2)} &middot; qty {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-[#E9EDDE] bg-[#F9FAF5] px-3 py-1.5 text-xs font-semibold text-[#B0B7A3]">
                    Not available yet
                  </span>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="rounded-full p-2 text-[#6B7280] hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C]"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[#6B7280]">
            Saved list total: <span className="font-semibold text-[#2D2D2D]">${total.toFixed(2)}</span>{" "}
            — for reference only, nothing will be charged.
          </p>
        </div>
      )}
    </div>
  );
}

import type { Product } from "~/lib/types";

interface ShopTheLookProps {
  products: Product[];
}

export function ShopTheLook({ products }: ShopTheLookProps) {
  if (!products.length) return null;

  return (
    <div className="mt-8 rounded-xl border border-[#E9EDDE] bg-[#FFF8F0] p-4 sm:p-6">
      <h3 className="font-heading text-lg font-semibold text-[#2D2D2D]">
        🛍️ Shop the Look
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <a
            key={product.id}
            href={`/product/${product.slug}`}
            className="card group flex flex-col transition-all hover:-translate-y-1"
          >
            <div className="aspect-square overflow-hidden bg-[#E9EDDE]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h4 className="font-heading text-sm font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
                {product.name}
              </h4>
              <p className="mt-1 text-sm font-bold text-[#FF7F5C]">${product.price.toFixed(2)}</p>
              <span className="mt-2 text-xs font-medium text-[#2A9D8F] group-hover:underline">Shop →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
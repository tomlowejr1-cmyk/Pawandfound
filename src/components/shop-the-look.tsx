import type { Product } from "~/lib/types";

interface ShopTheLookProps {
  products: Product[];
}

export function ShopTheLook({ products }: ShopTheLookProps) {
  if (!products.length) return null;

  return (
    <div className="mt-8 rounded-xl border border-[#FF7F5C]/20 bg-[#FFF8F0] p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-1 h-5 rounded-full bg-[#FF7F5C]" />
        <h3 className="font-heading text-lg font-semibold text-[#2D2D2D]">
          Shop This Article
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <a
            key={product.id}
            href={`/product/${product.slug}`}
            className="card group flex flex-col transition-all hover:-translate-y-1"
          >
            <div className="aspect-square overflow-hidden bg-white">
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
              <p className="mt-1 text-sm font-bold text-[#FF7F5C]">
                ${product.price.toFixed(2)}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#FF7F5C] group-hover:underline">
                Shop Now
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

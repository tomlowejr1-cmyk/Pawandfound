import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
  head: () => ({
    meta: [
      { title: "Order Confirmed — Paw & Found" },
      {
        name: "description",
        content: "Your order has been placed successfully! Thank you for shopping with Paw & Found.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://pawandfound.store/thank-you" }],
  }),
});

function ThankYouPage() {
  useEffect(() => {
    // Clear abandoned cart tracking flags on order completion
    localStorage.removeItem("pawandfound-cart-visited-at");
    localStorage.removeItem("pawandfound-banner-dismissed-at");
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mb-8 text-6xl">🐾</div>
      <h1 className="font-heading text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
        Thank You for Your Order!
      </h1>
      <p className="mt-4 text-lg text-[#6B7280]">
        Your order has been placed successfully. You'll receive a confirmation email from Stripe shortly.
      </p>
      <div className="mt-8 rounded-xl border border-[#E9EDDE] bg-[#FFF8F0] p-6 text-left">
        <h2 className="font-heading text-lg font-semibold text-[#2D2D2D]">What happens next?</h2>
        <ul className="mt-4 space-y-3 text-sm text-[#6B7280]">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#2A9D8F]">✓</span>
            <span><strong>Order confirmation</strong> — Check your email for your receipt from Stripe</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#2A9D8F]">✓</span>
            <span><strong>Shipping</strong> — We'll process and ship your order within 1-2 business days</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#2A9D8F]">✓</span>
            <span><strong>Free shipping</strong> on orders over $50</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#2A9D8F]">✓</span>
            <span><strong>Returns</strong> — 30-day return policy, no questions asked</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#2A9D8F]">✓</span>
            <span>
              <strong>Digital products</strong> — For digital guides and recipe books, check your email for the download link from Stripe.
              If you don't see it, check your spam folder.
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href="/products"
          className="btn-primary"
        >
          Continue Shopping
        </a>
        <a
          href="/"
          className="btn-secondary"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

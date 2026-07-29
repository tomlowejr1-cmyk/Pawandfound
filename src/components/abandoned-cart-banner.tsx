import { useState, useEffect } from "react";

const CART_STORAGE_KEY = "pawandfound-cart";
const CART_VISITED_KEY = "pawandfound-cart-visited-at";
const BANNER_DISMISSED_KEY = "pawandfound-banner-dismissed-at";
const ABANDONED_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function hasCartItems(): boolean {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return false;
    const items = JSON.parse(stored);
    return Array.isArray(items) && items.length > 0;
  } catch {
    return false;
  }
}

function shouldShowBanner(): boolean {
  // Check if banner was dismissed within last 24 hours
  const dismissedAt = localStorage.getItem(BANNER_DISMISSED_KEY);
  if (dismissedAt) {
    const dismissedTime = parseInt(dismissedAt, 10);
    if (Date.now() - dismissedTime < DISMISS_DURATION_MS) return false;
  }

  // Check if user has cart items
  if (!hasCartItems()) return false;

  // Check if user visited cart page more than 5 minutes ago
  const visitedAt = localStorage.getItem(CART_VISITED_KEY);
  if (!visitedAt) return false;
  const visitedTime = parseInt(visitedAt, 10);
  return Date.now() - visitedTime > ABANDONED_THRESHOLD_MS;
}

export function AbandonedCartBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    // Only show on non-cart, non-thank-you pages
    const path = window.location.pathname;
    if (path === "/cart" || path === "/thank-you") return;

    // Delay check slightly for hydration
    const timer = setTimeout(() => {
      if (shouldShowBanner()) {
        setVisible(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Record cart visit on the cart page
  useEffect(() => {
    if (window.location.pathname === "/cart") {
      localStorage.setItem(CART_VISITED_KEY, Date.now().toString());
    }
  }, []);

  function handleDismiss() {
    setDismissing(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, Date.now().toString());
    setTimeout(() => setVisible(false), 300);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        dismissing ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#FF7F5C] px-4 py-3 text-white shadow-lg sm:px-6">
          {/* Icon */}
          <span className="flex-shrink-0 text-xl">🐾</span>

          {/* Message */}
          <p className="flex-1 text-sm font-medium">
            You left some goodies in your cart!
            <a
              href="/cart"
              className="ml-2 inline-flex items-center gap-1 font-bold underline hover:text-white/80 transition-colors"
            >
              View Cart
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </p>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 rounded-lg p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
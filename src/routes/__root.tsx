import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { CartProvider } from "~/lib/cart-context";
import { NewsletterSignup } from "~/components/newsletter-signup";
import { AbandonedCartBanner } from "~/components/abandoned-cart-banner";
import { Analytics } from "@vercel/analytics/react";

import appCss from "~/styles/app.css?url";

const SITE_URL = "https://pawandfound.store";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

function ga4Scripts(): Array<Record<string, unknown>> {
  if (!GA_MEASUREMENT_ID) return [];
  return [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
      async: true,
    },
    {
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
    },
  ];
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "msvalidate.01", content: "1FBCC58E80A8CCC2899FC7AFDD1B2CBE" },
      // Google Business Profile verification — replace content with your code from business.google.com
      { name: "google-site-verification", content: "REPLACE_WITH_GBP_VERIFICATION_CODE" },
      { title: "Paw & Found — Pet Supplies & Apparel" },
      {
        name: "description",
        content:
          "Your one-stop shop for pet apparel, essentials, supplies, and accessories. From trendy T-shirts to cat litter, find everything your pet needs.",
      },
      // Open Graph defaults
      { property: "og:site_name", content: "Paw & Found" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "Paw & Found — Pet Supplies & Apparel" },
      {
        property: "og:description",
        content:
          "Your one-stop shop for pet apparel, essentials, supplies, and accessories. From trendy T-shirts to cat litter, find everything your pet needs.",
      },
      { property: "og:image", content: `${SITE_URL}/images/logo.png` },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Paw & Found — Pet Supplies & Apparel" },
      {
        name: "twitter:description",
        content:
          "Your one-stop shop for pet apparel, essentials, supplies, and accessories.",
      },
      { name: "twitter:image", content: `${SITE_URL}/images/logo.png` },
    ],
    scripts: [
      {
        src: "https://cloud.umami.is/script.js",
        defer: true,
        "data-website-id": "2603f067-8baf-4463-a091-f83f28f3cb49",
      },
      ...ga4Scripts(),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Paw & Found",
          url: SITE_URL,
          logo: `${SITE_URL}/images/logo.png`,
          description:
            "Pet product store making it dead simple to find exactly what your pet needs — from trendy T-shirts to everyday essentials like cat litter.",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-123-7297",
            contactType: "customer service",
          },
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[#FFF8F0] px-6 text-center">
      <span className="text-6xl">🐾</span>
      <h1 className="font-heading text-2xl font-bold text-[#2D2D2D]">Page not found</h1>
      <p className="text-[#6B7280]">Looks like this page wandered off!</p>
      <a href="/" className="btn-primary mt-2">
        Back to Home
      </a>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <CartProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </CartProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <PromoBanner />
        <Header />
        <main className="min-h-[calc(100dvh-12rem)]">{children}</main>
        <Footer />
        <AbandonedCartBanner />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

function PromoBanner() {
  const DISMISS_KEY = "pawandfound-promo-dismissed";
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DISMISS_KEY);
      if (stored) {
        const ts = parseInt(stored, 10);
        if (Date.now() - ts < 24 * 60 * 60 * 1000) {
          setDismissed(true);
        } else {
          localStorage.removeItem(DISMISS_KEY);
        }
      }
    } catch { /* ignore */ }
  }, []);

  if (dismissed) return null;

  function handleDismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch { /* ignore */ }
    setDismissed(true);
  }

  return (
    <div className="relative bg-gradient-to-r from-[#FF7F5C] via-[#FF7F5C] to-[#F4A261] px-4 py-2.5 text-center text-sm font-medium text-white animate-pulse">
      <span className="inline-flex items-center gap-1.5">
        🐾 <strong>Welcome!</strong> Take <strong>15% off</strong> your first order with code{" "}
        <span className="inline-block rounded bg-white/20 px-2 py-0.5 font-mono font-bold tracking-wider">
          WELCOME15
        </span>
      </span>{" "}
      <a href="/products" className="underline decoration-white/50 hover:text-white/90">Shop now →</a>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop All" },
    { href: "/products?category=Apparel", label: "Apparel" },
    { href: "/products?category=Essentials", label: "Essentials" },
    { href: "/products?category=Supplies", label: "Supplies" },
    { href: "/products?category=Accessories", label: "Accessories" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/quiz", label: "Quiz" },
    { href: "/training", label: "Training Videos 🎓" },
    { href: "/budget-tracker", label: "Budget Tracker 💰" },
    { href: "/downloads", label: "Digital Guides" },
    { href: "/downloads#premium-ebooks", label: "eBooks" },
    { href: "/freebies/pet-birthday-card", label: "Freebies" },
    { href: "/gift-cards", label: "Gift Cards 🎁" },
    { href: "/refer-a-friend", label: "Refer a Friend 💌" },
    { href: "/birthday-club", label: "Birthday Club 🎂" },
    { href: "/pet-reminders", label: "Pet Reminders ⏰" },
    { href: "/pet-name-generator", label: "Pet Name Generator ✨" },
    { href: "/adopt", label: "Adopt ❤️" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9EDDE] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Paw & Found — Pet Supplies Store Logo" className="h-8 w-auto" />
          <span className="font-heading text-xl font-bold text-[#2A9D8F]">Paw & Found</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link rounded-lg px-3 py-2 text-sm text-[#6B7280] hover:bg-[#E9EDDE] hover:text-[#2A9D8F]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MobileMenu navLinks={navLinks} />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ navLinks }: { navLinks: { href: string; label: string }[] }) {
  return (
    <details className="group md:hidden">
      <summary className="flex cursor-pointer items-center rounded-lg p-2 text-[#6B7280] hover:bg-[#E9EDDE] hover:text-[#2A9D8F]">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute left-0 right-0 top-full border-t border-[#E9EDDE] bg-white shadow-lg">
        <div className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link rounded-lg px-3 py-2 text-sm text-[#6B7280] hover:bg-[#E9EDDE] hover:text-[#2A9D8F]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}

function CartButton() {
  return (
    <a
      href="/cart"
      className="relative flex items-center rounded-lg p-2 text-[#6B7280] transition-colors hover:bg-[#E9EDDE] hover:text-[#2A9D8F]"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#E9EDDE] bg-[#8B5E3C]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Newsletter Signup — in footer */}
        <div className="mb-8 border-b border-white/20 pb-8">
          <NewsletterSignup variant="footer" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <img src="/images/logo.png" alt="Paw & Found — Pet Supplies Store" className="h-7 w-auto brightness-0 invert" />
              <span className="font-heading">Paw & Found</span>
            </div>
            <p className="mt-2 text-sm text-white/70">
              Making it dead simple to find exactly what your pet needs.
            </p>
          </div>
          <div>
            <h3 className="font-heading mb-2 text-sm font-semibold text-white">Shop</h3>
            <ul className="space-y-1 text-sm text-white/70">
              <li><a href="/products" className="hover:text-white">All Products</a></li>
              <li><a href="/products?category=Apparel" className="hover:text-white">Apparel</a></li>
              <li><a href="/products?category=Essentials" className="hover:text-white">Essentials</a></li>
              <li><a href="/products?category=Supplies" className="hover:text-white">Supplies</a></li>
              <li><a href="/products?category=Accessories" className="hover:text-white">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading mb-2 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-1 text-sm text-white/70">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/training" className="hover:text-white">Training Videos 🎓</a></li>
              <li><a href="/downloads" className="hover:text-white">Digital Guides</a></li>
              <li><a href="/downloads#premium-ebooks" className="hover:text-white">eBooks</a></li>
              <li><a href="/freebies/pet-birthday-card" className="hover:text-white">Freebies</a></li>
              <li><a href="/adopt" className="hover:text-white">Adopt a Pet ❤️</a></li>
              <li><a href="/suggest" className="hover:text-white">Request a Product 💡</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/about" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} Paw & Found. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
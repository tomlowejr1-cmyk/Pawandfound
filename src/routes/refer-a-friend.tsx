import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SITE_URL = "https://pawandfound.store";
const STORAGE_KEY = "pawandfound_ref_code_v1";

function makeRefCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing 0/O, 1/I
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return `REF-${s}`;
}

interface RefState {
  code: string;
  shareCount: number;
}

function loadRefState(): RefState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.code === "string" && parsed.code) {
        return { code: parsed.code, shareCount: Number(parsed.shareCount) || 0 };
      }
    }
  } catch {
    // ignore — regenerate below
  }
  return { code: makeRefCode(), shareCount: 0 };
}

export const Route = createFileRoute("/refer-a-friend")({
  component: ReferAFriendPage,
  head: () => ({
    meta: [
      { title: "Share Paw & Found with a Friend — Paw & Found 💌" },
      {
        name: "description",
        content:
          "Found a great pet store? Share Paw & Found with a friend — apparel, essentials, and digital guides for pet parents, all in one place.",
      },
      { property: "og:title", content: "Share Paw & Found with a Friend — Paw & Found 💌" },
      {
        property: "og:description",
        content:
          "Share Paw & Found with a friend — apparel, essentials, and digital guides for pet parents.",
      },
      { property: "og:url", content: `${SITE_URL}/refer-a-friend` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/refer-a-friend` }],
  }),
});

function ReferAFriendPage() {
  const [refState, setRefState] = useState<RefState>({ code: "", shareCount: 0 });
  const [hydrated, setHydrated] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const state = loadRefState();
    setRefState(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — tool still works for the session
    }
    setHydrated(true);
  }, []);

  const referralLink = `${SITE_URL}/?ref=${refState.code}`;

  function bumpShareCount() {
    setRefState((prev) => {
      const next = { ...prev, shareCount: prev.shareCount + 1 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  async function copyText(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  }

  async function copyLink() {
    const ok = await copyText(referralLink);
    if (ok) {
      bumpShareCount();
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2000);
    }
  }


  const shareText = encodeURIComponent(
    `🐾 Found a great pet store — Paw & Found. Apparel, essentials & digital guides for pet parents!`,
  );
  const shareLink = encodeURIComponent(referralLink);
  const shareBody = encodeURIComponent(
    `Hey! I found this awesome pet store — Paw & Found. Apparel, essentials & digital guides for pet parents. ${referralLink}`,
  );

  const shareButtons = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareLink}`,
      bg: "hover:bg-[#25D366]/10 hover:text-[#128C7E]",
      icon: "💬",
    },
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`,
      bg: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]",
      icon: "🐦",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`,
      bg: "hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
      icon: "📘",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent("Check out Paw & Found 🐾")}&body=${shareBody}`,
      bg: "hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C]",
      icon: "✉️",
    },
  ];

  const steps = [
    {
      emoji: "🔗",
      title: "Share your link",
      text: "Copy your personal referral link below and send it to a fellow pet parent — by text, DM, or email.",
    },
    {
      emoji: "🛍️",
      title: "They explore the store",
      text: "Apparel, essentials, accessories, and digital guides — something for every pet parent.",
    },
    {
      emoji: "🐾",
      title: "Good vibes all around",
      text: "Passing along a store you love — from one pet parent to another.",
    },
  ];

  const terms = [
    "Curated pet apparel, essentials, accessories, and digital guides — a one-stop shop.",
    "Secure checkout via Stripe on every order.",
    "Free pet-care content and interactive tools on our blog and in the store.",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">🐾💌🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Share Paw &amp; Found with a Friend
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Love Paw &amp; Found? Pass it on. Send a friend a link and help them discover
          apparel, essentials, and digital guides — all in one place. Happy pets, happy humans. 🐶🐱
        </p>
      </div>

      {/* Referral link + code */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Your personal link */}
        <div className="flex flex-col rounded-2xl border-2 border-[#2A9D8F] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2A9D8F]/10 text-lg">🔗</span>
            <h2 className="font-heading font-bold text-[#2D2D2D]">Your Referral Link</h2>
          </div>
          <p className="mt-2 text-sm text-[#6B7280]">
            Share this personalized link — your friend will land on our site with a warm
            "you were referred" welcome.
          </p>

          <div className="mt-4 flex-1">
            <label htmlFor="ref-link" className="sr-only">Your referral link</label>
            <input
              id="ref-link"
              type="text"
              readOnly
              value={hydrated ? referralLink : `${SITE_URL}/?ref=…`}
              onFocus={(e) => e.target.select()}
              className="w-full rounded-lg border border-[#E9EDDE] bg-[#F9FAF5] px-3 py-2.5 text-sm text-[#2D2D2D] focus:border-[#2A9D8F] focus:outline-none"
            />
          </div>

          <button onClick={copyLink} disabled={!hydrated} className="btn-primary mt-3">
            {linkCopied ? "✓ Link Copied!" : "Copy Link"}
          </button>

          {hydrated && refState.shareCount > 0 && (
            <p className="mt-2 text-xs text-[#6B7280]">
              You've shared your link {refState.shareCount} time{refState.shareCount === 1 ? "" : "s"} (tracked in this browser).
            </p>
          )}
        </div>

        {/* What they’ll find */}
        <div className="flex flex-col rounded-2xl border-2 border-[#FF7F5C] bg-gradient-to-br from-[#FFF6EC] to-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF7F5C]/10 text-lg">🛍️</span>
            <h2 className="font-heading font-bold text-[#2D2D2D]">What They’ll Find</h2>
          </div>
          <p className="mt-2 text-sm text-[#6B7280]">
            A curated shop for pet parents — from trendy tees and bandanas to everyday
            essentials like cat litter, plus digital guides and helpful tools.
          </p>
          <div className="mt-4 flex flex-1 flex-col justify-center gap-2">
            <a href="/products" className="btn-primary text-center">Browse the Store →</a>
            <a href="/downloads" className="btn-secondary text-center">Explore Digital Guides</a>
          </div>
        </div>
      </div>
      {/* Share buttons */}
      <div className="mt-6 rounded-2xl border border-[#E9EDDE] bg-white p-6 text-center shadow-sm">
        <h2 className="font-heading font-semibold text-[#2D2D2D]">Share it your way</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {shareButtons.map((b) => (
            <a
              key={b.label}
              href={b.href}
              target={b.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full border border-[#E9EDDE] bg-white px-4 py-2 text-sm font-medium text-[#6B7280] transition-colors ${b.bg}`}
            >
              <span aria-hidden="true">{b.icon}</span>
              {b.label}
            </a>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="mt-12 rounded-2xl bg-[#FFF8F0] p-6 sm:p-10">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          How It Works
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="relative mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                {step.emoji}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2A9D8F] text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">{step.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#E9EDDE] bg-white p-6">
        <h2 className="font-heading font-semibold text-[#2D2D2D]">🤝 Why Share Paw &amp; Found?</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-[#6B7280]">
          {terms.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-0.5 text-[#2A9D8F]">•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#1E7A6F] p-8 text-center text-white sm:p-10">
        <h2 className="font-heading text-2xl font-bold">Ready to treat your pet?</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">
          Browse the store — and don't forget to share your link with a friend on the way.
        </p>
        <a href="/products" className="btn-primary mt-6 inline-flex bg-white text-[#2A9D8F] hover:bg-white/90">
          Shop the Store →
        </a>
      </section>
    </div>
  );
}

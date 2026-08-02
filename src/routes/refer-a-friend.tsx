import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SITE_URL = "https://pawandfound.store";
const DISCOUNT_CODE = "PAWFRIEND10";
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
      { title: "Refer a Friend — Get 10% Off — Paw & Found 💌" },
      {
        name: "description",
        content:
          "Share Paw & Found with a friend: they get 10% off their first order with code PAWFRIEND10, and you get 10% off your next order. Win-win for pet parents!",
      },
      { property: "og:title", content: "Refer a Friend — Get 10% Off — Paw & Found 💌" },
      {
        property: "og:description",
        content:
          "Give 10%, get 10%. Share your referral link and both you and your friend save on pet goodies at Paw & Found.",
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
  const [codeCopied, setCodeCopied] = useState(false);

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

  async function copyCode() {
    await copyText(DISCOUNT_CODE);
    setCodeCopied(true);
    window.setTimeout(() => setCodeCopied(false), 2000);
  }

  const shareText = encodeURIComponent(
    `🐾 I'm a Paw & Found fan! Get 10% off your first order with code ${DISCOUNT_CODE}. 🎁`,
  );
  const shareLink = encodeURIComponent(referralLink);
  const shareBody = encodeURIComponent(
    `Hey! I found this awesome pet store — Paw & Found. Use my referral link for 10% off your first order: ${referralLink} (code ${DISCOUNT_CODE})`,
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
      href: `mailto:?subject=${encodeURIComponent("10% off at Paw & Found 🐾")}&body=${shareBody}`,
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
      emoji: "🎉",
      title: "They save 10%",
      text: `Your friend uses your link (or code ${DISCOUNT_CODE}) at checkout and saves 10% on their first order.`,
    },
    {
      emoji: "💸",
      title: "You save too",
      text: "Once their first order is placed, you get 10% off your next order — our thank-you for spreading the word.",
    },
  ];

  const terms = [
    "Friends get 10% off their first order with code PAWFRIEND10 at checkout.",
    "Referrer earns 10% off their next order after their friend's first order is placed.",
    "Each friend can use the code once; one referral credit per order.",
    "Cannot be combined with other discount codes or offers.",
    "Applies to products and digital guides across the store.",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">🐾💌🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Give 10%. Get 10%.
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Love Paw & Found? Share it with a friend. They save 10% on their first order,
          and you save 10% on your next one. Happy pets, happy humans. 🐶🐱
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

        {/* Discount code */}
        <div className="flex flex-col rounded-2xl border-2 border-[#FF7F5C] bg-gradient-to-br from-[#FFF6EC] to-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF7F5C]/10 text-lg">🏷️</span>
            <h2 className="font-heading font-bold text-[#2D2D2D]">Your Discount Code</h2>
          </div>
          <p className="mt-2 text-sm text-[#6B7280]">
            Prefer a code? Your friend can use this at checkout instead — same 10% off
            their first order.
          </p>

          <div className="mt-4 flex flex-1 items-center">
            <div className="w-full rounded-lg border-2 border-dashed border-[#FF7F5C] bg-white px-4 py-3 text-center">
              <span className="font-heading text-xl font-bold tracking-[0.15em] text-[#FF7F5C]">
                {DISCOUNT_CODE}
              </span>
            </div>
          </div>

          <button onClick={copyCode} className="btn-secondary mt-3">
            {codeCopied ? "✓ Code Copied!" : "Copy Code"}
          </button>
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
        <h2 className="font-heading font-semibold text-[#2D2D2D]">📋 The Fine Print</h2>
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

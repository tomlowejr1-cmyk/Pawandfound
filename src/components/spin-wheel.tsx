import { useEffect, useRef, useState, type FormEvent } from "react";

/* ------------------------------------------------------------------ */
/* Spin & Win — weighted discount wheel                                */
/* ------------------------------------------------------------------ */

const SPIN_DATE_KEY = "pawandfound_spin_date";
const MAILCHIMP_ACTION =
  "https://store.us12.list-manage.com/subscribe/post?u=1ec97266f4e8fd1074b70e466&id=7bfe8105f2";

type PrizeKind = "discount" | "shipping" | "guide" | "bundle" | "try-again";

interface Prize {
  kind: PrizeKind;
  title: string;
  detail: string;
  code?: string;
}

interface Segment {
  lines: [string, string?];
  color: string;
  textColor: string;
  /** Higher = more likely to be landed on */
  weight: number;
  prize: Prize;
}

/* 8 segments — colors and prizes per the brief. Weights tuned so
   "Try Again" + 10% hit most often and the free bundle is rarest. */
const SEGMENTS: Segment[] = [
  {
    lines: ["10%", "OFF"],
    color: "#FF7F5C",
    textColor: "#FFFFFF",
    weight: 30,
    prize: {
      kind: "discount",
      title: "10% Off Your Order",
      code: "LUCKY10",
      detail: "Use code LUCKY10 at checkout to save 10% on your order.",
    },
  },
  {
    lines: ["15%", "OFF"],
    color: "#F4A261",
    textColor: "#3A2A14",
    weight: 20,
    prize: {
      kind: "discount",
      title: "15% Off Your Order",
      code: "LUCKY15",
      detail: "Use code LUCKY15 at checkout to save 15% on your order.",
    },
  },
  {
    lines: ["20%", "OFF"],
    color: "#2A9D8F",
    textColor: "#FFFFFF",
    weight: 12,
    prize: {
      kind: "discount",
      title: "20% Off Your Order",
      code: "LUCKY20",
      detail: "Use code LUCKY20 at checkout to save 20% on your order.",
    },
  },
  {
    lines: ["25%", "OFF"],
    color: "#E76F51",
    textColor: "#FFFFFF",
    weight: 5,
    prize: {
      kind: "discount",
      title: "25% Off Your Order",
      code: "SPIN25",
      detail: "Use code SPIN25 at checkout to save 25% on your order.",
    },
  },
  {
    lines: ["FREE", "SHIPPING"],
    color: "#2A9D8F",
    textColor: "#FFFFFF",
    weight: 10,
    prize: {
      kind: "shipping",
      title: "Free Shipping",
      code: "FREESHIP",
      detail: "Use code FREESHIP at checkout for free standard shipping on your order.",
    },
  },
  {
    lines: ["FREE", "GUIDE"],
    color: "#264653",
    textColor: "#FFFFFF",
    weight: 4,
    prize: {
      kind: "guide",
      title: "Free Digital Guide",
      detail:
        "Pick any $4.99–$7.99 guide from our Downloads page, then email hello@pawandfound.com with your name and this prize to redeem.",
    },
  },
  {
    lines: ["FREE", "BUNDLE"],
    color: "#FF7F5C",
    textColor: "#FFFFFF",
    weight: 2,
    prize: {
      kind: "bundle",
      title: "Free Bundle — Your Choice!",
      detail:
        "Choose the Puppy Starter Pack or Cat Essentials Kit from our Downloads page, then email hello@pawandfound.com with your name and this prize to redeem.",
    },
  },
  {
    lines: ["TRY", "AGAIN"],
    color: "#E9EDDE",
    textColor: "#2D2D2D",
    weight: 25,
    prize: {
      kind: "try-again",
      title: "So Close!",
      detail: "Come back tomorrow for another spin — new luck, new prizes!",
    },
  },
];

const WHEEL_SIZE = 400;
const CX = WHEEL_SIZE / 2;
const CY = WHEEL_SIZE / 2;
const OUTER_R = 190;
const HUB_R = 60;
const SEG_ANGLE = 360 / SEGMENTS.length;

/* Confetti colors pulled from the brand palette + a few bright accents */
const CONFETTI_COLORS = [
  "#FF7F5C",
  "#F4A261",
  "#2A9D8F",
  "#E76F51",
  "#264653",
  "#FFD166",
  "#06D6A0",
  "#EF476F",
];

interface ConfettiPiece {
  id: number;
  left: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  round: boolean;
}

/* --------------------------- geometry utils ------------------------ */

/** Angle is measured in degrees clockwise from 12 o'clock. */
function polarPoint(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.sin(rad), y: CY - radius * Math.cos(rad) };
}

function segmentPath(index: number): string {
  const a0 = index * SEG_ANGLE;
  const a1 = (index + 1) * SEG_ANGLE;
  const p0 = polarPoint(a0, OUTER_R);
  const p1 = polarPoint(a1, OUTER_R);
  return `M ${CX} ${CY} L ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${OUTER_R} ${OUTER_R} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Z`;
}

/** Local YYYY-MM-DD date string for the one-spin-per-day flag */
function todayStr(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Weighted random pick — returns a segment index */
function weightedPick(): number {
  const total = SEGMENTS.reduce((sum, seg) => sum + seg.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < SEGMENTS.length; i++) {
    r -= SEGMENTS[i].weight;
    if (r < 0) return i;
  }
  return SEGMENTS.length - 1;
}

/* ----------------------------- component --------------------------- */

export function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [alreadySpun, setAlreadySpun] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const rotationRef = useRef(0);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pieceIdRef = useRef(0);

  /* One spin per day */
  useEffect(() => {
    try {
      if (localStorage.getItem(SPIN_DATE_KEY) === todayStr()) {
        setAlreadySpun(true);
      }
    } catch {
      /* localStorage unavailable — allow the spin */
    }
    return () => {
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    };
  }, []);

  /* Close modal on Escape */
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  function fireConfetti() {
    const pieces: ConfettiPiece[] = Array.from({ length: 90 }, () => ({
      id: pieceIdRef.current++,
      left: Math.random() * 100,
      size: 7 + Math.random() * 8,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 0.7,
      duration: 2.6 + Math.random() * 1.6,
      round: Math.random() > 0.5,
    }));
    setConfetti(pieces);
    /* Clear after the longest animation so re-spins get fresh confetti */
    setTimeout(() => setConfetti([]), 5200);
  }

  function handleSpin() {
    if (spinning || alreadySpun) return;
    setSpinning(true);

    const idx = weightedPick();
    /* Target: center of the chosen segment under the top pointer */
    const segCenter = idx * SEG_ANGLE + SEG_ANGLE / 2;
    const targetMod = (360 - segCenter) % 360;
    const currentMod = ((rotationRef.current % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;
    /* Small jitter (±14°) so it never lands dead-centre, stays inside the 45° slice */
    const jitter = (Math.random() * 2 - 1) * 14;
    const spins = 5 + Math.floor(Math.random() * 2); // 5–6 full turns
    const next = rotationRef.current + spins * 360 + delta + jitter;

    rotationRef.current = next;
    setRotation(next);

    spinTimerRef.current = setTimeout(() => {
      setSpinning(false);
      setResult(SEGMENTS[idx].prize);
      setModalOpen(true);
      fireConfetti();
      setEmail("");
      setEmailStatus("idle");
      setCopied(false);
      try {
        localStorage.setItem(SPIN_DATE_KEY, todayStr());
      } catch {
        /* ignore */
      }
      setAlreadySpun(true);
    }, 5300);
  }

  function closeModal() {
    setModalOpen(false);
    setConfetti([]);
  }

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — code stays visible for manual copy */
    }
  }

  /* Mailchimp embedded form — same endpoint as the site newsletter */
  function submitEmail(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailStatus("loading");

    const iframe = document.createElement("iframe");
    iframe.name = "mc-hidden-frame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.action = MAILCHIMP_ACTION;
    form.method = "POST";
    form.target = "mc-hidden-frame";
    const safe = email.replace(/"/g, "&quot;");
    form.innerHTML = `<input type="email" name="EMAIL" value="${safe}">`;
    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 500);

    setEmailStatus("success");
  }

  /* ----------------------- already-spun panel ---------------------- */
  /* NOTE: this is rendered *instead of* the wheel, but the prize modal
     still needs to render on top after a spin — so this must stay a
     variable, never an early return. */

  const alreadySpunPanel = (
    <div className="flex w-full max-w-[420px] flex-col items-center justify-center gap-4 rounded-3xl bg-white px-8 py-12 text-center shadow-xl ring-8 ring-white/70">
        <span className="text-5xl">🎉</span>
        <h3 className="font-heading text-2xl font-bold text-[#2D2D2D]">
          You've already spun today! Come back tomorrow 🎉
        </h3>
        <p className="max-w-xs text-sm text-[#6B7280]">
          One spin per day — but there are still prizes waiting on the wheel:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SEGMENTS.filter((s) => s.prize.kind !== "try-again").map((s) => (
            <span
              key={s.prize.title}
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: s.color, color: s.textColor === "#FFFFFF" ? "#fff" : "#2D2D2D" }}
            >
              {s.lines.join(" ")}
            </span>
          ))}
        </div>
      </div>
  );

  /* ----------------------------- wheel ----------------------------- */

  return (
    <>
      {alreadySpun ? (
        alreadySpunPanel
      ) : (
        <div className="relative w-full max-w-[420px] select-none">
      {/* Pointer */}
      <div className="absolute left-1/2 top-[-12px] z-20 -translate-x-1/2 drop-shadow-md">
        <svg width="46" height="42" viewBox="0 0 46 42" aria-hidden="true">
          <polygon points="23,40 3,10 43,10" fill="#FF7F5C" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="23" cy="12" r="4.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Rotating wheel */}
      <div
        role="img"
        aria-label="Spin to Win prize wheel"
        className="overflow-hidden rounded-full shadow-2xl ring-8 ring-white"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? "transform 5.2s cubic-bezier(0.16, 0.84, 0.22, 1)" : "none",
          willChange: "transform",
        }}
      >
        <svg viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`} className="block h-auto w-full">
          {SEGMENTS.map((seg, i) => (
            <path key={i} d={segmentPath(i)} fill={seg.color} stroke="#FFFFFF" strokeWidth={3} />
          ))}

          {/* Segment labels — rotated like a clock face */}
          {SEGMENTS.map((seg, i) => {
            const mid = i * SEG_ANGLE + SEG_ANGLE / 2;
            const rad = (mid * Math.PI) / 180;
            return seg.lines.map((line, li) => {
              if (!line) return null;
              const r = 0.62 * OUTER_R + (li - (seg.lines.length - 1) / 2) * 0.15 * OUTER_R;
              const x = CX + r * Math.sin(rad);
              const y = CY - r * Math.cos(rad);
              return (
                <text
                  key={`${i}-${li}`}
                  x={x}
                  y={y}
                  transform={`rotate(${mid} ${x} ${y})`}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={li === 0 ? 24 : 16}
                  fontWeight={700}
                  fill={seg.textColor}
                  fontFamily="Poppins, Inter, sans-serif"
                >
                  {line}
                </text>
              );
            });
          })}

          {/* Rim dots at segment boundaries */}
          {Array.from({ length: SEGMENTS.length }).map((_, i) => {
            const p = polarPoint(i * SEG_ANGLE, OUTER_R - 2);
            return (
              <circle
                key={`dot-${i}`}
                cx={p.x}
                cy={p.y}
                r={5}
                fill="#FFFFFF"
                stroke="#FF7F5C"
                strokeWidth={1.5}
              />
            );
          })}

          {/* Hub */}
          <circle cx={CX} cy={CY} r={HUB_R} fill="#FFF8F0" stroke="#FFFFFF" strokeWidth={6} />
        </svg>
      </div>

      {/* Spin button (does not rotate with the wheel) */}
      <button
        type="button"
        onClick={handleSpin}
        disabled={spinning}
        aria-label={spinning ? "Wheel spinning" : "Spin the wheel"}
        className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#FF7F5C] bg-white font-heading text-xl font-extrabold tracking-wide text-[#FF7F5C] shadow-xl transition-all hover:scale-105 active:scale-95 disabled:cursor-wait disabled:opacity-80"
      >
        {spinning ? "…" : "SPIN"}
      </button>
        </div>
      )}

      {/* ----------------------------- modal ---------------------------- */}
      {modalOpen && result && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#264653]/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Confetti overlay */}
          <div className="pointer-events-none fixed inset-0 z-[81] overflow-hidden" aria-hidden="true">
            {confetti.map((p) => (
              <span
                key={p.id}
                className="confetti-piece"
                style={{
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: p.round ? "50%" : "2px",
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
          </div>

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Your spin result"
            className="relative z-[82] w-full max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-2xl"
          >
            <div className="h-2 bg-gradient-to-r from-[#FF7F5C] via-[#F4A261] to-[#2A9D8F]" />
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8F0] text-[#6B7280] transition-colors hover:bg-[#E9EDDE] hover:text-[#2D2D2D]"
            >
              ✕
            </button>

            <div className="p-8 sm:p-10">
              {result.kind === "try-again" ? (
                <>
                  <span className="text-5xl">🍀</span>
                  <h3 className="font-heading mt-4 text-2xl font-bold text-[#2D2D2D] sm:text-3xl">
                    So close! Come back tomorrow for another spin!
                  </h3>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    No luck today — but tomorrow's a fresh chance at discounts, freebies, and more.
                  </p>
                </>
              ) : (
                <>
                  <span className="text-5xl">{prizeEmoji(result.kind)}</span>
                  <p className="font-heading mt-3 text-sm font-bold uppercase tracking-widest text-[#FF7F5C]">
                    You Won!
                  </p>
                  <h3 className="font-heading mt-1 text-2xl font-bold text-[#2D2D2D] sm:text-3xl">
                    {result.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#6B7280]">{result.detail}</p>

                  {result.code && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-[#2A9D8F] bg-[#2A9D8F]/5 px-4 py-2.5">
                      <span className="font-mono text-lg font-bold tracking-wider text-[#2A9D8F]">
                        {result.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyCode(result.code!)}
                        className="rounded-md bg-[#2A9D8F] px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-[#2A9D8F]/85"
                      >
                        {copied ? "Copied ✓" : "Copy"}
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Email capture — join the Paw & Found Pack */}
              {emailStatus !== "success" ? (
                <form onSubmit={submitEmail} className="mt-6">
                  <p className="text-sm font-semibold text-[#2D2D2D]">
                    {result.kind === "try-again"
                      ? "Join the Paw & Found Pack for deals & pet tips"
                      : "Claim your prize & join the Paw & Found Pack"}
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={emailStatus === "loading"}
                      className="w-full flex-1 rounded-lg border border-[#E9EDDE] bg-white px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:border-[#FF7F5C] focus:outline-none focus:ring-2 focus:ring-[#FF7F5C]/30 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "loading"}
                      className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60"
                    >
                      {emailStatus === "loading" ? "Sending…" : "Claim Your Prize"}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-[#9CA3AF]">No spam, ever. Unsubscribe anytime.</p>
                </form>
              ) : (
                <div className="mt-6 rounded-xl bg-[#E9EDDE]/60 px-4 py-4">
                  <p className="text-sm font-semibold text-[#2D2D2D]">
                    🐾 You're in — welcome to the Paw & Found Pack!
                  </p>
                  {result.kind === "guide" || result.kind === "bundle" ? (
                    <p className="mt-1 text-xs text-[#6B7280]">
                      To redeem, email <span className="font-semibold text-[#2A9D8F]">hello@pawandfound.com</span> with
                      your name and this prize.
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-[#6B7280]">
                      Use code <span className="font-semibold text-[#FF7F5C]">{result.code}</span> at checkout.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <a href="/products" className="btn-primary px-6 py-2.5 text-sm">
                  Shop the Store
                </a>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary px-6 py-2.5 text-sm"
                >
                  {result.kind === "try-again" ? "Maybe Later" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confetti keyframes — self-contained so app.css stays untouched */}
      <style>{`
        .confetti-piece {
          position: absolute;
          top: -24px;
          opacity: 0;
          animation-name: paw-confetti-fall;
          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
        }
        @keyframes paw-confetti-fall {
          0%   { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0.85; transform: translateY(105vh) rotate(720deg); }
        }
      `}</style>
    </>
  );
}

function prizeEmoji(kind: PrizeKind): string {
  switch (kind) {
    case "discount":
      return "🎁";
    case "shipping":
      return "🚚";
    case "guide":
      return "📖";
    case "bundle":
      return "🐾";
    case "try-again":
      return "🍀";
  }
}

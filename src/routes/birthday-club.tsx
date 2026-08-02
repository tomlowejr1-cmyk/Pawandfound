import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { subscribeToNewsletter } from "~/lib/mailchimp";

const SITE_URL = "https://pawandfound.store";
const STORAGE_KEY = "pawandfound_birthday_club_v1";
const BIRTHDAY_CODE = "BIRTHDAY10";

type PetType = "dog" | "cat" | "small" | "other";

interface Pet {
  id: string;
  name: string;
  type: PetType;
  birthday: string; // YYYY-MM-DD
  createdAt: number;
}

const PET_TYPES: { key: PetType; label: string; emoji: string }[] = [
  { key: "dog", label: "Dog", emoji: "🐕" },
  { key: "cat", label: "Cat", emoji: "🐈" },
  { key: "small", label: "Small Animal", emoji: "🐹" },
  { key: "other", label: "Other", emoji: "🐾" },
];

const TYPE_MAP: Record<PetType, { label: string; emoji: string }> = Object.fromEntries(
  PET_TYPES.map((t) => [t.key, t]),
) as Record<PetType, { label: string; emoji: string }>;

function makeId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}

function loadPets(): Pet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatBirthday(iso: string): string {
  try {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function isBirthdayToday(birthday: string, today: Date): boolean {
  const [, m, d] = birthday.split("-").map(Number);
  return m === today.getMonth() + 1 && d === today.getDate();
}

function daysUntilNextBirthday(birthday: string, today: Date): number {
  const [, m, d] = birthday.split("-").map(Number);
  const year = today.getFullYear();
  const todayStart = new Date(year, today.getMonth(), today.getDate());
  let next = new Date(year, m - 1, d);
  if (next.getTime() < todayStart.getTime()) {
    next = new Date(year + 1, m - 1, d);
  }
  return Math.round((next.getTime() - todayStart.getTime()) / 86_400_000);
}

export const Route = createFileRoute("/birthday-club")({
  component: BirthdayClubPage,
  head: () => ({
    meta: [
      { title: "Pet Birthday Club — Paw & Found 🎂" },
      {
        name: "description",
        content:
          "Join the free Paw & Found Pet Birthday Club: add your pet's birthday and get a special discount code on the big day. Sign up for email reminders today!",
      },
      { property: "og:title", content: "Pet Birthday Club — Paw & Found 🎂" },
      {
        property: "og:description",
        content:
          "Never miss your pet's birthday! Join the free Pet Birthday Club for a special discount code on the big day.",
      },
      { property: "og:url", content: `${SITE_URL}/birthday-club` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/birthday-club` }],
  }),
});

function BirthdayClubPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState<PetType>("dog");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [today, setToday] = useState<Date | null>(null);

  // Load saved pets + today's date on mount (client-only)
  useEffect(() => {
    setPets(loadPets());
    setToday(new Date());
    setHydrated(true);
  }, []);

  // Persist pets on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
    } catch {
      // storage unavailable — still works for the session
    }
  }, [pets, hydrated]);

  useEffect(() => {
    if (!codeCopied) return;
    const t = setTimeout(() => setCodeCopied(false), 2000);
    return () => clearTimeout(t);
  }, [codeCopied]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(BIRTHDAY_CODE);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = BIRTHDAY_CODE;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCodeCopied(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Please tell us your pet's name.");
      return;
    }
    if (!birthday) {
      setFormError("Please pick your pet's birthday.");
      return;
    }
    setFormError(null);

    const pet: Pet = {
      id: makeId(),
      name: name.trim(),
      type,
      birthday,
      createdAt: Date.now(),
    };
    setPets((prev) => [...prev, pet]);
    setName("");
    setBirthday("");

    // Collect email for the newsletter (optional)
    if (email.trim()) {
      try {
        const res = await subscribeToNewsletter({ data: { email } });
        if (res.success) {
          setStatus(`🎂 ${pet.name} is in the club! And you're on our birthday-reminder list.`);
        } else {
          const alreadySubscribed = res.message.toLowerCase().includes("already subscribed");
          setStatus(
            alreadySubscribed
              ? `🎂 ${pet.name} is in the club! (You're already on the newsletter list.)`
              : `🎂 ${pet.name} is in the club! (We couldn't subscribe your email here — use the newsletter form in the footer instead.)`,
          );
        }
        setEmail("");
      } catch {
        setStatus(`🎂 ${pet.name} is in the club! (Couldn't subscribe the email — use the newsletter form in the footer instead.)`);
      }
    } else {
      setStatus(`🎂 ${pet.name} is in the club! Add your email above to get birthday reminders.`);
    }
    window.setTimeout(() => setStatus(null), 6000);
  }

  function deletePet(id: string) {
    setPets((prev) => prev.filter((p) => p.id !== id));
  }

  const celebrants =
    today && hydrated ? pets.filter((p) => isBirthdayToday(p.birthday, today)) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">🎂🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Pet Birthday Club
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Every pet deserves a birthday party. Add your furry friend's birthday and we'll
          show you a special discount code on the big day — plus (optionally) email you a
          reminder so you never miss the cake. 🎉
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* Signup form */}
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border-2 border-[#FF7F5C] bg-gradient-to-br from-[#FFF6EC] to-white p-6 lg:col-span-2"
        >
          <h2 className="font-heading text-lg font-bold text-[#2D2D2D]">
            🎁 Join the Club
          </h2>

          <label className="mt-4 block text-sm font-medium text-[#6B7280]" htmlFor="pet-name">
            Pet's Name
          </label>
          <input
            id="pet-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Biscuit"
            maxLength={40}
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#B0B7A3] focus:border-[#2A9D8F] focus:outline-none"
          />

          <label className="mt-3 block text-sm font-medium text-[#6B7280]" htmlFor="pet-type">
            Pet Type
          </label>
          <select
            id="pet-type"
            value={type}
            onChange={(e) => setType(e.target.value as PetType)}
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[#2A9D8F] focus:outline-none"
          >
            {PET_TYPES.map((t) => (
              <option key={t.key} value={t.key}>
                {t.emoji} {t.label}
              </option>
            ))}
          </select>

          <label className="mt-3 block text-sm font-medium text-[#6B7280]" htmlFor="pet-birthday">
            Birthday
          </label>
          <input
            id="pet-birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[#2A9D8F] focus:outline-none"
          />

          <label className="mt-3 block text-sm font-medium text-[#6B7280]" htmlFor="pet-email">
            Your Email <span className="text-xs text-[#B0B7A3]">(for birthday reminders)</span>
          </label>
          <input
            id="pet-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#B0B7A3] focus:border-[#2A9D8F] focus:outline-none"
          />
          <p className="mt-1 text-xs text-[#B0B7A3]">
            No spam — we only email for birthdays &amp; occasional news. Unsubscribe anytime.
          </p>

          {formError && (
            <p className="mt-3 rounded-lg bg-[#FF7F5C]/10 px-3 py-2 text-sm text-[#C2410C]" role="alert">
              ⚠️ {formError}
            </p>
          )}
          {status && (
            <p className="mt-3 rounded-lg bg-[#2A9D8F]/10 px-3 py-2 text-sm text-[#1E7A6F]" role="status">
              {status}
            </p>
          )}

          <button type="submit" className="btn-primary mt-4 w-full">
            Join the Club 🎉
          </button>
        </form>

        {/* Members area */}
        <div className="lg:col-span-3">
          {/* Birthday discount banner */}
          {celebrants.length > 0 && hydrated && (
            <div className="rounded-2xl bg-gradient-to-br from-[#F4A261] via-[#FF7F5C] to-[#FF7F5C] p-6 text-center text-white shadow-lg sm:p-8">
              <span className="text-4xl">🎉</span>
              <h2 className="font-heading mt-2 text-2xl font-bold">
                Happy Birthday, {celebrants.map((p) => p.name).join(" & ")}!
              </h2>
              <p className="mt-2 text-white/90">
                Today's the big day! Enjoy <strong className="text-white">10% off</strong> your next
                Paw &amp; Found order with this special code:
              </p>
              <button
                type="button"
                onClick={copyCode}
                aria-label="Copy BIRTHDAY10 discount code"
                className="mx-auto mt-4 flex items-center gap-3 rounded-2xl border-2 border-dashed border-white/60 bg-white/15 px-6 py-3 transition-colors hover:bg-white/25"
              >
                <span className="font-heading text-xl font-bold tracking-[0.15em]">
                  {BIRTHDAY_CODE}
                </span>
                <span className="rounded-full bg-white/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide">
                  {codeCopied ? "✓ Copied!" : "Copy"}
                </span>
              </button>
              <p className="mt-2 text-xs text-white/75">Tap to copy — use at checkout.</p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">
              🎈 Club Members
            </h2>
            {pets.length > 0 && (
              <span className="text-sm text-[#6B7280]">
                {pets.length} pet{pets.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {pets.length === 0 ? (
            <div className="mt-4 rounded-2xl border-2 border-dashed border-[#E9EDDE] bg-white p-8 text-center">
              <p className="text-4xl">🐶</p>
              <p className="font-heading mt-3 font-semibold text-[#2D2D2D]">
                No pets in the club yet
              </p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
                Add your furry friend above — we'll count down to their big day and reveal
                a birthday discount when it arrives.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {pets.map((pet) => {
                const info = TYPE_MAP[pet.type];
                const isToday = hydrated && today ? isBirthdayToday(pet.birthday, today) : false;
                const days = today ? daysUntilNextBirthday(pet.birthday, today) : 0;
                return (
                  <li
                    key={pet.id}
                    className={`flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:p-5 ${
                      isToday ? "border-[#FF7F5C]" : "border-[#E9EDDE]"
                    }`}
                  >
                    <span
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl"
                      style={{ backgroundColor: `${isToday ? "#FF7F5C" : "#2A9D8F"}1A` }}
                    >
                      {info.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading font-semibold text-[#2D2D2D]">
                        {pet.name}
                        <span className="ml-2 text-sm font-normal text-[#6B7280]">
                          {info.label}
                        </span>
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        🎂 {formatBirthday(pet.birthday)}
                      </p>
                      {isToday ? (
                        <p className="text-sm font-semibold text-[#FF7F5C]">
                          🎉 It's birthday day! Use code {BIRTHDAY_CODE} for 10% off.
                        </p>
                      ) : (
                        <p className="text-sm text-[#6B7280]">
                          {days === 1 ? "1 day to go!" : `${days} days until the big day!`}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deletePet(pet.id)}
                      aria-label={`Remove ${pet.name} from the club`}
                      className="rounded-lg p-2 text-[#B0B7A3] transition-colors hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Perks */}
          <div className="mt-6 rounded-2xl bg-[#FFF8F0] p-5 text-sm text-[#6B7280]">
            <p className="font-heading font-semibold text-[#2D2D2D]">🎁 Club Perks</p>
            <ul className="mt-2 space-y-1.5">
              <li>• A special discount code revealed on your pet's birthday</li>
              <li>• Optional email reminder so you never miss the cake</li>
              <li>• Ideas &amp; goodies all year — like our{" "}
                <a href="/downloads" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
                  DIY Dog Birthday Party Kit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#1E7A6F] p-8 text-center text-white sm:p-10">
        <h2 className="font-heading text-2xl font-bold">Birthday party supplies?</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">
          Grab toys, treats, and party-ready goodies for the big day.
        </p>
        <a href="/products" className="btn-primary mt-6 inline-flex bg-white text-[#2A9D8F] hover:bg-white/90">
          Shop Birthday Essentials →
        </a>
      </section>
    </div>
  );
}

import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

const SITE_URL = "https://pawandfound.store";
const FAVES_KEY = "pawandfound_name_faves_v1";

type PetType = "dog" | "cat" | "other";
type Style = "funny" | "cute" | "unique" | "classic";
type ThemeKey = "none" | "food" | "nature" | "space" | "music" | "royalty" | "ocean" | "cozy";

interface PetTypeInfo {
  key: PetType;
  label: string;
  emoji: string;
}
interface StyleInfo {
  key: Style;
  label: string;
  emoji: string;
  blurb: string;
}
interface ThemeInfo {
  key: ThemeKey;
  label: string;
  emoji: string;
}

const PET_TYPES: PetTypeInfo[] = [
  { key: "dog", label: "Dog", emoji: "🐕" },
  { key: "cat", label: "Cat", emoji: "🐈" },
  { key: "other", label: "Small & Other", emoji: "🐹" },
];

const STYLES: StyleInfo[] = [
  { key: "funny", label: "Funny", emoji: "😂", blurb: "Giggle-worthy names" },
  { key: "cute", label: "Cute", emoji: "🥰", blurb: "Melts your heart" },
  { key: "unique", label: "Unique", emoji: "✨", blurb: "One-of-a-kind picks" },
  { key: "classic", label: "Classic", emoji: "🏛️", blurb: "Timeless favorites" },
];

const THEMES: ThemeInfo[] = [
  { key: "none", label: "No theme", emoji: "🎲" },
  { key: "food", label: "Food", emoji: "🍕" },
  { key: "nature", label: "Nature", emoji: "🌿" },
  { key: "space", label: "Space", emoji: "🚀" },
  { key: "music", label: "Music", emoji: "🎵" },
  { key: "royalty", label: "Royalty", emoji: "👑" },
  { key: "ocean", label: "Ocean", emoji: "🌊" },
  { key: "cozy", label: "Cozy", emoji: "🧸" },
];

/* ------------------------- name banks ------------------------- */

const STYLE_BANKS: Record<Style, Record<PetType, string[]>> = {
  funny: {
    dog: [
      "Sir Barks-A-Lot", "Bark Twain", "Chewbarka", "Furguson", "Droolius Caesar",
      "Captain Wiggles", "McNugget", "Tater Tot", "Wobblebottom", "Nacho",
      "Pickles", "Waffles", "Meatball", "Noodle", "Biscuit", "Sausage",
      "Doodle", "Sniffles", "Goose", "Biscotti",
    ],
    cat: [
      "Chairman Meow", "Catrick Swayze", "Purrscilla", "Meowington", "Clawdia",
      "Fuzz Aldrin", "Catniss Everdeen", "Sir Hisses-a-Lot", "Grumbles",
      "Mittens IV", "Chairman of the Bored", "Whiskerino", "Catticus Finch",
      "Meowly Cyrus", "Purrcasso", "Furby", "Smudge", "Biscuit",
    ],
    other: [
      "Sir Squeaks-a-Lot", "Professor Hops", "Nibbles", "Popcorn", "Hamtaro Jr.",
      "Whiskers von Nibbleton", "Tiny Dancer", "Peanut", "Dumpling", "Scooter",
      "Nugget", "Biscuit", "Wobbles", "Pip-Squeak", "Sir Nibblesworth",
    ],
  },
  cute: {
    dog: [
      "Coco", "Bella", "Daisy", "Molly", "Lucy", "Buddy", "Charlie", "Teddy",
      "Luna", "Milo", "Penny", "Rosie", "Ollie", "Roxy", "Cocoa", "Peanut",
      "Mochi", "Biscuit", "Honey", "Bean",
    ],
    cat: [
      "Lily", "Oliver", "Chloe", "Sophie", "Jasper", "Tilly", "Mochi", "Waffle",
      "Pixel", "Smudge", "Tofu", "Miso", "Peanut", "Ziggy", "Nori", "Fifi",
      "Boba", "Muffin", "Cookie", "Patches",
    ],
    other: [
      "Pippin", "Hazel", "Maple", "Button", "Biscuit", "Pebbles", "Mochi",
      "Coconut", "Tofu", "Clover", "Marshmallow", "Snickers", "Binky", "Pip",
      "Cuddles", "Nibbles", "Sprout", "Honey",
    ],
  },
  unique: {
    dog: [
      "Zephyr", "Indigo", "Juniper", "Sable", "Quill", "Onyx", "Nimbus",
      "Solstice", "Peregrine", "Fable", "Marlowe", "Kestrel", "Bramble",
      "Vesper", "Rune", "Saffron", "Wren", "Orion", "Larkspur", "Ember",
    ],
    cat: [
      "Nyx", "Echo", "Vesper", "Sable", "Rune", "Obsidian", "Mirth", "Calypso",
      "Zinnia", "Kestrel", "Opal", "Iris", "Salem", "Arwen", "Morrigan",
      "Cinder", "Raven", "Nova", "Seraphine", "Wren",
    ],
    other: [
      "Fig", "Bramble", "Saffron", "Echo", "Willow", "Nettle", "Coriander",
      "Fern", "Zinnia", "Peregrine", "Indigo", "Clover", "Acorn", "Thistle",
      "Juniper", "Moss", "Rune", "Solstice",
    ],
  },
  classic: {
    dog: [
      "Max", "Buddy", "Rocky", "Duke", "Rex", "Sadie", "Maggie", "Ginger",
      "Sam", "Rusty", "Bailey", "Charlie", "Cooper", "Daisy", "Lola", "Molly",
      "Bear", "Jack", "Coco", "Sophie",
    ],
    cat: [
      "Tiger", "Smokey", "Shadow", "Misty", "Patches", "Simba", "Felix", "Oscar",
      "Cleo", "Boots", "Whiskers", "Mittens", "Socks", "Garfield", "Luna",
      "Oliver", "Max", "Lucy", "Milo", "Toby",
    ],
    other: [
      "Snowball", "Fluffy", "Cinnamon", "Pepper", "Hammy", "Brownie", "Chubby",
      "Sunny", "Chip", "Dale", "Rocky", "Daisy", "Coco", "Gizmo", "Tweety",
      "Speedy", "Thumper", "Bunny",
    ],
  },
};

const THEME_BANKS: Record<Exclude<ThemeKey, "none">, string[]> = {
  food: [
    "Waffles", "Pickles", "Nacho", "Tater Tot", "Meatball", "Sushi", "Mochi",
    "Brie", "Noodle", "Sprout", "Cupcake", "Bagel", "Dumpling", "Sesame",
    "Biscotti", "Muffin", "Pretzel", "Pancake", "Salsa", "Cocoa",
  ],
  nature: [
    "Willow", "Fern", "River", "Maple", "Clover", "Juniper", "Meadow", "Birch",
    "Moss", "Sage", "Petal", "Ember", "Ivy", "Hazel", "Lark", "Stone", "Rowan",
    "Iris", "Cedar", "Rain",
  ],
  space: [
    "Luna", "Nova", "Comet", "Orion", "Cosmo", "Asteroid", "Pluto", "Stella",
    "Nebula", "Rocket", "Galaxy", "Venus", "Apollo", "Eclipse", "Jupiter",
    "Mars", "Saturn", "Star", "Astro", "Zenith",
  ],
  music: [
    "Lyric", "Melody", "Jazz", "Blues", "Tempo", "Aria", "Riff", "Echo",
    "Chorus", "Piper", "Viola", "Cadence", "Harmony", "Bass", "Treble",
    "Sonata", "Forte", "Presto", "Ballad", "Rhythm",
  ],
  royalty: [
    "Duke", "Duchess", "Baron", "Sir", "King", "Queenie", "Prince", "Princess",
    "Empress", "Majestic", "Royal", "Regal", "Lady", "Lord", "Countess",
    "Monarch", "Crown", "Scepter", "Rex", "Caesar",
  ],
  ocean: [
    "Splash", "Coral", "Reef", "Sailor", "Pearl", "Bubbles", "Anchor", "Wave",
    "Marlin", "Kelp", "Tide", "Marina", "Shell", "Drift", "Caspian", "Nemo",
    "Bay", "Lagoon", "Sandy", "Poseidon",
  ],
  cozy: [
    "Snuggle", "Blanket", "Cozy", "Marshmallow", "Pillow", "Cocoa", "Bear",
    "Fuzzy", "Hugs", "Socks", "Mittens", "Whisper", "Mellow", "Cloud", "Bunny",
    "Warmth", "Cuddle", "Dream", "Button", "Puff",
  ],
};

/* ------------------------- helpers ------------------------- */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function loadFaves(): string[] {
  try {
    const raw = localStorage.getItem(FAVES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "string") : [];
  } catch {
    return [];
  }
}

function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => fallbackCopy(text),
    );
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

/** Generate a fresh set of 8 unique suggestions. */
function generate(type: PetType, style: Style, theme: ThemeKey, count = 8): string[] {
  const stylePool = STYLE_BANKS[style][type];
  if (theme === "none") return shuffle(stylePool).slice(0, count);

  const themedPool = shuffle(THEME_BANKS[theme]);
  const themeCount = Math.min(Math.ceil(count / 2), themedPool.length); // up to half themed
  const themedPick = themedPool.slice(0, themeCount);
  const stylePick = shuffle(stylePool).filter((n) => !themedPick.includes(n)).slice(0, count - themeCount);
  return shuffle([...themedPick, ...stylePick]);
}

function validateSearch(v: unknown): {
  type: PetType;
  style: Style;
  theme: ThemeKey;
} {
  const s = (v ?? {}) as Record<string, unknown>;
  const type = (["dog", "cat", "other"] as PetType[]).includes(s.type as PetType) ? (s.type as PetType) : "dog";
  const style = (["funny", "cute", "unique", "classic"] as Style[]).includes(s.style as Style) ? (s.style as Style) : "funny";
  const theme = (["none", "food", "nature", "space", "music", "royalty", "ocean", "cozy"] as ThemeKey[]).includes(s.theme as ThemeKey) ? (s.theme as ThemeKey) : "none";
  return { type, style, theme };
}

/* ------------------------------ route ------------------------------ */

export const Route = createFileRoute("/pet-name-generator")({
  component: PetNameGeneratorPage,
  validateSearch: (search) => validateSearch(search),
  head: ({ search }) => {
    const { type, style, theme } = validateSearch(search);
    const typeLabel = PET_TYPES.find((t) => t.key === type)?.label ?? "Pet";
    const styleLabel = STYLES.find((s) => s.key === style)?.label ?? "";
    return {
      meta: [
        { title: `Pet Name Generator — ${styleLabel} ${typeLabel} Names | Paw & Found ✨` },
        {
          name: "description",
          content: `Free pet name generator: find the perfect ${styleLabel.toLowerCase()} name for your ${typeLabel.toLowerCase()}. Pick a theme — food, nature, space, music, royalty, ocean or cozy — and get 8 unique name ideas in one click.`,
        },
        { property: "og:title", content: "Pet Name Generator — Paw & Found ✨" },
        {
          property: "og:description",
          content: "Funny, cute, unique or classic pet names — themed and ready to copy. Try the free Paw & Found pet name generator.",
        },
        { property: "og:url", content: `${SITE_URL}/pet-name-generator` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/pet-name-generator` }],
    };
  },
});

function PetNameGeneratorPage() {
  const search = useSearch({ from: Route.id });
  const [type, setType] = useState<PetType>(search.type);
  const [style, setStyle] = useState<Style>(search.style);
  const [theme, setTheme] = useState<ThemeKey>(search.theme);
  const [names, setNames] = useState<string[]>([]);
  const [faves, setFaves] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    setFaves(loadFaves());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAVES_KEY, JSON.stringify(faves));
    } catch {
      // storage unavailable — still works for the session
    }
  }, [faves]);

  const poolSize = useMemo(() => {
    const base = STYLE_BANKS[style][type].length;
    const themed = theme === "none" ? 0 : THEME_BANKS[theme].length;
    return base + themed;
  }, [type, style, theme]);

  function runGenerate() {
    setNames(generate(type, style, theme));
    setCopied(null);
    setCopiedAll(false);
  }

  // generate on first mount and whenever the lead-in changes? First mount only:
  useEffect(() => {
    runGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleFave(name: string) {
    setFaves((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  }

  async function handleCopyName(name: string) {
    const ok = await copyText(name);
    if (ok) {
      setCopied(name);
      setTimeout(() => setCopied((c) => (c === name ? null : c)), 2000);
    }
  }

  async function handleCopyAll() {
    const text = `My ${type} name picks (${style}${theme !== "none" ? " · " + theme : ""}):\n${names.map((n) => "• " + n).join("\n")}\n\nGenerated with Paw & Found 🐾 ${SITE_URL}/pet-name-generator`;
    const ok = await copyText(text);
    if (ok) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  }

  function handleShareX() {
    const text = encodeURIComponent(
      `I just found ${names.length} pet names with @pawandfound 🐾 My favorites: ${names.slice(0, 3).join(", ")}…`,
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(`${SITE_URL}/pet-name-generator`)}`, "_blank");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">✨🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Pet Name Generator
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Welcome a new furry (or feathery!) friend? Get 8 hand-curated name ideas in one
          click — pick a pet type, a style, and a theme, then copy your favorites.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Controls */}
        <div className="h-fit rounded-2xl border-2 border-[#FF7F5C] bg-gradient-to-br from-[#FFF6EC] to-white p-6 lg:col-span-2">
          <h2 className="font-heading text-lg font-bold text-[#2D2D2D]">🎛️ Pick your vibe</h2>

          <p className="mt-4 text-sm font-semibold text-[#6B7280]">Pet type</p>
          <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Pet type">
            {PET_TYPES.map((t) => (
              <button
                key={t.key}
                type="button"
                role="radio"
                aria-checked={type === t.key}
                onClick={() => setType(t.key)}
                className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                  type === t.key
                    ? "border-[#FF7F5C] bg-[#FF7F5C]/10 font-semibold text-[#FF7F5C]"
                    : "border-[#E9EDDE] bg-white text-[#2D2D2D] hover:border-[#F4A261]"
                }`}
              >
                <span className="block text-xl">{t.emoji}</span>
                <span className="mt-1 block text-xs">{t.label}</span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm font-semibold text-[#6B7280]">Style</p>
          <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Name style">
            {STYLES.map((s) => (
              <button
                key={s.key}
                type="button"
                role="radio"
                aria-checked={style === s.key}
                onClick={() => setStyle(s.key)}
                className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  style === s.key
                    ? "border-[#2A9D8F] bg-[#2A9D8F]/10"
                    : "border-[#E9EDDE] bg-white hover:border-[#2A9D8F]"
                }`}
              >
                <span className="text-sm font-semibold text-[#2D2D2D]">
                  {s.emoji} {s.label}
                </span>
                <span className="block text-[11px] text-[#6B7280]">{s.blurb}</span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm font-semibold text-[#6B7280]">Theme <span className="font-normal text-[#B0B7A3]">(optional)</span></p>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Theme">
            {THEMES.map((t) => (
              <button
                key={t.key}
                type="button"
                role="radio"
                aria-checked={theme === t.key}
                onClick={() => setTheme(t.key)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  theme === t.key
                    ? "border-[#F4A261] bg-[#F4A261]/15 font-semibold text-[#B07A2E]"
                    : "border-[#E9EDDE] bg-white text-[#2D2D2D] hover:border-[#F4A261]"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={runGenerate}
            className="btn-primary mt-5 w-full"
          >
            🎲 Generate Names
          </button>
          <p className="mt-3 text-center text-xs text-[#B0B7A3]">
            Drawing from a bank of {poolSize} name ideas — no two rolls feel the same.
          </p>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">
              📋 Your names
            </h2>
            <span className="text-sm text-[#6B7280]">
              {names.length} suggestions
            </span>
          </div>

          {names.length === 0 ? (
            <div className="mt-4 rounded-2xl border-2 border-dashed border-[#E9EDDE] bg-white p-10 text-center">
              <p className="text-4xl">🐶</p>
              <p className="font-heading mt-3 font-semibold text-[#2D2D2D]">Hit "Generate Names" to begin</p>
              <p className="mt-1 text-sm text-[#6B7280]">We'll mix your style with the theme for 8 fresh ideas.</p>
            </div>
          ) : (
            <>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {names.map((n) => {
                  const isFave = faves.includes(n);
                  return (
                    <li
                      key={n}
                      className={`flex items-center gap-2 rounded-xl border p-3 shadow-sm transition-colors ${
                        isFave ? "border-[#F4A261] bg-[#FFF8F0]" : "border-[#E9EDDE] bg-white"
                      }`}
                    >
                      <span className="text-lg" aria-hidden="true">
                        {theme !== "none" && THEME_BANKS[theme].includes(n) ? "🎯" : type === "cat" ? "🐈" : type === "dog" ? "🐕" : "🐹"}
                      </span>
                      <button
                        onClick={() => handleCopyName(n)}
                        title="Click to copy"
                        className="min-w-0 flex-1 text-left font-semibold text-[#2D2D2D] hover:text-[#2A9D8F]"
                      >
                        <span className="block truncate">{n}</span>
                        <span className="block text-[10px] font-normal text-[#B0B7A3]">
                          {copied === n ? "✓ Copied!" : "tap to copy"}
                        </span>
                      </button>
                      <button
                        onClick={() => toggleFave(n)}
                        aria-label={isFave ? `Remove ${n} from favorites` : `Save ${n} to favorites`}
                        className={`rounded-lg p-1.5 text-lg transition-colors ${
                          isFave ? "text-[#F4A261]" : "text-[#D6DAD0] hover:text-[#F4A261]"
                        }`}
                      >
                        {isFave ? "❤️" : "🤍"}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={runGenerate}
                  className="rounded-lg border border-[#2A9D8F] px-4 py-2 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#2A9D8F] hover:text-white"
                >
                  🔄 Roll again
                </button>
                <button
                  onClick={handleCopyAll}
                  className="rounded-lg border border-[#E9EDDE] bg-white px-4 py-2 text-sm font-semibold text-[#2D2D2D] transition-colors hover:border-[#2A9D8F] hover:text-[#2A9D8F]"
                >
                  {copiedAll ? "✓ Copied all!" : "📋 Copy all names"}
                </button>
                <button
                  onClick={handleShareX}
                  className="rounded-lg border border-[#E9EDDE] bg-white px-4 py-2 text-sm font-semibold text-[#2D2D2D] transition-colors hover:border-[#2A9D8F] hover:text-[#2A9D8F]"
                >
                  🐦 Share on X
                </button>
              </div>
            </>
          )}

          {/* Favorites */}
          {faves.length > 0 && (
            <div className="mt-6 rounded-2xl border border-[#E9EDDE] bg-[#FFF8F0] p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-[#2D2D2D]">❤️ Favorites</h3>
                <button
                  onClick={() => setFaves([])}
                  className="text-xs text-[#B0B7A3] underline-offset-2 hover:text-[#C0392B] hover:underline"
                >
                  Clear favorites
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {faves.map((n) => (
                  <button
                    key={n}
                    onClick={() => handleCopyName(n)}
                    title="Click to copy"
                    className="rounded-full border border-[#F4A261] bg-white px-3 py-1.5 text-sm font-medium text-[#2D2D2D] transition-colors hover:bg-[#F4A261]/10"
                  >
                    {n} {copied === n ? "✓" : ""}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[#B0B7A3]">
                Saved on this device · tap a name to copy it
              </p>
            </div>
          )}

          {/* Tip */}
          <div className="mt-6 rounded-2xl bg-[#E8F8F5] p-5 text-sm text-[#6B7280]">
            <p className="font-heading font-semibold text-[#2D2D2D]">💡 Name-day tips</p>
            <ul className="mt-2 space-y-1.5">
              <li>• Say the name out loud 10 times — if it still makes you smile, it's the one</li>
              <li>• Short names (1–2 syllables) are easiest for pets to learn</li>
              <li>• Save your shortlist with the 🤍 heart, then take it to the family vote</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-br from-[#FF7F5C] to-[#F4A261] p-8 text-center text-white sm:p-10">
        <h2 className="font-heading text-2xl font-bold">New name, new pet — now get them set up!</h2>
        <p className="mx-auto mt-2 max-w-md text-white/90">
          Personalized collar, cozy bed, and fun toys — shop the starter kit your new best friend deserves.
        </p>
        <a href="/products" className="btn-primary mt-6 inline-flex bg-white text-[#FF7F5C] hover:bg-white/90">
          Shop Pet Essentials →
        </a>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const SITE_URL = "https://pawandfound.store";

export const Route = createFileRoute("/freebies/pet-birthday-card")({
  component: PetBirthdayCardPage,
  head: () => ({
    meta: [
      { title: "Free Printable Pet Birthday Card — Paw & Found" },
      {
        name: "description",
        content:
          "Print a free, adorable birthday card from your dog or cat. Two designs to choose from — perfect for pet-loving friends and family!",
      },
      { property: "og:title", content: "Free Printable Pet Birthday Card — Paw & Found" },
      {
        property: "og:description",
        content: "Print a free birthday card from your dog or cat. Cute, easy, and free!",
      },
      { property: "og:url", content: `${SITE_URL}/freebies/pet-birthday-card` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/freebies/pet-birthday-card` }],
  }),
});

function PetBirthdayCardPage() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [petName, setPetName] = useState("");

  const handlePrint = () => window.print();

  const isDog = petType === "dog";
  const animalEmoji = isDog ? "🐕" : "🐱";
  const pawEmojis = isDog ? "🐾🐾🐾" : "🐾🐾🐾";
  const accentColor = isDog ? "#FF7F5C" : "#2A9D8F";
  const bgGradient = isDog
    ? "linear-gradient(135deg, #FFF8F0 0%, #FFE8D6 100%)"
    : "linear-gradient(135deg, #E8F8F5 0%, #D4EFDF 100%)";
  const borderColor = isDog ? "#FF7F5C" : "#2A9D8F";
  const balloonColor1 = isDog ? "#FF7F5C" : "#F4A261";
  const balloonColor2 = isDog ? "#F4A261" : "#2A9D8F";
  const balloonColor3 = isDog ? "#2A9D8F" : "#FF7F5C";

  return (
    <>
      {/* Print styles — inject directly for reliable @media print */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body * {
            visibility: hidden !important;
          }
          #birthday-card-print-area,
          #birthday-card-print-area * {
            visibility: visible !important;
          }
          #birthday-card-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            min-height: 100vh !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header — hidden when printing */}
        <div className="no-print text-center mb-10">
          <span className="text-5xl">🎂</span>
          <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
            Free Printable Pet Birthday Card
          </h1>
          <p className="mt-3 text-[#6B7280] max-w-lg mx-auto">
            Choose a design, fill in your pet's name, and print a card that looks like it came straight from your furry friend!
          </p>

          {/* Pet type toggle */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setPetType("dog")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                isDog
                  ? "bg-[#FF7F5C] text-white shadow-md"
                  : "bg-[#E9EDDE] text-[#6B7280] hover:bg-[#FF7F5C]/20"
              }`}
            >
              🐕 From Your Dog
            </button>
            <button
              onClick={() => setPetType("cat")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                !isDog
                  ? "bg-[#2A9D8F] text-white shadow-md"
                  : "bg-[#E9EDDE] text-[#6B7280] hover:bg-[#2A9D8F]/20"
              }`}
            >
              🐱 From Your Cat
            </button>
          </div>

          {/* Pet name input */}
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter your pet's name..."
              maxLength={20}
              className="w-64 rounded-xl border border-[#E9EDDE] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#6B7280] focus:border-[#FF7F5C] focus:outline-none"
            />
            <button onClick={handlePrint} className="btn-primary">
              🖨️ Download & Print
            </button>
          </div>
        </div>

        {/* The Card — printable area */}
        <div
          id="birthday-card-print-area"
          className="mx-auto max-w-lg rounded-2xl border-4 p-8 shadow-2xl"
          style={{
            background: bgGradient,
            borderColor: borderColor,
            minHeight: "500px",
          }}
        >
          {/* Front of card */}
          <div className="flex flex-col items-center text-center">
            {/* Decorative top */}
            <div className="text-2xl tracking-wider mb-2" style={{ color: accentColor }}>
              {pawEmojis}
            </div>

            {/* Balloons */}
            <div className="flex gap-1 mb-4 text-4xl">
              <span style={{ color: balloonColor1 }}>🎈</span>
              <span style={{ color: balloonColor2 }}>🎈</span>
              <span style={{ color: balloonColor3 }}>🎈</span>
            </div>

            {/* Main headline */}
            <h2
              className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{ color: accentColor }}
            >
              Happy Birthday!
            </h2>

            {/* Animal emoji */}
            <div className="mt-4 text-6xl">{animalEmoji}</div>

            {/* Message */}
            <p className="mt-6 text-lg leading-relaxed text-[#2D2D2D] max-w-sm">
              Hope your day is filled with treats, belly rubs, and all your favorite things!
            </p>

            {/* To/From section */}
            <div className="mt-8 w-full border-t-2 pt-6" style={{ borderColor: accentColor + "40" }}>
              <div className="flex items-center justify-center gap-4 text-[#2D2D2D]">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-[#6B7280] font-medium">To</p>
                  <p className="mt-1 text-lg font-semibold border-b-2 border-dashed min-w-[120px]" style={{ borderColor: accentColor + "60" }}>
                    &nbsp;
                  </p>
                </div>
                <span className="text-2xl mt-4" style={{ color: accentColor }}>❤️</span>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-[#6B7280] font-medium">From</p>
                  <p className="mt-1 text-lg font-semibold" style={{ color: accentColor }}>
                    {petName || "Your Pet"}
                  </p>
                </div>
              </div>
            </div>

            {/* Paw print decorations */}
            <div className="mt-6 flex gap-4 text-lg opacity-40">
              <span>🐾</span>
              <span>🐾</span>
              <span>🐾</span>
            </div>

            {/* Branding */}
            <div className="mt-6 pt-4 border-t" style={{ borderColor: accentColor + "30" }}>
              <p className="text-xs text-[#6B7280]">
                Made with love from <span className="font-semibold" style={{ color: accentColor }}>Paw & Found</span> 🐾
              </p>
              <p className="mt-0.5 text-[10px] text-[#6B7280]/60">pawandfound.store</p>
            </div>
          </div>
        </div>

        {/* Newsletter CTA — hidden when printing */}
        <div className="no-print mt-12 rounded-2xl border border-[#E9EDDE] bg-[#FFF8F0] p-6 text-center">
          <span className="text-3xl">📬</span>
          <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D]">
            Want more freebies? Join the Paw & Found Pack
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Get free printables, pet care tips, and exclusive offers delivered to your inbox.
          </p>
          <form
            className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.target as HTMLFormElement).querySelector("input");
              if (input?.value) {
                alert("Thanks for signing up! Check your inbox for a confirmation email.");
                input.value = "";
              }
            }}
          >
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-64 rounded-xl border border-[#E9EDDE] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#6B7280] focus:border-[#FF7F5C] focus:outline-none"
            />
            <button type="submit" className="btn-primary">
              Sign Me Up
            </button>
          </form>
        </div>

        {/* More freebies placeholder */}
        <div className="no-print mt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            🎁 More freebies coming soon! In the meantime, check out our{" "}
            <a href="/downloads" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
              digital guides
            </a>{" "}
            or{" "}
            <a href="/blog" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
              pet care blog
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

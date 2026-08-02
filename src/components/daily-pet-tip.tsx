import { useEffect, useState } from "react";

/**
 * Bank of pet care tips. The bar shows one per day, cycling through the
 * whole bank based on the day of the year (dayOfYear % TIPS.length), so it
 * changes daily and repeats roughly monthly. Kept general across dogs, cats,
 * and small animals to suit the whole Paw & Found audience.
 */
const TIPS = [
  "Brush your dog's teeth a few times a week to help prevent dental disease.",
  "Cats need fresh water daily — a pet fountain can encourage more drinking.",
  "Never feed dogs or cats chocolate, grapes, onions, garlic, or xylitol.",
  "Trim nails every 3–4 weeks to keep paws healthy and floors scratch-free.",
  "Puzzle feeders make mealtime fun and give pets a great mental workout.",
  "Brush your cat regularly to cut down on hairballs and matting.",
  "A collar should be snug but comfy — you should fit two fingers underneath.",
  "Exercise your dog daily — a tired pup is a happy pup!",
  "Cats love vertical space: a cat tree or wall shelves satisfies their climbing instinct.",
  "Keep your pet's ID tag updated with your current phone number.",
  "Senior pets need softer bedding, ramps, and more frequent vet checkups.",
  "Switch foods gradually over 7 days to avoid upset tummies.",
  "Dogs can't cool down like we do — never leave them in a parked car, even briefly.",
  "Rotate toys weekly to keep your pet excited and engaged.",
  "Guinea pigs can't make their own vitamin C — they need it daily in their diet.",
  "Check ears and paws weekly during grooming to catch problems early.",
  "Hide treats around the house for a simple, fun enrichment game.",
  "Keep houseplants pet-safe — lilies, for example, are toxic to cats.",
  "A consistent feeding schedule supports house training and healthy digestion.",
  "Give your pet at least 15 minutes of focused playtime every day.",
  "Follow your vet's advice on monthly flea, tick, and worm prevention.",
  "Pets hide pain — watch for changes in appetite, energy, or hiding behavior.",
  "A slow-feeder bowl helps fast eaters digest better and pace themselves.",
  "Keep a recent, well-lit photo of your pet in case they ever get lost.",
  "Cats need a clean, quiet litter box — scoop daily, wash weekly.",
  "After winter walks, wipe paws to remove salt and ice-melt chemicals.",
  "Positive reinforcement beats punishment — praise the behavior you want.",
  "On hot days, fresh water and shade are musts, even for indoor pets.",
  "Make vet visits calmer with treats, a comfy carrier, and short practice trips.",
  "A microchip only helps if the registry has your current contact info — keep it updated.",
];

/** Day of year 0–365 (Jan 1 = 0). */
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

function pickTip(date: Date): string {
  return TIPS[dayOfYear(date) % TIPS.length];
}

/**
 * Rotating "Daily Pet Tip" for the homepage utility bar.
 * Client-only (same pattern as LiveClock): renders a subtle placeholder until
 * the effect runs, then shows today's tip. Picks by local date, so it changes
 * daily and needs no backend.
 */
export function DailyPetTip() {
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    setTip(pickTip(new Date()));
  }, []);

  if (!tip) {
    // Graceful pre-hydration fallback: keep the layout height, show nothing.
    return (
      <p className="text-xs font-normal text-[#6B7280]" aria-hidden="true">
        <span className="inline-block h-4 w-64" />
      </p>
    );
  }

  return (
    <p className="text-xs font-normal text-[#6B7280]">
      <span className="inline-flex items-center gap-1.5">
        <svg
          className="h-3.5 w-3.5 flex-shrink-0 text-[#F4A261]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a1 1 0 01-1 1h-2a1 1 0 01-1-1v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <span className="font-medium text-[#2D2D2D]">Daily Pet Tip:</span>
        <span>{tip}</span>
      </span>
    </p>
  );
}

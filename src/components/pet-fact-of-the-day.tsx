import { useEffect, useState } from "react";

const FACTS = [
  "A dog's nose print is as unique as a human fingerprint — no two are alike.",
  "Cats spend roughly 70% of their lives sleeping. That's about 16 hours a day!",
  "Dogs can smell up to 100,000 times better than humans.",
  "A group of pugs is called a grumble.",
  "Cats can't taste sweetness — they lack the taste receptor for sugar.",
  "Greyhounds can reach 45 mph in just three strides, making them the fastest couch potatoes on Earth.",
  "A cat's purr vibrates at 25–150 Hz — the exact frequency that helps heal bones and tissue.",
  "Dogs have three eyelids — the third one is called a nictitating membrane.",
  "Hamsters can run up to 5.5 miles in a single night on their wheel.",
  "Basenji dogs don't bark — they yodel instead.",
  "Cats have 32 muscles in each ear, allowing them to rotate their ears 180 degrees.",
  "A newborn puppy is blind, deaf, and toothless for the first two weeks of life.",
  "Rabbits can see behind themselves without turning their heads — they have near 360-degree vision.",
  "Dalmatians are born completely white and develop their spots as they grow.",
  "A cat's whiskers are roughly as wide as its body — they use them to judge whether they'll fit through spaces.",
  "Dogs dream just like humans do. Small breeds dream more often than large breeds.",
  "Guinea pigs are born fully furred with their eyes open and can run within hours of birth.",
  "The world's oldest known dog lived to be 29 years and 5 months old.",
  "Cats walk like camels and giraffes — they move both right feet first, then both left feet.",
  "A dog's wet nose helps them absorb scent chemicals, boosting their already incredible sense of smell.",
  "The slow loris is the only venomous primate — it produces a toxin from glands near its elbows.",
  "Otters hold hands while sleeping so they don't drift apart.",
  "Cows have best friends and get stressed when separated from them.",
  "A house cat can jump up to five times its own height in a single bound.",
  "The chow chow and shar-pei are the only dogs with blue-black tongues.",
  "Hermit crabs form orderly lines by size to exchange shells — like a tiny housing market.",
  "Dogs curl up in a ball while sleeping because of an instinct to protect their organs and stay warm.",
  "A kitten's eyes are always blue at first — the permanent color develops around 8 weeks.",
  "Elephants are the only animals that can't jump — but they can swim for hours.",
  "Petting a dog can lower your blood pressure — and the dog's too.",
];

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86_400_000);
}

function pickFact(date: Date): string {
  return FACTS[dayOfYear(date) % FACTS.length];
}

export function PetFactOfTheDay() {
  const [fact, setFact] = useState<string | null>(null);

  useEffect(() => {
    setFact(pickFact(new Date()));
  }, []);

  if (!fact) {
    return (
      <p className="text-sm font-normal text-[#6B7280]" aria-hidden="true">
        <span className="inline-block h-5 w-72" />
      </p>
    );
  }

  return (
    <p className="text-sm font-normal text-[#6B7280]">
      <span className="inline-flex items-center gap-1.5">
        <svg
          className="h-4 w-4 flex-shrink-0 text-[#FF7F5C]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium text-[#2D2D2D]">🐾 Did You Know?</span>
        <span>{fact}</span>
      </span>
    </p>
  );
}

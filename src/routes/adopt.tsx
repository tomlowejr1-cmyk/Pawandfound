import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://pawandfound.store";
const SHELTER_URL = "https://www.petfinder.com/member/us/nj/voorhees/voorhees-animal-orphanage-nj110/";
const SHELTER_SEARCH_URL = "https://www.petfinder.com/search/pets-for-adoption/?shelter_id%5B0%5D=NJ110";
const TRISTATE_SEARCH_URL = "https://www.petfinder.com/search/dogs-for-adoption/?location=08003";

export const Route = createFileRoute("/adopt")({
  component: AdoptPage,
  head: () => ({
    meta: [
    { title: "Adoptable Dogs & Cats — Paw & Found ❤️" },
    {
      name: "description",
      content:
        "Browse adoptable dogs and cats from Voorhees Animal Orphanage and Tri State Canine Response Team — and give a shelter pet a loving home.",
    },
    { property: "og:title", content: "Adopt a Pet — Paw & Found ❤️" },
    {
      property: "og:description",
      content: "Browse adoptable dogs and cats from local rescue partners like Voorhees Animal Orphanage and Tri State Canine Response Team. Give a shelter pet their forever home.",
    },
      { property: "og:url", content: `${SITE_URL}/adopt` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/adopt` }],
  }),
});

function AdoptPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">🏠❤️🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Give a Shelter Pet Their Forever Home
        </h1>
        <p className="mt-3 text-[#6B7280] max-w-2xl mx-auto">
          Every adoption changes two lives — yours and theirs. We're proud to feature{" "}
          <strong>Voorhees Animal Orphanage</strong>, a no-kill shelter in Voorhees, NJ,
          and <strong>Tri State Canine Response Team</strong>, a canine-focused rescue
          and response team in Cherry Hill, NJ — both dedicated to finding loving homes
          for dogs and cats in need.
        </p>
      </div>

      {/* Local Rescue Partners */}
      <div className="mt-10">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          Local Rescue Partners
        </h2>
        <p className="mt-2 text-center text-sm text-[#6B7280]">
          Two trusted partners working every day to match pets with their forever families.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Voorhees Animal Orphanage Card */}
          <div className="rounded-2xl border-2 border-[#2A9D8F] bg-gradient-to-br from-[#E8F8F5] to-white p-6 sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#2A9D8F]/10 text-4xl">
                🐕
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[#2D2D2D]">
                  Voorhees Animal Orphanage
                </h3>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Located in Voorhees, New Jersey, this no-kill shelter has been serving the
                  community for decades. They provide medical care, spay/neuter services, and
                  behavioral support for every animal in their care — all while working
                  tirelessly to match each pet with the right family.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-[#6B7280]">
                  <li>📍 Voorhees, NJ</li>
                  <li>🏥 Full veterinary care & spay/neuter</li>
                  <li>💛 No-kill shelter</li>
                  <li>🐶 Dogs, cats, and occasionally small animals</li>
                </ul>
                <a
                  href={SHELTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-4 inline-flex items-center gap-2"
                >
                  View Adoptable Pets
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Tri State Canine Response Team Card */}
          <div className="rounded-2xl border-2 border-[#F4A261] bg-gradient-to-br from-[#FFF6EC] to-white p-6 sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#F4A261]/10 text-4xl">
                🦮
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[#2D2D2D]">
                  Tri State Canine Response Team
                </h3>
                <p className="mt-2 text-sm text-[#6B7280]">
                  A canine-focused rescue and response team based in Cherry Hill, New Jersey.
                  They work to help dogs in need find safe, loving homes through rescue,
                  rehabilitation, and community partnerships.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-[#6B7280]">
                  <li>📍 Cherry Hill, NJ</li>
                  <li>🦮 Canine rescue & response team</li>
                  <li>🏡 Foster-based care</li>
                  <li>🐶 Adoptable dogs ready for their forever homes</li>
                </ul>
                <a
                  href={TRISTATE_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary mt-4 inline-flex items-center gap-2"
                >
                  View Adoptable Dogs
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <p className="mt-2 text-xs text-[#6B7280]">
                  Opens Petfinder's adoptable-dog search for the Cherry Hill, NJ area — Tri
                  State Canine Response Team currently has no public website or Petfinder page
                  of its own to link to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Cards */}
      <div className="mt-10">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          Ready to Meet Your Match?
        </h2>
        <p className="mt-2 text-center text-sm text-[#6B7280]">
          Click below to browse adoptable pets on Petfinder — then visit the shelter to meet them in person!
          Voorhees Animal Orphanage lists all of their adoptable dogs and cats on Petfinder.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* Dogs Card */}
          <a
            href={SHELTER_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-[#E9EDDE] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#FF7F5C] hover:shadow-md"
          >
            <span className="text-4xl">🐶</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C]">
              Adoptable Dogs
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Browse dogs of all sizes, ages, and personalities waiting for their forever homes.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#FF7F5C] group-hover:underline">
              View on Petfinder
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Cats Card */}
          <a
            href={SHELTER_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-[#E9EDDE] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#2A9D8F] hover:shadow-md"
          >
            <span className="text-4xl">🐱</span>
            <h3 className="font-heading mt-3 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#2A9D8F]">
              Adoptable Cats
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              From cuddly lap cats to playful kittens — find the purrfect companion.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2A9D8F] group-hover:underline">
              View on Petfinder
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-12 rounded-2xl bg-[#FFF8F0] p-6 sm:p-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          How Adoption Works
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FF7F5C]/10 text-2xl">
              🔍
            </span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">1. Browse & Fall in Love</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Scroll through adoptable pets on Petfinder. Read their stories — one will steal your heart.
            </p>
          </div>
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2A9D8F]/10 text-2xl">
              📋
            </span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">2. Apply & Meet</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Fill out an application, then visit the shelter. Meeting in person helps ensure the right match.
            </p>
          </div>
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F4A261]/10 text-2xl">
              🏡
            </span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">3. Bring Them Home</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              After approval, your new best friend comes home! The shelter provides records and post-adoption support.
            </p>
          </div>
        </div>
      </div>

      {/* Adoption Tips */}
      <div className="mt-8 rounded-xl border border-[#E9EDDE] bg-white p-6">
        <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">
          💡 Before You Adopt
        </h3>
        <ul className="mt-2 space-y-2 text-sm text-[#6B7280]">
          <li>✅ Make sure everyone in your household is ready for a new pet</li>
          <li>✅ Pet-proof your home — secure trash, hide cords, remove toxic plants</li>
          <li>✅ Budget for food, vet visits, supplies, and unexpected care</li>
          <li>✅ Plan for the first few weeks of adjustment — patience is key</li>
          <li>✅ Check out our{" "}
            <a href="/blog?post=introducing-new-pet-to-your-home" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
              new pet preparation guide
            </a>{" "}
            and{" "}
            <a href="/products?category=Essentials" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
              essential supplies
            </a>
          </li>
        </ul>
      </div>

      {/* CTA to shelters */}
      <div className="mt-8 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={SHELTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            🐾 Visit Voorhees Animal Orphanage on Petfinder
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href={TRISTATE_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            🦮 Find Dogs Near Cherry Hill, NJ
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <p className="mt-4 text-sm text-[#6B7280]">
          Not ready to adopt? Consider{" "}
          <a href={SHELTER_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
            fostering
          </a>{" "}
          or{" "}
          <a href={SHELTER_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
            donating
          </a>{" "}
          — every bit of support helps!
        </p>
      </div>
    </div>
  );
}

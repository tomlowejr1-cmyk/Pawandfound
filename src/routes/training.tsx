import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const SITE_URL = "https://pawandfound.store";

interface Video {
  id: string;
  title: string;
  description: string;
  trainer: string;
  youtubeId: string;
  relatedGuide?: { title: string; url: string; price: string };
}

interface VideoCategory {
  icon: string;
  name: string;
  slug: string;
  videos: Video[];
}

const categories: VideoCategory[] = [
  {
    icon: "🎯",
    name: "Basic Commands",
    slug: "basic-commands",
    videos: [
      {
        id: "basic-sit-stay",
        title: "How to Teach Your Dog to Sit & Stay",
        description:
          "Master the two most essential commands every dog should know. Step-by-step guidance for reliable sits and stays in any environment.",
        trainer: "Zak George",
        youtubeId: "DPNz6reMVXY",
        relatedGuide: {
          title: "Puppy Training Checklist & Milestone Tracker",
          url: "/downloads",
          price: "$4.99",
        },
      },
      {
        id: "basic-recall",
        title: "Come When Called — Reliable Recall Training",
        description:
          "Teach your dog to come running every single time. Covers building value in the recall cue and proofing against distractions.",
        trainer: "Kikopup",
        youtubeId: "VuyjjkSPRfU",
        relatedGuide: {
          title: "Puppy Starter Pack (Bundle)",
          url: "/downloads",
          price: "$12.99",
        },
      },
      {
        id: "basic-down",
        title: "Teaching the 'Down' Command from Scratch",
        description:
          "A calm, reliable down is a game-changer for every dog. Learn how to lure, shape, and proof the behavior so it sticks.",
        trainer: "Zak George",
        youtubeId: "DYWTarzD2u4",
      },
    ],
  },
  {
    icon: "🦮",
    name: "Leash Skills",
    slug: "leash-skills",
    videos: [
      {
        id: "leash-loose",
        title: "Loose Leash Walking — Stop the Pulling",
        description:
          "Transform your walks from a tug-of-war into a enjoyable stroll. Covers equipment setup, engagement exercises, and real-world practice.",
        trainer: "Zak George",
        youtubeId: "sFgtqgiAKoQ",
        relatedGuide: {
          title: "Dog Walking Etiquette Guide",
          url: "/downloads",
          price: "$6.99",
        },
      },
      {
        id: "leash-heel",
        title: "Heel Training: Walk Politely by Your Side",
        description:
          "Take leash skills to the next level with focused heel training. Perfect for busy sidewalks, vet visits, and anywhere you need close control.",
        trainer: "McCann Dogs",
        youtubeId: "POzOVrh8dSU",
      },
      {
        id: "leash-pulling",
        title: "How to Stop Your Dog from Pulling on Leash",
        description:
          "If your arm is sore after every walk, this one's for you. A practical, force-free method to end pulling for good.",
        trainer: "Zak George",
        youtubeId: "y2yj2xtCo-k",
      },
    ],
  },
  {
    icon: "🐕",
    name: "Behavior Fixes",
    slug: "behavior-fixes",
    videos: [
      {
        id: "behavior-jumping",
        title: "Stop Your Dog from Jumping on Guests",
        description:
          "No more embarrassing greetings. Learn how to teach a polite alternative behavior that your guests will actually appreciate.",
        trainer: "Zak George",
        youtubeId: "lC_OKgQFgzw",
        relatedGuide: {
          title: "Basic Obedience Training Guide",
          url: "/downloads",
          price: "$7.99",
        },
      },
      {
        id: "behavior-barking",
        title: "How to Stop Excessive Barking",
        description:
          "Get to the root of why your dog barks and learn targeted strategies to quiet the noise — without yelling or punishment.",
        trainer: "Zak George",
        youtubeId: "DBMeIfC0KFo",
      },
      {
        id: "behavior-leave-it",
        title: "Teach 'Leave It' and 'Drop It'",
        description:
          "Two commands that could save your dog's life. Teach rock-solid impulse control around food, trash, and anything dangerous.",
        trainer: "Kikopup",
        youtubeId: "2EGY6fNHESc",
      },
    ],
  },
  {
    icon: "🐶",
    name: "Puppy Essentials",
    slug: "puppy-essentials",
    videos: [
      {
        id: "puppy-crate",
        title: "Crate Training Made Easy",
        description:
          "Turn the crate into your puppy's favorite spot. Step-by-step crate training that builds positive associations from day one.",
        trainer: "Zak George",
        youtubeId: "BCBA0nJXYOc",
        relatedGuide: {
          title: "Puppy Starter Pack (Bundle)",
          url: "/downloads",
          price: "$12.99",
        },
      },
      {
        id: "puppy-potty",
        title: "Potty Training: A Complete Guide",
        description:
          "The potty training system that actually works. Covers scheduling, crate use, accident management, and celebrating success.",
        trainer: "Zak George",
        youtubeId: "DPNz6reMVXY",
      },
      {
        id: "puppy-biting",
        title: "How to Stop Puppy Biting & Mouthing",
        description:
          "Those needle-sharp teeth won't last forever, but the habit might. Teach bite inhibition and redirect mouthing the right way.",
        trainer: "Kikopup",
        youtubeId: "VuyjjkSPRfU",
      },
    ],
  },
];

const crossSells = [
  {
    title: "Puppy Starter Pack (Bundle)",
    price: "$12.99",
    description: "3 essential guides for new puppy parents — save 20% vs buying individually",
    url: "/downloads",
    badge: "BEST VALUE",
  },
  {
    title: "Puppy Training Checklist",
    price: "$4.99",
    description: "Printable milestone tracker so you never miss a training step",
    url: "/downloads",
  },
  {
    title: "Dog Walking Etiquette Guide",
    price: "$6.99",
    description: "Master polite leash manners and trail etiquette",
    url: "/downloads",
  },
];

export const Route = createFileRoute("/training")({
  component: TrainingPage,
  head: () => ({
    meta: [
      { title: "Free Dog Training Videos — Paw & Found" },
      {
        name: "description",
        content:
          "Curated collection of the best free dog training videos organized by skill level. Basic commands, leash skills, behavior fixes, and puppy essentials — all from top trainers.",
      },
      { property: "og:title", content: "Free Dog Training Videos — Paw & Found" },
      {
        property: "og:description",
        content:
          "Curated collection of the best free dog training videos organized by skill level. Watch and learn from Zak George, Kikopup, and McCann Dogs.",
      },
      { property: "og:url", content: `${SITE_URL}/training` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/training` }],
  }),
});

function TrainingPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function toggleVideo(videoId: string) {
    setActiveVideo((prev) => (prev === videoId ? null : videoId));
  }

  function scrollToCategory(slug: string) {
    setActiveCategory(slug);
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">🎓🐕</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Dog Training Video Library
        </h1>
        <p className="mt-3 mx-auto max-w-2xl text-[#6B7280]">
          Hand-picked training videos from top trainers — organized by skill so you can find exactly
          what you need. All free, all ad-free via privacy-enhanced embeds.
        </p>
      </div>

      {/* Quick-jump category pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => scrollToCategory(cat.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? "bg-[#2A9D8F] text-white"
                : "bg-[#E9EDDE] text-[#2D2D2D] hover:bg-[#2A9D8F]/20"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Video Categories */}
      <div className="mt-12 space-y-16">
        {categories.map((cat) => (
          <section key={cat.slug} id={cat.slug}>
            <h2 className="font-heading mb-6 flex items-center gap-2 text-2xl font-bold text-[#2D2D2D]">
              <span>{cat.icon}</span> {cat.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isActive={activeVideo === video.id}
                  onToggle={() => toggleVideo(video.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Cross-sells */}
      <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#2A9D8F]/10 via-white to-[#FF7F5C]/10 p-8 sm:p-10">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-[#2D2D2D]">
            Ready to Go Deeper? 📚
          </h2>
          <p className="mt-2 text-[#6B7280]">
            Videos are great for getting started. Our printable guides give you step-by-step plans,
            checklists, and pro tips you can reference anytime — even when you're outside with your dog.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {crossSells.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              className="relative flex flex-col rounded-xl border border-[#E9EDDE] bg-white p-5 transition-shadow hover:shadow-md"
            >
              {item.badge && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-[#FF7F5C] px-3 py-0.5 text-xs font-bold text-white">
                  {item.badge}
                </span>
              )}
              <h3 className="font-heading font-semibold text-[#2D2D2D]">{item.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{item.description}</p>
              <span className="mt-auto pt-3 font-heading text-lg font-bold text-[#FF7F5C]">
                {item.price}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-10 text-center text-xs text-[#9CA3AF]">
        Videos are embedded from YouTube using privacy-enhanced mode. Paw & Found is not affiliated
        with any of the featured trainers. All video content belongs to their respective creators.
      </p>
    </div>
  );
}

function VideoCard({
  video,
  isActive,
  onToggle,
}: {
  video: Video;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E9EDDE] bg-white transition-shadow hover:shadow-md">
      {/* Thumbnail / Video */}
      <div className="relative aspect-video bg-[#1A1A2E]">
        {isActive ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <button
            onClick={onToggle}
            className="group relative flex h-full w-full items-center justify-center"
            aria-label={`Play ${video.title}`}
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              className="h-full w-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF7F5C]/90 text-white shadow-lg transition-transform group-hover:scale-110">
                <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-[#2D2D2D] leading-tight">
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">{video.description}</p>
        <p className="mt-2 text-xs font-medium text-[#2A9D8F]">
          Trainer: {video.trainer}
        </p>
        {!isActive && (
          <button
            onClick={onToggle}
            className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#FF7F5C] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#FF7F5C]/90"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </button>
        )}

        {/* Related Guide cross-sell */}
        {video.relatedGuide && (
          <a
            href={video.relatedGuide.url}
            className="mt-3 block rounded-lg border border-dashed border-[#FF7F5C]/40 bg-[#FFF8F0] p-2.5 text-sm transition-colors hover:bg-[#FF7F5C]/10"
          >
            <span className="text-[#6B7280]">Want more? </span>
            <span className="font-medium text-[#2A9D8F]">
              {video.relatedGuide.title}
            </span>
            <span className="ml-1 text-[#6B7280]">({video.relatedGuide.price})</span>
          </a>
        )}
      </div>
    </div>
  );
}

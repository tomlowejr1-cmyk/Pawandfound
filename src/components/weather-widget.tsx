import { useState, useEffect, useRef } from "react";

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  city: string;
}

interface Recommendation {
  label: string;
  href: string;
  icon: string;
}

function getRecommendations(temp: number, condition: string): { text: string; items: Recommendation[] } {
  const isRain = condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm";
  const isSnow = condition === "Snow";

  if (isRain) {
    return {
      text: "Rainy day — keep your pet entertained indoors!",
      items: [
        { label: "Indoor Toys", href: "/products?category=Accessories", icon: "🎾" },
        { label: "Grooming Supplies", href: "/products?category=Supplies", icon: "🧹" },
      ],
    };
  }
  if (isSnow) {
    return {
      text: "Brr! Keep your pet warm and cozy.",
      items: [
        { label: "Cozy Beds", href: "/products?category=Accessories", icon: "🛏️" },
        { label: "Pet Sweaters", href: "/products?category=Apparel", icon: "🧥" },
      ],
    };
  }
  if (temp > 80) {
    return {
      text: `It's ${temp}° out — grab a cooling mat for your pup!`,
      items: [
        { label: "Cooling Mats", href: "/products?category=Accessories", icon: "❄️" },
        { label: "Water Bowls", href: "/products?category=Essentials", icon: "🥤" },
      ],
    };
  }
  if (temp < 40) {
    return {
      text: `Chilly at ${temp}° — time for a cozy sweater!`,
      items: [
        { label: "Pet Sweaters", href: "/products?category=Apparel", icon: "🧥" },
        { label: "Cozy Beds", href: "/products?category=Accessories", icon: "🛏️" },
      ],
    };
  }
  return {
    text: "Perfect weather for outdoor fun with your pet!",
    items: [
      { label: "Walking Gear", href: "/products?category=Accessories", icon: "🦮" },
      { label: "Outdoor Toys", href: "/products?category=Accessories", icon: "🥏" },
    ],
  };
}

/**
 * Weather widget for Paw & Found.
 * - `compact` (default false): renders a small chip (city · temp · condition)
 *   suitable for the homepage utility bar next to the live clock. Clicking it
 *   expands a dropdown with weather-driven pet product recommendations.
 * - default: a full card with the same info + recommendations inline.
 *
 * Uses the free OpenWeatherMap API (VITE_WEATHER_API_KEY). Tries the visitor's
 * geolocation and falls back to NYC. Renders a skeleton until the first
 * response so there's no layout shift / hydration mismatch.
 */
export function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<{ text: string; items: Recommendation[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  async function fetchWeatherForCoords(lat: number, lon: number) {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    if (!key || key === "your_api_key_here") {
      setError("API key not configured");
      setRecommendations({
        text: "Check your local weather for pet tips!",
        items: [
          { label: "Pet Essentials", href: "/products?category=Essentials", icon: "🛒" },
          { label: "Apparel", href: "/products?category=Apparel", icon: "👕" },
        ],
      });
      setLoading(false);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const json = await res.json();

      const w: WeatherData = {
        temp: Math.round(json.main.temp),
        condition: json.weather[0].main,
        icon: json.weather[0].icon,
        city: json.name || "Your Area",
      };
      setWeather(w);
      setRecommendations(getRecommendations(w.temp, w.condition));
    } catch {
      setError("Weather unavailable");
      setRecommendations({
        text: "Check your local weather for pet tips!",
        items: [
          { label: "Pet Essentials", href: "/products?category=Essentials", icon: "🛒" },
          { label: "Apparel", href: "/products?category=Apparel", icon: "👕" },
        ],
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) { reject(new Error("No geo")); return; }
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000, enableHighAccuracy: false });
        });
        await fetchWeatherForCoords(pos.coords.latitude, pos.coords.longitude);
      } catch {
        // Fallback: NYC
        await fetchWeatherForCoords(40.7128, -74.006);
      }
    }
    init();
  }, []);

  // Close the compact dropdown on outside click or Escape
  useEffect(() => {
    if (!compact || !open) return;
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [compact, open]);

  // Loading states
  if (loading) {
    if (compact) {
      return (
        <p className="text-xs font-normal text-[#6B7280] tabular-nums animate-pulse" aria-hidden="true">
          <span className="inline-block h-4 w-44" />
        </p>
      );
    }
    return (
      <div className="rounded-xl border border-[#E9EDDE] bg-white p-4 shadow-sm animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#E9EDDE]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 rounded bg-[#E9EDDE]" />
            <div className="h-4 w-14 rounded bg-[#E9EDDE]" />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-3 w-40 rounded bg-[#E9EDDE]" />
          <div className="h-3 w-32 rounded bg-[#E9EDDE]" />
        </div>
      </div>
    );
  }

  // Compact chip + expandable dropdown (homepage utility bar)
  if (compact) {
    return (
      <div className="relative" ref={rootRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`Weather in ${weather?.city ?? "your area"}: ${weather ? `${weather.temp}°F, ${weather.condition}` : "unavailable"}. Click for pet tips.`}
          className="flex items-center gap-1.5 rounded-full border border-[#E9EDDE] bg-white px-2.5 py-1 text-xs font-normal text-[#6B7280] tabular-nums transition-colors hover:border-[#FF7F5C]/40 hover:text-[#2D2D2D]"
        >
          {weather?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=""
              className="h-4 w-4"
              loading="lazy"
            />
          )}
          <span className="max-w-[7rem] truncate font-medium text-[#2D2D2D] sm:max-w-[9rem]">
            {weather?.city || "Your Area"}
          </span>
          <span className="text-[#D1D5DB]" aria-hidden="true">·</span>
          <span>{weather ? `${weather.temp}°F` : "--°"}</span>
          <svg
            className={`h-3 w-3 text-[#9CA3AF] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 top-full z-40 mt-2 w-72 rounded-xl border border-[#E9EDDE] bg-white p-4 shadow-lg">
            {weather && (
              <div className="flex items-center gap-2">
                {weather.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt=""
                    className="h-8 w-8"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#6B7280] truncate">{weather.city}</p>
                  <p className="font-heading text-lg font-bold text-[#2D2D2D]">
                    {weather.temp}°F <span className="text-xs font-normal text-[#6B7280]">{weather.condition}</span>
                  </p>
                </div>
              </div>
            )}
            {error && !weather && (
              <p className="text-xs text-[#9CA3AF]">{error} — showing general pet tips.</p>
            )}
            {recommendations && (
              <div className="mt-3 border-t border-[#E9EDDE] pt-3">
                <p className="text-xs text-[#6B7280] leading-relaxed">{recommendations.text}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recommendations.items.map((rec) => (
                    <a
                      key={rec.label}
                      href={rec.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8F0] px-3 py-1 text-xs font-medium text-[#2D2D2D] hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C] transition-colors border border-[#E9EDDE]"
                    >
                      <span>{rec.icon}</span>
                      <span>{rec.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Full card (default)
  return (
    <div className="rounded-xl border border-[#E9EDDE] bg-white p-4 shadow-sm">
      {/* Weather Row */}
      <div className="flex items-center gap-3">
        {weather?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.condition}
            className="h-10 w-10"
            loading="lazy"
          />
        )}
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#6B7280] truncate">
            {weather?.city || "Your Area"}
          </p>
          <p className="font-heading text-xl font-bold text-[#2D2D2D]">
            {weather ? `${weather.temp}°F` : "--°"}
          </p>
        </div>
        {weather?.condition && (
          <span className="ml-auto text-xs text-[#6B7280]">{weather.condition}</span>
        )}
      </div>

      {/* Recommendation */}
      {recommendations && (
        <div className="mt-3 border-t border-[#E9EDDE] pt-3">
          <p className="text-xs text-[#6B7280] leading-relaxed">
            {recommendations.text}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {recommendations.items.map((rec) => (
              <a
                key={rec.label}
                href={rec.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8F0] px-3 py-1 text-xs font-medium text-[#2D2D2D] hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C] transition-colors border border-[#E9EDDE]"
              >
                <span>{rec.icon}</span>
                <span>{rec.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

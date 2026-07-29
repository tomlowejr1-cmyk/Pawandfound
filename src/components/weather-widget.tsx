import { useState, useEffect } from "react";

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

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<{ text: string; items: Recommendation[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Loading skeleton
  if (loading) {
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

  return (
    <div className="rounded-xl border border-[#E9EDDE] bg-white p-4 shadow-sm">
      {/* Weather Row */}
      <div className="flex items-center gap-3">
        {weather?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.condition}
            className="h-10 w-10"
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
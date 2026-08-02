import { useEffect, useState } from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "3:42 PM" — 12-hour clock, zero-padded minutes */
function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

/** "Friday, August 1, 2026" */
function formatDate(date: Date): string {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Live date/time display for the homepage.
 * Client-only: renders nothing until the effect runs, then updates every
 * second via setInterval. The `now === null` initial render avoids any
 * server/client hydration mismatch (server timezone could differ).
 */
export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // Graceful pre-hydration fallback: keep the layout height, show nothing.
    return (
      <p className="text-xs font-normal text-[#6B7280] tabular-nums" aria-hidden="true">
        <span className="inline-block h-4 w-44" />
      </p>
    );
  }

  return (
    <p className="text-xs font-normal text-[#6B7280] tabular-nums">
      <span className="inline-flex items-center gap-1.5">
        <svg
          className="h-3.5 w-3.5 text-[#9CA3AF]"
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
        {formatDate(now)}
        <span className="mx-1 text-[#D1D5DB]" aria-hidden="true">·</span>
        {formatTime(now)}
      </span>
    </p>
  );
}

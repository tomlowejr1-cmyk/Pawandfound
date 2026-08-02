import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

const SITE_URL = "https://pawandfound.store";
const STORAGE_KEY = "pawandfound_reminders_v1";

type CategoryKey = "vet" | "meds" | "grooming" | "nails" | "supplies" | "other";

interface Reminder {
  id: string;
  task: string;
  petName: string;
  category: CategoryKey;
  intervalDays: number;
  nextDue: string; // YYYY-MM-DD
  createdAt: number;
}

interface CategoryInfo {
  key: CategoryKey;
  label: string;
  emoji: string;
  color: string;
}

const CATEGORIES: CategoryInfo[] = [
  { key: "vet", label: "Vet & Health", emoji: "🏥", color: "#2A9D8F" },
  { key: "meds", label: "Medication", emoji: "💊", color: "#FF7F5C" },
  { key: "grooming", label: "Grooming", emoji: "✂️", color: "#F4A261" },
  { key: "nails", label: "Nail Care", emoji: "🧷", color: "#E5989B" },
  { key: "supplies", label: "Supplies", emoji: "🛒", color: "#7A9E7E" },
  { key: "other", label: "Other", emoji: "📦", color: "#8E9AAF" },
];

const CATEGORY_MAP: Record<CategoryKey, CategoryInfo> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, CategoryInfo>;

/** Quick-add presets: task → category + repeat interval (days). */
const PRESETS: { task: string; category: CategoryKey; intervalDays: number }[] = [
  { task: "Flea & tick treatment", category: "meds", intervalDays: 30 },
  { task: "Heartworm prevention", category: "meds", intervalDays: 30 },
  { task: "Deworming", category: "meds", intervalDays: 90 },
  { task: "Vet checkup", category: "vet", intervalDays: 365 },
  { task: "Vaccination booster", category: "vet", intervalDays: 365 },
  { task: "Nail trim", category: "nails", intervalDays: 28 },
  { task: "Grooming appointment", category: "grooming", intervalDays: 56 },
  { task: "Ear cleaning", category: "grooming", intervalDays: 30 },
  { task: "Food & treats reorder", category: "supplies", intervalDays: 30 },
  { task: "Litter box deep clean", category: "supplies", intervalDays: 14 },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ---------- date helpers (all local time, YYYY-MM-DD strings) ---------- */

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Whole days from today (local midnight) to target. Negative = in the past. */
function daysFromToday(iso: string): number {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = parseISO(iso);
  return Math.round((target.getTime() - startOfToday.getTime()) / 86_400_000);
}

function formatLong(iso: string): string {
  return parseISO(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function makeId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}

function loadReminders(): Reminder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Sample set so first-time visitors can see the tool in action. */
function sampleReminders(): Reminder[] {
  const today = new Date();
  const mk = (task: string, category: CategoryKey, intervalDays: number, dueInDays: number, petName: string): Reminder => ({
    id: makeId(),
    task,
    category,
    petName,
    intervalDays,
    nextDue: toISO(addDays(today, dueInDays)),
    createdAt: Date.now(),
  });
  return [
    mk("Nail trim", "nails", 28, -6, "Biscuit"),
    mk("Flea & tick treatment", "meds", 30, 9, "Biscuit"),
    mk("Vet checkup", "vet", 365, 41, "Rocket"),
    mk("Litter box deep clean", "supplies", 14, 3, ""),
  ];
}

/* ------------------------------ component ------------------------------ */

export const Route = createFileRoute("/pet-reminders")({
  component: PetRemindersPage,
  head: () => ({
    meta: [
      { title: "Pet Care Reminders — Paw & Found ⏰" },
      {
        name: "description",
        content:
          "Free pet care reminder tool: set recurring reminders for flea & tick treatment, vet checkups, nail trims, grooming, heartworm meds and more. Overdue alerts, upcoming list, and a calendar view — all in your browser.",
      },
      { property: "og:title", content: "Pet Care Reminders — Paw & Found ⏰" },
      {
        property: "og:description",
        content:
          "Never miss a flea treatment or vet visit again. Set free recurring pet care reminders with overdue alerts and a calendar view.",
      },
      { property: "og:url", content: `${SITE_URL}/pet-reminders` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/pet-reminders` }],
  }),
});

function PetRemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // form state
  const [task, setTask] = useState("");
  const [petName, setPetName] = useState("");
  const [category, setCategory] = useState<CategoryKey>("meds");
  const [intervalDays, setIntervalDays] = useState("30");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  // calendar state
  const [monthCursor, setMonthCursor] = useState<Date | null>(null); // first of month
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setReminders(loadReminders());
    const now = new Date();
    setMonthCursor(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(toISO(now));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    } catch {
      // storage unavailable — still works for the session
    }
  }, [reminders, hydrated]);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(t);
  }, [status]);

  const sorted = useMemo(
    () => [...reminders].sort((a, b) => a.nextDue.localeCompare(b.nextDue)),
    [reminders],
  );

  const overdue = useMemo(() => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return sorted.filter((r) => parseISO(r.nextDue).getTime() < startOfToday.getTime());
  }, [sorted]);

  const upcoming = useMemo(() => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return sorted.filter((r) => parseISO(r.nextDue).getTime() >= startOfToday.getTime());
  }, [sorted]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) {
      setFormError("Please tell us what the reminder is for.");
      return;
    }
    const days = Math.round(Number(intervalDays));
    if (!Number.isFinite(days) || days < 1 || days > 3650) {
      setFormError("Repeat interval must be a number of days (1–3650).");
      return;
    }
    if (!dueDate) {
      setFormError("Please pick the next due date.");
      return;
    }
    setFormError(null);
    const reminder: Reminder = {
      id: makeId(),
      task: trimmed,
      petName: petName.trim(),
      category,
      intervalDays: days,
      nextDue: dueDate,
      createdAt: Date.now(),
    };
    setReminders((prev) => [...prev, reminder]);
    setTask("");
    setPetName("");
    setIntervalDays(String(days));
    setDueDate("");
    setStatus(`✅ "${trimmed}" reminder added. Mark it done and it'll roll forward every ${days} days.`);
  }

  /** Complete a reminder: advance nextDue by the interval (skip past overdue). */
  function complete(id: string) {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        let next = addDays(parseISO(r.nextDue), r.intervalDays);
        while (next.getTime() < startOfToday.getTime()) {
          next = addDays(next, r.intervalDays);
        }
        return { ...r, nextDue: toISO(next) };
      }),
    );
  }

  function deleteReminder(id: string) {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }

  function loadSamples() {
    setReminders((prev) => [...prev, ...sampleReminders()]);
    setStatus("✨ Sample reminders loaded — try marking one done!");
  }

  function clearAll() {
    if (window.confirm("Remove all pet care reminders?")) {
      setReminders([]);
    }
  }

  /* ------------------------- calendar helpers ------------------------- */

  const calendar = useMemo(() => {
    if (!monthCursor) return null;
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const byDay = new Map<string, Reminder[]>();
    for (const r of reminders) {
      const [ry, rm, rd] = r.nextDue.split("-").map(Number);
      if (ry === year && rm === month + 1) {
        const key = `${ry}-${String(rm).padStart(2, "0")}-${String(rd).padStart(2, "0")}`;
        byDay.set(key, [...(byDay.get(key) ?? []), r]);
      }
    }
    const today = new Date();
    const todayKey = toISO(today);
    const cells: { day: number; iso: string; items: Reminder[]; isToday: boolean }[] = [];
    for (let i = 0; i < firstWeekday; i++) cells.push({ day: 0, iso: "", items: [], isToday: false });
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ day: d, iso, items: byDay.get(iso) ?? [], isToday: iso === todayKey });
    }
    return { year, month, monthLabel: `${MONTHS[month]} ${year}`, cells };
  }, [monthCursor, reminders]);

  const selectedItems = useMemo(() => {
    if (!selectedDate) return [];
    return sorted.filter((r) => r.nextDue === selectedDate);
  }, [selectedDate, sorted]);

  function shiftMonth(delta: number) {
    setMonthCursor((prev) => (prev ? new Date(prev.getFullYear(), prev.getMonth() + delta, 1) : prev));
  }

  /* ------------------------------ render ------------------------------ */

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">⏰🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Pet Care Reminders
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Flea treatments, vet checkups, nail trims, grooming — never miss a pet care task
          again. Set a recurring reminder and we'll track the next due date for you.
          Everything stays in your browser. 🔒
        </p>
      </div>

      {/* Overdue alerts */}
      {hydrated && overdue.length > 0 && (
        <div className="mt-8 rounded-2xl border-2 border-[#E5989B] bg-[#FFF5F5] p-5">
          <p className="font-heading font-bold text-[#C0392B]">
            ⚠️ {overdue.length} reminder{overdue.length === 1 ? "" : "s"} overdue
          </p>
          <ul className="mt-3 space-y-2">
            {overdue.map((r) => {
              const cat = CATEGORY_MAP[r.category];
              const late = -daysFromToday(r.nextDue);
              return (
                <li key={r.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm">
                  <span className="text-lg" aria-hidden="true">{cat.emoji}</span>
                  <span className="min-w-0 flex-1">
                    <span className="font-medium text-[#2D2D2D]">{r.task}</span>
                    {r.petName && <span className="ml-2 text-sm text-[#6B7280]">({r.petName})</span>}
                    <span className="ml-2 text-sm font-semibold text-[#C0392B]">
                      {late} day{late === 1 ? "" : "s"} overdue
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B7280]">was {formatLong(r.nextDue)}</span>
                    <button
                      onClick={() => complete(r.id)}
                      className="rounded-lg bg-[#2A9D8F] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E7A6F]"
                    >
                      Mark done ✓
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Add reminder form */}
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border-2 border-[#2A9D8F] bg-gradient-to-br from-[#E8F8F5] to-white p-6 lg:col-span-2"
        >
          <h2 className="font-heading text-lg font-bold text-[#2D2D2D]">➕ New Reminder</h2>

          <label className="mt-4 block text-sm font-medium text-[#6B7280]" htmlFor="rem-task">
            Task
          </label>
          <input
            id="rem-task"
            type="text"
            list="rem-task-suggestions"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g. Flea & tick treatment"
            maxLength={60}
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#B0B7A3] focus:border-[#2A9D8F] focus:outline-none"
          />
          <datalist id="rem-task-suggestions">
            {PRESETS.map((p) => (
              <option key={p.task} value={p.task} />
            ))}
          </datalist>

          <label className="mt-3 block text-sm font-medium text-[#6B7280]" htmlFor="rem-pet">
            Pet Name <span className="text-xs text-[#B0B7A3]">(optional)</span>
          </label>
          <input
            id="rem-pet"
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="e.g. Biscuit"
            maxLength={40}
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#B0B7A3] focus:border-[#2A9D8F] focus:outline-none"
          />

          <label className="mt-3 block text-sm font-medium text-[#6B7280]" htmlFor="rem-category">
            Category
          </label>
          <select
            id="rem-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryKey)}
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[#2A9D8F] focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#6B7280]" htmlFor="rem-interval">
                Repeat every
              </label>
              <div className="mt-1 flex items-center rounded-lg border border-[#E9EDDE] bg-white">
                <input
                  id="rem-interval"
                  type="number"
                  min={1}
                  max={3650}
                  value={intervalDays}
                  onChange={(e) => setIntervalDays(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm text-[#2D2D2D] focus:outline-none"
                />
                <span className="pr-3 text-xs text-[#6B7280]">days</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6B7280]" htmlFor="rem-due">
                Next due
              </label>
              <input
                id="rem-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[#2A9D8F] focus:outline-none"
              />
            </div>
          </div>

          {formError && (
            <p className="mt-3 rounded-lg bg-[#C0392B]/10 px-3 py-2 text-sm text-[#C0392B]" role="alert">
              ⚠️ {formError}
            </p>
          )}
          {status && (
            <p className="mt-3 rounded-lg bg-[#2A9D8F]/10 px-3 py-2 text-sm text-[#1E7A6F]" role="status">
              {status}
            </p>
          )}

          <button type="submit" className="btn-primary mt-4 w-full">
            Add Reminder ⏰
          </button>

          {/* Quick-add presets */}
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#B0B7A3]">
            Quick add
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.task}
                type="button"
                onClick={() => {
                  setTask(p.task);
                  setCategory(p.category);
                  setIntervalDays(String(p.intervalDays));
                  setDueDate(toISO(new Date()));
                }}
                className="rounded-full border border-[#E9EDDE] bg-white px-3 py-1.5 text-xs text-[#2D2D2D] transition-colors hover:border-[#2A9D8F] hover:text-[#2A9D8F]"
              >
                {p.task} · {p.intervalDays}d
              </button>
            ))}
          </div>
        </form>

        {/* Upcoming + calendar */}
        <div className="lg:col-span-3">
          {/* Upcoming list */}
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">📅 Upcoming</h2>
            {reminders.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#6B7280]">
                  {reminders.length} reminder{reminders.length === 1 ? "" : "s"}
                </span>
                <button
                  onClick={clearAll}
                  className="text-xs text-[#B0B7A3] underline-offset-2 hover:text-[#C0392B] hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {upcoming.length === 0 && overdue.length === 0 ? (
            <div className="mt-4 rounded-2xl border-2 border-dashed border-[#E9EDDE] bg-white p-8 text-center">
              <p className="text-4xl">🐾</p>
              <p className="font-heading mt-3 font-semibold text-[#2D2D2D]">No reminders yet</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
                Add your first pet care reminder above — or load a sample set to see how it
                works.
              </p>
              <button
                onClick={loadSamples}
                className="mt-4 rounded-lg border border-[#2A9D8F] px-4 py-2 text-sm font-semibold text-[#2A9D8F] transition-colors hover:bg-[#2A9D8F] hover:text-white"
              >
                ✨ Load sample reminders
              </button>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              {upcoming.map((r) => {
                const cat = CATEGORY_MAP[r.category];
                const days = daysFromToday(r.nextDue);
                return (
                  <li key={r.id} className="flex items-center gap-3 rounded-xl border border-[#E9EDDE] bg-white p-3.5 shadow-sm">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg"
                      style={{ backgroundColor: `${cat.color}1A` }}
                      aria-hidden="true"
                    >
                      {cat.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[#2D2D2D]">
                        {r.task}
                        {r.petName && <span className="ml-2 text-sm font-normal text-[#6B7280]">({r.petName})</span>}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {cat.label} · every {r.intervalDays} days · next {formatLong(r.nextDue)}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                      <span
                        className={`text-xs font-semibold ${
                          days === 0 ? "text-[#2A9D8F]" : days <= 7 ? "text-[#F4A261]" : "text-[#6B7280]"
                        }`}
                      >
                        {days === 0 ? "🎯 Due today" : `In ${days} day${days === 1 ? "" : "s"}`}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => complete(r.id)}
                          title="Mark done — rolls forward to the next occurrence"
                          className="rounded-lg bg-[#2A9D8F]/10 px-2.5 py-1 text-xs font-semibold text-[#1E7A6F] transition-colors hover:bg-[#2A9D8F] hover:text-white"
                        >
                          Done ✓
                        </button>
                        <button
                          onClick={() => deleteReminder(r.id)}
                          aria-label={`Delete ${r.task} reminder`}
                          className="rounded-lg p-1.5 text-[#B0B7A3] transition-colors hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C]"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Calendar */}
          <div className="mt-8 rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-[#2D2D2D]">🗓️ Calendar</h2>
              {calendar && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => shiftMonth(-1)}
                    aria-label="Previous month"
                    className="rounded-lg border border-[#E9EDDE] px-2.5 py-1 text-sm text-[#6B7280] transition-colors hover:bg-[#FFF6EC]"
                  >
                    ←
                  </button>
                  <span className="min-w-36 text-center text-sm font-semibold text-[#2D2D2D]">
                    {calendar.monthLabel}
                  </span>
                  <button
                    onClick={() => shiftMonth(1)}
                    aria-label="Next month"
                    className="rounded-lg border border-[#E9EDDE] px-2.5 py-1 text-sm text-[#6B7280] transition-colors hover:bg-[#FFF6EC]"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {calendar && (
              <>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="text-[11px] font-semibold uppercase tracking-wide text-[#B0B7A3]">
                      {d}
                    </div>
                  ))}
                  {calendar.cells.map((cell, i) =>
                    cell.day === 0 ? (
                      <div key={`blank-${i}`} />
                    ) : (
                      <button
                        key={cell.iso}
                        onClick={() => setSelectedDate(cell.iso)}
                        aria-label={`${cell.iso}, ${cell.items.length} reminder${cell.items.length === 1 ? "" : "s"}`}
                        className={`relative flex h-10 flex-col items-center justify-center rounded-lg text-sm transition-colors ${
                          cell.iso === selectedDate
                            ? "bg-[#2A9D8F] font-bold text-white"
                            : cell.isToday
                              ? "bg-[#FFF6EC] font-semibold text-[#FF7F5C] ring-1 ring-inset ring-[#FF7F5C]"
                              : "text-[#2D2D2D] hover:bg-[#F7FAF9]"
                        }`}
                      >
                        {cell.day}
                        {cell.items.length > 0 && (
                          <span
                            className="absolute bottom-1 flex gap-0.5"
                            aria-hidden="true"
                          >
                            {cell.items.slice(0, 3).map((it, j) => (
                              <span
                                key={j}
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: cell.iso === selectedDate ? "#fff" : CATEGORY_MAP[it.category].color }}
                              />
                            ))}
                            {cell.items.length > 3 && (
                              <span className={`text-[8px] font-bold ${cell.iso === selectedDate ? "text-white" : "text-[#6B7280]"}`}>
                                +{cell.items.length - 3}
                              </span>
                            )}
                          </span>
                        )}
                      </button>
                    ),
                  )}
                </div>
                <p className="mt-2 text-center text-[11px] text-[#B0B7A3]">
                  Colored dots mark reminders due that day · tap a day to see details
                </p>

                {/* Selected day detail */}
                {selectedDate && (
                  <div className="mt-4 rounded-xl bg-[#F7FAF9] p-4">
                    <p className="font-heading text-sm font-bold text-[#2D2D2D]">
                      Reminders due {formatLong(selectedDate)}
                    </p>
                    {selectedItems.length === 0 ? (
                      <p className="mt-1 text-sm text-[#6B7280]">Nothing due that day. 🎉</p>
                    ) : (
                      <ul className="mt-2 space-y-1.5">
                        {selectedItems.map((r) => {
                          const cat = CATEGORY_MAP[r.category];
                          const days = daysFromToday(r.nextDue);
                          return (
                            <li key={r.id} className="flex items-center gap-2 text-sm">
                              <span aria-hidden="true">{cat.emoji}</span>
                              <span className="font-medium text-[#2D2D2D]">{r.task}</span>
                              {r.petName && <span className="text-[#6B7280]">({r.petName})</span>}
                              <span
                                className={`ml-auto text-xs font-semibold ${
                                  days < 0 ? "text-[#C0392B]" : days === 0 ? "text-[#2A9D8F]" : "text-[#6B7280]"
                                }`}
                              >
                                {days < 0 ? `${-days}d overdue` : days === 0 ? "today" : `in ${days}d`}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Tip */}
          <div className="mt-6 rounded-2xl bg-[#FFF8F0] p-5 text-sm text-[#6B7280]">
            <p className="font-heading font-semibold text-[#2D2D2D]">💡 How it works</p>
            <ul className="mt-2 space-y-1.5">
              <li>• Reminders repeat automatically — hit <strong>Done ✓</strong> and the next due date rolls forward</li>
              <li>• Overdue reminders appear at the top in red until you complete them</li>
              <li>• Everything is stored in your browser — no account, no data sent anywhere</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="mt-10 rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#1E7A6F] p-8 text-center text-white sm:p-10">
        <h2 className="font-heading text-2xl font-bold">Stock up on the essentials</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">
          Flea treatments, grooming tools, and vet-approved supplies — get them delivered before the reminder comes due.
        </p>
        <a href="/products" className="btn-primary mt-6 inline-flex bg-white text-[#2A9D8F] hover:bg-white/90">
          Shop Pet Essentials →
        </a>
      </section>
    </div>
  );
}

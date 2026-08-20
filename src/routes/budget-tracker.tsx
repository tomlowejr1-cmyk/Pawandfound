import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";

const SITE_URL = "https://pawandfound.store";
const STORAGE_KEY = "pawandfound_budget_v1";

type Frequency = "monthly" | "one-time";

interface Expense {
  id: string;
  category: CategoryKey;
  description: string;
  amount: number;
  frequency: Frequency;
  createdAt: number;
}

type CategoryKey = "food" | "vet" | "grooming" | "toys" | "supplies" | "other";

interface CategoryInfo {
  key: CategoryKey;
  label: string;
  emoji: string;
  color: string;
}

const CATEGORIES: CategoryInfo[] = [
  { key: "food", label: "Food & Treats", emoji: "🍖", color: "#FF7F5C" },
  { key: "vet", label: "Vet & Health", emoji: "🏥", color: "#2A9D8F" },
  { key: "grooming", label: "Grooming", emoji: "✂️", color: "#F4A261" },
  { key: "toys", label: "Toys & Fun", emoji: "🧸", color: "#E5989B" },
  { key: "supplies", label: "Supplies", emoji: "🛍️", color: "#7A9E7E" },
  { key: "other", label: "Other", emoji: "📦", color: "#8E9AAF" },
];

const CATEGORY_MAP: Record<CategoryKey, CategoryInfo> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, CategoryInfo>;

const FREQUENCY_LABEL: Record<Frequency, string> = {
  monthly: "Monthly",
  "one-time": "One-time",
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function makeId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}

function loadSaved(): { expenses: Expense[]; monthlyBudget: number | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { expenses: [], monthlyBudget: null };
    const parsed = JSON.parse(raw);
    return {
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
      monthlyBudget:
        typeof parsed.monthlyBudget === "number" && parsed.monthlyBudget > 0
          ? parsed.monthlyBudget
          : null,
    };
  } catch {
    return { expenses: [], monthlyBudget: null };
  }
}

export const Route = createFileRoute("/budget-tracker")({
  component: BudgetTrackerPage,
  head: () => ({
    meta: [
      { title: "Pet Budget Tracker — Paw & Found 💰" },
      {
        name: "description",
        content:
          "Track your pet's food, vet, grooming, toy, and supply expenses with the free Paw & Found pet budget tracker. Monthly and yearly breakdowns, saved in your browser.",
      },
      { property: "og:title", content: "Pet Budget Tracker — Paw & Found 💰" },
      {
        property: "og:description",
        content:
          "A free, easy pet budget tracker. Add your pet expenses and see a monthly & yearly spending breakdown with charts — saved right in your browser.",
      },
      { property: "og:url", content: `${SITE_URL}/budget-tracker` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/budget-tracker` }],
  }),
});

function BudgetTrackerPage() {
  const [hydrated, setHydrated] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<number | null>(null);

  // Form state
  const [category, setCategory] = useState<CategoryKey>("food");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [error, setError] = useState<string | null>(null);
  const [budgetError, setBudgetError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  // Budget input state
  const [budgetInput, setBudgetInput] = useState("");

  // Load saved data once on mount
  useEffect(() => {
    const saved = loadSaved();
    setExpenses(saved.expenses);
    setMonthlyBudget(saved.monthlyBudget);
    if (saved.monthlyBudget !== null) setBudgetInput(String(saved.monthlyBudget));
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever data changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ expenses, monthlyBudget }),
      );
    } catch {
      // storage unavailable (private mode / quota) — tool still works in-memory
    }
  }, [expenses, monthlyBudget, hydrated]);

  // Clear "Added!" feedback after a moment
  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(t);
  }, [justAdded]);

  const totals = useMemo(() => {
    const monthly = expenses
      .filter((e) => e.frequency === "monthly")
      .reduce((sum, e) => sum + e.amount, 0);
    const oneTime = expenses
      .filter((e) => e.frequency === "one-time")
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      monthly,
      oneTime,
      yearly: monthly * 12 + oneTime,
    };
  }, [expenses]);

  const byCategory = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catExpenses = expenses.filter((e) => e.category === cat.key);
      const monthly = catExpenses
        .filter((e) => e.frequency === "monthly")
        .reduce((s, e) => s + e.amount, 0);
      const oneTime = catExpenses
        .filter((e) => e.frequency === "one-time")
        .reduce((s, e) => s + e.amount, 0);
      return { ...cat, monthly, oneTime, yearly: monthly * 12 + oneTime, count: catExpenses.length };
    });
  }, [expenses]);

  const sortedExpenses = useMemo(
    () => [...expenses].sort((a, b) => b.createdAt - a.createdAt),
    [expenses],
  );

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError("Please enter an amount greater than $0.00.");
      return;
    }
    setError(null);
    const expense: Expense = {
      id: makeId(),
      category,
      description: description.trim() || CATEGORY_MAP[category].label,
      amount: Math.round(value * 100) / 100,
      frequency,
      createdAt: Date.now(),
    };
    setExpenses((prev) => [...prev, expense]);
    setAmount("");
    setDescription("");
    setJustAdded(true);
  }

  function deleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  function clearAll() {
    if (expenses.length === 0) return;
    if (window.confirm("Clear all expenses? This can't be undone.")) {
      setExpenses([]);
    }
  }

  function saveBudget() {
    const value = parseFloat(budgetInput);
    if (Number.isFinite(value) && value > 0) {
      setMonthlyBudget(Math.round(value * 100) / 100);
      setBudgetError(null);
    } else {
      setBudgetError("Please enter a budget greater than $0.00.");
    }
  }

  function removeBudget() {
    setMonthlyBudget(null);
    setBudgetInput("");
    setBudgetError(null);
  }

  const budgetPct =
    monthlyBudget && monthlyBudget > 0
      ? Math.min(100, (totals.monthly / monthlyBudget) * 100)
      : 0;
  const overBudget = monthlyBudget !== null && totals.monthly > monthlyBudget;
  const remaining =
    monthlyBudget !== null ? monthlyBudget - totals.monthly : null;

  // Build the conic-gradient donut for monthly spend distribution
  const donutStyle = useMemo(() => {
    if (totals.monthly <= 0) return undefined;
    let acc = 0;
    const stops = byCategory
      .filter((c) => c.monthly > 0)
      .map((c) => {
        const start = (acc / totals.monthly) * 360;
        acc += c.monthly;
        const end = (acc / totals.monthly) * 360;
        return `${c.color} ${start}deg ${end}deg`;
      });
    return { background: `conic-gradient(${stops.join(", ")})` };
  }, [byCategory, totals.monthly]);

  const yearlyMax = Math.max(1, ...byCategory.map((c) => c.yearly));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="text-5xl">💰🐾</span>
        <h1 className="font-heading mt-4 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
          Pet Budget Tracker
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[#6B7280]">
          Know exactly what your furry (or feathery) friend costs each month. Add your
          expenses — food, vet visits, grooming, toys, and more — and get a clear monthly
          & yearly breakdown. Everything is saved privately in your browser.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* Add expense form */}
        <form
          onSubmit={addExpense}
          className="h-fit rounded-2xl border-2 border-[#F4A261] bg-gradient-to-br from-[#FFF6EC] to-white p-6 lg:col-span-2"
        >
          <h2 className="font-heading text-lg font-bold text-[#2D2D2D]">
            ➕ Add an Expense
          </h2>

          <label className="mt-4 block text-sm font-medium text-[#6B7280]" htmlFor="cat">
            Category
          </label>
          <select
            id="cat"
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

          <label className="mt-3 block text-sm font-medium text-[#6B7280]" htmlFor="desc">
            Description <span className="text-xs text-[#B0B7A3]">(optional)</span>
          </label>
          <input
            id="desc"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Premium kibble, flea meds, bandana…"
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#B0B7A3] focus:border-[#2A9D8F] focus:outline-none"
          />

          <label className="mt-3 block text-sm font-medium text-[#6B7280]" htmlFor="amount">
            Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="mt-1 w-full rounded-lg border border-[#E9EDDE] bg-white px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#B0B7A3] focus:border-[#2A9D8F] focus:outline-none"
          />

          <fieldset className="mt-3">
            <legend className="text-sm font-medium text-[#6B7280]">Frequency</legend>
            <div className="mt-1 flex gap-2">
              {(["monthly", "one-time"] as Frequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  aria-pressed={frequency === f}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    frequency === f
                      ? "border-[#2A9D8F] bg-[#2A9D8F] text-white"
                      : "border-[#E9EDDE] bg-white text-[#6B7280] hover:border-[#2A9D8F]"
                  }`}
                >
                  {f === "monthly" ? "🔁 Every Month" : "🎯 One-time"}
                </button>
              ))}
            </div>
          </fieldset>

          {error && (
            <p className="mt-3 rounded-lg bg-[#FF7F5C]/10 px-3 py-2 text-sm text-[#C2410C]" role="alert">
              ⚠️ {error}
            </p>
          )}

          <button type="submit" className="btn-primary mt-4 w-full">
            {justAdded ? "✅ Added!" : "Add Expense"}
          </button>
          <p className="mt-2 text-xs text-[#B0B7A3]">
            Monthly expenses count toward your monthly & yearly totals; one-time expenses
            count only toward the yearly total.
          </p>
        </form>

        {/* Dashboard */}
        <div className="lg:col-span-3">
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Monthly Spending
              </p>
              <p className="font-heading mt-1 text-2xl font-bold text-[#FF7F5C]">
                {usd.format(totals.monthly)}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">recurring expenses</p>
            </div>
            <div className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Yearly Estimate
              </p>
              <p className="font-heading mt-1 text-2xl font-bold text-[#2A9D8F]">
                {usd.format(totals.yearly)}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">
                {usd.format(totals.monthly)} × 12 + one-time
              </p>
            </div>
            <div className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                One-time Total
              </p>
              <p className="font-heading mt-1 text-2xl font-bold text-[#F4A261]">
                {usd.format(totals.oneTime)}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">
                {expenses.filter((e) => e.frequency === "one-time").length} entries
              </p>
            </div>
            <div className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                Expenses Tracked
              </p>
              <p className="font-heading mt-1 text-2xl font-bold text-[#2D2D2D]">
                {expenses.length}
              </p>
              <p className="mt-1 text-xs text-[#6B7280]">entries in your tracker</p>
            </div>
          </div>

          {/* Monthly budget */}
          <div className="mt-4 rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">
                🎯 Monthly Budget
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  step="0.01"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  placeholder="e.g. 150"
                  aria-label="Monthly budget amount"
                  className="w-28 rounded-lg border border-[#E9EDDE] bg-white px-3 py-1.5 text-sm text-[#2D2D2D] placeholder:text-[#B0B7A3] focus:border-[#2A9D8F] focus:outline-none"
                />
                {monthlyBudget === null ? (
                  <button onClick={saveBudget} className="btn-secondary px-3 py-1.5 text-sm">
                    Set
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={saveBudget} className="btn-secondary px-3 py-1.5 text-sm">
                      Update
                    </button>
                    <button
                      onClick={removeBudget}
                      className="rounded-lg border border-[#E9EDDE] px-3 py-1.5 text-sm text-[#6B7280] hover:border-[#FF7F5C] hover:text-[#FF7F5C]"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            {monthlyBudget !== null ? (
              <div className="mt-3">
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#E9EDDE]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      overBudget ? "bg-[#FF7F5C]" : "bg-[#2A9D8F]"
                    }`}
                    style={{ width: `${budgetPct}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-[#6B7280]">
                  {overBudget ? (
                    <>
                      <span className="font-semibold text-[#FF7F5C]">
                        {usd.format(totals.monthly - monthlyBudget)}
                      </span>{" "}
                      over budget this month. Time to trim a treat subscription? 🧐
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-[#2A9D8F]">
                        {usd.format(remaining ?? 0)}
                      </span>{" "}
                      left in your {usd.format(monthlyBudget)} monthly budget.
                    </>
                  )}
                </p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#6B7280]">
                Set a monthly budget to see how your spending measures up.
              </p>
            )}

            {budgetError && (
              <p className="mt-2 rounded-lg bg-[#FF7F5C]/10 px-3 py-2 text-sm text-[#C2410C]" role="alert">
                ⚠️ {budgetError}
              </p>
            )}
          </div>

          {/* Charts */}
          {totals.monthly > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Donut chart */}
              <div className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
                <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">
                  Where It Goes (Monthly)
                </h3>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div
                    className="relative h-32 w-32 rounded-full"
                    style={donutStyle}
                    role="img"
                    aria-label="Monthly spending by category chart"
                  >
                    <div className="absolute inset-3 flex items-center justify-center rounded-full bg-white">
                      <div className="text-center">
                        <p className="text-[10px] uppercase tracking-wide text-[#6B7280]">
                          /mo
                        </p>
                        <p className="font-heading text-sm font-bold text-[#2D2D2D]">
                          {usd.format(totals.monthly)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#6B7280]">
                    {byCategory
                      .filter((c) => c.monthly > 0)
                      .map((c) => (
                        <li key={c.key} className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: c.color }}
                          />
                          <span className="font-medium text-[#2D2D2D]">{c.label}</span>
                          <span className="tabular-nums">{usd.format(c.monthly)}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Category bars */}
              <div className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm">
                <h3 className="font-heading text-sm font-semibold text-[#2D2D2D]">
                  Yearly Breakdown by Category
                </h3>
                <ul className="mt-4 space-y-3">
                  {byCategory
                    .filter((c) => c.yearly > 0)
                    .map((c) => (
                      <li key={c.key}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#2D2D2D]">
                            {c.emoji} {c.label}
                          </span>
                          <span className="tabular-nums text-[#6B7280]">
                            {usd.format(c.yearly)}
                          </span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#E9EDDE]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.round((c.yearly / yearlyMax) * 100)}%`,
                              backgroundColor: c.color,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expense list */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">
            📋 Your Expenses
          </h2>
          {expenses.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm font-medium text-[#FF7F5C] hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {sortedExpenses.length === 0 ? (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-[#E9EDDE] bg-white p-8 text-center">
            <p className="text-4xl">🐶</p>
            <p className="font-heading mt-3 font-semibold text-[#2D2D2D]">
              No expenses yet
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-[#6B7280]">
              Add your first pet expense above — food, vet, grooming, toys, or supplies —
              and your dashboard will light up with totals and charts.
            </p>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-[#E9EDDE] rounded-2xl border border-[#E9EDDE] bg-white shadow-sm">
            {sortedExpenses.map((e) => {
              const cat = CATEGORY_MAP[e.category];
              return (
                <li key={e.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-lg"
                    style={{ backgroundColor: `${cat.color}1A` }}
                  >
                    {cat.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#2D2D2D]">
                      {e.description}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {cat.label} ·{" "}
                      <span
                        className={
                          e.frequency === "monthly" ? "text-[#2A9D8F]" : "text-[#F4A261]"
                        }
                      >
                        {FREQUENCY_LABEL[e.frequency]}
                      </span>
                    </p>
                  </div>
                  <p className="tabular-nums text-sm font-semibold text-[#2D2D2D]">
                    {usd.format(e.amount)}
                  </p>
                  <button
                    onClick={() => deleteExpense(e.id)}
                    aria-label={`Delete ${e.description}`}
                    className="rounded-lg p-1.5 text-[#B0B7A3] transition-colors hover:bg-[#FF7F5C]/10 hover:text-[#FF7F5C]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Tips + CTA */}
      <div className="mt-8 rounded-2xl bg-[#FFF8F0] p-6 sm:p-8">
        <h2 className="font-heading text-center text-2xl font-bold text-[#2D2D2D]">
          💡 Pet Budgeting Tips
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FF7F5C]/10 text-2xl">
              🥫
            </span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Food is #1</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Food & treats are usually the biggest recurring cost. Subscribing to
              essentials with our Subscribe &amp; Save saves 10% every month.
            </p>
          </div>
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2A9D8F]/10 text-2xl">
              🏥
            </span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Plan for Vet Care</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Set aside a little every month so surprise vet bills don't wreck your budget.
              Our{" "}
              <a href="/downloads" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
                Vet Visit Prep Kit
              </a>{" "}
              helps you get organized.
            </p>
          </div>
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F4A261]/10 text-2xl">
              📅
            </span>
            <h3 className="font-heading mt-3 font-semibold text-[#2D2D2D]">Review Monthly</h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Check your breakdown each month and adjust. New to pet parenting? Start with
              our{" "}
              <a href="/blog?post=introducing-new-pet-to-your-home" className="font-medium text-[#2A9D8F] hover:text-[#FF7F5C]">
                new pet preparation guide
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="/downloads" className="btn-primary inline-flex items-center gap-2">
            📖 Get the Ultimate Pet Care Planner
          </a>
        </div>
        <p className="mt-3 text-center text-xs text-[#B0B7A3]">
          Your data never leaves your browser — everything is stored locally on your device.
        </p>
      </div>
    </div>
  );
}

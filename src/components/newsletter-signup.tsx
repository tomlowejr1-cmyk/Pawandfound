import { useState, type FormEvent } from "react";
import { subscribeToNewsletter } from "~/lib/mailchimp";

interface NewsletterSignupProps {
  /** Where the form is displayed — controls styling */
  variant?: "homepage" | "footer";
  /** Optional title override */
  title?: string;
  /** Optional subtitle override */
  subtitle?: string;
}

export function NewsletterSignup({
  variant = "footer",
  title = "Join the Paw & Found Pack",
  subtitle = "Get exclusive deals, new product alerts, and pet care tips straight to your inbox.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const result = await subscribeToNewsletter({ data: { email } });
      setStatus(result.success ? "success" : "error");
      setMessage(result.message);
      if (result.success) {
        setEmail("");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  }

  const isHomepage = variant === "homepage";

  return (
    <section
      className={
        isHomepage
          ? "bg-gradient-to-br from-[#2A9D8F] to-[#2A9D8F]/80 py-16"
          : ""
      }
    >
      <div
        className={
          isHomepage
            ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            : ""
        }
      >
        <div
          className={
            isHomepage
              ? "mx-auto max-w-2xl text-center"
              : ""
          }
        >
          {/* Title */}
          <h3
            className={
              isHomepage
                ? "text-3xl font-bold tracking-tight text-white sm:text-4xl"
                : "font-heading mb-2 text-sm font-semibold text-white"
            }
          >
            {title}
          </h3>

          {/* Subtitle */}
          <p
            className={
              isHomepage
                ? "mt-2 text-white/80"
                : "mt-1 text-xs text-white/70"
            }
          >
            {subtitle}
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={
              isHomepage
                ? "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
                : "mt-3 flex flex-col gap-2"
            }
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading"}
                className={
                  isHomepage
                    ? "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-60 sm:min-w-72"
                    : "w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 backdrop-blur-sm focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-60"
                }
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={
                isHomepage
                  ? "inline-flex items-center justify-center rounded-lg bg-[#FF7F5C] px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#FF7F5C]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF7F5C]/50 focus:ring-offset-2 disabled:opacity-60"
                  : "inline-flex items-center justify-center rounded-lg bg-[#FF7F5C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#FF7F5C]/90 focus:outline-none focus:ring-2 focus:ring-[#FF7F5C]/50 disabled:opacity-60"
              }
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Subscribing...
                </span>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <div
              className={
                isHomepage
                  ? `mt-4 text-sm ${status === "success" ? "text-green-200" : "text-red-200"}`
                  : `mt-2 text-xs ${status === "success" ? "text-green-200" : "text-red-200"}`
              }
            >
              {message}
            </div>
          )}

          {/* Privacy note */}
          <p
            className={
              isHomepage
                ? "mt-3 text-xs text-white/50"
                : "mt-2 text-[10px] text-white/40"
            }
          >
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
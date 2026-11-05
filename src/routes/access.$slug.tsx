import { createFileRoute } from "@tanstack/react-router";
import {
  SUPPORT_EMAIL,
  accessPath,
  bundleComponents,
  getBundleByAccessSlug,
  getProductBySlug,
  isAvailable,
  isBundleAvailable,
} from "~/lib/digital-catalog";

const SITE_URL = "https://www.pawandfound.store";

/**
 * /access/<slug> is the page Stripe sends a buyer to after a successful
 * payment. It is the last mile of the sale: the buyer has paid, so this page
 * must hand them the file. It resolves either a single product (by its
 * catalogue slug) or a bundle (by its accessSlug, e.g. /access/puppy-starter-pack)
 * and renders a download button only when the file genuinely exists.
 *
 * Nothing here is secret: the files live in /public and are also linked from
 * /downloads. This page exists so a paying customer never has to hunt.
 */

export interface AccessDownload {
  title: string;
  /** Site-relative path to the real file. */
  href: string;
  /** "PDF", "ZIP", … — used in the button label. */
  kind: string;
}

export interface AccessData {
  found: boolean;
  /** True when we resolved something that has a file to hand over. */
  downloadable: boolean;
  title: string;
  blurb: string;
  downloads: AccessDownload[];
  /** Extra product pages worth a look, for the "not available yet" case. */
  availableCount: number;
}

function fileKind(href: string): string {
  const ext = href.split(".").pop()?.toUpperCase() ?? "FILE";
  return ext === "PDF" || ext === "ZIP" ? ext : "FILE";
}

function resolveAccess(slug: string): AccessData {
  const bundle = getBundleByAccessSlug(slug);

  if (bundle) {
    const components = bundleComponents(bundle);
    const ready = isBundleAvailable(bundle);
    return {
      found: true,
      downloadable: ready,
      title: bundle.title,
      blurb: ready
        ? `All ${components.length} guides in the ${bundle.title} are below. Download each one — they're yours to keep and print.`
        : "This bundle is being rebuilt. Some of its guides aren't ready to hand over yet.",
      downloads: ready
        ? components.map((p) => ({
            title: p.title,
            href: p.file as string,
            kind: fileKind(p.file as string),
          }))
        : [],
      availableCount: 0,
    };
  }

  const product = getProductBySlug(slug);

  if (product) {
    const ready = isAvailable(product);
    return {
      found: true,
      downloadable: ready,
      title: product.title,
      blurb: ready
        ? product.description
        : "This product isn't available yet — we'd rather not sell a download we can't hand over.",
      downloads: ready
        ? [{ title: product.title, href: product.file as string, kind: fileKind(product.file as string) }]
        : [],
      availableCount: 0,
    };
  }

  return {
    found: false,
    downloadable: false,
    title: "",
    blurb: "",
    downloads: [],
    availableCount: 0,
  };
}

export const Route = createFileRoute("/access/$slug")({
  loader: ({ params }): AccessData => resolveAccess(params.slug),
  component: AccessPage,
  head: ({ match }) => {
    const data = match.loaderData as AccessData | undefined;
    const name = data?.found ? data.title : "Your downloads";
    const title = data?.found ? `Your download — ${name} | Paw & Found` : "Your downloads — Paw & Found";
    return {
      meta: [
        { title },
        // A post-purchase page: reachable by buyers, not something to index.
        { name: "robots", content: "noindex, nofollow" },
        { name: "description", content: "Download the file you bought from Paw & Found." },
        { property: "og:title", content: title },
        { property: "og:url", content: `${SITE_URL}${accessPath(data?.found ? match.params.slug : "")}` },
      ],
    };
  },
});

function AccessPage() {
  const data = Route.useLoaderData() as AccessData;

  return (
    <div className="bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        {data.downloadable ? (
          <>
            <div className="text-center">
              <span className="text-4xl">🎉</span>
              <h1 className="font-heading mt-3 text-3xl font-bold text-[#2D2D2D] sm:text-4xl">
                Thank you — here{data.downloads.length > 1 ? " are" : "'s"} your download
                {data.downloads.length > 1 ? "s" : ""}
              </h1>
              <p className="mt-3 text-[#6B7280]">{data.blurb}</p>
            </div>

            <div className="mt-8 space-y-4">
              {data.downloads.map((download, index) => (
                <div
                  key={download.href}
                  className="rounded-2xl border border-[#E9EDDE] bg-white p-5 shadow-sm"
                >
                  <p className="font-heading text-lg font-bold text-[#2D2D2D]">
                    {download.title}
                  </p>
                  <a
                    href={download.href}
                    download
                    className="btn-primary mt-3 block w-full rounded-xl px-6 py-4 text-center text-base font-bold"
                  >
                    ⬇ Download your {download.kind}
                  </a>
                  {data.downloads.length > 1 && (
                    <p className="mt-2 text-center text-xs text-[#6B7280]">
                      File {index + 1} of {data.downloads.length}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#FFF8F0] p-5 text-sm leading-relaxed text-[#6B7280]">
              <p className="font-semibold text-[#2D2D2D]">
                If the download doesn't start
              </p>
              <p className="mt-1">
                Tap the button again, or open this page in your phone's browser rather than an
                in-app browser (Instagram, Facebook and TikTok can block downloads). If it still
                won't come through, email{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-[#2A9D8F] underline">
                  {SUPPORT_EMAIL}
                </a>{" "}
                with the email address you paid with and we'll send the file to you directly.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <span className="text-4xl">🐾</span>
            <h1 className="font-heading mt-3 text-2xl font-bold text-[#2D2D2D] sm:text-3xl">
              {data.found ? "This one isn't available yet" : "We couldn't find that download"}
            </h1>
            <p className="mt-3 text-[#6B7280]">
              {data.found
                ? `${data.title} isn't on sale at the moment — there's no file to hand over yet.`
                : "That link doesn't match anything in our catalogue. Check the link in your receipt, or browse the library below."}
            </p>
            <p className="mt-3 text-sm text-[#6B7280]">
              If you've already paid for this, email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-[#2A9D8F] underline">
                {SUPPORT_EMAIL}
              </a>{" "}
              and we'll sort it out.
            </p>
            <a href="/downloads" className="btn-primary mt-6 inline-block">
              Browse the digital library
            </a>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-[#9CA3AF]">
          Need a hand?{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          · <a href="/downloads" className="underline">All digital guides</a>
        </p>
      </div>
    </div>
  );
}

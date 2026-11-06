import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Permanent redirects for the retired eBook detail pages.
 *
 * The nine premium eBooks were taken off the catalogue on 2026-11-05 because
 * none of them had a file behind it. Their seven detail pages are deleted, but
 * the old URLs are indexed by Google and linked from blog posts and Cat Corner,
 * so each one takes a single permanent hop to the page where the products that
 * really can be downloaded live.
 *
 * One splat route instead of seven near-identical files: the same answer is
 * right for any /ebooks/... URL, including the two catalogue-only books that
 * never had a detail page and any trailing-slash variant.
 */
export const Route = createFileRoute("/ebooks/$")({
  beforeLoad: () => {
    // 301 = permanent, so search engines move their indexed URL to /downloads
    // in one hop instead of keeping a soft 404 around.
    throw redirect({ to: "/downloads", statusCode: 301 });
  },
});

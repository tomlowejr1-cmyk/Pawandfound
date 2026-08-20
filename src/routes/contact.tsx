import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — Orders, Products & Support | Paw & Found" },
      {
        name: "description",
        content:
          "Get in touch with Paw & Found — questions about products, orders, or just want to say hi? We'd love to hear from you.",
      },
      { property: "og:title", content: "Contact Us | Paw & Found" },
      {
        property: "og:description",
        content:
          "Get in touch with Paw & Found — questions about products, orders, or just want to say hi?",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pawandfound.store/contact" },
    ],
    links: [{ rel: "canonical", href: "https://pawandfound.store/contact" }],
  }),
});

function ContactPage() {
  return (
    <div className="bg-[#FFF8F0]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FF7F5C] via-[#FF7F5C] to-[#F4A261] py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-white/80">
            We'd love to hear from you! Questions, feedback, or just want to say hi 🐾
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-[#E9EDDE] bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">
              📧 Email Us
            </h2>
            <p className="mt-2 text-[#6B7280]">
              For order questions, product inquiries, or general support:
            </p>
            <a
              href="mailto:hello@pawandfound.store"
              className="mt-3 inline-block font-medium text-[#2A9D8F] hover:underline"
            >
              hello@pawandfound.store
            </a>
          </div>

          <div className="rounded-xl border border-[#E9EDDE] bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">
              📱 Social
            </h2>
            <p className="mt-2 text-[#6B7280]">
              Follow us and share your pet photos with{" "}
              <span className="font-semibold text-[#FF7F5C]">#PawAndFoundPets</span>
            </p>
            <a
              href="https://instagram.com/explore/tags/pawandfoundpets"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-medium text-[#2A9D8F] hover:underline"
            >
              Instagram → #PawAndFoundPets
            </a>
          </div>

          <div className="rounded-xl border border-[#E9EDDE] bg-white p-6 shadow-sm md:col-span-2">
            <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">
              🕐 Business Hours
            </h2>
            <p className="mt-2 text-[#6B7280]">
              We're an online store — open 24/7! Customer support typically responds within 24 hours on business days.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="/products" className="btn-primary">
            Browse the Store
          </a>
        </div>
      </section>
    </div>
  );
}

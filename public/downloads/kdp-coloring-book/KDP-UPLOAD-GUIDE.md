# Paws & Relax — Amazon KDP Print-Ready Package

**Deliverable:** A print-on-demand paperback package so Paw & Found can sell **Paws & Relax: An Adult Pet Coloring Book** on Amazon via Kindle Direct Publishing (KDP) as a NEW sales channel. This is an **additional print product** — it does NOT replace the existing $5.99 digital PDF sold on `/downloads`.

Author / brand: **Paw & Found** · pawandfound.store

---

## What's in this package

| File | Purpose |
|---|---|
| `Paws-And-Relax-coloring-book-interior.pdf` | Interior manuscript (30 pages, black-and-white) — upload as the KDP "manuscript" |
| `Paws-And-Relax-coloring-book-cover.pdf` | Full-bleed cover (back + spine + front + bleed) — upload as the KDP "cover" |
| `front-cover.jpg` / `front-cover.png` | Clean front-cover-only image (8.5×8.5 in, 2550×2550 @300dpi) for the Amazon listing thumbnail / previews |
| `preview.png` | Visual preview of the full cover + sample interior pages (for team/owner review only — not uploaded) |
| `build/` | Editable source: page PNGs, cover HTML, generator scripts (so anyone can tweak and rebuild) |

---

## Exact print specs (critical — match these in KDP)

- **Trim size:** 8.5 × 8.5 in (US square) — choose `8.5" x 8.5"` in KDP
- **Interior:** Black & white (**B&W**) on **white paper** (NOT cream — keep white)
- **Pages:** 30 (24+ minimum met). 12 single-sided coloring designs with blank versos (prevents marker bleed-through) + title, copyright, welcome, thank-you pages
- **Bleed:** Cover uses 0.125 in bleed on all sides. Interior pages are white with clean margins — **no interior bleed needed** (nothing printed to page edge)
- **Cover spine:** solid coral, no spine text. Width for 30 B&W-white pages ≈ **0.068 in** (tiny). Full cover dimensions: **~17.32 × 8.75 in** (front + spine + back + 0.125 in bleed each side)

> **Spine note:** KDP computes spine width as `pages × paper thickness` (white 60# ≈ 0.002252 in/page → 30 × 0.002252 ≈ 0.068 in). This cover is sized to that. Because the spine is a plain color with no text, a hair of tolerance here is invisible. **If you change the page count or switch paper type/color, the spine width changes and the cover must be regenerated** — see "Regenerating" below (or just run KDP's Cover Calculator and give me the resulting dimension to match).

---

## How to publish (high-level, in KDP)

1. Go to **kdp.amazon.com → Create → Paperback**.
2. **Book details:**
   - **Book title:** Paws & Relax
   - **Subtitle:** An Adult Pet Coloring Book
   - **Series:** (leave blank)
   - **Editors/Illustrators:** (leave blank, or add "Paw & Found" if prompted for an illustrator)
   - **Publisher / imprint:** Paw & Found
   - **Description:** see suggested copy below
   - **Categories:** Crafts, Hobbies & Home > Crafts & Hobbies > Coloring Books for Grown-Ups; plus Pets > General
   - **Keywords:** choose 7 (see suggestions below)
   - **Age range:** Adult (leave blank / 18+)
3. **Paperback content:**
   - **Interior:** upload `Paws-And-Relax-coloring-book-interior.pdf`
   - **Trim size:** 8.5" x 8.5"; **paper color:** White; **ink:** Black & white
   - **Bleed:** No (interior is not full-bleed)
   - **Print options:** default
4. **Rights & pricing:** Worldwide rights (or US only if preferred), set your list price (Amazon shows your royalty after print-cost deduction — price to your target royalty; a typical adult coloring book sells ~$7.99–$12.99).
5. Use **Upload cover → Upload cover file** with `Paws-And-Relax-coloring-book-cover.pdf`.
6. Preview in the KDP previewer, then submit. KDP adds its own barcode to the back during review/licensing — no action needed.

---

## Suggested Amazon listing copy (accurate to the product — use as-is or edit)

**Book description:**

> Take a break and color with your best friend nearby. *Paws & Relax* is a calming adult coloring book featuring 12 original, hand-drawn designs of dogs, cats, and little companions — from a snoozing Labrador and a cozy French bulldog to a playful paw-print mandala.
>
> Every design is printed on a single-sided page of bright white paper, so you can use markers, gel pens, or colored pencils without worrying about bleed-through onto the next picture.
>
> • 12 original line illustrations (dogs, cats & small pets)
> • Single-sided pages — marker-, gel-pen-, and pencil-friendly
> • 8.5" x 8.5" square format, relaxing and gift-ready
> • Great for anyone who loves animals — tear out and frame your favorites
>
> Follow along at pawandfound.store and share your finished art with **#PawAndFoundPets**.

**Keywords (pick 7):** adult pet coloring book, dog coloring book for adults, cat coloring book, animal coloring book relaxation, color by number pet, pet gifts for adults, mindfulness coloring pages

**Back-cover blurb** (already on the cover): matches the description opening.

---

## Regenerating / editing later

All sources are in `build/`:
- **Coloring pages:** `build/gen_color_pages.py` re-renders the 12 grayscale interior pages from `/home/team/shared/coloring-pages/*.png` (300dpi, 8.5×8.5 in, 0.5 in margin).
- **Text pages & cover:** `build/html/*.html` (title, copyright, welcome, thank-you, cover) — rendered to PNG via `agent-browser` at exact sizes, then assembled by `build/assemble.py` into the two PDFs.

To change **page count** (e.g., if more coloring pages are added later), update the page order in `assemble.py`, then **recompute the cover spine** (`pages × 0.002252`) and rescale the cover width before regenerating — or send me the new KDP cover-calculator dimensions.

---

## Notes / honesty
- Interior artwork is original Paw & Found line art (12 pages), grayscale-converted for B&W printing.
- No customer testimonials are used anywhere on the cover or listing — those come only once real reviews arrive (per team policy).
- The ISBN: KDP can provide a **free KDP ISBN** during setup if you don't already own one.

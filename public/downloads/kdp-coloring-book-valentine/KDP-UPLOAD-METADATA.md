# Colorful Wishes: Valentine's (Hugs & Kisses) Coloring Book — KDP Upload Guide

**STATUS: READY-TO-UPLOAD (not yet published).** This is the KDP print package built by the
Paw & Found product designer. It has NOT been uploaded to Amazon KDP.

## Product
- **Title:** Colorful Wishes: Valentine's (Hugs & Kisses) Coloring Book
- **Subtitle:** A fold-and-give coloring-card book for ages 3–8
- **Concept:** every page is a coloring card — color it, fold it, give it (To/From + message lines)
- **Trim:** 8.5 x 11 in (US Letter), full bleed
- **Interior:** 44 pages, grayscale (B&W) — 4 front matter + 20 single-sided card pages (blank versos)
- **Cover:** full-wrap 17.36 x 11.25 in, coral/teal/cream brand palette, line-art front
- **Price (Paw & Found store):** $9.99

## Files (in this folder)
| File | Purpose |
|------|---------|
| `output/Colorful-Wishes-Valentine-KDP-interior.pdf` | Interior (44pp, 630.2 x 810.2 pt / 8.75 x 11.25 in) |
| `output/Colorful-Wishes-Valentine-KDP-cover.pdf` | Cover PDF (full wrap with spine, 1249.9 x 810 pt) |
| `output/Colorful-Wishes-Valentine-front-cover.jpg` | Front-cover thumbnail for listing |
| `output/Colorful-Wishes-Valentine-KDP-front-cover.png` | Full wrap preview PNG |
| `output/Colorful-Wishes-Valentine-preview.png` | Marketing preview (cover + samples) |
| `output/Colorful-Wishes-Valentine-PRINT-AT-HOME.pdf` | Print-at-home version (20pp, US Letter, fold guides) for the store |

## KDP Setup
1. Amazon KDP (kdp.amazon.com) → Create → Paperback.
2. **Interior:** uploaded, **trim 8.5 x 11 in**, **B&W**, **full bleed = YES**.
3. **Cover:** upload the cover PDF. Paper type **white** or **cream** — the cover spine was sized for
   cream 60# (0.0025 in/page × 44 = 0.11 in). If you choose white (0.002252), regenerate the cover
   (see build/gen_cover.py) to match KDP's Cover Calculator.
4. Confirm the spine shows as a **solid coral bar** (thin spine < ~0.25 in → no spine text) and
   matches KDP's preview.

## Listing Copy
**Description:**
Color, fold, and give! This Valentine's coloring book is 20 cute pet-and-love scenes that are also
giftable cards — each page has a To:/From: line and a short message space. Little artists color a
puppy holding a heart, kitty with a "be mine" balloon, bunnies, paw-print hearts and more, then
fold and hand them to someone they love. Great for ages 3–8, fun for Valentine's, grandparents'
day, or any "I love you." Perfect for classrooms, rainy days, and quiet-time art.

**Keywords:** valentine coloring book, pet coloring book, coloring cards gifts, kids valentine
crafts, dog and cat coloring book, fold and give cards, toddler coloring pages

**Categories:** Children's Books > Activities, Crafts & Games > Coloring Books; Children's Books > Animals > Pets

## Full set of 20 scenes
Puppy with a Heart, Kitty with a "Be Mine" Balloon, Bunnies Sharing a Heart, Paw-Print Hearts,
Puppy with Heart Balloons, Cat with Heart Eyes, Valentine Party Puppy, Bunny with a Card,
Puppy & Kitten Snuggle, Lovebirds on a Branch, Guinea Pig with a Heart, Hamster with a Heart Box,
Puppies Trading Cards, Cat with a Heart Tag, Turtle with a Heart Shell, Puppy with Heart Candy,
Two Kitties One Heart, Paws Together, Bunny with Heart Balloons, Goldfish with Heart Bubbles.

## Rebuild
- Art source: `source/v-01..20-*.png` (grayscale line art)
- Pages: `build/gen_pages.py` (print + kdp HTML)
- Cover: `build/gen_cover.py`; Front matter: `build/gen_frontmatter.py`; PDFs: `build/assemble.py`

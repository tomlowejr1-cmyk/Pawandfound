# Portrait Pinterest pins — blog kit (10 pins, 1000×1500)

Ten portrait (2:3) pins for `POSTING-GUIDE-BLOG.md` — **one per post**, using that post's own
existing header art, cropped to portrait full-bleed, with a short headline overlay and the
Paw & Found wordmark. Brand colours #FF7F5C / #2A9D8F / #FFF8F0, Poppins + Inter.

Upload the PNG straight to Pinterest. Titles, descriptions, hashtags and boards are unchanged —
use the guide's copy for each pin id below. Nothing is claimed on the image beyond the post's own
subject: **no product names, no prices, no discounts.**

| File (PNG, 1000×1500) | Pin id | Post | Destination link |
|---|---|---|---|
| `pinterest-blog-dog-separation-anxiety-solutions-1.png` | `blog-dog-separation-anxiety-solutions-1` | Dog Separation Anxiety: 7 Solutions That Actually Work | https://www.pawandfound.store/blog?post=dog-separation-anxiety-solutions&utm_source=pinterest&utm_medium=social&utm_campaign=blog-dog-separation-anxiety-solutions-1&utm_content=blog-dog-separation-anxiety-solutions |
| `pinterest-blog-signs-your-pet-needs-a-vet-1.png` | `blog-signs-your-pet-needs-a-vet-1` | 10 Signs Your Pet Needs a Vet | https://www.pawandfound.store/blog?post=signs-your-pet-needs-a-vet&utm_source=pinterest&utm_medium=social&utm_campaign=blog-signs-your-pet-needs-a-vet-1&utm_content=blog-signs-your-pet-needs-a-vet |
| `pinterest-blog-best-treats-for-training-puppies-1.png` | `blog-best-treats-for-training-puppies-1` | Best Treats for Training Puppies | https://www.pawandfound.store/blog?post=best-treats-for-training-puppies&utm_source=pinterest&utm_medium=social&utm_campaign=blog-best-treats-for-training-puppies-1&utm_content=blog-best-treats-for-training-puppies |
| `pinterest-blog-signs-cat-loves-you-1.png` | `blog-signs-cat-loves-you-1` | 10 Signs Your Cat Actually Loves You | https://www.pawandfound.store/blog?post=signs-cat-loves-you&utm_source=pinterest&utm_medium=social&utm_campaign=blog-signs-cat-loves-you-1&utm_content=blog-cat-love |
| `pinterest-blog-best-cat-litter-odor-control-1.png` | `blog-best-cat-litter-odor-control-1` | Best Cat Litter for Odor Control | https://www.pawandfound.store/blog?post=best-cat-litter-odor-control&utm_source=pinterest&utm_medium=social&utm_campaign=blog-best-cat-litter-odor-control-1&utm_content=blog-best-cat-litter-odor-control |
| `pinterest-blog-how-often-should-you-change-cat-litter-1.png` | `blog-how-often-should-you-change-cat-litter-1` | How Often Should You Change Cat Litter? | https://www.pawandfound.store/blog?post=how-often-should-you-change-cat-litter&utm_source=pinterest&utm_medium=social&utm_campaign=blog-how-often-should-you-change-cat-litter-1&utm_content=blog-litter |
| `pinterest-blog-cat-not-using-litter-box-1.png` | `blog-cat-not-using-litter-box-1` | Why Is My Cat Not Using the Litter Box? | https://www.pawandfound.store/blog?post=cat-not-using-litter-box&utm_source=pinterest&utm_medium=social&utm_campaign=blog-cat-not-using-litter-box-1&utm_content=blog-cat-litter |
| `pinterest-blog-budget-for-new-puppy-1.png` | `blog-budget-for-new-puppy-1` | How to Budget for a New Puppy | https://www.pawandfound.store/blog?post=budget-for-new-puppy&utm_source=pinterest&utm_medium=social&utm_campaign=blog-budget-for-new-puppy-1&utm_content=blog-puppy-budget |
| `pinterest-blog-how-to-clean-dog-ears-at-home-1.png` | `blog-how-to-clean-dog-ears-at-home-1` | How to Clean Dog Ears at Home | https://www.pawandfound.store/blog?post=how-to-clean-dog-ears-at-home&utm_source=pinterest&utm_medium=social&utm_campaign=blog-how-to-clean-dog-ears-at-home-1&utm_content=blog-how-to-clean-dog-ears-at-home |
| `pinterest-blog-introducing-new-pet-to-your-home-1.png` | `blog-introducing-new-pet-to-your-home-1` | How to Introduce a New Pet to Your Home | https://www.pawandfound.store/blog?post=introducing-new-pet-to-your-home&utm_source=pinterest&utm_medium=social&utm_campaign=blog-introducing-new-pet-to-your-home-1&utm_content=blog-new-pet |

**Mapping note.** Each post has 2–3 pins in the guide sharing one header image. These ten are
drawn as **pin 1 of each post** (the guide's first pin id per post), so the campaign tags stay
unique per post. If a second pin from the same post is posted later, it can reuse this same image
with its own title — Pinterest sees one image, the tags tell the two apart.

## Rebuild

```bash
node build/generate.mjs        # writes html/*.html
./build/render.sh              # HTML -> PNG at exactly 1000x1500 via agent-browser
```

Header art comes from `site/public/images/blog-*.jpg` (1536×1024 landscape, cropped to portrait by
`object-fit: cover`, centre). If a post's header art is ever regenerated, re-run both commands.

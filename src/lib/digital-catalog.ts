// Single source of truth for the digital catalogue — every item here is an
// instant download with a live Stripe payment link. Used by /downloads and
// the /gifts digital gift guide so prices can never drift between pages.

export interface DigitalProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  stripePaymentLink: string;
  features: string[];
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  stripePaymentLink: string;
  includedProducts: { title: string; price: number }[];
  image: string;
}

export const bundles: Bundle[] = [
  {
    id: "bundle-001",
    title: "Puppy Starter Pack",
    description:
      "Everything a new puppy parent needs — training schedule, treat recipes, and emergency know-how. Save 28% vs buying individually.",
    price: 12.99,
    originalPrice: 17.97,
    savings: 4.98,
    stripePaymentLink: "https://buy.stripe.com/4gM7sL7vM2qcc779iw2cg0w",
    image: "/images/puppy-training-checklist-preview.png",
    includedProducts: [
      { title: "Puppy Training Checklist & Milestone Tracker", price: 4.99 },
      { title: "Homemade Pet Treats Recipe Guide", price: 4.99 },
      { title: "Pet First Aid: Emergency Care Guide", price: 7.99 },
    ],
  },
  {
    id: "bundle-002",
    title: "Cat Essentials Kit",
    description:
      "The ultimate cat care bundle — decode their behavior, plan their care, and ace every vet visit. Save 29% vs buying individually.",
    price: 11.99,
    originalPrice: 16.97,
    savings: 4.98,
    stripePaymentLink: "https://buy.stripe.com/5kQdR9g2i1m84EF2U82cg0x",
    image: "/images/cat-behavior-decoder-preview.png",
    includedProducts: [
      { title: "Cat Behavior Decoder", price: 5.99 },
      { title: "The Ultimate Pet Care Planner", price: 9.99 },
      { title: "Vet Visit Prep Kit", price: 4.99 },
    ],
  },
];

export const digitalProducts: DigitalProduct[] = [
  {
    id: "dig-001",
    title: "Homemade Pet Treats Recipe Guide",
    slug: "homemade-pet-treats-recipe-guide",
    price: 4.99,
    description:
      "7 simple, safe recipes for homemade dog and cat treats your pets will love. Includes grain-free and allergy-friendly options.",
    longDescription:
      "Treat your furry best friend to the healthiest, tastiest homemade snacks! This digital recipe guide includes 7 vet-approved recipes for dogs and cats — from crunchy peanut butter biscuits to frozen salmon bites. Every recipe uses simple, whole-food ingredients you probably already have in your kitchen. Bonus: includes a section on ingredients to avoid and safe substitutions for pets with allergies.",
    image: "/images/pet-treat-recipes-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRm7sLaHY3ug8UVbqE2cg0h",
    features: [
      "7 vet-approved recipes for dogs and cats",
      "Grain-free and allergy-friendly options",
      "Ingredient substitution guide",
      "Foods-to-avoid quick reference chart",
      "Printable PDF format — view on any device",
      "Lifetime access — free updates",
    ],
  },
  {
    id: "dig-002",
    title: "Pet First Aid: Emergency Care Guide",
    slug: "pet-first-aid-emergency-care-guide",
    price: 7.99,
    description:
      "Be prepared for pet emergencies with this comprehensive first aid guide. Covers choking, poisoning, wounds, heatstroke, and more.",
    longDescription:
      "Emergencies happen when you least expect them. This veterinarian-reviewed guide walks you through exactly what to do when your pet needs immediate help — from the first critical minutes until you can reach a vet. Covers choking, poisoning, wounds and bleeding, seizures, heatstroke, broken bones, and allergic reactions. Includes a quick-reference emergency checklist and a pet emergency kit shopping list. Peace of mind in your pocket — literally.",
    image: "/images/pet-first-aid-preview.png",
    stripePaymentLink: "https://buy.stripe.com/9B6eVd4jA5Co3AB0M02cg0i",
    features: [
      "Step-by-step emergency response guides",
      "Covers choking, poisoning, wounds, and more",
      "Pet CPR instructions with diagrams",
      "Emergency kit shopping checklist",
      "Printable PDF format — view on any device",
      "Veterinarian-reviewed content",
    ],
  },
  {
    id: "dig-003",
    title: "Paw & Found Digital Sticker Pack",
    slug: "paw-and-found-digital-sticker-pack",
    price: 5.99,
    description:
      "24 hand-drawn pet-themed digital stickers for tablet journaling apps. Cute, colorful designs of dogs, cats, and pet parent life.",
    longDescription:
      "Decorate your digital journal, planner, or notes with these adorable hand-drawn pet stickers! This pack includes 24 individual PNG stickers featuring dogs, cats, paw prints, pet care icons, and fun pet-parent sayings. All stickers have transparent backgrounds and high resolution — perfect for GoodNotes, Notability, Zoom whiteboards, and any app that supports image imports. Just import and start decorating!",
    image: "/images/sticker-cover.jpg",
    stripePaymentLink: "https://buy.stripe.com/9B6bJ19DU6Gs0op2U82cg0j",
    features: [
      "24 individual PNG stickers",
      "Dog, cat & pet parent designs",
      "Works with GoodNotes & Notability",
      "Transparent backgrounds",
      "High resolution — 300 DPI",
      "Instant download",
    ],
  },
  {
    id: "dig-004",
    title: "The Ultimate Pet Care Planner",
    slug: "ultimate-pet-care-planner",
    price: 9.99,
    description:
      "24-page undated printable planner covering vet visits, vaccination records, medication tracking, feeding schedules, grooming, training, expenses, and pet sitter instructions.",
    longDescription:
      "Stay on top of your pet's health and happiness with this comprehensive printable planner. 24 undated pages let you start any time of year and reuse year after year. Includes dedicated sections for vet visit logs, vaccination records, medication schedules, daily feeding trackers, grooming logs, training progress, expense tracking, and a full pet sitter information sheet with emergency contacts. US Letter size (8.5×11\") — print at home or at your local print shop. Perfect for busy pet parents who want to keep everything organized in one place.",
    image: "/images/pet-care-planner-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRmaEX17od4Q2wx9iw2cg0k",
    features: [
      "24 undated pages — use year after year",
      "Vet, meds, feeding & grooming logs",
      "Pet sitter instructions & emergency contacts",
      "Printable US Letter size (8.5×11\")",
      "Expense tracking included",
      "Instant download — print as many copies as you need",
    ],
  },
  {
    id: "dig-005",
    title: "Puppy Training Checklist & Milestone Tracker",
    slug: "puppy-training-checklist",
    price: 4.99,
    description:
      "Track your puppy's progress from 8 weeks to 12 months. Covers potty training, commands, socialization, and health milestones.",
    longDescription:
      "Raising a puppy is exciting — and busy! This checklist keeps you organized through every stage of your puppy's first year. Track potty training progress, basic commands mastered, socialization experiences, vaccination schedules, and growth milestones. Includes weekly checklists from 8 weeks through 12 months, plus tips for common challenges like teething and leash pulling. Print as many copies as you need — perfect for first-time puppy parents!",
    image: "/images/puppy-training-checklist-preview.png",
    stripePaymentLink: "https://buy.stripe.com/5kQeVd2bsfcY3AB3Yc2cg0l",
    features: [
      "Weekly checklists from 8 weeks to 12 months",
      "Potty training & command trackers",
      "Socialization & health milestone logs",
      "Printable — use year after year",
      "Perfect for first-time puppy parents",
      "Instant download",
    ],
  },
  {
    id: "dig-006",
    title: "Cat Behavior Decoder",
    slug: "cat-behavior-decoder",
    price: 5.99,
    description:
      "Understand what your cat is really telling you. Decode meows, tail flicks, ear positions, and body language with this visual guide.",
    longDescription:
      "Cats are mysterious — but they're always communicating. This beautifully illustrated guide helps you decode your cat's every move: what different meows mean, why their tail twitches, what ear positions signal, and how to tell if they're stressed, happy, or ready to play. Includes 30+ common behaviors with clear illustrations and explanations, plus troubleshooting tips for common issues like scratching furniture and litter box avoidance. Build a deeper bond by finally understanding what your cat is saying!",
    image: "/images/cat-behavior-decoder-preview.png",
    stripePaymentLink: "https://buy.stripe.com/9B6fZh03k2qcc77eCQ2cg0m",
    features: [
      "30+ common cat behaviors decoded",
      "Illustrated body language guide",
      "Meow & vocalization translations",
      "Troubleshooting for common issues",
      "Printable PDF — view on any device",
      "Instant download",
    ],
  },
  {
    id: "dig-007",
    title: "Pet Travel Checklist & Packing Guide",
    slug: "pet-travel-checklist",
    price: 3.99,
    description:
      "Never forget an essential again. Comprehensive packing lists for road trips, flights, camping, and boarding your pet.",
    longDescription:
      "Traveling with your pet? This comprehensive checklist covers everything you need — whether you're hitting the road, flying across the country, camping in the woods, or dropping your pet off at the boarder. Includes separate packing lists for dogs and cats, a pre-trip planning timeline, documents checklist (vaccination records, health certificates), car safety tips, airline-approved carrier guidelines, and an emergency contact sheet. Travel stress-free knowing you haven't forgotten anything!",
    image: "/images/pet-travel-checklist-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRm8wP03kaWIgnngKY2cg0n",
    features: [
      "Separate checklists for dogs & cats",
      "Road trip, flight, camping & boarding guides",
      "Pre-trip planning timeline",
      "Documents & health records checklist",
      "Emergency contact sheet included",
      "Instant download",
    ],
  },
  {
    id: "dig-008",
    title: "DIY Dog Birthday Party Kit",
    slug: "diy-dog-birthday-party-kit",
    price: 4.99,
    description:
      "Throw the ultimate dog birthday party! Includes printable invitations, decorations, a pup-friendly cake recipe, and party game ideas.",
    longDescription:
      "Your dog deserves a celebration! This printable party kit has everything you need to throw an unforgettable dog birthday bash. Includes adorable paw-print invitations, a 'Happy Barkday' banner, cupcake toppers, a dog-safe cake recipe (peanut butter & pumpkin — tested and pup-approved!), party hat templates, and 5 fun party game ideas. All printables are designed for US Letter paper. Just print, cut, and party!",
    image: "/images/dog-birthday-party-kit-preview.png",
    stripePaymentLink: "https://buy.stripe.com/cNi14n2bs3ug1steCQ2cg0p",
    features: [
      "Printable invitations & decorations",
      "Dog-safe birthday cake recipe",
      "Party hat templates & cupcake toppers",
      "5 fun party game ideas",
      "US Letter size — print at home",
      "Instant download",
    ],
  },
  {
    id: "dig-009",
    title: "Pet Photo Tips Guide",
    slug: "pet-photo-tips-guide",
    price: 6.99,
    description:
      "Take stunning photos of your dog or cat with your phone! 40+ tips covering lighting, composition, action shots, and editing tricks.",
    longDescription:
      "Want Instagram-worthy pet photos without expensive gear? This guide teaches you to take amazing photos of your pet using just your smartphone. Covers natural lighting techniques, composition rules that make any photo pop, how to capture sharp action shots, working with different coat colors, and simple editing tricks using free apps. Includes 40+ practical tips with before-and-after examples. Your pet is adorable — let's make sure your photos do them justice!",
    image: "/images/pet-photo-tips-preview.png",
    stripePaymentLink: "https://buy.stripe.com/14AcN52bs7KwgnneCQ2cg0q",
    features: [
      "40+ practical photo tips",
      "Smartphone-focused — no gear needed",
      "Lighting & composition mastery",
      "Action shot techniques",
      "Free app editing guide included",
      "Before-and-after examples",
    ],
  },
  {
    id: "dig-010",
    title: "Paws & Relax Coloring Book",
    slug: "paws-and-relax-coloring-book",
    price: 5.99,
    description:
      "20 beautifully illustrated pet-themed coloring pages for adults. Featuring dogs, cats, and whimsical animal designs to help you unwind.",
    longDescription:
      "Relax and de-stress with this beautifully illustrated pet-themed coloring book. 20 original designs featuring dogs, cats, paw prints, and whimsical animal patterns — from detailed mandalas to charming doodle-style pages. Each design is printed on its own page (no bleed-through worries). Perfect for winding down after a long day, or as a thoughtful gift for the pet lover in your life. Print your favorites as many times as you'd like!",
    image: "/images/pet-coloring-book-preview.png",
    stripePaymentLink: "https://buy.stripe.com/9B6bJ14jAe8U2wxfGU2cg0o",
    features: [
      "20 original coloring designs",
      "Dogs, cats & whimsical animal art",
      "One design per page — no bleed",
      "Print as many copies as you want",
      "US Letter size (8.5×11\")",
      "Perfect gift for pet lovers",
    ],
  },
  {
    id: "dig-017",
    title: "My First Pet Coloring Book",
    slug: "my-first-pet-coloring-book",
    price: 5.99,
    description:
      "18 adorable, big-shape coloring pages of dogs, cats, bunnies, and more — designed just for kids, with thick outlines and large interiors.",
    longDescription:
      "A delightful first coloring book for little hands! Featuring 18 original, kid-friendly pet designs — from a sleeping puppy and a smiling kitten to a bunny, hamster, and goldfish — each with thick, easy-to-color outlines and big open spaces. Single-sided pages mean no bleed-through, so kids can use crayons, markers, or colored pencils without worry. Sized 8.5 x 11 inches, perfect for small artists. A screen-free creative activity and a sweet, screen-free gift for any child who loves animals.",
    image: "/images/my-first-pet-coloring-book-cover.png",
    stripePaymentLink: "https://buy.stripe.com/5kQfZh2bs7Kw5IJfGU2cg1u",
    features: [
      "18 original kid-friendly pet designs",
      "Thick outlines & big open spaces for small hands",
      "Dogs, cats, bunnies & more (single-sided pages)",
      "Works with crayons, markers & colored pencils",
      "US Letter size (8.5×11\")",
      "Instant PDF download — print as often as you like",
    ],
  },
  {
    id: "dig-018",
    title: "Colorful Wishes: Valentine's (Hugs & Kisses) Coloring Book",
    slug: "colorful-wishes-valentine-coloring-book",
    price: 9.99,
    description:
      "20 cute pet-and-love coloring scenes that double as fold-and-give cards — each page has To:/From: lines and a message space. Perfect for kids ages 3-8.",
    longDescription:
      "Color, fold, and give! This Valentine's coloring book is 20 adorable pet-and-love scenes that are also giftable cards — each page has a To:/From: line and a short message space. Little artists can color a puppy holding a heart, a kitty with a 'be mine' balloon, bunnies, paw-print hearts and more, then fold and hand them to someone they love. Great for ages 3-8 and lovely for Valentine's, Grandparents' Day, or any 'I love you.' Single-sided pages mean no bleed-through, so crayons, markers, or colored pencils all work. Sized 8.5 x 11 inches and print-at-home friendly.",
    image: "/downloads/kdp-coloring-book-valentine/Colorful-Wishes-Valentine-preview.png",
    stripePaymentLink: "https://buy.stripe.com/fZu6oHcQ64yk2wxeCQ2cg1H",
    features: [
      "20 color-fold-and-give Valentine card pages",
      "To:/From: lines & message space on every card",
      "Puppies, kitties, bunnies & paw-print hearts",
      "Single-sided pages — no bleed-through",
      "US Letter size (8.5x11\") — print at home",
      "Lovely pick for kids ages 3-8",
    ],
  },
  {
    id: "dig-019",
    title: "Printable Pet Gift Tags & Wrapping Set",
    slug: "pet-gift-tags-wrapping-set",
    price: 4.99,
    description:
      "Adorable printable gift tags and wrapping extras for all your pet-themed gifts — paw prints, pawfect puns, and more. Print as many as you need.",
    longDescription:
      "Add a furry finishing touch to every gift! This printable set includes a sheet of charming pet-themed gift tags (paw prints, 'pawfect for you', dog and cat designs), plus matching wrapping extras like gift-card holders, a mini 'to/from' flag set, and coordinating patterns. Print as many copies as you need for birthdays, holidays, and adoption celebrations alike. Everything is designed for US Letter paper, with clean cut lines and an easy print-at-home layout.",
    image: "/downloads/pet-gift-tags-set/Pet-Gift-Tags-Wrapping-Set-preview.png",
    stripePaymentLink: "https://buy.stripe.com/9B69ATbM24yk6MN3Yc2cg1I",
    features: [
      "Pet-themed gift tags with paw prints & puns",
      "Matching gift-card holders & wrapping extras",
      "Prints on US Letter paper at home",
      "Print as many copies as you need",
      "Perfect for birthdays, holidays & adoptions",
      "Instant PDF download",
    ],
  },
  {
    id: "dig-011",
    title: "Vet Visit Prep Kit",
    slug: "vet-visit-prep-kit",
    price: 4.99,
    description:
      "Make every vet visit smoother. Includes a symptoms tracker, questions-to-ask checklist, medication log, and vaccination record keeper.",
    longDescription:
      "Never walk into a vet appointment unprepared again. This comprehensive prep kit helps you track symptoms before the visit, organize the questions you want to ask, log current medications and dosages, and maintain an up-to-date vaccination record. Also includes a post-visit summary sheet so you remember everything the vet told you. Designed with input from veterinary professionals. Stress less and advocate better for your pet's health!",
    image: "/images/vet-visit-prep-kit-preview.png",
    stripePaymentLink: "https://buy.stripe.com/dRm8wP9DU8OAgnndyM2cg0r",
    features: [
      "Symptom tracker & timeline",
      "Questions-to-ask checklist",
      "Medication log with dosage tracker",
      "Vaccination record keeper",
      "Post-visit summary sheet",
      "Veterinarian-reviewed format",
    ],
  },
  {
    id: "dig-012",
    title: "2027 Pet Lover's Printable Calendar",
    slug: "pet-calendar-2027",
    price: 12.99,
    description:
      "Beautiful printable 2027 wall calendar with 12 illustrated pet designs. Print at home, use year after year.",
    longDescription:
      "Brighten up your 2027 with twelve months of adorable pet illustrations! Each month features a charming seasonal scene with dogs, cats, or both — from a golden retriever puppy in January snow to a husky celebrating the December holidays. Every month includes pet care tips, important pet-related dates, and a notes section for vet appointments and milestones. US Letter size (8.5×11\"), prints beautifully on any home printer. Download once, print as many copies as you want — perfect for home, office, and gifting to fellow pet lovers!",
    image: "/images/pet-calendar-cover.jpg",
    stripePaymentLink: "https://buy.stripe.com/00w28r2bs3ug9YZ9iw2cg0Q",
    features: [
      "12 beautifully illustrated monthly pages",
      "Seasonal pet-themed designs for every month",
      "Monthly pet care tips & important dates",
      "Notes section on every page",
      "US Letter size (8.5×11\") — print at home",
      "Instant download — print unlimited copies",
    ],
  },
  {
    id: "dig-013",
    title: "Dog Walking Etiquette Guide",
    slug: "dog-walking-etiquette-guide",
    price: 6.99,
    description:
      "Master polite leash manners and avoid common walking mistakes. Covers leash laws, passing other dogs, and trail etiquette.",
    longDescription:
      "Walking your dog should be the best part of both of your days — not a stressful tug-of-war. This guide covers everything you need to know about dog walking etiquette: how to pass other dogs safely, understanding leash laws in your area, trail and park etiquette, what to do when off-leash dogs approach, night walking safety, and how to handle reactive dogs with confidence. Also includes a section on gear recommendations (leashes, harnesses, lights) and a quick-reference etiquette checklist for your phone. Whether you're a new dog owner or just want to brush up, this guide makes every walk smoother.",
    image: "/images/dog-walking-guide.jpg",
    stripePaymentLink: "https://buy.stripe.com/9B6cN56rI4ykc777ao2cg0R",
    features: [
      "Passing other dogs safely",
      "Leash laws & trail etiquette explained",
      "Handling off-leash dog encounters",
      "Night walking safety tips",
      "Gear recommendations checklist",
      "Reactive dog confidence guide",
    ],
  },
  {
    id: "dig-015",
    title: "Basic Obedience Training Guide",
    slug: "basic-obedience-training-guide",
    price: 7.99,
    description:
      "Build a well-behaved dog with step-by-step training plans. Covers sit, stay, come, down, leave it, and loose leash walking — all in one guide.",
    longDescription:
      "Every dog should master the basics — and this guide makes it easy. Covers six essential commands with clear, step-by-step training plans: Sit, Stay, Come When Called, Down, Leave It, and Loose Leash Walking. Each command includes a breakdown of prerequisite skills, training steps from introduction to proofing, common troubleshooting tips, and a progress tracker so you can see how far you've come. Whether you're starting with a new puppy or brushing up an adult dog's skills, this guide gives you a structured path to a well-mannered companion. Includes printable daily training logs, a 4-week training schedule, and tips for training in distracting environments.",
    image: "/images/basic-obedience-guide.jpg",
    stripePaymentLink: "https://buy.stripe.com/00wcN57vM2qcb337ao2cg0T",
    features: [
      "6 essential commands — sit, stay, come, down, leave it, loose leash",
      "Step-by-step training plans with progress trackers",
      "Common mistakes & troubleshooting tips",
      "Printable daily training logs",
      "4-week training schedule template",
      "Proofing exercises for real-world reliability",
    ],
  },
  {
    id: "dig-014",
    title: "Pet Sitter Planner & Checklist",
    slug: "pet-sitter-planner-checklist",
    price: 7.99,
    description:
      "Leave your pet sitter fully prepared. Printable planner with feeding schedules, emergency contacts, vet info, and daily checklists.",
    longDescription:
      "Travel with peace of mind knowing your pet sitter has everything they need. This comprehensive planner includes: detailed feeding and medication schedules, emergency contact sheets (vet, nearest ER, trusted neighbor), daily care checklists for dogs and cats, house rules and quirks section (\"the back door sticks, push hard\"), a what-to-do-if section for common scenarios, and space for your pet's personality notes. Print a fresh copy for every trip — your sitter will thank you, and you'll actually relax on vacation. Designed with input from professional pet sitters who know exactly what information makes a sit go smoothly.",
    image: "/images/pet-sitter-planner.jpg",
    stripePaymentLink: "https://buy.stripe.com/9B628r9DU7Kw4EFgKY2cg0S",
    features: [
      "Feeding & medication schedule templates",
      "Emergency contacts & vet info sheet",
      "Daily care checklists for dogs & cats",
      "House rules & quirks section",
      "What-to-do-if scenario guide",
      "Printable — use for every trip",
    ],
  },
  {
    id: "dig-016",
    title: "Small Pet Starter Kit",
    slug: "small-pet-starter-kit",
    price: 9.99,
    description:
      "The complete starter guide for rabbits, guinea pigs, and hamsters — housing, feeding, health, enrichment, and bonding for all three species.",
    longDescription:
      "Thinking about a small pet? This complete starter kit covers everything you need for the three most popular small pets — rabbits, guinea pigs, and hamsters. Each species gets its own deep dive: proper housing sizes (including the C&C cage gold standard for guinea pigs and bin-cage setups for hamsters), diet and feeding guidelines (hay-first nutrition for rabbits and guinea pigs, scatter feeding for hamsters), enrichment ideas, health warning signs, and bonding tips. Includes printable setup checklists and a quick-reference care sheet for each species — everything you need to start right.",
    image: "/images/small-pet-starter-kit-preview.jpg",
    stripePaymentLink: "https://buy.stripe.com/5kQ00j4jA8OA2wx9iw2cg1q",
    features: [
      "Covers rabbits, guinea pigs & hamsters",
      "Housing size guides for each species",
      "Diet & feeding cheat sheets",
      "Health warning signs & vet checklist",
      "Enrichment & bonding tips",
      "Instant PDF download — lifetime access",
    ],
  },
];

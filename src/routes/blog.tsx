import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { loadProducts } from "~/lib/products";
import type { Product } from "~/lib/types";
import { ShopTheLook } from "~/components/shop-the-look";

const SITE_URL = "https://pawandfound.store";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  tags: string[];
  content: string;
  relatedSlugs?: string[];
}

// Inline blog data — one post at a time, added manually
const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-paw-and-found",
    title: "Welcome to Paw & Found!",
    date: "2026-07-15",
    author: "Paw & Found Team",
    excerpt: "We're thrilled to launch Paw & Found — your one-stop shop for pet apparel, essentials, and supplies. Here's what we're all about.",
    image: "/images/blog-welcome.jpg",
    tags: ["announcement"],
    content: `<p>We're excited to officially launch Paw & Found! Our mission is simple: make it dead easy to find exactly what your pet needs, from trendy T-shirts to everyday essentials like cat litter.</p><p>We've curated a selection of products across four categories:</p><ul><li><strong>Apparel</strong> — stylish T-shirts and bandanas for your fashionable furry friend</li><li><strong>Essentials</strong> — food, treats, and litter you need every day</li><li><strong>Supplies</strong> — toys, beds, bowls, and more</li><li><strong>Accessories</strong> — leashes, collars, and travel gear</li></ul><p>Plus, we offer a <strong>Subscribe & Save</strong> program on essentials — get 10% off every auto-delivery so you never run out of the basics.</p><p>Thank you for stopping by. Give your pet a treat from us! 🐾</p>`
  },
  {
    slug: "how-to-choose-the-perfect-pet-bed",
    title: "How to Choose the Perfect Pet Bed",
    date: "2026-07-10",
    author: "Paw & Found Team",
    excerpt: "A good pet bed makes all the difference. Here's our guide to finding the right size, style, and support for your furry friend.",
    image: "/images/blog-pet-bed.jpg",
    tags: ["tips", "supplies"],
    relatedSlugs: ["orthopedic-pet-bed-medium", "ventilated-travel-carrier", "cozy-hoodie-pullover"],
    content: `<p>A comfortable bed is one of the most important purchases you'll make for your pet. Not only does it give them a place to call their own, but proper support can improve joint health and sleep quality.</p><h2>Size Matters</h2><p>Measure your pet from nose to tail while they're sleeping in their natural curled-up position, then add 6-12 inches. A bed that's too small will leave your pet hanging off the edges!</p><h2>Consider Their Sleeping Style</h2><p>Does your pet sprawl out, curl up, or burrow? Sprawlers need flat, open beds. Curlers prefer donut or bolstered beds. Burrowers love cave-style beds they can nestle into.</p><h2>Material & Durability</h2><p>Look for removable, machine-washable covers. Memory foam is great for older pets with joint issues, while cooling gel beds help hot sleepers stay comfortable.</p><p>Shop our <a href="/products?category=Supplies">pet supplies collection</a> for beds and more!</p>`
  },
  {
    slug: "picking-the-best-dog-food",
    title: "Picking the Best Dog Food: What to Look For",
    date: "2026-07-19",
    author: "Paw & Found Team",
    excerpt: "Confused by dog food labels? Here's how to decode ingredients, avoid fillers, and choose the best food for your pup's age, breed, and health needs.",
    image: "/images/blog-dog-food.jpg",
    tags: ["tips", "essentials", "dogs"],
    relatedSlugs: ["stainless-steel-bowl-set", "gentle-pet-shampoo-16oz", "premium-clumping-cat-litter"],
    content: `<p>Walk down any pet food aisle and the choices can feel overwhelming. Grain-free, raw, kibble, wet — here's how to cut through the noise and pick what's actually best for your dog.</p><h2>1. Read the First Five Ingredients</h2><p>The first ingredient should always be a named protein: chicken, beef, salmon — not "meat meal" or "animal by-product." Real, recognizable ingredients matter.</p><h2>2. Avoid Fillers</h2><p>Corn, soy, and wheat are cheap fillers that offer little nutritional value. Look for whole grains like brown rice or oats instead — or grain-free options if your pup has sensitivities.</p><h2>3. Match Your Dog's Life Stage</h2><p>Puppies need more protein and calories for growth. Adult dogs need balanced maintenance. Seniors benefit from joint-supporting formulas with glucosamine. Always check the label for the AAFCO statement confirming it's complete and balanced for your dog's life stage.</p><h2>4. Watch for Red Flags</h2><p>Vague ingredient names ("animal fat"), artificial colors, and excessive preservatives are signs to put the bag back on the shelf.</p><p>Browse our <a href="/products?category=Essentials">essential pet supplies</a> for high-quality food options your dog will love!<br>Also check out our <a href="/downloads">Homemade Pet Treats Recipe Guide</a> — 7 easy DIY recipes for $4.99!</p>`
  },
  {
    slug: "best-dog-and-cat-health-products",
    title: "Best Dog & Cat Health Products Every Pet Owner Needs",
    date: "2026-07-19",
    author: "Paw & Found Team",
    excerpt: "Keep your furry friends healthy and happy with these must-have health products for dogs and cats — from supplements to grooming essentials.",
    image: "/images/blog-health.jpg",
    tags: ["tips", "dogs", "cats", "essentials"],
    content: `<p>Prevention is always better than cure. With a few key health products in your pet care arsenal, you can keep your dog or cat thriving between vet visits.</p><h2>For Dogs</h2><p><strong>Joint supplements</strong> containing glucosamine and chondroitin can help active and senior dogs maintain mobility. <strong>Probiotics</strong> support digestive health — especially helpful if your pup has a sensitive stomach or is on antibiotics.</p><p><strong>Dental chews</strong> reduce plaque and freshen breath (your dog will thank you, and so will your nose). And don't forget a good <strong>ear cleaner</strong> — especially for floppy-eared breeds prone to infections.</p><h2>For Cats</h2><p>Cats are masters at hiding discomfort. <strong>Hairball remedies</strong> help indoor cats pass fur naturally. <strong>Urinary health supplements</strong> can prevent crystals and UTIs — common issues in male cats especially.</p><p>Regular <strong>nail trimmers</strong> and a quality <strong>brush</strong> aren't just grooming tools — they're health tools that prevent matting, overgrown nails, and the stress that comes with both.</p><h2>The Bottom Line</h2><p>You don't need a cabinet full of products. Start with the basics based on your pet's age and breed, and consult your vet before adding supplements to their routine.</p><p>Stock up on <a href="/products?category=Essentials">health & wellness essentials</a> for both dogs and cats in our shop!<br>Be prepared for emergencies with our <a href="/downloads">Pet First Aid Guide</a> — a must-have reference for every pet owner, just $7.99.</p>`
  },
  {
    slug: "how-often-should-you-change-cat-litter",
    title: "How Often Should You Change Cat Litter? The Complete Guide",
    date: "2026-07-21",
    author: "Paw & Found Team",
    excerpt: "One of the most common cat care questions, answered. Learn the right scooping and changing schedule for a clean, odor-free litter box your cat will actually use.",
    image: "/images/blog-litter.jpg",
    tags: ["tips", "cats", "essentials"],
    content: `<p>If you're wondering how often to change cat litter, you're asking the right question. A clean litter box isn't just about odor control — it's about your cat's health.</p><h2>Scoop Daily, Change Weekly</h2><p>The golden rule: <strong>scoop waste at least once a day</strong> and do a full litter change <strong>once a week for clumping litter</strong>, or <strong>every 2-3 days for non-clumping litter</strong>. Cats are fastidious creatures — a dirty box can lead to them going outside it.</p><h2>Clumping vs. Non-Clumping</h2><p>Clumping litter makes daily scooping easy and extends the life of your litter. Non-clumping absorbs but doesn't clump, meaning urine sinks to the bottom and you need to change the entire box more often.</p><h2>Signs It's Time for a Full Change</h2><p>If you can smell ammonia even after scooping, or your cat is hesitating at the box — it's overdue. As a rule, never let litter go more than a week without a full dump, scrub, and refill.</p><h2>How Many Litter Boxes?</h2><p>The rule of thumb: <strong>one box per cat, plus one extra</strong>. So two cats = three boxes. This prevents territorial issues and ensures there's always a clean option available.</p><p>Stock up on <a href="/products?category=Essentials">high-quality cat litter</a> in our essentials shop — and consider Subscribe & Save for 10% off auto-delivery!</p>`
  },
  {
    slug: "best-dog-toys-for-aggressive-chewers",
    title: "Best Dog Toys for Aggressive Chewers That Actually Last",
    date: "2026-07-21",
    author: "Paw & Found Team",
    excerpt: "Tired of buying toys that get destroyed in 5 minutes? Here's how to find durable toys for power chewers — and which types to avoid.",
    image: "/images/blog-toys.jpg",
    tags: ["tips", "dogs", "supplies"],
    relatedSlugs: ["plush-squeaky-fox-toy", "stainless-steel-bowl-set", "ventilated-travel-carrier"],
    content: `<p>If your dog can destroy a "tough" toy in under an hour, you're not alone. Here's what actually holds up against determined jaws.</p><h2>What to Look For</h2><p><strong>Rubber over plush.</strong> Hard rubber toys designed for aggressive chewers (think Kong-style) are your best bet. Look for toys labeled "indestructible" or "heavy-duty" — but manage expectations: no toy is truly indestructible.</p><h2>What to Avoid</h2><p>Skip thin squeaky toys, rope toys (if your dog swallows strings), and anything with glued-on parts that can become choking hazards. Also avoid toys harder than your dog's teeth — they can cause dental fractures.</p><h2>Best Toy Types for Power Chewers</h2><p><strong>Rubber treat-dispensing toys</strong> — they engage your dog's brain and stand up to chewing. <strong>Nylon bones</strong> — long-lasting and satisfying to gnaw. <strong>Tough tennis balls</strong> — but choose ones designed for dogs, not regular sports balls which can damage teeth.</p><h2>Rotate for Longevity</h2><p>Don't leave all toys out at once. Rotate 3-4 toys weekly — your dog stays interested and each toy lasts longer.</p><p>Shop our <a href="/products?category=Supplies">pet supplies collection</a> for durable toys, chew treats, and more!</p>`
  },
  {
    slug: "when-to-switch-puppy-to-adult-dog-food",
    title: "When to Switch from Puppy Food to Adult Dog Food",
    date: "2026-07-21",
    author: "Paw & Found Team",
    excerpt: "Switch too early and your puppy misses key nutrients. Switch too late and they gain unnecessary weight. Here's exactly when to make the change.",
    image: "/images/blog-puppy.jpg",
    tags: ["tips", "dogs", "essentials"],
    content: `<p>Puppy food is calorie-dense and packed with nutrients for rapid growth. But there's a right time to switch — and it varies by breed size.</p><h2>Small Breeds (under 20 lbs)</h2><p>Small dogs mature faster. Switch to adult food around <strong>9-12 months</strong>. By their first birthday, most small breeds are ready for adult maintenance formulas.</p><h2>Medium Breeds (20-50 lbs)</h2><p>Medium-sized dogs are usually ready to switch at <strong>12-14 months</strong>. Look for signs they've stopped growing before making the change.</p><h2>Large & Giant Breeds (50+ lbs)</h2><p>Large breeds mature slowly. Keep them on puppy food until <strong>18-24 months</strong>. Switching too early can affect their joint and bone development — large breeds need those extra nutrients longer.</p><h2>How to Switch Safely</h2><p>Don't switch cold turkey. Mix 75% old food / 25% new for 3 days, then 50/50 for 3 days, then 25/75 for 3 days. This prevents digestive upset. And always consult your vet if you're unsure.</p><p>Browse <a href="/products?category=Essentials">our essential pet food options</a> for both puppy and adult formulas!<br>New puppy parent? Grab our <a href="/downloads">Puppy Training Checklist & Milestone Tracker</a> — $4.99 for a complete training roadmap.</p>`
  },
  {
    slug: "top-5-dog-breeds-and-why",
    title: "Top 5 Dog Breeds (and Why People Love Them)",
    date: "2026-07-21",
    author: "Paw & Found Team",
    excerpt: "From loyal labs to clever border collies, here are America's most popular dog breeds — and what makes each one a perfect fit for different homes.",
    image: "/images/blog-dog-breeds.jpg",
    tags: ["dogs", "guides"],
    relatedSlugs: ["good-dog-club-tshirt", "adjustable-collar-leather", "adventure-pup-graphic-tee"],
    content: `<p>Choosing the right breed matters — for your lifestyle, your space, and your sanity. Here are five of the most popular dog breeds and what makes each one special.</p><h2>1. Labrador Retriever</h2><p>The Lab has topped popularity charts for decades — and for good reason. Friendly, trainable, and great with kids, Labs fit into almost any home. They do need daily exercise and have a legendary appetite, so portion control is a must.</p><h2>2. French Bulldog</h2><p>Compact, charming, and low-energy, Frenchies are perfect for apartment living. They don't need much exercise but do need attention — these velcro dogs bond deeply with their humans. Their flat faces mean they're sensitive to heat, so keep them cool in summer.</p><h2>3. Golden Retriever</h2><p>Another family superstar. Goldens are gentle, patient, and eager to please. They thrive with active families who include them in outdoor adventures. Warning: you'll never be alone in the bathroom again.</p><h2>4. German Shepherd</h2><p>Intelligent, loyal, and protective. German Shepherds excel at everything from police work to being a dedicated family guardian. They need a job to do — training and mental stimulation are non-negotiable with this breed.</p><h2>5. Border Collie</h2><p>Widely considered the most intelligent dog breed, Border Collies are brilliant athletes. They're not for casual owners — these dogs need hours of exercise and mental challenges daily. But for active, dedicated owners, there's no more rewarding companion.</p><p>Whatever breed you choose, make sure they're well-equipped! Shop our <a href="/products?category=Supplies">toys, beds, and supplies</a> — and check out our <a href="/products?category=Apparel">apparel section</a> for breed-sized bandanas and tees!<br>Training a new pup? Our <a href="/downloads">Puppy Training Checklist</a> has your back — just $4.99.</p>`
  },
  {
    slug: "top-5-cat-breeds-and-why",
    title: "Top 5 Cat Breeds (and Why They'll Steal Your Heart)",
    date: "2026-07-21",
    author: "Paw & Found Team",
    excerpt: "Thinking about getting a cat? Here are five of the most beloved cat breeds, from the chatty Siamese to the gentle Maine Coon — and what makes each one unique.",
    image: "/images/blog-cat-breeds.jpg",
    tags: ["cats", "guides"],
    content: `<p>Cats have been charming humans for thousands of years. Whether you want a talkative companion or a quiet lap cat, here are five breeds worth knowing.</p><h2>1. Maine Coon</h2><p>The gentle giant of the cat world. Maine Coons can weigh up to 20 pounds but have sweet, playful personalities. They're great with kids and dogs, making them perfect family cats. Be prepared for some serious shedding in warmer months.</p><h2>2. Siamese</h2><p>If you want a cat who talks back, the Siamese is for you. These sleek, blue-eyed beauties are incredibly vocal and form intense bonds with their humans. They hate being left alone, so consider a pair if you're out often.</p><h2>3. Ragdoll</h2><p>True to their name, Ragdolls go limp when you pick them up. They're calm, affectionate, and follow their owners from room to room. Great for quieter households — they're not a high-energy breed and prefer cozy cuddles to crazy zoomies.</p><h2>4. Bengal</h2><p>With a wild-looking spotted coat, Bengals are stunning — and high-energy. They love climbing, playing in water, and need plenty of enrichment. Not a breed for a hands-off owner, but incredibly rewarding if you're up for an adventure cat.</p><h2>5. Scottish Fold</h2><p>Those folded ears are unmistakable. Scottish Folds are sweet-natured, adaptable, and get along with everyone — kids, dogs, other cats. They're moderately active and love attention without being overly demanding.</p><p>Every cat deserves a well-stocked home. Browse our <a href="/products?category=Essentials">cat essentials</a> for litter, food, and supplies — and check out <a href="/products?category=Accessories">accessories</a> for carriers and grooming tools!<br>Curious about cat quirks? Check out our <a href="/downloads">Cat Behavior Decoder</a> — $5.99 for the ultimate feline guide.</p>`
  },
  {
    slug: "signs-dog-needs-more-exercise",
    title: "5 Signs Your Dog Needs More Exercise",
    date: "2026-07-23",
    author: "Paw & Found Team",
    excerpt: "Destructive chewing, nonstop barking, late-night zoomies? Your dog might be telling you they need more activity. Here are the signs — and how to fix it.",
    image: "/images/blog-dog-exercise.jpg",
    tags: ["dogs", "tips"],
    content: `<p>Is your dog bouncing off the walls or chewing everything in sight? They might be telling you something. Here are the most common signs your dog isn't getting enough physical and mental activity — and what to do about it.</p><h2>1. Destructive Chewing</h2><p>This is the #1 sign. If your shoes, furniture, or baseboards are getting destroyed, your dog isn't "bad" — they're bored. Chewing releases endorphins and relieves stress. A tired dog doesn't chew your couch.</p><h2>2. Excessive Barking or Whining</h2><p>When a dog has pent-up energy with no outlet, it often comes out as noise. Barking at nothing, whining when you're sitting still, or howling when left alone are all cries for more activity.</p><h2>3. The Zoomies (at the Wrong Time)</h2><p>Zoomies are normal — but if your dog is doing laps around the living room every single evening at 8pm, that's a routine energy dump. It means their daily walk wasn't enough.</p><h2>4. Restlessness at Night</h2><p>A dog who paces, can't settle, or wakes you up at 3am likely has unspent energy. A good evening walk or play session can fix this almost immediately.</p><h2>5. Weight Gain</h2><p>The most obvious but most overlooked sign. If your dog is gaining weight and their food hasn't changed, they're simply not burning enough calories.</p><p><strong>The fix:</strong> Most adult dogs need at least 30-60 minutes of exercise daily. Add mental stimulation too — puzzle toys, training sessions, and sniff walks tire a dog out as much as running. Browse our <a href="/products?category=Supplies">dog toys and supplies</a> for puzzle feeders and durable chew toys!</p>`
  },
  {
    slug: "cat-not-using-litter-box",
    title: "Why Is My Cat Not Using the Litter Box? (And How to Fix It)",
    date: "2026-07-24",
    author: "Paw & Found Team",
    excerpt: "Your cat suddenly avoiding the litter box? It's more common than you think. Here are the most likely reasons — and what to do about each one.",
    image: "/images/blog-cat-litter.jpg",
    tags: ["cats", "tips"],
    content: `<p>When a cat stops using their litter box, it's frustrating — but it's almost always a solvable problem. Cats don't do this out of spite. Here are the most common causes and how to fix them.</p><h2>1. The Box Isn't Clean Enough</h2><p>Cats are fastidious. If the box smells or hasn't been scooped in a day or two, some cats will simply refuse to use it. Scoop at least once daily and do a full litter change every 1-2 weeks depending on the type of litter.</p><h2>2. Medical Issues</h2><p>Urinary tract infections, bladder stones, and kidney issues can cause pain when urinating. If your cat associates the litter box with pain, they'll avoid it. If you notice straining, blood in urine, or frequent trips to the box with little output, see a vet immediately — this is urgent.</p><h2>3. Wrong Type of Litter</h2><p>Some cats hate scented litter. Others won't use crystal or pelleted litter if they're used to clumping clay. If you recently switched brands, switch back. When introducing a new litter, mix it in gradually over a week.</p><h2>4. Box Location Matters</h2><p>Is the box in a high-traffic area? Near a loud appliance? Cats want privacy. Move the box to a quiet, low-traffic spot — and never put food and water bowls right next to it.</p><h2>5. Not Enough Boxes</h2><p>The rule of thumb: one box per cat, plus one extra. For a two-cat household, that means three boxes. Some cats refuse to share, and territorial disputes over the box are common in multi-cat homes.</p><p>Stock up on <a href="/products?category=Essentials">cat litter and supplies</a> to keep your boxes fresh and your cat happy!<br>Want to understand your cat better? Our <a href="/downloads">Cat Behavior Decoder</a> guide is $5.99 and packed with feline insights.</p>`
  },
  {
    slug: "how-to-keep-pet-cool-in-summer",
    title: "How to Keep Your Pet Cool in Summer (Heatstroke Prevention Guide)",
    date: "2026-07-26",
    author: "Paw & Found Team",
    excerpt: "Hot weather can be dangerous for dogs and cats. Here's how to keep your pet safe, cool, and comfortable when temperatures spike.",
    image: "/images/blog-pet-cool-summer.jpg",
    tags: ["tips", "dogs", "cats"],
    content: `<p>Summer heat isn't just uncomfortable for pets — it can be deadly. Dogs and cats can't cool themselves as efficiently as humans, which makes them vulnerable to heatstroke. Here's how to protect them.</p><h2>1. Never Leave Pets in a Parked Car</h2><p>Even with windows cracked, a car can reach 120°F in under 30 minutes on a 75°F day. If you can't bring your pet with you into wherever you're going, leave them at home. No exceptions.</p><h2>2. Walk Early or Late</h2><p>Midday pavement can burn paw pads — if it's too hot for your hand to hold on the ground for 5 seconds, it's too hot for paws. Walk in the early morning or after sunset, and stick to grass when possible.</p><h2>3. Know the Signs of Heatstroke</h2><p>Excessive panting, drooling, bright red gums, vomiting, wobbliness, or collapse are all emergencies. Cool your pet with lukewarm (not ice-cold) water on their belly and paws, and get to a vet immediately.</p><h2>4. Provide Constant Fresh Water</h2><p>Add ice cubes to water bowls throughout the day. For outdoor pets, use multiple water sources in case one gets knocked over. A pet fountain can encourage cats to drink more.</p><h2>5. Create Cool Zones</h2><p>Cooling mats, frozen water bottles wrapped in towels, and shaded areas with airflow make a big difference. For homes without AC, set up a fan in a ground-level spot — both dogs and cats will seek out the coolest floor they can find.</p><p>Stock up on summer essentials — browse our <a href="/products?category=Supplies">cooling mats, portable water bowls, and shade gear</a> to keep your pet safe all summer long!</p>`
  },
  {
    slug: "best-pet-accessories-travel-road-trips",
    title: "Best Pet Accessories for Travel & Road Trips",
    date: "2026-07-25",
    author: "Paw & Found Team",
    excerpt: "Hitting the road with your dog or cat? These are the must-have accessories that make road trips safer and way less stressful for everyone.",
    image: "/images/blog-travel-accessories.jpg",
    tags: ["tips", "dogs", "cats"],
    relatedSlugs: ["ventilated-travel-carrier", "personalized-engraved-id-tag", "stainless-steel-bowl-set"],
    content: `<p>Road tripping with your pet can be amazing — or a complete disaster. The difference usually comes down to one thing: having the right gear. Here's what you actually need.</p><h2>1. A Crash-Tested Carrier or Harness</h2><p>An unrestrained pet in a car is dangerous for everyone. In a crash at just 30mph, a 50lb dog becomes a 1,500lb projectile. Get a crash-tested carrier for cats and small dogs, or a seatbelt-compatible harness for larger dogs. Look for Center for Pet Safety certification.</p><h2>2. A Travel Water Bowl</h2><p>Collapsible silicone bowls are cheap, pack flat, and make hydration stops quick. Never let your pet drink from random puddles at rest stops — they can contain antifreeze or bacteria.</p><h2>3. A Comfortable Car Seat Cover</h2><p>Protects your seats from fur, mud, and claws. Look for ones with seat anchors and non-slip backing so it doesn't slide around. Bonus: many have side flaps that protect door panels too.</p><h2>4. A Calming Aid</h2><p>If your pet gets anxious in the car, consider a ThunderShirt, calming treats, or pheromone sprays. Do a test run at home first — some pets respond better to one method over another.</p><h2>5. ID Tags & Updated Microchip</h2><p>Before any trip, double-check that your pet's ID tags are readable and their microchip info is current with your cell number. Pets escape at rest stops more than anywhere else.</p><p>Gear up before you go — browse our <a href="/products?category=Accessories">pet accessories</a> for carriers, bowls, and travel essentials!<br>Don't forget to pack smart — get our printable <a href="/downloads">Pet Travel Checklist & Packing Guide</a> for just $3.99!</p>`
  },
  {
    slug: "introducing-new-pet-to-your-home",
    title: "How to Introduce a New Pet to Your Home (Without the Chaos)",
    date: "2026-07-22",
    author: "Paw & Found Team",
    excerpt: "Bringing home a new dog or cat? Here's a step-by-step guide to smooth introductions with your existing pets and family members.",
    image: "/images/blog-new-pet.jpg",
    tags: ["tips", "dogs", "cats"],
    content: `<p>Bringing a new pet home is exciting — but for your existing pets, it can be stressful. Here's how to make introductions smooth and set everyone up for success.</p><h2>1. Set Up a Safe Space First</h2><p>Before the new pet arrives, prepare a separate room with food, water, a bed, and toys. This becomes their decompression zone. For cats especially, a small, quiet room helps them feel secure while they adjust to new smells and sounds from under the door.</p><h2>2. Start With Scent, Not Sight</h2><p>Keep the new pet and existing pets separated for the first 24-48 hours. Swap blankets or toys between them so they can get familiar with each other's scent before they ever meet face to face. This alone can prevent a lot of initial tension.</p><h2>3. First Meeting: Neutral Territory</h2><p>For dogs, introduce them on neutral ground — a walk together on leash outside the home works wonders. Keep both on leash and let them sniff and walk parallel to each other. For cats, crack the door just an inch so they can see each other without full access.</p><h2>4. Supervise and Go Slow</h2><p>Don't leave new pets alone together for at least the first week. Watch body language closely — raised hackles, growling, hissing, or stiff posture means it's time to separate and try again later. Rushing this step is the #1 cause of long-term tension between pets.</p><h2>5. Give Equal Attention</h2><p>Your existing pet may feel jealous. Make sure to give them extra love, treats, and one-on-one time so they don't associate the new arrival with losing your attention.</p><p>Stock up on <a href="/products?category=Supplies">beds, bowls, and supplies</a> for your growing family!</p>`
  }
];

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  loader: async () => {
    const products = await loadProducts();
    return { products };
  },
  head: () => {
    // Blog listing JSON-LD
    const blogListJson = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Paw & Found Blog",
      "description": "Pet care tips, product guides, and advice from the Paw & Found team.",
      "url": `${SITE_URL}/blog`,
      "blogPost": blogPosts.map(p => ({
        "@type": "BlogPosting",
        "headline": p.title,
        "url": `${SITE_URL}/blog?post=${p.slug}`,
        "datePublished": p.date,
        "author": { "@type": "Person", "name": p.author },
        "image": p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`,
      })),
    });

    return {
      meta: [
        { title: "Paw & Found Blog — Pet Care Tips & Guides" },
        { name: "description", content: "Read the Paw & Found blog for pet care tips, product guides, and advice." },
        { property: "og:title", content: "Paw & Found Blog" },
        { property: "og:description", content: "Pet care tips, product guides, and advice." },
        { property: "og:url", content: `${SITE_URL}/blog` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
      scripts: [
        { type: "application/ld+json", children: blogListJson },
      ],
    };
  },
  staleTime: 60_000,
});

function BlogPage() {
  const { products } = Route.useLoaderData();
  const [selectedPost, setSelectedPost] = React.useState<string | null>(null);
  const post = selectedPost ? blogPosts.find(p => p.slug === selectedPost) : null;

  // Dynamically update meta tags and JSON-LD for individual posts
  React.useEffect(() => {
    if (!post) {
      // Reset title on listing view
      document.title = "Paw & Found Blog — Pet Care Tips & Guides";
      return;
    }

    // Set page title
    document.title = `${post.title} — Paw & Found Blog`;

    // Set or update OG meta tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const setNameMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const imageUrl = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;
    const postUrl = `${SITE_URL}/blog?post=${post.slug}`;

    setMeta("og:title", `${post.title} — Paw & Found Blog`);
    setMeta("og:description", post.excerpt);
    setMeta("og:image", imageUrl);
    setMeta("og:url", postUrl);
    setMeta("og:type", "article");
    setMeta("article:published_time", post.date);
    setMeta("twitter:title", `${post.title} — Paw & Found Blog`);
    setMeta("twitter:description", post.excerpt);
    setMeta("twitter:image", imageUrl);
    setNameMeta("description", post.excerpt);

    // Add/update JSON-LD for this post
    const jsonld = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "author": { "@type": "Person", "name": post.author },
      "image": imageUrl,
      "url": postUrl,
      "description": post.excerpt,
    });

    let scriptEl = document.getElementById("blog-post-jsonld") as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.id = "blog-post-jsonld";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = jsonld;

    // Cleanup: remove post-specific JSON-LD on unmount
    return () => {
      const el = document.getElementById("blog-post-jsonld");
      if (el) el.remove();
      document.title = "Paw & Found Blog — Pet Care Tips & Guides";
    };
  }, [post]);

  if (post) {
    return (
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <button onClick={() => setSelectedPost(null)} className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-[#2A9D8F] hover:text-[#2A9D8F]/80 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>
        <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#E9EDDE]">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
          <time dateTime={post.date} className="font-medium">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <span>&middot;</span>
          <span>{post.author}</span>
        </div>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-[#2D2D2D] sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (<span key={tag} className="badge">{tag}</span>))}
        </div>
        <div className="blog-content mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* Shop This Article */}
        {(() => {
          // First check explicit relatedSlugs, then fall back to tag-based matching
          let relatedProducts: Product[] = [];
          if (post.relatedSlugs) {
            relatedProducts = post.relatedSlugs
              .map(slug => products.find(p => p.slug === slug))
              .filter(Boolean) as Product[];
          } else {
            // Auto-match based on post tags
            const tags = post.tags;
            const scored = products.map(p => {
              let score = 0;
              for (const tag of tags) {
                if (tag === "dogs" || tag === "dog") {
                  if (p.tags?.some((t: string) => ["dog", "collar", "leash", "t-shirt", "hoodie", "toy", "chew"].some(k => t.includes(k)))) score += 3;
                }
                if (tag === "cats" || tag === "cat") {
                  if (p.tags?.some((t: string) => ["cat", "litter", "carrier", "toy"].some(k => t.includes(k)))) score += 3;
                }
                if (tag === "essentials" || tag === "food" || tag === "nutrition") {
                  if (p.tags?.some((t: string) => ["bowl", "food", "treats", "litter"].some(k => t.includes(k)))) score += 2;
                }
                if (tag === "supplies" || tag === "tips" || tag === "health") {
                  if (p.tags?.some((t: string) => ["grooming", "brush", "shampoo", "bed", "safety"].some(k => t.includes(k)))) score += 2;
                }
                if (tag === "guides") {
                  if (p.featured) score += 2;
                }
              }
              return { product: p, score };
            });
            relatedProducts = scored
              .filter(s => s.score > 0)
              .sort((a, b) => b.score - a.score)
              .slice(0, 4)
              .map(s => s.product);
          }
          if (relatedProducts.length > 0) {
            return <ShopTheLook products={relatedProducts} />;
          }
          return null;
        })()}

        {/* Comments section */}
        <div className="mt-12 border-t border-[#E9EDDE] pt-8">
          <h2 className="font-heading text-xl font-semibold text-[#2D2D2D]">Leave a Comment</h2>
          <p className="mt-1 text-sm text-[#6B7280]">We'd love to hear from you!</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your comment! It will be reviewed before posting."); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Your name" required className="w-full rounded-lg border border-[#E9EDDE] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#6B7280] focus:border-[#2A9D8F] focus:outline-none" />
              <input type="email" placeholder="Your email" required className="w-full rounded-lg border border-[#E9EDDE] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#6B7280] focus:border-[#2A9D8F] focus:outline-none" />
            </div>
            <textarea rows={4} placeholder="Write your comment..." required className="w-full rounded-lg border border-[#E9EDDE] px-4 py-2.5 text-sm text-[#2D2D2D] placeholder:text-[#6B7280] focus:border-[#2A9D8F] focus:outline-none" />
            <button type="submit" className="btn-primary">Post Comment</button>
          </form>
        </div>
        
        <div className="mt-8 border-t border-[#E9EDDE] pt-8 text-center">
          <p className="text-[#6B7280]">Thanks for reading!</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a href="/products" className="btn-primary">Shop Pet Supplies</a>
            <button onClick={() => setSelectedPost(null)} className="btn-secondary">More Blog Posts</button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="section-title">Paw & Found Blog</h1>
        <p className="section-subtitle mt-2 max-w-2xl mx-auto">
          Pet care tips, product guides, and advice from our team.
        </p>
      </div>

      {blogPosts.length === 0 ? (
        <div className="mt-16 text-center">
          <span className="text-5xl">📝</span>
          <h2 className="font-heading mt-4 text-xl font-semibold text-[#2D2D2D]">Coming soon</h2>
          <p className="mt-2 text-[#6B7280]">Check back for blog posts!</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <button
              key={post.slug}
              onClick={() => setSelectedPost(post.slug)}
              className="card group flex flex-col text-left transition-all hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#E9EDDE]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                  <span>&middot;</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="font-heading mt-2 text-lg font-semibold text-[#2D2D2D] group-hover:text-[#FF7F5C] transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-[#6B7280]">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="badge text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
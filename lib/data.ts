export type Venue = {
  id: string;
  name: string;
  location: string;
  region: "Europe" | "Middle East" | "North America" | "Asia";
  style: "Ballroom" | "Garden" | "Coastal" | "Palace" | "Vineyard" | "Desert";
  capacity: number;
  priceFrom: number;
  rating: number;
  status: "Accepting Bookings" | "Limited Dates Available" | "Fully Booked for 2025";
  image: string;
  gallery: string[];
  description: string;
  features: string[];
};

export type Vendor = {
  id: string;
  name: string;
  category:
    | "Photography"
    | "Florals"
    | "Catering"
    | "Music"
    | "Beauty"
    | "Planning"
    | "Lighting"
    | "Cake";
  location: string;
  priceFrom: number;
  rating: number;
  verified: boolean;
  accepting: boolean;
  avatar: string;
  portfolio: string[];
  description: string;
};

export type PackageTier = {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  price: number;
  bestFor: string;
  featured?: boolean;
  includes: string[];
  excludes: string[];
};

export type GalleryItem = {
  id: string;
  title: string;
  category: "Ceremonies" | "Receptions" | "Florals" | "Tables" | "Gowns" | "Venues" | "Cakes" | "Details";
  palette: string;
  image: string;
  height: "short" | "medium" | "tall";
  description: string;
};

export type Booking = {
  id: string;
  couple: string;
  venue: string;
  date: string;
  packageName: string;
  value: number;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  planner: string;
};

export const heroImages = {
  home: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2200&q=85",
  venues: "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?auto=format&fit=crop&w=2200&q=85",
  gallery: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=2200&q=85",
  about: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2200&q=85",
  contact: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=2200&q=85",
};

const venueGallery = [
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
];

export const venues: Venue[] = [
  {
    id: "aurora-palace",
    name: "Aurora Palace",
    location: "Lake Como, Italy",
    region: "Europe",
    style: "Palace",
    capacity: 260,
    priceFrom: 88000,
    rating: 4.96,
    status: "Limited Dates Available",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A candlelit lakefront estate with frescoed salons, terraced gardens, and private boat arrivals.",
    features: ["Private pier", "Grand salon", "Firework permits", "Garden ceremony"],
  },
  {
    id: "marble-house",
    name: "The Marble House",
    location: "Paris, France",
    region: "Europe",
    style: "Ballroom",
    capacity: 420,
    priceFrom: 112000,
    rating: 4.92,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "An old-world ballroom address with mirrored galleries, crystal chandeliers, and after-midnight supper rooms.",
    features: ["Chandelier hall", "Michelin kitchen", "Valet court", "Opera stairs"],
  },
  {
    id: "rosewood-garden",
    name: "Rosewood Garden Estate",
    location: "Cotswolds, England",
    region: "Europe",
    style: "Garden",
    capacity: 180,
    priceFrom: 54000,
    rating: 4.89,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A poetic countryside estate for rose-filled ceremonies, lawn cocktails, and tented dinners under linen canopies.",
    features: ["Rose maze", "Orangery", "Tented lawn", "Guest cottages"],
  },
  {
    id: "amana-desert",
    name: "Amana Desert Sanctuary",
    location: "Wadi Rum, Jordan",
    region: "Middle East",
    style: "Desert",
    capacity: 220,
    priceFrom: 69000,
    rating: 4.94,
    status: "Limited Dates Available",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A sculptural desert camp where sunset vows become lantern-lit feasts beneath a clear night sky.",
    features: ["Stargazing deck", "Camel arrival", "Fire lounges", "Private camp"],
  },
  {
    id: "santoro-cliffs",
    name: "Santoro Cliffs",
    location: "Santorini, Greece",
    region: "Europe",
    style: "Coastal",
    capacity: 150,
    priceFrom: 74000,
    rating: 4.91,
    status: "Fully Booked for 2025",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "White stone terraces, Aegean views, and blue-hour dinners framed by bougainvillea and candlelight.",
    features: ["Sea view chapel", "Cliff terrace", "Sunset dinner", "Villa buyout"],
  },
  {
    id: "meadowmere-vineyard",
    name: "Meadowmere Vineyard",
    location: "Napa Valley, California",
    region: "North America",
    style: "Vineyard",
    capacity: 300,
    priceFrom: 62000,
    rating: 4.86,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A modern wine estate with barrel-room dinners, golden hill views, and culinary pairings from the estate chef.",
    features: ["Barrel room", "Vineyard lawn", "Estate wines", "Chef pairings"],
  },
  {
    id: "alhambra-terrace",
    name: "Alhambra Terrace",
    location: "Marrakech, Morocco",
    region: "Middle East",
    style: "Garden",
    capacity: 240,
    priceFrom: 58000,
    rating: 4.9,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "Courtyard fountains, carved archways, and jasmine gardens set a cinematic rhythm for multi-day celebrations.",
    features: ["Riad buyout", "Courtyard dinner", "Hammam suites", "Lantern canopy"],
  },
  {
    id: "celeste-conservatory",
    name: "Celeste Conservatory",
    location: "New York, USA",
    region: "North America",
    style: "Ballroom",
    capacity: 360,
    priceFrom: 97000,
    rating: 4.88,
    status: "Limited Dates Available",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A glass-roofed conservatory with city views, museum-grade service, and a dramatic midnight room reveal.",
    features: ["Glass atrium", "City terrace", "Room reveal", "After-party suite"],
  },
  {
    id: "kyoto-moon-house",
    name: "Kyoto Moon House",
    location: "Kyoto, Japan",
    region: "Asia",
    style: "Garden",
    capacity: 120,
    priceFrom: 51000,
    rating: 4.93,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A quiet heritage residence for intimate ceremonies, tea rituals, and dinners beside lantern-lit water gardens.",
    features: ["Tea house", "Koi garden", "Private chef", "Kimono suite"],
  },
  {
    id: "lumiere-hall",
    name: "Lumiere Hall",
    location: "Dubai, UAE",
    region: "Middle East",
    style: "Ballroom",
    capacity: 640,
    priceFrom: 135000,
    rating: 4.87,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A grand hospitality ballroom with couture production infrastructure and a private royal entrance.",
    features: ["Royal entrance", "LED ceiling", "Kosher kitchen", "Production dock"],
  },
  {
    id: "montclair-chateau",
    name: "Montclair Chateau",
    location: "Provence, France",
    region: "Europe",
    style: "Palace",
    capacity: 210,
    priceFrom: 83000,
    rating: 4.91,
    status: "Limited Dates Available",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "Lavender fields, stone courtyards, and a candlelit chapel make this chateau feel private and cinematic.",
    features: ["Lavender fields", "Chapel", "Pool brunch", "Wine cellar"],
  },
  {
    id: "azure-dock",
    name: "Azure Dock Club",
    location: "Amalfi Coast, Italy",
    region: "Europe",
    style: "Coastal",
    capacity: 170,
    priceFrom: 79000,
    rating: 4.84,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A seaside club for arrival by vintage boat, lemon-grove aperitivo, and dancing above the water.",
    features: ["Boat arrival", "Lemon grove", "Sea deck", "Late license"],
  },
  {
    id: "opal-manor",
    name: "Opal Manor",
    location: "Victoria, Canada",
    region: "North America",
    style: "Garden",
    capacity: 190,
    priceFrom: 47000,
    rating: 4.82,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A coastal manor with greenhouses, herb gardens, and a library made for intimate winter receptions.",
    features: ["Greenhouse", "Library", "Herb garden", "Ocean lawn"],
  },
  {
    id: "serai-courtyard",
    name: "Serai Courtyard",
    location: "Istanbul, Turkey",
    region: "Middle East",
    style: "Palace",
    capacity: 330,
    priceFrom: 72000,
    rating: 4.85,
    status: "Limited Dates Available",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A historic courtyard venue where marble arcades, music, and warm evening light do most of the storytelling.",
    features: ["Marble arcade", "Courtyard stage", "Bosporus views", "Heritage suites"],
  },
  {
    id: "eden-ballroom",
    name: "Eden Ballroom",
    location: "Singapore",
    region: "Asia",
    style: "Ballroom",
    capacity: 520,
    priceFrom: 104000,
    rating: 4.89,
    status: "Accepting Bookings",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=84",
    gallery: venueGallery,
    description: "A botanical high-rise ballroom with skyline views, orchid installations, and precision five-star service.",
    features: ["Skyline ballroom", "Orchid foyer", "Tea ceremony", "Private elevators"],
  },
];

const vendorPortfolio = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80",
];

export const vendors: Vendor[] = [
  ["atelier-luna", "Atelier Luna", "Photography", "Paris, France", 9500],
  ["maison-rose", "Maison Rose Florals", "Florals", "London, UK", 12000],
  ["salt-honey", "Salt & Honey", "Catering", "Napa Valley, USA", 18000],
  ["sonata-strings", "Sonata Strings", "Music", "Lake Como, Italy", 7200],
  ["velvet-veil", "Velvet Veil Beauty", "Beauty", "Dubai, UAE", 4200],
  ["gold-hour", "Gold Hour Planning", "Planning", "New York, USA", 21000],
  ["luminous-room", "Luminous Room", "Lighting", "Singapore", 14000],
  ["sugar-atelier", "Sugar Atelier", "Cake", "Paris, France", 3600],
  ["frame-poetry", "Frame Poetry", "Photography", "Kyoto, Japan", 8600],
  ["botanica-noir", "Botanica Noir", "Florals", "Marrakech, Morocco", 9800],
  ["fig-feast", "Fig Feast", "Catering", "Amalfi Coast, Italy", 16500],
  ["midnight-orchestra", "Midnight Orchestra", "Music", "Istanbul, Turkey", 11000],
  ["ivory-brush", "Ivory Brush", "Beauty", "London, UK", 3900],
  ["quiet-luxury", "Quiet Luxury Events", "Planning", "Cotswolds, UK", 18800],
  ["halo-production", "Halo Production", "Lighting", "Dubai, UAE", 19000],
  ["petal-crown", "Petal Crown Cakes", "Cake", "New York, USA", 5100],
  ["north-star", "North Star Photo", "Photography", "Victoria, Canada", 7400],
  ["orchid-house", "Orchid House", "Florals", "Singapore", 10600],
  ["silver-spoon", "Silver Spoon", "Catering", "Paris, France", 22500],
  ["aria-collective", "Aria Collective", "Music", "Napa Valley, USA", 8300],
].map(([id, name, category, location, price], index) => ({
  id: String(id),
  name: String(name),
  category: category as Vendor["category"],
  location: String(location),
  priceFrom: Number(price),
  rating: 4.72 + ((index % 7) * 0.03),
  verified: index % 4 !== 0,
  accepting: index % 5 !== 0,
  avatar: `https://images.unsplash.com/photo-${[
    "1524504388940-b1c1722653e1",
    "1512316609839-ce289d3eba0a",
    "1508214751196-bcfd4ca60f91",
    "1500648767791-00dcc994a43e",
    "1494790108377-be9c29b29330",
  ][index % 5]}?auto=format&fit=crop&w=400&q=80`,
  portfolio: vendorPortfolio,
  description:
    "A deeply edited creative partner with calm production instincts, refined materials, and an eye for sensory detail.",
}));

export const packages: PackageTier[] = [
  {
    id: "intimate-vows",
    name: "Intimate Vows",
    badge: "Essential",
    tagline: "A quiet celebration, exquisitely held.",
    price: 24000,
    bestFor: "Elopements and dinner-led weddings for up to 50 guests.",
    includes: ["Venue shortlist", "Vendor curation", "Design direction", "Timeline", "Budget map", "Day-of coordination", "Guest welcome notes", "Final rehearsal"],
    excludes: ["Travel buyouts", "Multi-day production", "Custom buildouts"],
  },
  {
    id: "signature-soiree",
    name: "Signature Soiree",
    badge: "Most Selected",
    tagline: "Everything you need, edited with restraint.",
    price: 46000,
    bestFor: "Full-service wedding planning for 80 to 180 guests.",
    includes: ["Venue scouting", "Vendor negotiation", "Design deck", "Guest journey", "Budget management", "Production schedule", "RSVP guidance", "Ceremony planning", "Reception styling", "Planner onsite"],
    excludes: ["Destination scouting flights", "Celebrity entertainment"],
  },
  {
    id: "grand-celebration",
    name: "Grand Celebration",
    badge: "Featured",
    tagline: "A multi-layered celebration with cinematic scale.",
    price: 88000,
    bestFor: "Large luxury weddings with a full production team and guest concierge.",
    featured: true,
    includes: ["Global venue search", "Creative direction", "Full vendor team", "Guest concierge", "Travel logistics", "Production design", "Lighting direction", "Custom stationery", "Budget governance", "Menu tasting", "Weekend timeline", "Onsite command team", "Emergency plan"],
    excludes: ["Private aviation", "Artist performance fees"],
  },
  {
    id: "destination-weekend",
    name: "Destination Weekend",
    badge: "Immersive",
    tagline: "Three days of hospitality, woven as one story.",
    price: 124000,
    bestFor: "International weddings with welcome events, ceremony, reception, and farewell brunch.",
    includes: ["Destination strategy", "Venue buyout", "Hotel blocks", "Welcome party", "Ceremony", "Reception", "Farewell brunch", "Transport plan", "Local experiences", "Custom app content", "Guest gifting", "Production office"],
    excludes: ["Guest airfare", "Visa processing"],
  },
  {
    id: "private-estate",
    name: "Private Estate",
    badge: "Bespoke",
    tagline: "A blank canvas transformed into a private world.",
    price: 165000,
    bestFor: "Private homes, estates, and built-from-scratch celebrations.",
    includes: ["Site survey", "Permitting", "Temporary structures", "Power plan", "Kitchen build", "Roadmap", "Security", "Weather strategy", "Design atelier", "Custom fabrication", "Luxury restrooms", "Full production crew", "Strike management"],
    excludes: ["Real estate rental", "Permanent construction"],
  },
];

export const testimonials = [
  {
    quote:
      "They understood the feeling before we had the words. Every guest still talks about the moment the ballroom doors opened.",
    name: "Amira & Nicolas",
    detail: "Lake Como celebration",
  },
  {
    quote:
      "The planning felt serene, even when the weekend was complex. Maison Eternel made 300 moving parts feel like choreography.",
    name: "Claire & Julian",
    detail: "Paris black-tie wedding",
  },
  {
    quote:
      "Our families were cared for with such grace. It felt less like event planning and more like private hospitality.",
    name: "Maya & Sami",
    detail: "Wadi Rum destination weekend",
  },
  {
    quote:
      "Nothing looked copied. The entire wedding felt like it could only have belonged to us.",
    name: "Elena & Theo",
    detail: "Provence estate wedding",
  },
];

export const galleryItems: GalleryItem[] = [
  ["g1", "Candlelit aisle", "Ceremonies", "Ivory & Gold", "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80", "tall"],
  ["g2", "Orchid dinner", "Tables", "Blush & Sage", "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=80", "medium"],
  ["g3", "Silk gown study", "Gowns", "Pearl & Stone", "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80", "tall"],
  ["g4", "Champagne tower", "Details", "Ivory & Gold", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80", "short"],
  ["g5", "Rose canopy", "Florals", "Blush & Sage", "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80", "medium"],
  ["g6", "Garden reception", "Receptions", "Olive & Cream", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80", "tall"],
  ["g7", "Marble ballroom", "Venues", "Navy & Rose Gold", "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80", "medium"],
  ["g8", "Sugar flower cake", "Cakes", "Pearl & Stone", "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=900&q=80", "short"],
  ["g9", "Quiet vows", "Ceremonies", "Olive & Cream", "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80", "medium"],
  ["g10", "Crystal place setting", "Tables", "Ivory & Gold", "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80", "short"],
  ["g11", "Velvet lounge", "Receptions", "Navy & Rose Gold", "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80", "tall"],
  ["g12", "Fine invitation suite", "Details", "Pearl & Stone", "https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&w=900&q=80", "medium"],
].map(([id, title, category, palette, image, height]) => ({
  id: String(id),
  title: String(title),
  category: category as GalleryItem["category"],
  palette: String(palette),
  image: String(image),
  height: height as GalleryItem["height"],
  description: "A refined reference for couples who want atmosphere, texture, and intention in equal measure.",
}));

export const palettes = [
  { name: "Ivory & Gold", swatches: ["#FDFCF8", "#D4B483", "#9A7840", "#1A1714"] },
  { name: "Blush & Sage", swatches: ["#FAE8E8", "#D48888", "#E8EDE4", "#5C5650"] },
  { name: "Pearl & Stone", swatches: ["#F8F5EE", "#DDD7C9", "#8B847C", "#2D2926"] },
  { name: "Navy & Rose Gold", swatches: ["#111827", "#B98E76", "#F5F1E8", "#C4A46E"] },
  { name: "Olive & Cream", swatches: ["#E8EDE4", "#7A9E7E", "#FAF8F2", "#2D2926"] },
];

export const team = [
  ["Camille Laurent", "Creative Director", "Sets the visual language for each celebration with a couture-level editorial eye.", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"],
  ["Noura Haddad", "Destination Lead", "Builds calm, high-touch guest journeys across complex international weekends.", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"],
  ["Elias Moreau", "Production Director", "Translates ambitious ideas into technically precise, beautifully paced event operations.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"],
  ["Sofia Chen", "Concierge Manager", "Protects the guest experience with thoughtful communication and exacting hospitality standards.", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"],
];

export const bookings: Booking[] = [
  ["BK-2026-001", "Leila & Omar", "Amana Desert Sanctuary", "2026-09-18", "Destination Weekend", 148000, "Confirmed", "Noura"],
  ["BK-2026-002", "Clara & Jules", "Aurora Palace", "2026-06-27", "Grand Celebration", 112000, "Pending", "Camille"],
  ["BK-2026-003", "Mina & Rafi", "Eden Ballroom", "2026-11-04", "Grand Celebration", 98000, "Confirmed", "Sofia"],
  ["BK-2026-004", "Ava & Theo", "Rosewood Garden Estate", "2026-08-09", "Signature Soiree", 56000, "Completed", "Camille"],
  ["BK-2026-005", "Yara & Samir", "Lumiere Hall", "2026-12-12", "Private Estate", 186000, "Pending", "Elias"],
  ["BK-2026-006", "Elena & Marco", "Azure Dock Club", "2026-07-03", "Destination Weekend", 124000, "Confirmed", "Noura"],
  ["BK-2026-007", "Iris & Noah", "Celeste Conservatory", "2026-10-22", "Grand Celebration", 105000, "Confirmed", "Sofia"],
  ["BK-2026-008", "Hana & Kenji", "Kyoto Moon House", "2026-05-16", "Intimate Vows", 31000, "Completed", "Camille"],
  ["BK-2026-009", "Zara & Karim", "Serai Courtyard", "2026-09-02", "Signature Soiree", 69000, "Pending", "Elias"],
  ["BK-2026-010", "Lucia & Ben", "Meadowmere Vineyard", "2026-04-25", "Signature Soiree", 64000, "Completed", "Sofia"],
  ["BK-2026-011", "Noor & Daniel", "Alhambra Terrace", "2026-10-03", "Destination Weekend", 118000, "Confirmed", "Noura"],
  ["BK-2026-012", "Mila & Henri", "Montclair Chateau", "2026-06-06", "Grand Celebration", 99000, "Cancelled", "Camille"],
  ["BK-2026-013", "Rania & Zayd", "The Marble House", "2027-01-14", "Private Estate", 210000, "Pending", "Elias"],
  ["BK-2026-014", "Celine & Adam", "Opal Manor", "2026-08-29", "Signature Soiree", 52000, "Confirmed", "Sofia"],
  ["BK-2026-015", "Sana & Amir", "Santoro Cliffs", "2026-09-27", "Destination Weekend", 132000, "Confirmed", "Noura"],
  ["BK-2026-016", "Nina & Mateo", "Aurora Palace", "2027-04-08", "Grand Celebration", 116000, "Pending", "Camille"],
  ["BK-2026-017", "Dalia & Niko", "The Marble House", "2026-12-31", "Private Estate", 230000, "Confirmed", "Elias"],
  ["BK-2026-018", "Sara & David", "Meadowmere Vineyard", "2026-05-30", "Signature Soiree", 61000, "Completed", "Sofia"],
  ["BK-2026-019", "Layla & Idris", "Amana Desert Sanctuary", "2027-02-20", "Destination Weekend", 141000, "Pending", "Noura"],
  ["BK-2026-020", "June & Leo", "Celeste Conservatory", "2026-07-19", "Grand Celebration", 101000, "Confirmed", "Camille"],
].map(([id, couple, venue, date, packageName, value, status, planner]) => ({
  id: String(id),
  couple: String(couple),
  venue: String(venue),
  date: String(date),
  packageName: String(packageName),
  value: Number(value),
  status: status as Booking["status"],
  planner: String(planner),
}));

export const checklistGroups = [
  {
    label: "12+ months",
    items: ["Define guest count", "Shortlist destination", "Secure venue", "Choose planning package"],
  },
  {
    label: "6-9 months",
    items: ["Book photography", "Confirm entertainment", "Design invitation suite", "Plan guest travel"],
  },
  {
    label: "3-6 months",
    items: ["Menu tasting", "Finalize florals", "Select attire", "Build ceremony script"],
  },
  {
    label: "Final month",
    items: ["Confirm RSVP list", "Seat guests", "Pack detail kit", "Rehearsal walkthrough"],
  },
];

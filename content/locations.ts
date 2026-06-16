export type Hours = { days: string; time: string };

export type Location = {
  slug: string;
  name: string;
  shortName: string;
  model: string; // one-line descriptor of what this location is
  blurb: string;
  address: { street: string; city: string; state: string; zip: string };
  geo: { lat: number; lng: number };
  hours: Hours[];
  hoursNote?: string;
  orderUrl: string; // Joe Coffee
  mapUrl: string;
  image: string;
  highlights: string[];
};

// ⚠ CLIENT TO CONFIRM: Merchantville opening hour (About page says 6:30, location
// page says 7:00). Verify Joe Coffee order URLs. Geo coords are approximate.
export const locations: Location[] = [
  {
    slug: "washington-township",
    name: "Washington Township",
    shortName: "Washington Twp.",
    model: "Full farm-to-table cafe & kitchen",
    blurb:
      "Our flagship cafe in Turnersville — a full farm-to-table kitchen where the bread, sauces, and bakery are made in-house daily and the coffee is roasted just steps away.",
    address: {
      street: "245 Fries Mill Road",
      city: "Washington Township",
      state: "NJ",
      zip: "08012",
    },
    geo: { lat: 39.7551, lng: -75.0668 },
    hours: [{ days: "Every day", time: "7:00 AM – 3:00 PM" }],
    orderUrl:
      "https://order.joe.coffee/store/hallowed-grounds-coffee-cafe",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hallowed+Grounds+Coffee+245+Fries+Mill+Road+Washington+Township+NJ",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop",
    highlights: [
      "Full house-made food menu",
      "Coffee roasted in-house",
      "Seed-oil free kitchen",
      "Opened 2025",
    ],
  },
  {
    slug: "merchantville",
    name: "Merchantville",
    shortName: "Merchantville",
    model: "Coffee bar with Thyme Kitchen",
    blurb:
      "Where it all began. A neighborhood coffee bar with a charming patio, pouring our signature drinks alongside scratch-made food from our partners at Thyme Kitchen & Catering.",
    address: {
      street: "177 S Centre Street",
      city: "Merchantville",
      state: "NJ",
      zip: "08109",
    },
    geo: { lat: 39.9484, lng: -75.0479 },
    hours: [{ days: "Tuesday – Sunday", time: "7:00 AM – 3:00 PM" }],
    hoursNote: "Closed Mondays. Flights all day Tue–Fri; 7–10 AM weekends.",
    orderUrl: "https://order.joe.coffee/store/hallowed-grounds-llc",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hallowed+Grounds+Coffee+177+S+Centre+Street+Merchantville+NJ",
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1600&auto=format&fit=crop",
    highlights: [
      "Food by Thyme Kitchen",
      "Outdoor patio",
      "Our original location",
      "Coffee flights",
    ],
  },
];

export const getLocation = (slug: string) =>
  locations.find((l) => l.slug === slug);

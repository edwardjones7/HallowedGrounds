export const catering = {
  intro:
    "From mobile espresso bars at weddings to morning coffee service for the office, we bring the full Hallowed Grounds experience to you — clean ingredients, signature drinks, and baristas who care.",
  startingPrice: "550",
  // ⚠ CLIENT TO CONFIRM: package details, inclusions, pricing tiers.
  packages: [
    {
      name: "The Mobile Coffee Bar",
      from: "550",
      description:
        "Our signature setup. A full espresso bar, baristas, and a curated drink menu brought to your venue.",
      includes: [
        "Professional baristas",
        "Espresso, drip & cold brew",
        "Signature latte menu",
        "Setup & breakdown",
      ],
    },
    {
      name: "Weddings & Celebrations",
      from: "Custom",
      description:
        "Make the coffee a moment. Tailored menus, signature drinks named for the couple, and a beautiful bar that fits your day.",
      includes: [
        "Custom signature drinks",
        "Branded menu & styling",
        "Dessert-bar pairings",
        "Late-night service options",
      ],
    },
    {
      name: "Corporate & Schools",
      from: "Custom",
      description:
        "Fuel the room. Reliable, on-time coffee service for meetings, faculty events, and morning rushes.",
      includes: [
        "Volume drip & cold brew",
        "Grab-and-go pastries",
        "Flexible scheduling",
        "Invoicing available",
      ],
    },
  ],
  addOns: [
    "Extra milk alternatives",
    "House hot chocolate",
    "Frozen coffee",
    "Smoothies",
    "Fresh whipped upgrade",
    "Lemonade & iced tea",
    "Coffee mocktails",
    "Dessert bar",
  ],
  terms: "A 20% deposit secures your date. A 3.5% fee applies to card payments.",
  eventTypes: [
    "Wedding",
    "Corporate / Office",
    "School / Faculty",
    "Birthday / Private Party",
    "Grand Opening",
    "Other",
  ],
};

export const site = {
  name: "Hallowed Grounds Coffee Co.",
  shortName: "Hallowed Grounds",
  url: "https://www.hallowedgroundscoffeeco.com",
  description:
    "South Jersey's farm-to-table coffee company — roasted in-house, seed-oil free, made by hand. Two locations in Washington Twp. & Merchantville, plus mobile coffee catering.",
  tagline: "Every cup, a small act of reverence.",
  positioning:
    "South Jersey's farm-to-table cafe, roaster & mobile coffee caterer.",
  social: {
    instagram: "https://www.instagram.com/onhallowedgrounds/",
    facebook: "https://www.facebook.com/onhallowedgrounds/",
    handle: "@onhallowedgrounds",
  },
  // ⚠ CLIENT TO CONFIRM — not published publicly anywhere.
  contact: {
    email: "hello@hallowedgroundscoffeeco.com",
    phone: "",
  },
  // Joe Coffee mobile ordering app. ⚠ CLIENT TO CONFIRM exact store links + copy.
  joe: {
    blurb:
      "Order ahead, skip the line, and earn rewards with the Joe Coffee app.",
    ios: "https://apps.apple.com/us/app/joe-coffee-order-ahead/id1167759164",
    android:
      "https://play.google.com/store/apps/details?id=coffee.joe.consumer",
  },
} as const;

export type Site = typeof site;

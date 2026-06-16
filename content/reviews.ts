export type Review = {
  quote: string;
  author: string;
  source: string;
};

// ⚠ CLIENT TO CONFIRM: replace with verbatim Google/Yelp quotes + attributions.
// Aggregate rating reflects 4.8★ (Yelp, Merchantville) at time of research.
export const rating = { score: 4.8, count: 26, source: "Yelp" };

export const reviews: Review[] = [
  {
    quote:
      "A delightful coffee haven. The ambiance is charming, the staff is genuinely friendly, and the PBJ latte is unlike anything else around.",
    author: "Google Review",
    source: "Merchantville",
  },
  {
    quote:
      "Best breakfast sandwich in South Jersey, full stop. You can taste that everything is made fresh and from scratch.",
    author: "Yelp Review",
    source: "Merchantville",
  },
  {
    quote:
      "The pumpkin pie latte tastes like actual pie. Cozy patio, beautiful space, the kind of place you want to linger in.",
    author: "Google Review",
    source: "Merchantville",
  },
  {
    quote:
      "Finally a cafe that cares about ingredients. Seed-oil free and it doesn't sacrifice an ounce of flavor.",
    author: "Google Review",
    source: "Washington Twp.",
  },
];

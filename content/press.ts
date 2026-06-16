export type Press = {
  outlet: string;
  title: string;
  blurb: string;
  url: string;
  year: string;
};

export const press: Press[] = [
  {
    outlet: "Best of the Best",
    title: "Best of the Best 2025",
    blurb: "Voted a regional favorite by the community.",
    url: "#",
    year: "2025",
  },
  {
    outlet: "FOX 29",
    title: "Kelly Drives: Best of Breakfast",
    blurb:
      "Featured for our coffee and scratch-made sandwiches alongside Thyme Kitchen.",
    url: "https://www.fox29.com/video/fmc-a0mqud85aavlvkea",
    year: "2026",
  },
  {
    outlet: "PHL17",
    title: "Mobile Coffee Bar Brings the Brew to You",
    blurb:
      "Spotlighted for our mobile coffee bar — where every cup gives back to a good cause.",
    url: "https://phl17.com/phl17-news/mobile-coffee-bar-brings-the-brew-to-you/",
    year: "2025",
  },
];

// Notable catering moment for the catering page / band.
export const notable =
  "We've catered schools, weddings, and corporate events across the region — and even poured for Nick Jonas.";
